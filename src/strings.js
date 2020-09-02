export default {
    common: {
        shareThisJwt: 'Share JWT',
        jwtIoUrlCopied: 'Copied',
        claims: {
            exp: 'Expiration time (seconds since Unix epoch)',
            nbf: 'Not valid before (seconds since Unix epoch)',
            iat: 'Issued at (seconds since Unix epoch)',
            iss: 'Issuer (who created and signed this token)',
            sub: 'Subject (whom the token refers to)',
            aud: 'Audience (who or what the token is intended for)',
            jti: 'JWT ID (unique identifier for this token)',
            typ: 'Type of token',
            azp: 'Authorized party (the party to which this token was issued)',
            alg: 'Signature or encryption algorithm',
            jku: 'JSON Web Key Set URL',
            jwk: 'JSON Web Key Set (embedded)',
            kid: 'Key ID',
            x5u: 'X.509 Certificate URL',
            x5t: 'X.509 Fingerprint (SHA-1)',
            'x5t#S256': 'X.509 Fingerprint (SHA-256)',
            cty: 'Content type',
            crit: 'Extensions or claims that MUST be processed or verified',
            enc: 'Encryption algorithm',
            zip: 'Compression algorithm',
            kty: 'Key type',
            use: 'Intended use of key: "sig" or "enc" (other values accepted)',
            key_ops: 'Intended operations for this key',
            sid: 'Session ID (String identifier for a Session)',
            updated_at: 'Last modification timestamp',
            at_hash: 'Access Token hash value',
            c_hash: 'Authorization Code hash value',
            s_hash: 'State hash value',
            nonce: 'Unique value associating request to token',
            auth_time: 'Time when authentication occurred',
            amr: 'Authentication methods array',
            acr: 'Authentication context class'
        }
    },
    extension: {
        alreadyInstalled: 'Already installed',
        addToBrowser: 'Add to Browser',
        noJwtsFound: 'No JWTs found',
        saveBackTo: 'Save back to '
    },
    editor: {
        signatureVerified: 'signature verified',
        signatureInvalid: 'invalid signature',
        jwtInvalid: 'Invalid JWT'
    },
    warnings: {
        headerBase64Invalid: 'Looks like your JWT header is not encoded correctly using base64url (https://tools.ietf.org/html/rfc4648#section-5). Note that padding ("=") must be omitted as per https://tools.ietf.org/html/rfc7515#section-2',
        payloadBase64Invalid: 'Looks like your JWT payload is not encoded correctly using base64url (https://tools.ietf.org/html/rfc4648#section-5). Note that padding ("=") must be omitted as per https://tools.ietf.org/html/rfc7515#section-2',
        signatureBase64Invalid: 'Looks like your JWT signature is not encoded correctly using base64url (https://tools.ietf.org/html/rfc4648#section-5). Note that padding ("=") must be omitted as per https://tools.ietf.org/html/rfc7515#section-2',
        payloadInvalidJSON: 'Looks like your JWT payload is not a valid JSON object. JWT payloads must be top level JSON objects as per https://tools.ietf.org/html/rfc7519#section-7.2'
    }
};