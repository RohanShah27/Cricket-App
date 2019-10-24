const express = require("express");
const router = express.Router();
const pg = require("pg-promise")();
// Conneccting to the hosted database headlines -Rohan
const db = pg("postgres://postgres:123456@localhost:5432/cricket_capstone");
// get all headlines in the result variable via an asynchronous function -Rohan

// Get Headlines for Home Section -Rohan
router.get("/all", async (req, res) => {
  try {
    const result = await db.any("select * from headlines ");
    //   convert the response into a json format -Rohan
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
// Get a current headline for the news section -Rohan
router.post("/single_headline/:id", async (req, res) => {
  try {
    let id = req.params.id;
    console.log(id);
    const result = await db.any(
      "select * from headlines where headline_id='" + id + "';"
    );
    //   convert the response into a json format -Rohan
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
