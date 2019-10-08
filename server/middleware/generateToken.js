const jwt = require("jsonwebtoken");
const config = require("config")
// var LocalStorage = require("node-localstorage").LocalStorage;
// localStorage = new LocalStorage("./scratch");
//creation of a token with timeline of 30s
module.exports = payload => {
  const token = jwt.sign(payload, config.get("privatekey"), { expiresIn: "12h" });
  return token;
};
