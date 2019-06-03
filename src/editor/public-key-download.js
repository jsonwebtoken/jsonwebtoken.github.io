import jose from 'node-jose';

import { httpGet } from '../utils.js';

function getKeyFromX5c(x5c) {
  if(!x5c) {
    throw new Error('x5c claim not present?');
  }

  if(!(x5c instanceof Array)) {
    x5c = [ x5c ];
  }

  let certChain = '';
  x5c.forEach(cert => {
    certChain += '-----BEGIN CERTIFICATE-----\n';
    certChain += cert + '\n';
    certChain += '-----END CERTIFICATE-----\n';
  });

  return certChain;
}

function getKeyFromX5Claims(claims) {
  return new Promise((resolve, reject) => {
    if(claims.x5c) {
      resolve(getKeyFromX5c(claims.x5c));
    } else if(claims.x5u) {
      resolve(httpGet(claims.x5u).then(getKeyFromX5c));
    } else {
      reject('x5c or x5u claims not available');
    }
  });
}

function getKeyFromJwkKeySetUrl(kid, url) {
  return httpGet(url).then(data => {
    data = JSON.parse(data);

    if(!data || !data.keys || !(data.keys instanceof Array)) {
      throw new Error(`Could not get JWK key set from URL: ${url}`);
    }

    for(let i = 0; i < data.keys.length; ++i) {
      const jwk = data.keys[i];
      if(jwk.kid === kid) {
        return getKeyFromX5Claims(jwk);
      }
    }

    throw new Error(`Could not find key with kid ${kid} in URL: ${url}`);
  });
}

export function downloadPublicKeyIfPossible(decodedToken) {
  return new Promise((resolve, reject) => {
    const header = decodedToken.header;
    const payload = decodedToken.payload;

    if(!header.alg || header.alg.indexOf('HS') === 0) {
      reject(`Unsupported alg: ${header.alg}`);
      return;
    }

    if(header.x5c || header.x5u) {
      resolve(getKeyFromX5Claims(header));
    } else if(header.jku) {
      resolve(getKeyFromJwkKeySetUrl(header.kid, header.jku));
    } else if(header.jwk) {
      resolve(getKeyFromX5Claims(header.jwk));
    } else if(payload.iss) {
      const url = payload.iss + (payload.iss.substr(-1) === '/' ? '.well-known/openid-configuration' : '/.well-known/openid-configuration')

      httpGet(url).then(data => {
        data = JSON.parse(data);

        if(!data || !data.jwks_uri || typeof data.jwks_uri !== 'string') {
          throw new Error(`Could not get jwks_uri from URL: ${url}`);
        }

        return httpGet(data.jwks_uri)
      }).then(data => {
        data = JSON.parse(data);

        return jose.JWK.asKeyStore(data);
      }).then(jwks => {

        const keys = jwks.all({ alg: header.alg, kid: header.kid, use: 'sig' })

        if (keys.length !== 1) {
          throw new Error('Could not find a single definitive key in jwks_uri');
        }

        resolve(keys[0].toPEM())
      }).catch(reject);
    } else {
      reject('No details about key');
    }
  });
}
