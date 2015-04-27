
// XXX Hack to prevent hextorstr function used by JWS send a string instead of
// a Word Array. On this way, no string decoding needs to take place and Crypto
// takes care of everything.
// Note that it should not affect the other algorithms as hextorstr is exclusively
// used on Hmac family (that invokes CryptoJS library).
window.hextorstr = function (c) {
  return window.CryptoJS.enc.Hex.parse(c);
};


//this is used to parse base64
function url_base64_decode(str) {
  var output = str.replace(/-/g, '+').replace(/_/g, '/');
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += '==';
      break;
    case 3:
      output += '=';
      break;
    default:
      throw 'Illegal base64url string!';
  }
  var result = window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
  try{
    return decodeURIComponent(escape(result));
  } catch (err) {
    return result;
  }
}

window.decode = function (base64json) {
  var json = null, error = null;
  try {
    json = url_base64_decode(base64json);
    json = JSON.stringify(JSON.parse(json), undefined, 2);
  } catch (e) {
    error = e;
  }
  return {result: json, error: error};
};

window.sign = function (algorithm, header, payload, key, isSecretBase64Encoded) {
  var value = '', error = null, headerAsJSON, payloadAsJSON;

  try {
    headerAsJSON = JSON.stringify(JSON.parse(header));
  } catch (e) {
    error = {result: null, error: {cause: e, who: ['header']}};
  }
  try {
    payloadAsJSON = JSON.stringify(JSON.parse(payload));
  } catch (e) {
    if (error) {
      error.error.who.push('payload');
    } else {
      error = {result: null, error: {cause: e, who: ['payload']}};
    }
  }

  if (error) {
    return error;
  }

  if(algorithm === 'HS256'){
    if (isSecretBase64Encoded) {
      try {
        key = window.b64utob64(key);
        key = window.CryptoJS.enc.Base64.parse(key).toString();
      } catch (e) {
        return {result: '', error: e};
      }
    } else {
      key = window.CryptoJS.enc.Latin1.parse(key).toString();
    }
  }

  try {
    value = KJUR.jws.JWS.sign(algorithm, headerAsJSON, payloadAsJSON, key);
  } catch (e) {
    error = e;
  }

  return {result: value, error: error};
};

window.isValidBase64String = function (s) {
  try {
    s = window.b64utob64(s);
    window.CryptoJS.enc.Base64.parse(s).toString();
    return true;
  } catch (e) {
    return false;
  }
};

window.verify = function (algorithm, value, key, isSecretBase64Encoded) {

  var result = '', error = null;

  if (algorithm === 'HS256'){
    if (isSecretBase64Encoded) {
      try {
        key = window.b64utob64(key);
        key = window.CryptoJS.enc.Base64.parse(key).toString();
      } catch (e) {
        return {result: '', error: e};
      }
    } else {
      key = window.CryptoJS.enc.Latin1.parse(key).toString();
    }
  }

  try {
    result = KJUR.jws.JWS.verify(value, key);
  } catch (e) {
    error = e;
  }

  return {result: result, error: error};
};
