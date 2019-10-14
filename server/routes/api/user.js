const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pg = require("pg-promise")();
const Joi = require("joi");
const bodyParser = require('body-parser')
const config = require("config")
// const jsonParser = bodyParser.json()
const validateUser = require("./auth");
const db = pg("postgres://postgres:123456@localhost/crickstrait_db");
const jwt = require("jsonwebtoken");
const generateToken = require("../../middleware/generateToken");
const nodemailer = require("nodemailer");
// const email = require("../../middleware/email");
// Retrieving all admins from database

router.get("/all", async (req, res, next) => {
  try {
    const result = await db.any("select * from user_info");
    res.status(200).json({
      status: 200,
      data: result,
      message: "Retrieved all users Successfully"
    });
  } catch (err) {
    next(err);
  }
});

// Creating a new admin
router.post("/new", async (req, res, next) => {
  try {
    let email = req.body.email;
    console.log(email)
    const result = await db.any(`select * from user_info where email='${req.body.email}'`);
    if (result.length == 1) {
      console.log(result);
      return res.status(500).send({ message: "email already exists" });
    }
    else {
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
    }
  } catch (err) {
    next(err);
    console.log(err)
  }
});

router.post("/emailverify", async (req, res, next) => {
  try {
    let email = req.body.email;
    let password = 123456;
    const result = await db.any(
      `select * from user_info where email = '${req.body.email}'`
    );
    if (result.length == 1) {
      res.status(500).json({ status: 500, data: result, message: "Email Already Exists" })
      console.log(result.length)
      // console.log(message)
      console.log(res)
    }

    // let testAccount = await nodemailer.createTestAccount();
    else {
      let transporter = nodemailer.createTransport({
        secure: false,
        service: "gmail",
        auth: {
          user: "nodemailerTest0117@gmail.com",
          pass: "node@17Mailer"
        }
      });

      let info = await transporter.sendMail({
        from: '"Crickstrait"<nodemailerTest0117@gmail.com>',
        to: email,
        subject: "forgot password",
        text: "reset password",

        html: "<b>New Account? <br/>your account has been successfully created  </b>click to reset the password <a href=http://localhost:3000/resetpassword>ResetPassword</a>"
      });

      console.log("Message sent: %s", info.messageId);
      res.status(200).json({
        status: 200,
        message: "sending email"
      });
    }
  } catch (err) {
    next(err);
    console.log(err)
  }
});

router.post("/login", async (req, res, next) => {
  try {
    let email = req.body.email;
    console.log(email);
    const result = await db.any(
      `select * from user_info where email = '${req.body.email}'`
    );
    console.log(result)
    if (result.length == 0) {
      return res.status(500).send({ message: "Account not found" });
    }
    // console.log(result)
    bcrypt
      .compare(req.body.password, result[0].password)
      .then(async validate => {
        const token = jwt.sign(
          {
            id: result[0].id,
            email: result[0].email,
          },
          "privatekey",
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
        return res.status(400).send({ status: 400, data: result, message: "incorrect id or password" });
      });
    // console.log(error.message)
    let validateToken = (req, res, next) => {
      let bearerHeader =
        req.headers["x-access-token"] || req.headers["authorization"];
      if (!bearerHeader)
        return (
          res.status(400).json({
            login: "failed",
            message: "token not found"

          })
        );
      const token = bearerHeader.split(" ")[1];
      console.log(token);
      try {
        const verifyingToken = jwt.verify(token, config.get("PrivateKey"));
        const decodedToken = jwt.decode(token);

        console.log(decodedToken);
      } catch (error) {
        console.log(error);
        res.status(500).send({ status: 500, data: result, message: "incorrect id or password" });
      }
    };
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: 500, data: result, message: "incorrect id or password" });
  }

});
router.post("/newteam", async (req, res, next) => {
  try {
    let team_name = req.body.team_name;
    const result = await db.any(`select * from team where team_name='${req.body.team_name}'`);
    if (result.length == 1) {
      console.log(result);
      return res.status(500).send({ message: "Team already exists" })
    }
    else {
      team = {
        team_name: req.body.team_name
      };

      // validateUser(team)
      const result = await db.any(`insert into team(team_name)values('${team.team_name}')
              returning team_id`);
      console.log(result);
      res.status(200).json({
        status: 200,
        data: result,
        message: "Inserted Team Successfully"
      });
    }
  } catch (err) {
    next(err);
  }
});

router.put("/resetpassword", async (req, res, next) => {
  try {
    //get email from react component
    const email = req.body.email;
    console.log(email);
    const result = await db.any(`select * from user_info where email='${email}'`)
    if (result.length == 0) {
      return res.status(500).send({ message: "User Does not exist" })
    }
    else {
      let hashed_password = bcrypt.hash(req.body.password, 10)
      const result = await db.any(
        //update user password

        "update user_info set password='" + hashed_password + '"where email="' + email + "';"
        // `update user_info set password = '${hashed_password}' where email = ${email}`
      );
      res.status(200).json({
        status: 200,
        data: result,
        message: "Updated Password Successfully"
      });
    }
  } catch (err) {
    next(err);
  }
});



module.exports = router;
