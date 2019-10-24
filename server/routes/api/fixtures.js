const express = require("express");
const router = express.Router();
const pg = require("pg-promise")();
// Conneccting to the hosted database fixtures -Rohan
const db = pg("postgres://postgres:123456@localhost:5432/cricket_capstone");
// get all fixtures in the result variable via an asynchronous function -Rohan

// Get Fixtures for the Home section -Rohan
router.get("/all", async (req, res) => {
  try {
    const result = await db.any("select * from new_fixtures;");
    if (result.length == 0)
      res.status(200).json({
        status: 400,
        data: null,
        message: "Could not connect to the database"
      });
    //   convert the response into a json format -Rohan
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
