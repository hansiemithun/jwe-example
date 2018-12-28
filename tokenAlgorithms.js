module.exports = {
  jweAlg: [
    'A128KW',
    'A192KW',
    'A256KW',
    'PBES2-HS256+A128KW',
    'PBES2-HS384+A192KW',
    'PBES2-HS512+A256KW'
  ],
  jweEnc: [
    'A128CBC-HS256',
    'A192CBC-HS384',
    'A256CBC-HS512',
    'A128GCM',
    'A192GCM',
    'A256GCM'
  ],
  jwtAlg: ['HS256', 'HS384', 'HS512']
};
