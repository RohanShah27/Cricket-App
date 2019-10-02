const jwt = require("jsonwebtoken");
// var LocalStorage = require("node-localstorage").LocalStorage;
// localStorage = new LocalStorage("./scratch");

module.exports = payload => {
  const token = jwt.sign(payload, "privatekey", { expiresIn: "30s" });
  return token;
};
