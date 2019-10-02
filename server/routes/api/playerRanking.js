const express = require("express");
const router = express.Router();
const pg = require("pg-promise")();
const db = pg("postgres://postgres:123456@192.168.0.63:5432/crickstrait");

// Retrieving all products from database
router.get("/all", async (req, res) => {
  const result = await db.any("select * from player_ranking");
  res.status(200).json({
    status: 200,
    data: result,
    message: "Retrieved all players Successfully"
  });
});

router.post("/ranking", async (req, res) => {
  const type = req.body.type;
  const format = req.body.format;
  try {
    const result = await db.any(
      "SELECT * FROM player_ranking where type = '" +
        type +
        "' and format = '" +
        format +
        "'; "
    );
    // if (!result)
    //   throw {
    //     statusCode: 404,
    //     customMessage: "Cannot find ranking with the specified format"
    //   };
    res.status(200).json({
      status: 200,
      data: result,
      message: "Retrieved all players Successfully"
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

router.post("/teamranking", async (req, res) => {
  const format = req.body.format;
  console.log(format);
  try {
    const result = await db.any(
      "SELECT * FROM team_ranking where format = '" + format + "'; "
    );
    if (!result)
      throw {
        statusCode: 404,
        customMessage: "Cannot find team with the specified format"
      };
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
