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
  var json = null;
  try {
    json = url_base64_decode(base64json);
    json = JSON.stringify(JSON.parse(json), undefined, 2);
  } catch (e) { }
  return json;
};

window.sign = function (header, payload, secret) {
  var value = '';
  try {
    value = KJUR.jws.JWS.sign(null, JSON.stringify(JSON.parse(header)), JSON.stringify(JSON.parse(payload)), secret);
  } catch (e) {
  }

  return value;
};

window.verify = function (value, secret) {
  var result = '';
  try {
    result = KJUR.jws.JWS.verify(value, secret);
  } catch (e) { }

  return result;
};
