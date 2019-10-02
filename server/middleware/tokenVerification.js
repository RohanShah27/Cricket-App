const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = () => {
  console.log(
    "decoded token" +
      JSON.stringify(jwt.decode(global.returned_token, "privatekey"))
  );
};

global.decoded_token = jwt.decode(global.returned_token, "privatekey");
decoded = decoded_token["isAdmin"];
let err_message;
jwt.verify(global.returned_token, privatekey, (err, decoded) => {
  if (err) {
    localStorage.removeItem("token");
    console.log(err.message);
    err_message = err.message;
  }
});
