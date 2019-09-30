const express = require("express");
const router = express.Router();
const pg = require("pg-promise")();
// Conneccting to the hosted database fixtures
const db = pg("postgres://postgres:123456@192.168.0.63:5432/crickstrait");
// get all fixtures in the result variable via an asynchronous function

// Get Fixtures for the Home section
router.get("/all", async (req, res) => {
  try {
    const result = await db.any("select * from fixtures where fixture_id<10;");
    //   convert the response into a json format
    res.status(200).json({
      status: 200,
      data: result,
      message: "All fixtures retrieved"
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "Server error"
    });
  }
});

module.exports = router;
