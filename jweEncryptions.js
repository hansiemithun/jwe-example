const jweAlgorithms = [
  {
    name: 'A128CBC-HS256',
    desc:
      '32-octet key, passed either as base64 string or as buffer; same key for token generation and token decryption'
  },
  {
    name: 'A192CBC-HS384',
    desc:
      '48-octet key, passed either as base64 string or as buffer; same key for token generation and token decryption'
  },
  {
    name: 'A256CBC-HS512',
    desc:
      '64-octet key, passed either as base64 string or as buffer; same key for token generation and token decryption'
  },
  {
    name: 'A128GCM',
    desc:
      '16-octet key, passed either as base64 string or as buffer; same key for token generation and token decryption'
  },
  {
    name: 'A192GCM',
    desc:
      '24-octet key, passed either as base64 string or as buffer; same key for token generation and token decryption'
  },
  {
    name: 'A256GCM',
    desc:
      '32-octet key, passed either as base64 string or as buffer; same key for token generation and token decryption'
  }
];

module.exports = jweAlgorithms;
