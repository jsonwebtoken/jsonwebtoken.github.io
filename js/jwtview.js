//jQuery forcefully included with Webpack
//import { jQuery, $ } from 'jquery';
import 'jsrsasign';
import * as CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/lint/javascript-lint';
import 'codemirror/addon/lint/json-lint';

import './jwt';

var DEFAULT_HS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';

var DEFAULT_RS_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.EkN-DOsnsuRjRO6BxXemmJDm3HbxrbRzXglbN2S4sOkopdU4IsDxTI8jO19W_A4K8ZPJijNLis4EZsHeY559a4DFOd50_OqgHGuERTqYZyuhtF39yxJPAjUESwxk2J5k_4zM3O-vtd1Ghyo4IbqKKSy6J9mTniYJPenn5-HIirE';

var DEFAULT_PUBLIC_RSA = "\
-----BEGIN PUBLIC KEY-----\n\
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDdlatRjRjogo3WojgGHFHYLugd\
UWAY9iR3fy4arWNA1KoS8kVw33cJibXr8bvwUAUparCwlvdbH6dvEOfou0/gCFQs\
HUfQrSDv+MuSUMAe8jzKE4qW+jK+xQU9a03GUnKHkkle+Q0pX/g6jXZ7r1/xAK5D\
o2kQ+X5xK9cipRgEKwIDAQAB\n\
-----END PUBLIC KEY-----\
";

var DEFAULT_PRIVATE_RSA = "\
-----BEGIN RSA PRIVATE KEY-----\n\
MIICWwIBAAKBgQDdlatRjRjogo3WojgGHFHYLugdUWAY9iR3fy4arWNA1KoS8kVw\
33cJibXr8bvwUAUparCwlvdbH6dvEOfou0/gCFQsHUfQrSDv+MuSUMAe8jzKE4qW\
+jK+xQU9a03GUnKHkkle+Q0pX/g6jXZ7r1/xAK5Do2kQ+X5xK9cipRgEKwIDAQAB\
AoGAD+onAtVye4ic7VR7V50DF9bOnwRwNXrARcDhq9LWNRrRGElESYYTQ6EbatXS\
3MCyjjX2eMhu/aF5YhXBwkppwxg+EOmXeh+MzL7Zh284OuPbkglAaGhV9bb6/5Cp\
uGb1esyPbYW+Ty2PC0GSZfIXkXs76jXAu9TOBvD0ybc2YlkCQQDywg2R/7t3Q2OE\
2+yo382CLJdrlSLVROWKwb4tb2PjhY4XAwV8d1vy0RenxTB+K5Mu57uVSTHtrMK0\
GAtFr833AkEA6avx20OHo61Yela/4k5kQDtjEf1N0LfI+BcWZtxsS3jDM3i1Hp0K\
Su5rsCPb8acJo5RO26gGVrfAsDcIXKC+bQJAZZ2XIpsitLyPpuiMOvBbzPavd4gY\
6Z8KWrfYzJoI/Q9FuBo6rKwl4BFoToD7WIUS+hpkagwWiz+6zLoX1dbOZwJACmH5\
fSSjAkLRi54PKJ8TFUeOP15h9sQzydI8zJU+upvDEKZsZc/UhT/SySDOxQ4G/523\
Y0sz/OZtSWcol/UMgQJALesy++GdvoIDLfJX5GBQpuFgFenRiRDabxrE9MNUZ2aP\
FaFp+DyAe+b4nDwuJaW2LURbr8AEZga7oQj0uYxcYw==\n\
-----END RSA PRIVATE KEY-----\
";

function safeLocalStorageSetItem(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    // Safari when in private browsing doesn't allow it
  }
}

function saveToStorage(jwt) {
  // Save last valid jwt value for refresh
  safeLocalStorageSetItem("jwt-debugger-editor-content", jwt);
}

function loadFromStorage(cb) {
  cb(localStorage.getItem("jwt-debugger-editor-content"));
}

function isToken(token) {
  try {
      if(token && token.length > 0) {
          var header = window.decode(token.split('.')[0]);
          if(header.error) {
              return false;
          }
          return JSON.parse(header.result).typ === 'JWT';
      }
  } catch (e) {
  }
  return false;
}

