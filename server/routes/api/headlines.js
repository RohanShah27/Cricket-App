const express = require("express");
const router = express.Router();
const pg = require("pg-promise")();
// Conneccting to the hosted database headlines
const db = pg("postgres://postgres:123456@localhost:5432/crickstrait_db");
// get all headlines in the result variable via an asynchronous function

// Get Headlines for Home Section
router.get("/all", async (req, res) => {
  try {
    const result = await db.any(
      "select * from headlines where headline_id>10;"
    );
    //   convert the response into a json format
    res.status(200).json({
      status: 200,
      data: result,
      message: "All headlines retrieved"
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "Server error"
    });
  }
});
// Get a current headline for the news section
router.get("/single_headline", async (req, res) => {
  try {
    let number = Math.floor(Math.random() * (10 - 20) + 20);
    const result = await db.any(
      "select * from headlines where headline_id='" + number + "';"
    );
    //   convert the response into a json format
    res.status(200).json({
      status: 200,
      data: result,
      message: "One Headline retrieved"
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "Server error"
    });
  }
});

module.exports = router;
