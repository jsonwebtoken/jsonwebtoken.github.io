(function () {

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

  var editor = CodeMirror(document.getElementsByClassName('input')[0], {
    mode:           'jwt',
    theme:          'night',
    lineWrapping:   true,
    autofocus:      true
  });

  editor.on('change', function (instance, changeObj) {
    var value = instance.getValue();
    //var result = KJUR.jws.JWS.verify(sJWSHS256, value);
  });


}());
