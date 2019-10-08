const express = require("express");
const router = express.Router();
const pg = require("pg-promise")();
const db = pg("postgres://postgres:123456@localhost/crickstrait_db");
//assigning a new playertype(i.e Batsman,Bowler,All Rounder)
router.post("/new", async (req, res, next) => {
  try {
    player = {
      player_role: req.body.player_role
    };
    const result = await db.any(`insert into player_role(player_role)values('${player.player_role}') 
                returning player_role_id`);
    res.status(200).json({
      status: 200,
      data: result,
      message: "Inserted Player_role Successfully"
    });
  } catch (err) {
    next(err)
  }
});
//get all roles of the player in the database
router.get("/all", async (req, res) => {
  try {
    const result = await db.any("select * from player_role");
    res.status(200).json({
      status: 200,
      data: result,
      message: "Retrieved all users Successfully"
    });
  } catch (err) {
    next(err)
  }
});
module.exports = router;
