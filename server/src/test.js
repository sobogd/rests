const bcrypt = require("bcrypt");

const saltRounds = 13;
const myPlaintextPassword = "1102";

bcrypt.hash(myPlaintextPassword, saltRounds).then(function (hash) {
  console.log({ hash });
});
