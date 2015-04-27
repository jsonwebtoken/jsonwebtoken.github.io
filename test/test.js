describe('jwt library wrapper (jwt.js)', function () {
  // TODO Add RS256 tests
  it('should fail on invalid data', function () {
    var result = window.verify('hello', 'bye', false);
    expect(result.error).not.to.be(null);
    expect(result.result).to.be('');
  });
  it('should verify using ascii secret', function () {
    var result = window.verify('HS256', 'eyJhbGciOiJIUzI1NiIsImN0eSI6IkpXVCJ9.eyJhZ2UiOjIxfQ.8nqb61Mdqdama9pZQz07HiIySY6FZC9UjHMKHg6zhjw', 'secret', false);
    expect(result.error).to.be.equal(null);
    expect(result.result).to.be(true);
  });
  it('should verify using bas64 encoded secret', function () {
    var jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2F1dGgwLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1MjdhYzIxOWQ1ZWFjYzE4ZDQwMDAwMDUiLCJhdWQiOiJhRkd2RFRvNTVHT3RkRVlyb1Fsa3RBMkFHNU1rVDY2SCIsImV4cCI6MTM5NDY5OTg5MiwiaWF0IjoxMzk0NjYzODkyfQ.kEdt5CChBWdPytkGv10mb3tqe6CEcpCQ_DLnEgq69p8';
    var secret = '3GdpH_8Ty1Sx_laCRwyUaSl7ddb6xfpR-352SZPFdPKdZ1S8KGtDYbiNMG3Wt61X';
    var result = window.verify('HS256', jwt, secret, true);
    expect(result.error).to.be.equal(null);
    expect(result.result).to.be(true);
  });
  it('should decode with two underscores', function () {
    var result = window.decode('eyI_IjoiYWE_In0');
    expect(result.error).to.be.equal(null);
    expect(result.result).to.be('{\n  "?": "aa?"\n}');
  });
});
