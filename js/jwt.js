
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

window.decodeJWT = function(encoded) {
  var result = {
    header: {},
    payload: {}
  };

  try {
    var split = encoded.split('.');
    result.header = JSON.parse(window.decode(split[0]).result);
    result.payload = JSON.parse(window.decode(split[1]).result);
    return { result: result, error: null };
  } catch(e) {
    return { result: result, error: e };
  }
}

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

  if (algorithm === 'HS256') {
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
    var validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_+/=';
    var hasPadding = false;
    for(var i = 0; i < s.length; ++i) {
      hasPadding |= s.charAt(i) === '=';
      if(validChars.indexOf(s.charAt(i)) === -1) {
        return false;
      }
    }

    if(hasPadding) {
      for(var i = s.indexOf('='); i < s.length; ++i) {
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
};

window.verify = function (algorithm, value, key, isSecretBase64Encoded) {

  var result = '', error = null;

  // HOTFIX: issue #251, 'alg: none' results in valid signature. It should
  // always be invalid. This is fixed in KJUR.jws.JWS in later versions.
  // When we update libraries to the latest versions, we can remove this.
  try {
    var header = JSON.parse(window.decode(value.split('.')[0]).result);
    if(header.alg === 'none') {
      return { result: false, error: null };
    }
  } catch(e) {
    return { result: false, error: e };
  }

  if (algorithm === 'HS256'){
    if (isSecretBase64Encoded) {
      try {
        key = window.b64utob64(key);
        key = window.b64tohex(key);
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

window.isValidKey = function(key) {
  // Four tries: no header, header for cert, header for pub key,
  // header for priv key

  var headers = [{
    prologue: '',
    epilogue: ''
  },{
    prologue: '-----BEGIN CERTIFICATE-----\n',
    epilogue: '-----END CERTIFICATE-----\n'
  }, {
    prologue: '-----BEGIN PUBLIC KEY-----\n',
    epilogue: '-----END PUBLIC KEY-----\n'
  }, {
    prologue: '-----BEGIN RSA PRIVATE KEY-----\n',
    epilogue: '-----END RSA PRIVATE KEY-----\n'
  }];

  for(var i = 0; i < headers.length; ++i) {
    var header = headers[i];
    try {
      var newKey = header.prologue;
      newKey += key + '\n';
      newKey += header.epilogue;

      return {
        valid: !!KEYUTIL.getKey(newKey),
        key: newKey
      };
    } catch(e2) {
      // Ignore
    }
  }

  return {
    valid: false,
    key: key
  };
};
