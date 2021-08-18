module.exports = {
  type: 'object',
  required: ['name', 'uniqueClass', 'image', 'bgColor', 'libs'],
  properties: {
    name: {
      type: 'string',
      minLength: 1,
    },
    uniqueClass: {
      type: 'string',
      minLength: 1,
      // Not entirely correct, but good enough
      pattern: /[a-zA-Z_][\w\-]*/
    },
    image: {
      type: 'string',
      minLength: 1,
      pattern: /\/img\/.*/
    },
    bgColor: {
      type: 'string',
      minLength: 1
    },
    libs: {
      type: 'array',
      uniqueItems: true,
      items: {
        type: 'object',
        required: ['minimumVersion', 'support', 'authorUrl', 'authorName',
                  'gitHubRepoPath', 'repoUrl', 'installCommandHtml'],
        properties: {
          minimumVersion: {
            type: ['null', 'string'],
            minLength: 1
          },
          authorUrl: {
            type: ['null', 'string'],
            minLength: 1,
            // Format validator fails on null values, sigh.
            //format: 'url'
          },
          authorName: {
            type: 'string',
            minLength: 1
          },
          gitHubRepoPath: {
            type: ['null', 'string'],
            minLength: 1,
            // Not entirely correct, but good enough
            pattern: /.*\/.*/
          },
          repoUrl: {
            type: 'string',
            minLength: 1,
            format: 'url'
          },
          installCommandHtml: {
            type: 'string',
            minLength: 1
          },
          support: {
            type: 'object',
            required: ['sign', 'verify', 'iss', 'sub', 'aud', 'exp', 'nbf',
                      'iat', 'jti', 'hs256', 'hs384', 'hs512', 'rs256',
                      'rs384', 'rs512', 'es256', 'es384', 'es512'],
            properties: {
              sign: { type: 'boolean' },
              verify: { type: 'boolean' },
              iss: { type: 'boolean' },
              sub: { type: 'boolean' },
              aud: { type: 'boolean' },
              exp: { type: 'boolean' },
              nbf: { type: 'boolean' },
              iat: { type: 'boolean' },
              jti: { type: 'boolean' },
              typ: { type: 'boolean' },
              hs256: { type: 'boolean' },
              hs384: { type: 'boolean' },
              hs512: { type: 'boolean' },
              rs256: { type: 'boolean' },
              rs384: { type: 'boolean' },
              rs512: { type: 'boolean' },
              es256: { type: 'boolean' },
              es384: { type: 'boolean' },
              es512: { type: 'boolean' },
              ps256: { type: 'boolean' },
              ps384: { type: 'boolean' },
              ps512: { type: 'boolean' },
              eddsa: { type: 'boolean' },
              es256k: { type: 'boolean' },
            }
          }
        }
      }
    }
  }
};
