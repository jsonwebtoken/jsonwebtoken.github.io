window.jsonParse = JSON.parse;

(function () {

  // Taken from http://stackoverflow.com/questions/2490825/how-to-trigger-event-in-javascript
  function fireEvent(element) {
    var event; // The custom event that will be created

    if (document.createEvent) {
      event = document.createEvent('HTMLEvents');
      event.initEvent('change', true, true);
    } else {
      event = document.createEventObject();
      event.eventType = 'change';
    }

    event.eventName = 'change';

    if (document.createEvent) {
      element.dispatchEvent(event);
    } else {
      element.fireEvent('on' + event.eventType, event);
    }
  }

  var codeMirror = CodeMirror;

  function tabHack(instance) {
    instance.replaceSelection('   ' , 'end');
  }

  var tokenEditor = codeMirror(document.getElementsByClassName('js-input')[0], {
    mode:           'jwt',
    theme:          'night',
    lineWrapping:   true,
    autofocus:      true,
    extraKeys: { 'Tab':  tabHack}
  });

  var headerEditor = codeMirror(document.getElementsByClassName('js-header')[0], {
    mode:           'application/json',
    lineWrapping:   true,
    extraKeys: { 'Tab':  tabHack}
  });

  var payloadEditor = codeMirror(document.getElementsByClassName('js-payload')[0], {
    mode:           'application/json',
    lineWrapping:   true,
    extraKeys: { 'Tab':  tabHack}
  });


  function tokenEditorOnChangeListener(instance) {
    var value = getTrimmedValue(instance);

    if (!value) { return; }

    var parts = value.split('.');
    if (parts.length !== 3) { return null; }

    var secretElement = document.getElementsByName('secret')[0];
    var signatureElement = getFirstElementByClassName('js-signature');

    if (!signatureElement) {
      return;
    }
    
    headerEditor.off('change', refreshTokenEditor);
    headerEditor.setValue(window.decode(parts[0]));
    headerEditor.on('change', refreshTokenEditor);
    payloadEditor.off('change', refreshTokenEditor);
    payloadEditor.setValue(window.decode(parts[1]));
    payloadEditor.on('change', refreshTokenEditor);
    fireEvent(secretElement);
  }

  function refreshTokenEditor(instance) {
    tokenEditor.off('change', tokenEditorOnChangeListener);
    var secretElement = document.getElementsByName('secret')[0];
    var jwt = window.sign(headerEditor.getValue(), payloadEditor.getValue(), secretElement.value);
    tokenEditor.setValue(jwt);
    tokenEditor.on('change', tokenEditorOnChangeListener);
    fireEvent(secretElement);
  }

  function getFirstElementByClassName(selector) {
    var headerElement = document.getElementsByClassName(selector);
    return headerElement.length ? headerElement[0] : null;
  }

  function getTrimmedValue(instance) {
    var value = instance.getValue();
    if (!value) {
      return null;
    }

    return value.replace(/\s/g, '');
  }

  tokenEditor.on('change', tokenEditorOnChangeListener);

  payloadEditor.on('change',  refreshTokenEditor);
  headerEditor.on('change',   refreshTokenEditor);

  var secretElement = document.getElementsByName('secret')[0];
  secretElement.addEventListener('change', function () {
    var signatureElement = getFirstElementByClassName('js-signature');
    if (!signatureElement) {
      return;
    }
    var value = getTrimmedValue(tokenEditor);
    signatureElement.innerText = window.verify(value, secretElement.value);
  }, false);

  tokenEditor.setValue('eyJhbGciOiJIUzI1NiIsICJjdHkiOiJKV1QifQ.eyJhZ2UiOiAyMX0.vcimDRCLttYBHsO7M0S_tCvUIOGz26Ti5nkRuj1QcHc');

}());
