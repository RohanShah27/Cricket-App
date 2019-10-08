var config = require("config")
//authorzation of the user through token
const jwt = require("jsonwebtoken");
const validateToken = (req, res, next) => {
  let bearerHeader =
    req.headers["x-access-Token"] || req.headers["authorization"];
  if (!bearerHeader)
    return res.status(400).json({
      login: "Failed",
      message: "Token not found"
    });

  const token = bearerHeader.split(" ")[1];
  console.log(token);

  try {
    const verifyingtoken = jwt.verify(token, config.get("privatekey"));
    const decodedToken = jwt.decode(token);
    console.log(decodedToken);

    if (verifyingtoken && decodedToken["isAdmin"] == true) {
      req.user = decodedToken;
      next();
    } else {
      return res.status(400).json({
        status: 400,
        message: "Not an Admin"
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: 400,
      message: "Invalid Token"
    });
  }
};

module.exports = validateToken;
