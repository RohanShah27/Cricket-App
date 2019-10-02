const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pg = require("pg-promise")();
const Joi = require("joi");
const validateUser = require("./auth");
const db = pg("postgres://postgres:123456@192.168.0.63:5432/crickstrait");
const jwt = require("jsonwebtoken");
const generateToken = require("../../middleware/generateToken");
// const email = require("../../middleware/email");
// Retrieving all admins from database

router.get("/all", async (req, res) => {
  const result = await db.any("select * from user_info");
  res.status(200).json({
    status: 200,
    data: result,
    message: "Retrieved all users Successfully"
  });
});

// Creating a new admin
router.post("/new", async (req, res, next) => {
  user = {
    email: req.body.email,
    password: req.body.password
  };

  validateUser(user)
    .then(async val_user => {
      console.log("joi : " + user);
      let salt = bcrypt.genSaltSync(10);
      let hashed_password = bcrypt.hashSync(user.password, salt);

      const result = await db.any(`insert into user_info(email, password) 
                values('${user.email}', '${hashed_password}') 
                returning id`);
      console.log(result);
      res.status(200).json({
        status: 200,
        data: result,
        message: "created one user successfully"
      });
    })
    .catch(error => {
      res.send("invalid details");
    });
});

router.post("/login", async (req, res, next) => {
  const result = await db.any(
    `select * from user_info where email = '${req.body.email}'`
  );
  if (!result) {
    return res.status(400).send({ message: "Account not found" });
  }
  bcrypt
    .compare(req.body.password, result[0].password)
    .then(async validate => {
      const token = jwt.sign(
        {
          id: result[0].id,
          email: result[0].email
        },
        "secretkey",
        {
          expiresIn: "10s"
        }
      );
      console.log("token is:", token);
      res.send({
        message: "Logged in successfully",
        data: token
      });
    })
    .catch(error => {
      console.log(error);
      res.status(400).send("incorrect id or password");
    });
  let validateToken = (req, res, next) => {
    let bearerHeader =
      req.headers["x-access-token"] || req.headers["authorization"];
    if (!bearerHeader)
      reutrn(
        res.status(400).json({
          login: "failed",
          message: "token not found"
        })
      );
    const token = bearerHeader.split(" ")[1];
    console.log(token);
    try {
      const verifyingToken = jwt.verify(token, "privatekey");
      const decodedToken = jwt.decode(token);

      console.log(decodedToken);
    } catch (error) {
      console.log(error);
    }
  };
});

module.exports = router;
