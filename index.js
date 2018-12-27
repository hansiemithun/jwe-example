const jwt = require('node-webtokens');
const utility = require('./utility');
const key = utility.getKey();

var payload = {
  iss: 'auth.mydomain.com',
  aud: 'A1B2C3D4E5.com.mydomain.myservice',
  sub: 'jack.sparrow@example.com',
  info: 'Hello World!',
  list: [1, 2, 3]
};

const jweToken = utility.getToken(payload, key, 'jwe');
const jwtToken = utility.getToken(payload, key, 'jwt');

const parsedJweToken = utility.getParsedToken(jweToken, key);
const parsedJwtToken = utility.getParsedToken(jwtToken, key);

console.log(
  utility.getTokenDetails(payload, key, 'jwe', jweToken, parsedJweToken)
);

console.log(
  utility.getTokenDetails(payload, key, 'jwt', jwtToken, parsedJwtToken)
);

let timer = 1;

const counter = setInterval(() => {
  const jweValid = utility.isTokenValid(jweToken, key, 5).valid;
  const jwtValid = utility.isTokenValid(jwtToken, key, 10).valid;

  if (jweValid) {
    console.log(
      'JWE Token valid => ' + jweValid + ' \n till => ' + timer + 'seconds'
    );
  }
  if (jwtValid) {
    console.log(
      'JWT Token valid => ' + jwtValid + ' \n till => ' + timer + 'seconds'
    );
  }

  if (!jweValid && !jwtValid) {
    clearTimeout(counter);
  } else {
    console.log('*************************');
  }
  timer++;
}, 1000);
