const jwt = require('node-webtokens');
const tokenAlgorithms = require('./tokenAlgorithms');
const bcrypt = require('bcrypt');

function getKey() {
  const saltRounds = 10;
  const secret_key = 'IndiaIsABeautifulCountry';

  const key1 = bcrypt.hashSync(secret_key, saltRounds);
  const key2 = bcrypt.hashSync(key1, saltRounds);

  const keys = key1 + key2;
  const key = keys.substr(0, 100);
  return key;
}

function randomNR(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getToken(payload, key, type) {
  let token = '';

  switch (type) {
    case 'jwe':
      const jweAlgRand = randomNR(0, tokenAlgorithms.jweAlg.length - 1);
      const jweAlg = tokenAlgorithms.jweAlg[jweAlgRand];
      const jweEncRand = randomNR(0, tokenAlgorithms.jweEnc.length - 1);
      const jweEnc = tokenAlgorithms.jweEnc[jweEncRand];
      token = jwt.generate(jweAlg, jweEnc, payload, key);
      break;

    case 'jwt':
      const jwtAlgRand = randomNR(0, tokenAlgorithms.jwtAlg.length - 1);
      const jwtAlg = tokenAlgorithms.jwtAlg[jwtAlgRand];
      token = jwt.generate(jwtAlg, payload, key);
      break;
  }
  return token;
}

function isTokenValid(token, key, expirySeconds) {
  return jwt
    .parse(token)
    .setTokenLifetime(expirySeconds)
    .verify(key);
}

function getParsedToken(token, key) {
  return jwt.parse(token).verify(key);
}

function getTokenDetails(payload, key, type, token, parsedToken) {
  return {
    payload,
    key,
    type,
    token,
    header: parsedToken.header,
    payload: parsedToken.payload,
    isValid: parsedToken.valid
  };
}

module.exports = {
  getKey,
  getToken,
  isTokenValid,
  getParsedToken,
  getTokenDetails
};
