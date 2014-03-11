//this is used to parse base64
function url_base64_decode(str) {
  var output = str.replace('-', '+').replace('_', '/');
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
  return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
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

window.sign = function (header, payload, secret) {
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

  try {
    value = KJUR.jws.JWS.sign(null, headerAsJSON, payloadAsJSON, secret);
  } catch (e) {
    error = e;
  }

  return {result: value, error: error};
};

window.verify = function (value, secret) {
  var result = '', error = null;
  try {
    result = KJUR.jws.JWS.verify(value, secret);
  } catch (e) {
    error = e;
  }

  return {result: result, error: error};
};
