(function () {
  var editor = CodeMirror.fromTextArea(document.getElementsByClassName('input')[0], {
    mode: 'javascript', theme: 'night', lineWrapping: true
  });
}());