function loadLastOrClipboardOrDefault(tokenEditor) {
    function tryLoadFromClipboard(defaultVal) {
        var input = document.createElement('textarea');
        document.body.appendChild(input);
        input.focus();
        input.select();
        document.execCommand('Paste');
        var token = input.value;
        input.remove();

        return isToken(token) ? token : defaultVal;
    }

    loadFromStorage(function (jwt) {
        var token;

        if(jwt) {
            token = jwt;
        } else {
            try {
                token = tryLoadFromClipboard(token);
            } catch(e) {
                console.log(e);
            }
        }

        if(!token) {
            token = DEFAULT_HS_TOKEN;
        }

        tokenEditor.setValue(token);
    });
}

function loadFromStorageAndCookies() {
    // Populate cookies/LocalStorage combobox
    function checkLoadJwtFromLength() {
        var optGroups = [
            $('optgroup[label="Cookies"]'),
            $('optgroup[label="Web Storage"]')
        ];

        optGroups.forEach(function(optGroup) {
            var hasJWTs =
              optGroup.children(':not(.load-from-no-jwts)').length > 0;
            if(hasJWTs) {
                optGroup.children('.load-from-no-jwts').remove();
            } else {
                optGroup.empty();
                optGroup.append($('<option/>', {
                    'class': 'load-from-no-jwts',
                    'text': 'No JWTs found',
                    'disabled': true
                }));
            }
        });
    }

    function jwtMessage(message) {
        if(message.type !== 'cookies' && message.type !== 'storage') {
            return;
        }

        var elements = [];

        message.tokens.forEach(function(token) {
            if(!isToken(token.value)) {
                if(message.type === 'storage') {
                    try {
                        // Try again after parsing it first, some people do
                        //localStorage.setItem('jwt', JSON.stringify(token))
                        token.value = JSON.parse(token.value);
                        if(!isToken(token.value)) {
                            return;
                        }
                    } catch(e) {
                        return;
                    }
                } else {
                    return;
                }
            }

            var e = $('<option/>').text(token.name)
                                  .val(token.value)
                                  .data('type', token.type)
            if(token.cookie) {
                e.data('cookie', token.cookie);
            }
            elements.push(e);
        });

        if(message.type === 'cookies') {
            $('optgroup[label="Cookies"]').append(elements);
        } else {
            $('optgroup[label="Web Storage"]').append(elements);
        }

        checkLoadJwtFromLength();
    }

    chrome.runtime.onMessage.addListener(jwtMessage);

    chrome.tabs.executeScript({
        file: 'js/webstorage.js',
        runAt: "document_idle"
    });

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.cookies.getAll({
            url: tabs[0].url,
        }, function(cookies) {
            var result = cookies.map(function(cookie) {
                return {
                    name: cookie.name,
                    value: cookie.value,
                    type: 'cookie',
                    cookie: cookie
                }
            });

            jwtMessage({
                type: 'cookies',
                tokens: result
            });
        });
    });

    checkLoadJwtFromLength();
}

