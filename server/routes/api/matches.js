const express = require("express");
const router = express.Router();
const pg = require("pg-promise")();
const db = pg("postgres://postgres:123456@192.168.0.63:5432/crickstrait");

router.get("/getrecent", async (req, res) => {
  try {
    const result = await db.any(
      "SELECT * FROM match where date like '2017%' limit 8"
    );
    if (!result)
      throw {
        statusCode: 404,
        customMessage: "Cannot find match with the specified type"
      };
    res.status(200).json({
      status: 200,
      data: result,
      message: "Retrieved all matches successfully"
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
