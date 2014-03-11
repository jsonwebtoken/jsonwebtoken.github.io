(function () {

  var $ = window.$;

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
    extraKeys: { 'Tab':  tabHack},
    lint: true
  });

  var payloadEditor = codeMirror(document.getElementsByClassName('js-payload')[0], {
    mode:           'application/json',
    lineWrapping:   true,
    extraKeys: { 'Tab':  tabHack},
    lint: true
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
    var decodedHeader = window.decode(parts[0]);
    if (decodedHeader.error) {
      headerEditor.setValue(decodedHeader.result);
      $('.jwt-header').addClass('error');
    } else {
      headerEditor.setValue(decodedHeader.result);
      $('.jwt-header').removeClass('error');
    }
    headerEditor.on('change', refreshTokenEditor);
    payloadEditor.off('change', refreshTokenEditor);
    var decodedPayload = window.decode(parts[1]);
    if (decodedPayload.error) {
      payloadEditor.setValue(decodedHeader.result);
      $('.jwt-payload').addClass('error');
    } else {
      payloadEditor.setValue(decodedPayload.result);
      $('.jwt-payload').removeClass('error');
    }
    payloadEditor.on('change', refreshTokenEditor);
    fireEvent(secretElement);
  }

  function refreshTokenEditor(instance) {
    tokenEditor.off('change', tokenEditorOnChangeListener);
    var secretElement = document.getElementsByName('secret')[0];
    var signResult = window.sign(headerEditor.getValue(), payloadEditor.getValue(), secretElement.value);

    if (signResult.error) {
      tokenEditor.setValue('');
      var elements = {'payload': '.jwt-payload', 'header': '.jwt-header'};
      $('.jwt-payload').removeClass('error');
      $('.jwt-header').removeClass('error');
      if (signResult.error.who) {
        signResult.error.who
          .map(function (e) { return elements[e]; })
          .forEach(function (e) {
            $(e).addClass('error');
          });
      }
      $('.input').addClass('error');
      tokenEditor.setValue(signResult.result);
    } else {
      tokenEditor.setValue(signResult.result);
      $('.input').removeClass('error');
      $('.jwt-payload').removeClass('error');
      $('.jwt-header').removeClass('error');
    }
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
  function updateSignature () {
    var signatureElement = getFirstElementByClassName('js-signature');
    if (!signatureElement) {
      return;
    }
    var value = getTrimmedValue(tokenEditor);
    var result = window.verify(value, secretElement.value).result;
    signatureElement.innerText = result;
  }
  secretElement.addEventListener('change', updateSignature, false);
  secretElement.addEventListener('keyup', updateSignature, false);

  tokenEditor.setValue('eyJhbGciOiJIUzI1NiIsImN0eSI6IkpXVCJ9.eyJhZ2UiOjIxfQ.pLem30ReEpeXgMt6e3gjZ6QYSpLBbhd_NB-Afud1m4A');

}());
