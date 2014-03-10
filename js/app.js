window.jsonParse = JSON.parse;

(function () {

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

  CodeMirror.defineMode('jwt', function () {

    function jwtHeader(stream, state) {
      stream.eatWhile(/[^.]/);
      state.cur = firstDot;
      return 'jwt-header';
    }

    function firstDot(stream, state) {
      stream.next();
      state.cur = jwtPayload;
      return 'jwt-dot';
    }

    function jwtPayload(stream, state) {
      stream.eatWhile(/[^.]/);
      state.cur = secondDot;
      return 'jwt-payload';
    }

    function secondDot(stream, state) {
      stream.next();
      state.cur = jwtSignature;
      return 'jwt-dot';
    }

    function jwtSignature(stream) {
      stream.skipToEnd();
      return 'jwt-signature';
    }

    return {
      token: function (stream, state) {
        var cur = state.cur;
        //if (cur != header && cur != body && stream.eatSpace()) return null;
        return cur(stream, state);
      },
      startState: function () {
        return {cur: jwtHeader};
      }
    };
  });

  var tokenEditor = CodeMirror(document.getElementsByClassName('js-input')[0], {
    mode:           'jwt',
    theme:          'night',
    lineWrapping:   true,
    autofocus:      true
  });

  var headerEditor = CodeMirror(document.getElementsByClassName('js-header')[0], {
    mode:           'application/json',
    lineWrapping:   true
  });

  var payloadEditor = CodeMirror(document.getElementsByClassName('js-payload')[0], {
    mode:           'application/json',
    lineWrapping:   true
  });

  function getFirstElementByClassName(selector) {
    var headerElement = document.getElementsByClassName(selector);
    return headerElement.length ? headerElement[0] : null;
  }

  function decode(base64json) {
    var json = null;
    try {
      json = url_base64_decode(base64json)
      json = JSON.stringify(JSON.parse(json), undefined, 2);
    } catch (e) {

    }
    return json;
  }

  function getTrimmedValue(instance) {
    var value = instance.getValue();
    if (!value) {
      return null;
    }

    return value.replace(/\s/g, '');
  }

  tokenEditor.on('change', function (instance, changeObj) {

    var value = getTrimmedValue(instance);

    if (!value) { return; }

    var parts = value.split('.');
    if (parts.length !== 3) { return null; }

    var secretElement = document.getElementsByName('secret')[0];
    //var headerElement = getFirstElementByClassName('js-header');
    //var payloadElement = getFirstElementByClassName('js-payload');
    var signatureElement = getFirstElementByClassName('js-signature');

    if (/*!headerElement || !payloadElement || */!signatureElement) {
      return;
    }

    headerEditor.setValue(decode(parts[0]));
    payloadEditor.setValue(decode(parts[1]));
    signatureElement.innerText =   KJUR.jws.JWS.verify(value, secretElement.value);

  });

  tokenEditor.setValue('eyJhbGciOiJIUzI1NiIsICJjdHkiOiJKV1QifQ.eyJhZ2UiOiAyMX0.vcimDRCLttYBHsO7M0S_tCvUIOGz26Ti5nkRuj1QcHc');

  var secretElement = document.getElementsByName('secret')[0];
  secretElement.addEventListener('change', function (event) {
    var signatureElement = getFirstElementByClassName('js-signature');
    if (!signatureElement) {
      return;
    }
    var value = getTrimmedValue(tokenEditor);
    signatureElement.innerText = KJUR.jws.JWS.verify(value, secretElement.value);
  }, false);



}());
