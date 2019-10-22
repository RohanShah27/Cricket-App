const express = require("express");
const router = express.Router();
const pg = require("pg-promise")();
const db = pg("postgres://postgres:123456@localhost/cricket_capstone");

// Global Search
router.post("/search", async (req, res, next) => {
  try {
    user_request = req.body.search_term;
    const player_result = await db.any(
      `select * from player where player_name ilike '${user_request}%' or player_name ilike '%${user_request}' limit 2;`
    );
    const team_result = await db.any(
      `select * from team where team_name ilike '${user_request}%' or team_name ilike '%${user_request}' limit 2;`
    );
    let data = {};
    data.player = player_result;
    data.team = team_result;
    console.log(data);
    res.status(200).json({
      status: 200,
      data: data,
      message: "Search Result Returned"
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "Server Error"
    });
  }
});
module.exports = router;
