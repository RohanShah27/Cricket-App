const express = require("express");
const router = express.Router();
const pg = require("pg-promise")();
// Conneccting to the hosted database fixtures
const db = pg("postgres://postgres:123456@192.168.0.63:5432/crickstrait");

router.get("/getrecent", async (req, res) => {
  try {
    let result = await db.any(
      "select * from match where date like '2017%' limit 8;"
    );
    if (!result) {
      res.status(404).json({
        status: 404,
        message: "Cannot Find Match with given id",
        data: null
      });
    }
    res.status(200).json({
      status: 200,
      data: result,
      message: "Retrieved Successfully"
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "Server Error",
      data: null
    });
  }
});
module.exports = router;
