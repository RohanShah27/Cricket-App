const express = require("express");
const router = express.Router();
const pg = require("pg-promise")();
const db = pg("postgre://postgres:123456@192.168.0.63:5432/crickstrait");

router.post("/tournament", async (req, res) => {
  const tournament = req.body.tournament;
  console.log(tournament);
  const result = await db.any(
    "select * from teams where tournament ='" + tournament + "';"
  );
  res.status(200).json({
    status: 200,
    data: result,
    message: "Retrieved all tournaments  sccessfully"
  });
});

module.exports = router;
