const express = require("express");
const router = express.Router();
const pg = require("pg-promise")();
const db = pg("postgres://postgres:123456@192.168.0.63:5432/crickstrait");
router.post("/new", async (req, res) => {
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
});

router.get("/all", async (req, res) => {
  const result = await db.any("select * from player_role");
  res.status(200).json({
    status: 200,
    data: result,
    message: "Retrieved all users Successfully"
  });
});
module.exports = router;
