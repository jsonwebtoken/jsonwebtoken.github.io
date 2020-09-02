import jose from 'node-jose';
import b64u from 'base64url';
import any from 'promise.any';
import { pki } from 'node-forge';
import strings from '../strings';
strings
import log from 'loglevel';
import { findLastIndex } from 'lodash';

// node-jose does not support keys shorter than block size. This is a
// limitation from their implementation and could be resolved in the future.
// See: https://github.com/cisco/node-jose/blob/master/lib/jwk/octkey.js#L141
function paddedKey(key, alg, base64Secret) {
    const blockSizeBytes = alg.indexOf('256') !== -1 ? 512 / 8 : 1024 / 8;

    let buf = base64Secret ? Buffer.from(key, 'base64') : Buffer.from(key);

    if (buf.length < blockSizeBytes) {
        const oldBuf = buf;
        buf = Buffer.alloc(blockSizeBytes);
        buf.set(oldBuf);
    }

    return b64u.encode(buf);
}

/*
 * This function handles plain RSA keys not wrapped in a
 * X.509 SubjectPublicKeyInfo structure. It returns a PEM encoded public key
 * wrapper in that structure.
 * See: https://stackoverflow.com/questions/18039401/how-can-i-transform-between-the-two-styles-of-public-key-format-one-begin-rsa
 * @param {String} publicKey The public key as a PEM string.
 * @returns {String} The PEM encoded public key in
 *                   X509 SubjectPublicKeyInfo format.
 */
function plainRsaKeyToX509Key(key) {
    try {
        const startTag = '-----BEGIN RSA PUBLIC KEY-----';
        const endTag = '-----END RSA PUBLIC KEY-----';
        const startTagPos = key.indexOf(startTag);
        const endTagPos = key.indexOf(endTag);

        return startTagPos !== -1 && endTagPos !== -1 ?
            pki.publicKeyToPem(pki.publicKeyFromPem(key)) :
            key;
    } catch (e) {
        // If anything fails, it may not be a plain RSA key, so return the same key.
        return key;
    }
}

function getJoseKey(header, key, base64Secret) {
    if (header.alg.indexOf('HS') === 0) {
        return jose.JWK.asKey({
            kty: 'oct',
            use: 'sig',
            alg: header.alg,
            k: paddedKey(key, header.alg, base64Secret)
        });
    } else {
        if (header.alg.indexOf('RS') === 0) {
            key = plainRsaKeyToX509Key(key);
        }

        return any(['pem', 'json'].map(form => {
            try {
                return jose.JWK.asKey(key, form);
            } catch (e) {
                return Promise.reject(e);
            }
        }));
    }
}

export function sign(header,
    payload,
    secretOrPrivateKeyString,
    base64Secret = false) {
    if (!header.alg) {
        return Promise.reject(new Error('Missing "alg" claim in header'));
    }

    return getJoseKey(header, secretOrPrivateKeyString, base64Secret).then(
        key => {
            if (!(typeof payload === 'string' || payload instanceof String)) {
                payload = JSON.stringify(payload);
            }

            return jose.JWS.createSign({
                fields: header,
                format: 'compact'
            }, {
                key: key,
                reference: false
            }).update(payload, 'utf8').final();
        }
    );
}

export function verify(jwt, secretOrPublicKeyString, base64Secret = false) {
    if (!isToken(jwt)) {
        return Promise.resolve({ validSignature: false });
    }

    const decoded = decode(jwt);

    if (!decoded.header.alg || decoded.errors) {
        return Promise.resolve({ validSignature: false });
    }

    return getJoseKey(decoded.header, secretOrPublicKeyString, base64Secret).then(
        key => {
            return jose.JWS.createVerify(key)
                .verify(jwt)
                .then(() => ({
                    validSignature: true,
                    validBase64: jwt.split('.').reduce((valid, s) => valid = valid && isValidBase64String(s), true)
                }), () => ({ validSignature: false }));
        }, e => {
            log.warn('Could not verify token, ' +
                'probably due to bad data in it or the keys: ', e);
            return { validSignature: false };
        }
    );
}

export function decode(jwt) {
    const result = {
        header: {},
        payload: {},
        errors: false,
        warnings: [],
    };

    if (!jwt) {
        result.errors = true;
        return result;
    }

    const split = jwt.split('.');

    if (!isValidBase64String(split[2])) {
        result.warnings.push(strings.warnings.signatureBase64Invalid);
    }

    try {
        if (!isValidBase64String(split[0])) {
            result.warnings.push(strings.warnings.headerBase64Invalid);
        }
        result.header = JSON.parse(b64u.decode(split[0]));
    } catch (e) {
        result.errors = true;
    }

    try {
        if (!isValidBase64String(split[1])) {
            result.warnings.push(strings.warnings.payloadBase64Invalid);
        }
        result.payload = JSON.parse(b64u.decode(split[1]));
    } catch (e) {
        result.errors = true;
    }

    try {
        if (!isValidJSON(b64u.decode(split[1]))) {
            result.warnings.push(strings.warnings.payloadInvalidJSON);
            result.payload = b64u.decode(split[1])
        }
    } catch (e) {
        result.errors = true;
    }

    return result;
}

export function isValidBase64String(s, allowPadding = false) {
    if (allowPadding) {
        return /^[a-zA-Z0-9_=-]*$/.test(s);
    }

    return /^[a-zA-Z0-9_-]*$/.test(s);
}

export function isValidJSON(payload) {
    try {
        JSON.parse(payload);
    } catch (e) {
        return false;
    }
    return true;
}

export function isToken(jwt, checkTypClaim = false) {
    const decoded = decode(jwt);

    if (decoded.errors) {
        return false;
    }

    if (checkTypClaim && decoded.header.typ !== 'JWT') {
        return false;
    }

    const split = jwt.split('.');
    let valid = true;
    split.forEach(s => valid = valid && isValidBase64String(s, true));

    return valid;
}