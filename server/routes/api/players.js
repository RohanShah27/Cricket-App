const express = require("express");
//Route to the provided route
const router = express.Router();
const pg = require("pg-promise")();
// Conneccting to the hosted database fixtures
const db = pg("postgres://postgres:123456@localhost:5432/crickstrait_db");

// Get players bio on seearch of players
router.post("/player_search/:playerId", async (req, res) => {
  try {
    let playerId = req.params.playerId;
    const odi_result = await db.any(
      `select ps.player_stats_value,ps.match_type,ps.player_stats_name from player_stats ps left join player p on ps.player_id=p.player_id where ps.player_id=p.player_id group by p.player_id,p.player_name,ps.player_stats_value,ps.match_type,player_stats_name having p.player_id=${playerId} and ps.match_type='ODI' order by ps.match_type;`
    );
    const test_result = await db.any(
      `select ps.player_stats_value,ps.match_type,ps.player_stats_name from player_stats ps left join player p on ps.player_id=p.player_id where ps.player_id=p.player_id group by p.player_id,p.player_name,ps.player_stats_value,ps.match_type,player_stats_name having p.player_id=${playerId} and ps.match_type='Test' order by ps.match_type;`
    );
    const t20_result = await db.any(
      `select ps.player_stats_value,ps.match_type,ps.player_stats_name from player_stats ps left join player p on ps.player_id=p.player_id where ps.player_id=p.player_id group by p.player_id,p.player_name,ps.player_stats_value,ps.match_type,player_stats_name having p.player_id=${playerId} and ps.match_type='T20' order by ps.match_type;`
    );
    let data = { ODI: {}, T20: {}, Test: {} };
    // Data for Odi
    data.ODI.doubleCenturies = "--";
    data.ODI.centuries = "--";
    data.ODI.runs = "--";
    data.ODI.sixes = "--";
    data.ODI.fours = "--";
    data.ODI.wickets = "--";
    data.ODI.fifty = "--";
    // Data for T20
    data.T20.doubleCenturies = "--";
    data.T20.centuries = "--";
    data.T20.runs = "--";
    data.T20.sixes = "--";
    data.T20.fours = "--";
    data.T20.wickets = "--";
    data.T20.fifty = "--";
    // Data for Test
    data.Test.doubleCenturies = "--";
    data.Test.centuries = "--";
    data.Test.runs = "--";
    data.Test.sixes = "--";
    data.Test.fours = "--";
    data.Test.wickets = "--";
    data.Test.fifty = "--";
    let fflag = 0;
    let sflag = 0;
    let cflag = 0;
    let dcflag = 0;
    let wflag = 0;
    let fitflag = 0;
    let runsflag = 0;
    odi_result.forEach(stats => {
      if (stats.player_stats_name == "4s" && fflag == 0) {
        data.ODI.fours = stats.player_stats_value;
        fflag = 1;
      } else if (stats.player_stats_name == "6s" && sflag == 0) {
        data.ODI.sixes = stats.player_stats_value;
        sflag = 1;
      } else if (stats.player_stats_name == "total_wickets" && wflag == 0) {
        data.ODI.wickets = stats.player_stats_value;
        wflag = 1;
      } else if (stats.player_stats_name == "total_runs" && runsflag == 0) {
        data.ODI.runs = stats.player_stats_value;
        runsflag = 1;
      } else if (stats.player_stats_name == "total_50s" && fitflag == 0) {
        data.ODI.fifty = stats.player_stats_value;
        fitflag = 1;
      } else if (stats.player_stats_name == "centuries" && cflag == 0) {
        data.ODI.centuries = stats.player_stats_value;
        cflag = 1;
      } else if (stats.player_stats_name == "double centuries" && dcflag == 0) {
        data.ODI.doubleCenturies = stats.player_stats_value;
        dcflag = 1;
      }
    });
    fflag = 0;
    sflag = 0;
    cflag = 0;
    dcflag = 0;
    wflag = 0;
    fitflag = 0;
    runsflag = 0;
    t20_result.forEach(stats => {
      if (stats.player_stats_name == "4s" && fflag == 0) {
        data.T20.fours = stats.player_stats_value;
        fflag = 1;
      } else if (stats.player_stats_name == "6s" && sflag == 0) {
        data.T20.sixes = stats.player_stats_value;
        sflag = 1;
      } else if (stats.player_stats_name == "total_wickets" && wflag == 0) {
        data.T20.wickets = stats.player_stats_value;
        wflag = 1;
      } else if (stats.player_stats_name == "total_runs" && runsflag == 0) {
        data.T20.runs = stats.player_stats_value;
        runsflag = 1;
      } else if (stats.player_stats_name == "total_50s" && fitflag == 0) {
        data.T20.fifty = stats.player_stats_value;
        fitflag = 1;
      } else if (stats.player_stats_name == "centuries" && cflag == 0) {
        data.T20.centuries = stats.player_stats_value;
        cflag = 1;
      } else if (stats.player_stats_name == "double centuries" && dcflag == 0) {
        data.T20.doubleCenturies = stats.player_stats_value;
        dcflag = 1;
      }
    });
    fflag = 0;
    sflag = 0;
    cflag = 0;
    dcflag = 0;
    wflag = 0;
    fitflag = 0;
    runsflag = 0;
    test_result.forEach(stats => {
      if (stats.player_stats_name == "4s" && fflag == 0) {
        data.Test.fours = stats.player_stats_value;
        fflag = 1;
      } else if (stats.player_stats_name == "6s" && sflag == 0) {
        data.Test.sixes = stats.player_stats_value;
        sflag = 1;
      } else if (stats.player_stats_name == "total_wickets" && wflag == 0) {
        data.Test.wickets = stats.player_stats_value;
        wflag = 1;
      } else if (stats.player_stats_name == "total_runs" && runsflag == 0) {
        data.Test.runs = stats.player_stats_value;
        runsflag = 1;
      } else if (stats.player_stats_name == "total_50s" && fitflag == 0) {
        data.Test.fifty = stats.player_stats_value;
        fitflag = 1;
      } else if (stats.player_stats_name == "centuries" && cflag == 0) {
        data.Test.centuries = stats.player_stats_value;
        cflag = 1;
      } else if (stats.player_stats_name == "double centuries" && dcflag == 0) {
        data.Test.doubleCenturies = stats.player_stats_value;
        dcflag = 1;
      }
    });

    res.status(200).json({
      status: 200,
      data: data,
      message: "Player Retrieved"
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "Server error"
    });
  }
});

