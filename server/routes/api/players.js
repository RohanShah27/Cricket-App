const express = require("express");
const router = express.Router();
const pg = require("pg-promise")();
// Conneccting to the hosted database fixtures
const db = pg("postgres://postgres:123456@192.168.0.63:5432/crickstrait");

// Get players bio on seearch of players
router.post("/player_search", async (req, res) => {
  try {
    let playerName = req.body.playerName;
    const result = await db.any(
      "select * from player_stats where player_name='" + playerName + "';"
    );
    res.status(200).json({
      status: 200,
      data: result,
      message: "Player Retrieved"
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "Server error"
    });
  }
});

router.get("/all", async (req, res) => {
  const result = await db.any("select * from player_stats");
  res.status(200).json({
    status: 200,
    data: result,
    message: "Retrieved all players Successfully"
  });
});

router.post("/new", async (req, res) => {
  player = {
    player_name: req.body.player_name,
    player_role: req.body.player_role,
    player_nation: req.body.player_nation,
    gender: req.body.gender,
    player_dob: req.body.player_dob,
    batting_style: req.body.batting_style,
    bowling_style: req.body.bowling_style
  };
  const result = await db.any(`insert into player_stats(player_name,player_role,player_nation,gender,player_dob,batting_style,bowling_style)values('${player.player_name}','${player.player_role}','${player.player_nation}','${player.gender}','${player.player_dob}','${player.batting_style}','${player.bowling_style}') 
              returning player_stats_id`);
  res.status(200).json({
    status: 200,
    data: result,
    message: "Inserted Player Successfully"
  });
});

module.exports = router;
