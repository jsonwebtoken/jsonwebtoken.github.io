import { KEYUTIL } from 'jsrsasign';

export function httpGet(url, cache = true) {
  return new Promise((resolve, reject) => {

    const request = new XMLHttpRequest();    
    request.onreadystatechange = () => {
      if (request.readyState === XMLHttpRequest.DONE) {

        if (request.status === 200) {
          resolve(request.responseText);
        } else {
          reject({
            status: request.status,
            response: request.responseText
          });
        }

      }
    };

    request.open('GET', url);
    if (!cache) {
      request.setRequestHeader("Cache-Control", "no-cache");
    }
    request.send();

  });
}

export function isValidBase64String(s, urlOnly) {
  try {
    const validChars = urlOnly ?
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=' :
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_+/=';

    let hasPadding = false;
    for(let i = 0; i < s.length; ++i) {
      hasPadding |= s.charAt(i) === '=';
      if(validChars.indexOf(s.charAt(i)) === -1) {
        return false;
      }
    }

    if(hasPadding) {
      for(let i = s.indexOf('='); i < s.length; ++i) {
        if(s.charAt(i) !== '=') {
          return false;
        }
      }

      return s.length % 4 === 0;
    }

    return true;    
  } catch (e) {
    return false;
  }
};

export function isValidKey(key) {
  // Four tries: no header, header for cert, header for pub key,
  // header for priv key

  const headers = [{
    prologue: '',
    epilogue: ''
  },{
    prologue: '-----BEGIN CERTIFICATE-----\n',
    epilogue: '-----END CERTIFICATE-----\n'
  }, {
    prologue: '-----BEGIN PUBLIC KEY-----\n',
    epilogue: '-----END PUBLIC KEY-----\n'
  }, {
    prologue: '-----BEGIN PRIVATE KEY-----\n',
    epilogue: '-----END PRIVATE KEY-----\n'
  }, {
    prologue: '-----BEGIN RSA PRIVATE KEY-----\n',
    epilogue: '-----END RSA PRIVATE KEY-----\n'
  }];

  for(let i = 0; i < headers.length; ++i) {
    const header = headers[i];
    try {
      let newKey = header.prologue;
      newKey += key + '\n';
      newKey += header.epilogue;

      return {
        valid: !!KEYUTIL.getKey(newKey),
        key: newKey
      };
    } catch(e2) {
      // Ignore
    }
  }

  return {
    valid: false,
    key: key
  };
}

export function deferToNextLoop(func) {
  setTimeout(func, 1);
}

// https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
export function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");

  //
  // *** This styling is an extra step which is likely not required. ***
  //
  // Why is it here? To ensure:
  // 1. the element is able to have focus and selection.
  // 2. if element was to flash render it has minimal visual impact.
  // 3. less flakyness with selection and copying which **might** occur if
  //    the textarea element is not visible.
  //
  // The likelihood is the element won't even render, not even a flash,
  // so some of these are just precautions. However in IE the element
  // is visible whilst the popup box asking the user for permission for
  // the web page to copy to the clipboard.
  //

  // Place in top-left corner of screen regardless of scroll position.
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;

  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = '2em';
  textArea.style.height = '2em';

  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = 0;

  // Clean up any borders.
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';

  // Avoid flash of white box if rendered for any reason.
  textArea.style.background = 'transparent';

  textArea.value = text;

  document.body.appendChild(textArea);

  textArea.select();

  try {
    document.execCommand('copy');
  } catch (err) {
    console.error(err);
  }

  document.body.removeChild(textArea);
}

// https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
export function getParameterByName(name, url) {
  if(!url) {
    url = window.location.href;
  }

  name = name.replace(/[\[\]]/g, "\\$&");
  
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  const results = regex.exec(url);
  if(!results) {
    return null;
  }
  if(!results[2]) {
    return '';
  }

  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export function isWideScreen() {
  return window.matchMedia('(min-width: 768px)').matches;
}

export function safeLocalStorageSetItem(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.log('Cannot save token to Local Storage ' + 
                '(private browsing enabled?), ignoring...', e);
    // Safari when in private browsing doesn't allow it
  }
}
