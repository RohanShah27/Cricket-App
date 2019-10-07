const jwt = require("jsonwebtoken");
const config = require("config");
//verification through private key the token and if the user is existing or not 
module.exports = () => {
  console.log(
    "decoded token" +
    JSON.stringify(jwt.decode(global.returned_token, config.get("PrivateKey")))
  );
};

global.decoded_token = jwt.decode(global.returned_token, config.get("PrivateKey"));
decoded = decoded_token["isAdmin"];
let err_message;
jwt.verify(global.returned_token, privatekey, (err, decoded) => {
  if (err) {
    localStorage.removeItem("token");
    console.log(err.message);
    err_message = err.message;
  }
});
