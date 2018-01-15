const rsaPrivateKey = 
  '-----BEGIN RSA PRIVATE KEY-----\n' + 
  'MIICWwIBAAKBgQDdlatRjRjogo3WojgGHFHYLugdUWAY9iR3fy4arWNA1KoS8kVw\n' +
  '33cJibXr8bvwUAUparCwlvdbH6dvEOfou0/gCFQsHUfQrSDv+MuSUMAe8jzKE4qW\n' +
  '+jK+xQU9a03GUnKHkkle+Q0pX/g6jXZ7r1/xAK5Do2kQ+X5xK9cipRgEKwIDAQAB\n' +
  'AoGAD+onAtVye4ic7VR7V50DF9bOnwRwNXrARcDhq9LWNRrRGElESYYTQ6EbatXS\n' +
  '3MCyjjX2eMhu/aF5YhXBwkppwxg+EOmXeh+MzL7Zh284OuPbkglAaGhV9bb6/5Cp\n' +
  'uGb1esyPbYW+Ty2PC0GSZfIXkXs76jXAu9TOBvD0ybc2YlkCQQDywg2R/7t3Q2OE\n' +
  '2+yo382CLJdrlSLVROWKwb4tb2PjhY4XAwV8d1vy0RenxTB+K5Mu57uVSTHtrMK0\n' +
  'GAtFr833AkEA6avx20OHo61Yela/4k5kQDtjEf1N0LfI+BcWZtxsS3jDM3i1Hp0K\n' +
  'Su5rsCPb8acJo5RO26gGVrfAsDcIXKC+bQJAZZ2XIpsitLyPpuiMOvBbzPavd4gY\n' +
  '6Z8KWrfYzJoI/Q9FuBo6rKwl4BFoToD7WIUS+hpkagwWiz+6zLoX1dbOZwJACmH5\n' +
  'fSSjAkLRi54PKJ8TFUeOP15h9sQzydI8zJU+upvDEKZsZc/UhT/SySDOxQ4G/523\n' +
  'Y0sz/OZtSWcol/UMgQJALesy++GdvoIDLfJX5GBQpuFgFenRiRDabxrE9MNUZ2aP\n' +
  'FaFp+DyAe+b4nDwuJaW2LURbr8AEZga7oQj0uYxcYw==\n' +
  '-----END RSA PRIVATE KEY-----';

const rsaPublicKey = 
  '-----BEGIN PUBLIC KEY-----\n' +
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDdlatRjRjogo3WojgGHFHYLugd\n' + 
  'UWAY9iR3fy4arWNA1KoS8kVw33cJibXr8bvwUAUparCwlvdbH6dvEOfou0/gCFQs\n' +
  'HUfQrSDv+MuSUMAe8jzKE4qW+jK+xQU9a03GUnKHkkle+Q0pX/g6jXZ7r1/xAK5D\n' +
  'o2kQ+X5xK9cipRgEKwIDAQAB\n' +
  '-----END PUBLIC KEY-----';

const ecPrivateKey = 
  '-----BEGIN PRIVATE KEY-----' +
  'MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgevZzL1gdAFr88hb2' +
  'OF/2NxApJCzGCEDdfSp6VQO30hyhRANCAAQRWz+jn65BtOMvdyHKcvjBeBSDZH2r' +
  '1RTwjmYSi9R/zpBnuQ4EiMnCqfMPWiZqB4QdbAd0E7oH50VpuZ1P087G' +
  '-----END PRIVATE KEY-----';

const ecPublicKey = 
  '-----BEGIN PUBLIC KEY-----' +
  'MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEEVs/o5+uQbTjL3chynL4wXgUg2R9' +
  'q9UU8I5mEovUf86QZ7kOBIjJwqnzD1omageEHWwHdBO6B+dFabmdT9POxg==' +
  '-----END PUBLIC KEY-----';

export default {
  hs256: {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +   
           'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOn' + 
           'RydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ',
    secret: 'secret'
  }, 
  hs384: {
    token: '',
    secret: 'secret'
  },
  hs512: {
    token: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3' +
           'ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.' + 
           'YI0rUGDq5XdRw8vW2sDLRNFMN8Waol03iSFH8I4iLzuYK7FKHaQYWzPt0BJFG' +
           'rAmKJ6SjY0mJIMZqNQJFVpkuw',
    secret: 'secret'
  },
  rs256: {
    token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.' + 
           'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRy' + 
           'dWV9.EkN-DOsnsuRjRO6BxXemmJDm3HbxrbRzXglbN2S4sOkopdU4IsDxTI8jO1' + 
           '9W_A4K8ZPJijNLis4EZsHeY559a4DFOd50_OqgHGuERTqYZyuhtF39yxJPAjU' + 
           'ESwxk2J5k_4zM3O-vtd1Ghyo4IbqKKSy6J9mTniYJPenn5-HIirE',
    privateKey: rsaPrivateKey,
    publicKey: rsaPublicKey
  },
  rs384: {
    token: 'eyJhbGciOiJSUzM4NCIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxM' +
           'jM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.' +
           'Ffs4IGK8GkxrSxp7I8IcuHy_uUSskg2zBwScCGhg6T1o4hkdZ5ytJNRj04kD8' +
           'FEnUrnnUiGKgHL0MWrwmgz6Kmi6fxDSKKbiVlESPkUrgBTMaIlOheDbemy19' +
           'lxUJYqd7A2exNXtCW_UoSs8f3ZdYujNrbZWW8kWgLQuk4oa-0I',
    privateKey: rsaPrivateKey,
    publicKey: rsaPublicKey
  },
  rs512: {
    token: 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NT' +
           'Y3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.' +
           'yN0Dw5rVJ75rdJXKpflhwASRr4DHwlgmRY4HVMdotCdyg8fOB2sLRehLY9' +
           'g9isBnIuOA0aK7qWpj9cc7G8eYmaFdm95_moOJKxCgH0Rn2d2-wygdjBvMrSp' +
           'kxsKMdbc2tKP0rI3ZYalQ7Q86RagZNZ_JpA2V3j3JPKTQwKFGSTw',
    privateKey: rsaPrivateKey,
    publicKey: rsaPublicKey
  },
  es256: {
    token: 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODk' +
           'wIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.AZR4yap9' +
           'UoqRlEGkeAHjnr9vvLYAljWg8_ZtKDiaaEuN_oi55XjUNfFHfOniACB' +
           '46oYm1D4eVyVb8yGavbq9xQ',
    privateKey: ecPrivateKey,
    publicKey: ecPublicKey
  },
  es384: {
    token: 'eyJhbGciOiJFUzM4NCIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM' +
           '0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.' +
           '6zBBNCgcY_5yVr5mjhOG7-9vUUuxE7i85FtYihacGWwdQgBwQiPr8Nt' +
           'qG5eE2StJ7S3xBr-qyPY7fbwdJRG5fA',
    privateKey: ecPrivateKey,
    publicKey: ecPublicKey
  },
  es512: {
    token: '',
    privateKey: ecPrivateKey,
    publicKey: ecPublicKey
  },
  ps256: {
    token: '',
    privateKey: rsaPrivateKey,
    publicKey: rsaPublicKey
  },
  ps384: {
    token: '',
    privateKey: rsaPrivateKey,
    publicKey: rsaPublicKey
  },
  ps512: {
    token: '',
    privateKey: rsaPrivateKey,
    publicKey: rsaPublicKey
  }
};

