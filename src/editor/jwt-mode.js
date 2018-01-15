export default function jwtModeFactory() {
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
      return cur(stream, state);
    },
    startState: function () {
      return { cur: jwtHeader };
    }
  };
}
