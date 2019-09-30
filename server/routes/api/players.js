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

module.exports = router;
