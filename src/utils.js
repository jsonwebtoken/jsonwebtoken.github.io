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
