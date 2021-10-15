import * as jose from 'jose'

import { httpGet } from '../utils.js';

function getKeyFromX5c(x5c) {
  if(!Array.isArray(x5c) || typeof x5c[0] !== 'string') {
    throw new Error('x5c claim not present or invalid');
  }

  const newlined = (x5c[0].match(/.{1,64}/g) || []).join('\n')
  return `-----BEGIN CERTIFICATE-----\n${newlined}\n-----END CERTIFICATE-----`
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

function getKeyFromJwkKeySetUrl(header, url) {
  return jose.createRemoteJWKSet(new URL(url))(header, {}).then(jose.exportJWK).then((jwk) => JSON.stringify(jwk, null, 2))
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
      getKeyFromX5Claims(header).then(resolve, reject);
    } else if(header.jku) {
      getKeyFromJwkKeySetUrl(header, header.jku).then(resolve, reject);
    } else if(header.jwk) {
      resolve(JSON.stringify(header.jwk, null, 2))
    } else if(payload.iss) {
      const url = payload.iss + (payload.iss.substr(-1) === '/' ? '.well-known/openid-configuration' : '/.well-known/openid-configuration')

      httpGet(url).then(data => {
        data = JSON.parse(data);

        if(!data || !data.jwks_uri || typeof data.jwks_uri !== 'string') {
          throw new Error(`Could not get jwks_uri from URL: ${url}`);
        }

        return getKeyFromJwkKeySetUrl(header, data.jwks_uri).then(resolve);
      }).catch(reject);
    } else {
      reject('No details about key');
    }
  });
}
