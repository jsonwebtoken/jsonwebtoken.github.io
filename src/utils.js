//import { KEYUTIL } from 'jsrsasign';
import log from 'loglevel';
import clipboard from 'clipboard-polyfill';

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

/*export function isValidKey(key) {
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
}*/

export function deferToNextLoop(func) {
  setTimeout(func, 1);
}

export function copyTokenLink(token, publicKeyOptional) {
  let url = `https://jwt.io/#debugger-io?token=${encodeURIComponent(token)}`;
  if(publicKeyOptional) {
    url += `&publicKey=${encodeURIComponent(publicKeyOptional)}`;
  }

  clipboard.writeText(url);
  return url;
}

export function isWideScreen() {
  return window.matchMedia('(min-width: 768px)').matches;
}

export function safeLocalStorageSetItem(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    log.info('Cannot save token to Local Storage ' +
                '(private browsing enabled?), ignoring...', e);
    // Safari when in private browsing doesn't allow it
  }
}
