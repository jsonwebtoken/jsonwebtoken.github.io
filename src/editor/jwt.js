import b64u from 'base64url';
import any from 'promise.any';
import strings from '../strings';
import log from 'loglevel';
import * as jose from 'jose'
import { pki } from 'node-forge';

function symmetricSecret(key, alg, base64Secret) {
    let secret = base64Secret ? Buffer.from(key, 'base64') : Buffer.from(key);

    const len = Math.max(parseInt(alg.substr(-3), 10) >> 3, secret.byteLength);

    const padded = new Uint8Array(len);
    padded.set(secret);

    return Promise.resolve(padded);
}

const types = {
    'PRIVATE': 1,
    'PUBLIC': 2,
};

const rawPublic = ({ alg, oth, d, p, q, dp, dq, qi, use, key_ops, ext, ...jwk }) => jwk;
const rawPrivate = ({ alg, use, key_ops, ext, ...jwk }) => jwk;

function getJoseKey(header, key, base64Secret, type) {
    if (header.alg.indexOf('HS') === 0) {
        return symmetricSecret(key, header.alg, base64Secret)
    }

    switch (type) {
        case types.PRIVATE:
            if (key.startsWith('-----BEGIN RSA PRIVATE KEY-----')) {
                key = pki.privateKeyInfoToPem(pki.wrapRsaPrivateKey(pki.privateKeyToAsn1(pki.privateKeyFromPem(key))))
            }
            return any([
                jose.importPKCS8(key, header.alg),
                Promise.resolve().then(() => JSON.parse(key)).then(rawPrivate).then((jwk) => {
                    if (!('d' in jwk)) throw new Error('not a private JWK')
                    return jose.importJWK(jwk, header.alg)
                })
            ])
        case types.PUBLIC:
            if (key.startsWith('-----BEGIN RSA PUBLIC KEY-----')) {
                key = pki.publicKeyToPem(pki.publicKeyFromPem(key))
            }
            return any([
                jose.importSPKI(key, header.alg),
                jose.importX509(key, header.alg),
                Promise.resolve().then(() => JSON.parse(key)).then(rawPublic).then((jwk) => {
                    return jose.importJWK(jwk, header.alg)
                })
            ])
        default:
            throw new Error('unreachable')
    }
}

export function sign(header,
    payload,
    secretOrPrivateKeyString,
    base64Secret = false) {
    if (!header.alg) {
        return Promise.reject(new Error('Missing "alg" claim in header'));
    }

    return getJoseKey(header, secretOrPrivateKeyString, base64Secret, types.PRIVATE).then(
        key => {
            if (!(typeof payload === 'string' || payload instanceof String)) {
                payload = JSON.stringify(payload);
            }

            return new jose.CompactSign(new TextEncoder().encode(payload))
                .setProtectedHeader(header)
                .sign(key);
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

    return getJoseKey(decoded.header, secretOrPublicKeyString, base64Secret, types.PUBLIC).then(
        key => {
            return jose.compactVerify(jwt, key)
                .then(() => ({
                    validSignature: true,
                    validBase64: jwt.split('.').reduce((valid, s) => valid = valid && isValidBase64String(s), true)
                }), (e) => {
                    log.warn('Could not verify token: ', e);
                    return { validSignature: false }
                });
        }, e => {
            log.warn('Could not load the key(s): ', e);
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
        result.payload = b64u.decode(split[1]);
    } catch (e) {}

    try {
        if (!isValidJSON(b64u.decode(split[1]))) {
            result.warnings.push(strings.warnings.payloadInvalidJSON);
        }
        result.payload = JSON.parse(b64u.decode(split[1]))
    } catch (e) {}

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
