import { 
  jws,
  KEYUTIL,
  b64utoutf8,
  b64utohex,
  utf8tohex 
} from 'jsrsasign';

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

export function verify(jwt, secretOrPublicKeyString, base64Secret = false) {
  const decoded = decode(jwt);
  
  if(!decoded.header.alg) {
    return false;
  }

  if(decoded.header.alg.indexOf('HS') === 0) {
    return jws.JWS.verify(jwt, 
      base64Secret ? 
        b64utohex(secretOrPublicKeyString) : 
        utf8tohex(secretOrPublicKeyString));
  } else {
    return jws.JWS.verify(jwt, secretOrPublicKeyString);
  }
}

export function decode(jwt) {
  const split = jwt.split('.');
  
  const result = {};
  try {
    result.header = JSON.parse(b64utoutf8(split[0]));
  } catch(e) {
    result.header = '';
  }
  try {
    result.payload = JSON.parse(b64utoutf8(split[1]));
  } catch(e) {
    result.payload = '';
  }

  return result;
}
