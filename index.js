const jwt = require("node-webtokens");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const secret_key = "IndiaIsABeautifulCountry";

const key1 = bcrypt.hashSync(secret_key, saltRounds);
const key2 = bcrypt.hashSync(key1, saltRounds);

const keys = key1 + key2;
const key = keys.substr(0, 100);

var payload = {
  iss: "auth.mydomain.com",
  aud: "A1B2C3D4E5.com.mydomain.myservice",
  sub: "jack.sparrow@example.com",
  info: "Hello World!",
  list: [1, 2, 3]
};

var token = jwt.generate("A256KW", "A256GCM", payload, key);
console.log(token);

var parsed = jwt.parse(token).verify(key);
console.log(parsed.valid);
// true
console.log(parsed.header);
// { alg: 'HS512' }
console.log(parsed.payload);