// Get all players for player page ordered in alphabetical order -Rohan
router.get("/all", async (req, res) => {
  try {
    const result = await db.any("select * from player order by player_name;");
    res.status(200).json({
      status: 200,
      data: result,
      message: "Retrieved all players Successfully"
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "Server Error"
    });
  }
});
// Service for search bar on players page for live search for a player from the database -Rohan
router.post("/searchPlayer", async (req, res) => {
  try {
    let playerName = req.body.playerName;
    console.log(playerName);
    const result = await db.any(
      `select * from player where player_name ilike '${playerName}%' or player_name ilike '%${playerName}';`
    );
    res.status(200).json({
      status: 200,
      data: result,
      message: "Player Found"
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "Server Error"
    });
  }
});
//To add a new player
router.post("/newplayers", async (req, res, next) => {
  try {
    player = {
      player_name: req.body.player_name,
      player_role: req.body.player_role,
      nation: req.body.nation,
      gender: req.body.gender,
      player_dob: req.body.player_dob,
      batting_style: req.body.batting_style,
      bowling_style: req.body.bowling_style
    };
    //To check if player already exists or not
    const result = await db.any(
      `select * from player where player_name='${req.body.player_name}'`
    );
    if (result.length == 1) {
      console.log(result);
      return res.status(400).send({ message: "player already exists" });
    } else {
      //Insert a new player
      const result = await db.any(`insert into player(player_name,player_role,nation,gender,player_dob,batting_style,bowling_style)values('${player.player_name}','${player.player_role}','${player.nation}','${player.gender}','${player.player_dob}','${player.batting_style}','${player.bowling_style}')
              returning player_id`);
      console.log(result);
      res.status(200).json({
        status: 200,
        data: result,
        message: "Inserted Player Successfully"
      });
    }
    //if any error send a server error
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "Server error"
    });
    //To check what the error exactly is
    console.log(err);
  }
});

module.exports = router;