export function initJwtView() {
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
        return cur(stream, state);
      },
      startState: function () {
        return {cur: jwtHeader};
      }
    };
  });

  var codeMirror = CodeMirror.default;

  function tabHack(instance) {
    instance.replaceSelection('   ' , 'end');
  }

  var tokenEditor = codeMirror(document.getElementsByClassName('js-input')[0], {
    mode:           'jwt',
    theme:          'night',
    lineWrapping:   true,
    // autofocus:      true,
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

  var algorithmRadios = $('input[name="algorithm"]'),
      lastRestoredToken;

  function setJSONEditorContent(jsonEditor, decodedJSON, selector) {
    jsonEditor.off('change', refreshTokenEditor);

    if (decodedJSON.result !== null && decodedJSON.result !== undefined) {
      jsonEditor.setValue(decodedJSON.result);
    } else {
      jsonEditor.setValue('');
    }
    if (decodedJSON.error) {
      selector.addClass('error');
    } else {
      selector.removeClass('error');
    }

    jsonEditor.on('change', refreshTokenEditor);

  }

  function tokenEditorOnChangeListener(instance) {
    var value = getTrimmedValue(instance);

    if (!value) { return; }

    var parts = value.split('.');

    var secretElement = document.getElementsByName('secret')[0];
    var signatureElement = getFirstElementByClassName('js-signature');

    if (!signatureElement) {
      return;
    }

    var decodedHeader = window.decode(parts[0]);

    try {
      selectDetectedAlgorithm(JSON.parse(decodedHeader.result).alg);
    }catch (e){
      console.error('Invalid header decoded');
    }

    var selector = $('.jwt-header');
    setJSONEditorContent(headerEditor, decodedHeader, selector);
    var decodedPayload = window.decode(parts[1]);
    selector = $('.jwt-payload');
    setJSONEditorContent(payloadEditor, decodedPayload, selector);

    fireEvent(secretElement);

    if (window.matchMedia('(min-width: 768px)').matches) {
        var outputHeight = $('#decoded-jwt .output').outerHeight(),
            inputHeight = $('#encoded-jwt .input');

        inputHeight.css('height', outputHeight + 'px');
    }

    saveToStorage(tokenEditor.getValue());
  }

  function selectDetectedAlgorithm(alg){
    var $algRadio = $('.algorithm input[value="'+alg+'"]');
    $algRadio.prop('checked', true);

    fireEvent($algRadio.get(0));
  }

  function refreshTokenEditor(instance) {
    tokenEditor.off('change', tokenEditorOnChangeListener);

    var algorithm = getAlgorithm();
    var secretElement = document.getElementsByName('secret')[0];
    var isBase64EncodedElement = document.getElementsByName('is-base64-encoded')[0];

    var signResult = window.sign(
      algorithm,
      headerEditor.getValue(),
      payloadEditor.getValue(),
      getKey(algorithm, 'sign'),
      isBase64EncodedElement.checked
    );

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
      if (signResult.result) {
        tokenEditor.setValue(signResult.result);
      } else {
        tokenEditor.setValue('');
      }
    } else {
      tokenEditor.setValue(signResult.result);
      $('.input').removeClass('error');
      $('.jwt-payload').removeClass('error');
      $('.jwt-header').removeClass('error');
    }

    saveToStorage(tokenEditor.getValue());

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
  var isBase64EncodedElement = document.getElementsByName('is-base64-encoded')[0];

  function updateSignature () {
    var algorithm = getAlgorithm();
    var signatureElement = getFirstElementByClassName('js-signature');
    var signatureContainerElement = getFirstElementByClassName('jwt-signature');

    if (!signatureElement) {
      return;
    }
    var value = getTrimmedValue(tokenEditor);
    var isBase64 = isBase64EncodedElement.checked;
    if (isBase64 && !window.isValidBase64String(secretElement.value)) {
      $(signatureContainerElement).addClass('error');
      return;
    } else {
      $(signatureContainerElement).removeClass('error');
    }

    var result = window.verify(
      algorithm,
      value,
      getKey(algorithm, 'verify'),
      isBase64
    );

    var error = result.error;
    result = result.result;
    if (!error && result) {
      $(signatureElement).removeClass('invalid-token');
      $(signatureElement).addClass('valid-token');
      signatureElement.innerHTML = '<i class="icon-budicon-499"></i> signature verified';
    } else {
      $(signatureElement).removeClass('valid-token');
      $(signatureElement).addClass('invalid-token');
      signatureElement.innerHTML = '<i class="icon-budicon-501"></i> invalid signature';
    }
  }

  function getKey(algorithm, action) {
    var secretElement = $('input[name="secret"]');
    var privateKeyElement = $('textarea[name="private-key"]');
    var publicKeyElement = $('textarea[name="public-key"]');

    if(algorithm === 'HS256') {
        return secretElement.val();
    } else {
        return action === 'sign' ? privateKeyElement.val() : publicKeyElement.val();
    }
  }

  function getAlgorithm() {
    return algorithmRadios.filter(':checked').val();
  }

  function updateAlgorithm () {
    var algorithm = algorithmRadios.filter(':checked').val();

    $('.js-input').attr('data-alg', algorithm);

    $('.jwt-signature pre')
        .hide()
        .filter('.' + algorithm)
        .show();

    if(getTrimmedValue(tokenEditor) === DEFAULT_HS_TOKEN &&
      algorithm === 'RS256'){
        setDefaultsForRSA();
    }else if(getTrimmedValue(tokenEditor) === DEFAULT_RS_TOKEN &&
      algorithm === 'HS256'){
        setDefaultsForHMAC();
    }
  }

  function setDefaultsForRSA() {
    tokenEditor.setValue(DEFAULT_RS_TOKEN);

    $('.jwt-signature textarea[name=public-key]').val(DEFAULT_PUBLIC_RSA);
    $('.jwt-signature textarea[name=private-key]').val(DEFAULT_PRIVATE_RSA);
  }

  function setDefaultsForHMAC(){
    tokenEditor.setValue(DEFAULT_HS_TOKEN);
  }

  function validateKey() {
    var $textarea = $(this);
    var valid;

    if($textarea.prop('name') === 'public-key') {
      valid = /-----BEGIN (PUBLIC KEY|CERTIFICATE)-----(.|\n)*-----END (PUBLIC KEY|CERTIFICATE)-----/.test($textarea.val());
    } else {
      valid = /-----BEGIN RSA PRIVATE KEY-----(.|\n)*-----END RSA PRIVATE KEY-----/.test($textarea.val());
    }

    if (valid) {
      $textarea.removeClass('error');
    } else {
      $textarea.addClass('error');
    }
  }

  algorithmRadios.on('change', function(){
    updateAlgorithm();
    updateSignature();
  });

  $('.jwt-signature textarea[name="public-key"]').on('input', updateSignature);
  $('.jwt-signature textarea[name="private-key"]').on('input', function () {
    validateKey.apply(this);
    refreshTokenEditor();
  });

  secretElement.addEventListener('change', updateSignature, false);
  secretElement.addEventListener('keyup', updateSignature, false);

  isBase64EncodedElement.addEventListener('change', updateSignature, false);

  function writeToClipboard(value) {
      var input = document.createElement('textarea');
      document.body.appendChild(input);
      input.value = value;
      input.focus();
      input.select();
      document.execCommand('Copy');
      input.remove();
  }

  // Share JWT button
  function shareJWT() {
      var jwt = tokenEditor.getValue();
      writeToClipboard('https://jwt.io/#debugger?&id_token=' + jwt);
  }

  $('.share-this-jwt').on('click', function() {
      shareJWT();
      var prevText = $('#share-this-jwt-text').text();
      $('#share-this-jwt-text').text('JWT.io URL copied');
      setTimeout(function() {
          $('#share-this-jwt-text').text(prevText);
      }, 2000);
  });

  //Actions for storage combobox
  $('.custom-select select').on('change', function() {
      var selected = $('.custom-select select option:selected').eq(0);
      var saveButton = $('.save-back').eq(0);

      if(selected.attr('name') === '0') { // "None" selected
          saveButton.addClass('hide');
          return;
      }
      saveButton.removeClass('hide');

      var type = selected.parent().attr('label').toLowerCase();

      var name = selected.text();
      var value = selected.val();

      tokenEditor.setValue(value);

      var label = saveButton.children('a');
      label.text('Save back to ' + type);
  });

  // Save back button action
  function saveCookie(url, cookie, oldCookie) {
      // Some cookies get duplicated otherwise (chrome.cookies.set bug?)
      chrome.cookies.remove({
          url: url,
          name: oldCookie.name,
          storeId: oldCookie.storeId
      });
      chrome.cookies.set({
          url: url,
          name: oldCookie.name,
          value: cookie.value,
          domain: oldCookie.domain,
          path: oldCookie.path,
          secure: oldCookie.secure,
          httpOnly: oldCookie.httpOnly,
          expirationDate: oldCookie.expirationDate,
          storeId: oldCookie.storeId
      });
  }

  $('.save-back').eq(0).on('click', function() {
      var selected = $('.custom-select select option:selected').eq(0);
      var type = selected.data('type');
      var name = selected.text();
      var value = tokenEditor.getValue();

      selected.attr('value', value);

      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          var data = {
              type: type + 'Save',
              name: name,
              value: value
          };
          if(type === 'cookie') {
              saveCookie(tabs[0].url, data, selected.data('cookie'));
          } else {
              chrome.tabs.sendMessage(tabs[0].id, data);
          }
      });
  });

  setTimeout(updateAlgorithm, 0);
  setTimeout(loadLastOrClipboardOrDefault.bind(null, tokenEditor), 0);
  setTimeout(loadFromStorageAndCookies, 300);
}
