const express = require("express");
const router = express.Router();
const pg = require("pg-promise")();
// Conneccting to the hosted database fixtures
const db = pg("postgres://postgres:123456@localhost:5432/crickstrait_db");

router.get("/getrecent", async (req, res) => {
  try {
    let result = await db.any(
      "with s as(select count(*) as total from match) select * from match where match_id<=(select total from s) order by match_id desc limit 8;"
    );
    if (!result) {
      res.status(404).json({
        status: 404,
        message: "Cannot Find Match with given id",
        data: null
      });
    }
    res.status(200).json({
      status: 200,
      data: result,
      message: "Retrieved Successfully"
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "Server Error",
      data: null
    });
  }
});

router.post("/getbytype", async (req, res) => {
  const type = req.body.type;
  console.log(type);
  try {
    const result = await db.any(
      "SELECT * FROM match where match_type = '" + type + "'; "
    );
    if (!result) {
      res.status(404).json({
        statusCode: 404,
        message: "Cannot find match with the specified type",
        data: null
      });
    }
    res.status(200).json({
      status: 200,
      data: result,
      message: "Retrieved all matches successfully"
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "Server Error",
      data: null
    });
  }
});

router.post("/getbyteam", async (req, res) => {
  const team = req.body.team;
  console.log(team);
  try {
    const result = await db.any(
      // "SELECT * FROM match where team_name1 = '" +
      //   team +
      //   "' or team_name2 = '" +
      //   team +
      //   "'; "
      `with ss as (with s as ( select m.match_id, m.innings_one_team, m.innings_two_team, m.outcome as won_by,m.competition, winner, m.match_type, m.player_of_the_match, t.team_name
        as team1, d.match_date, v.venue_name,v.venue_city from match as m
         inner join team as t on t.team_id = m.innings_one_team
         inner join venue as v on m.venue_id = v.venue_id
         inner join match_date d on m.match_id = d.match_id ),
         ps as (select team_id, team_name as team2 from team
         where team_id in (select innings_two_team from s))
         select match_id, innings_one_team, team1, innings_two_team, team2, winner, won_by, match_type, player_of_the_match, match_date,venue_name,venue_city,competition from ps
         inner join s on s.innings_two_team = ps.team_id),
         pss as (select team_id, team_name as match_winner from team where team_id in (select winner from ss))
         select match_id, team1, team2, match_winner, won_by, match_type, player_of_the_match, match_date ,venue_name,venue_city,competition
         from pss inner join ss on ss.winner = pss.team_id where team1='${team}' or team2='${team}' ;
       `
    );
    if (!result) {
      res.status(404).json({
        statusCode: 404,
        message: "Cannot find match with the specified type",
        data: null
      });
    }
    console.log("result", result);
    res.status(200).json({
      status: 200,
      data: result,
      message: "Retrieved all matches successfully"
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "Server Error",
      data: null
    });
    console.log(err);
  }
});

module.exports = router;

module.exports = router;
