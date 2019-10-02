const express = require("express");
const router = express.Router();
const pg = require("pg-promise")();
const db = pg("postgre://postgres:123456@192.168.0.63:5432/crickstrait");

router.get("/all", async (req, res) => {
  const country = req.body.country;
  const result = await db.any(
    "select * from venues where country_name ='" + country + "';"
  );
  res.status(200).json({
    status: 200,
    data: result,
    message: "Retrieved all venues successfully"
  });
});

module.exports = router;
