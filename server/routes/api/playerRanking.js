const express = require("express");
const router = express.Router();
const pg = require("pg-promise")();
const db = pg("postgres://postgres:123456@localhost:5432/cricket_capstone");

// Retrive player rankings from player_ranking table - Bhavana
router.post("/ranking", async (req, res) => {
  const format = req.body.format;
  const gender = req.body.gender;
  try {
    // Storing result of the query
    const result = await db.any(
      `select * from player_ranking where match_format='${format}' and gender='${gender}'`
    );
    // If the query doesn't return any result , throw an 400 error,
    if (!result)
      throw {
        statusCode: 400,
        customMessage: "Cannot find player ranking with the specified format"
      };
    // Query returns an successfull result
    res.status(200).json({
      status: 200,
      data: result,
      message: `Retrieved all player rankings of '${gender} 'from '${format}' format Successfully`
    });
  } catch (err) {
    console.log(err);
    res
      .status(err.statusCode ? err.statusCode : 500)
      .send(
        err.customMessage ? err.customMessage : "Please contact System Admin"
      );
  }
});

// Retrieve Team Rankings from team ranking table - Bhavana
router.post("/teamranking", async (req, res) => {
  const format = req.body.format;
  const gender = req.body.gender;
  console.log(format);
  try {
    // Storing the resut of the query
    const result = await db.any(
      `SELECT * FROM team_ranking where match_format = '${format}' and gender='${gender}'`
    );
    // If the query doesn't return any result , then throw a 400 error
    if (!result)
      throw {
        statusCode: 400,
        customMessage: "Cannot find team with the specified format"
      };
    // Query returns a successful result
    res.status(200).json({
      status: 200,
      data: result,
      message: "Retrieved all team ranking Successfully"
    });
  } catch (err) {
    console.log(err);
    res
      .status(err.statusCode ? err.statusCode : 500)
      .send(
        err.customMessage ? err.customMessage : "Please contact System Admin"
      );
  }
});

module.exports = router;
