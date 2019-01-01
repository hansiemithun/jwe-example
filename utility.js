const jwt = require('node-webtokens');
const jsonToken = require('./jsonTokenAlgorithms');
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

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getToken(payload, key, type) {
  let token = '';

  switch (type) {
    case 'jwe':
      const jweAlgRand = getRandomNum(0, jsonToken.jweAlg.length - 1);
      const jweAlg = jsonToken.jweAlg[jweAlgRand];
      const jweEncRand = getRandomNum(0, jsonToken.jweEnc.length - 1);
      const jweEnc = jsonToken.jweEnc[jweEncRand];
      token = jwt.generate(jweAlg, jweEnc, payload, key);
      break;

    case 'jwt':
      const jwtAlgRand = getRandomNum(0, jsonToken.jwtAlg.length - 1);
      const jwtAlg = jsonToken.jwtAlg[jwtAlgRand];
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

function getTokenDetails(payLoadInfo, key, type, token, parsedToken) {
  const { header, payload, valid } = parsedToken;
  return {
    payLoadInfo,
    key,
    type,
    token,
    header,
    payload,
    valid
  };
}

module.exports = {
  getKey,
  getToken,
  isTokenValid,
  getParsedToken,
  getTokenDetails
};
