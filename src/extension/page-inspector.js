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

export function setupTokenPageInspector() {

}
