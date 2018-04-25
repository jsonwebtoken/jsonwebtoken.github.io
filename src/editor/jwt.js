import { 
  jws,
  KEYUTIL,
  b64utoutf8,
  b64utohex,
  utf8tohex, 
  b64tohex,
  ASN1HEX
} from 'jsrsasign';

import log from 'loglevel';

export function sign(header, 
                     payload,
                     secretOrPrivateKeyString,
                     base64Secret = false) {
  if(!header.alg) {
    throw new Error('Missing "alg" claim in header');
  }

  if(header.alg.indexOf('HS') === 0) {
    return jws.JWS.sign(null, header, payload, 
      base64Secret ? 
        b64utohex(secretOrPrivateKeyString) : 
        utf8tohex(secretOrPrivateKeyString));
  } else {
    return jws.JWS.sign(null, header, payload, secretOrPrivateKeyString);
  }
}

/**
 * This function takes a PEM string with a public key and returns a
 * jsrsasign key object (RSAKey, KJUR.crypto.DSA, KJUR.crypto.ECDSA). It also
 * handles plain RSA keys not wrapped in a X.509 SubjectPublicKeyInfo
 * structure.
 * See: https://stackoverflow.com/questions/18039401/how-can-i-transform-between-the-two-styles-of-public-key-format-one-begin-rsa
 * @param {String} publicKey The public key as a PEM string.
 * @returns {Object} The public key as a jsrsasign key object.
 */
function getPublicKeyObject(publicKey) {
  try {
    const startTag = '-----BEGIN RSA PUBLIC KEY-----';
    const endTag = '-----END RSA PUBLIC KEY-----';
    const startTagPos = publicKey.indexOf(startTag);
    const endTagPos = publicKey.indexOf(endTag);
      
    if(startTagPos !== -1 && endTagPos !== -1) {
      const plainDataBase64 =
      publicKey.substr(0, endTagPos)
               .substr(startTagPos + startTag.length);
    
      const plainDataDER = b64tohex(plainDataBase64);

      const barePublicKey = {
        n: ASN1HEX.getVbyList(plainDataDER, 0, [0], '02'),
        e: ASN1HEX.getVbyList(plainDataDER, 0, [1], '02')
      };

      return KEYUTIL.getKey(barePublicKey);
    }
  } catch(e) {
    log.error('Failed to make public key into X.509 ' + 
              'SubjectPublicKeyInfo key:', e);
  }

  return KEYUTIL.getKey(publicKey);
}

export function verify(jwt, secretOrPublicKeyString, base64Secret = false) {
  if(!isToken(jwt)) {
    return false;
  }

  const decoded = decode(jwt);
  
  if(!decoded.header.alg) {
    return false;
  }

  try {
    if(decoded.header.alg.indexOf('HS') === 0) {
      return jws.JWS.verify(jwt, 
        base64Secret ? 
          b64utohex(secretOrPublicKeyString) : 
          utf8tohex(secretOrPublicKeyString));
    } else {
      const publicKeyObject = getPublicKeyObject(secretOrPublicKeyString);
      return jws.JWS.verify(jwt, publicKeyObject);
    }
  } catch(e) {
    log.warn('Could not verify token, ' +
             'probably due to bad data in it or the keys: ', e);
    return false;
  }
}

export function decode(jwt) {
  const result = {
    header: {},
    payload: {},
    errors: false
  };

  if(!jwt) {
    result.errors = true;
    return result;
  }
  
  const split = jwt.split('.');
  
  try {
    result.header = JSON.parse(b64utoutf8(split[0]));
  } catch(e) {
    result.header = {};
    result.errors = true;
  }

  try {
    result.payload = JSON.parse(b64utoutf8(split[1]));
  } catch(e) {
    result.payload = {};
    result.errors = true;
  }

  return result;
}

export function isValidBase64String(s, urlOnly) {
  try {
    const validChars = urlOnly ?
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=' :
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_+/=';

    let hasPadding = false;
    for(let i = 0; i < s.length; ++i) {
      hasPadding |= s.charAt(i) === '=';
      if(validChars.indexOf(s.charAt(i)) === -1) {
        return false;
      }
    }

    if(hasPadding) {
      for(let i = s.indexOf('='); i < s.length; ++i) {
        if(s.charAt(i) !== '=') {
          return false;
        }
      }

      return s.length % 4 === 0;
    }

    return true;    
  } catch (e) {
    return false;
  }
}

export function isToken(jwt, checkTypClaim = false) {
  const decoded = decode(jwt);

  if(decoded.errors) {
    return false;
  }

  if(checkTypClaim && decoded.header.typ !== 'JWT') {
    return false;
  }

  const split = jwt.split('.');
  let valid = true;
  split.forEach(s => valid = valid && isValidBase64String(s, true));

  return valid;
}
