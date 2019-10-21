const express = require("express");
const router = express.Router();
const pg = require("pg-promise")();
const db = pg("postgres://postgres:postgres@localhost/crickstrait_capstone");

// router.post("/tournament", async (req, res) => {
//   const tournament = req.body.tournament;
//   console.log(tournament);
//   const result = await db.any(
//     "select * from teams where tournament ='" + tournament + "';"
//   );
//   res.status(200).json({
//     status: 200,
//     data: result,
//     message: "Retrieved all tournaments  successfully"
//   });
// });

router.post("/tournament", async (req, res) => {
  const tournament = req.body.tournament;
  console.log(tournament);
  const result = await db.any(
    `with ss as(select match.innings_one_team, match.innings_two_team, match.competition, team.team_name, team.team_id ,team.team_image,team.team_background from match 
      inner join team on match.innings_one_team = team.team_id), 
      t2 as (select match.innings_two_team, match.competition, team.team_name, team.team_id,team.team_image,team.team_background  from match 
      inner join team on match.innings_two_team = team.team_id) select distinct(team_name), team_id,team_image,team_background  from t2 where competition='${tournament}'`
  );
  res.status(200).json({
    status: 200,
    data: result,
    message: "Retrieved all tournaments  successfully"
  });
});

router.post("/playerstatsforteams/:team_id", async (req, res) => {
  const match_type = req.body.match_type;
  const team_id = req.params.team_id;
  const result = await db.any(
    `Select distinct player_name, player_stats_value from teamplayer_stats where player_stats_name = 'total_runs' and team_id= ${team_id} and match_type = '${match_type}' order by player_stats_value desc fetch first 5 rows only`
  );
  res.status(200).json({
    status: 200,
    data: result,
    message: "Retrieved all data successfully"
  });
});

router.post("/playerstatsforteamsbowler/:team_id", async (req, res) => {
  const match_type = req.body.match_type;
  const team_id = req.params.team_id;
  const result = await db.any(
    `Select distinct player_name, player_stats_value from teamplayer_stats where player_stats_name = 'total_wickets' and team_id= ${team_id} and match_type = '${match_type}' order by player_stats_value desc fetch first 5 rows only`
  );
  res.status(200).json({
    status: 200,
    data: result,
    message: "Retrieved all data successfully"
  });
});

router.post("/teambyid", async (req, res) => {
  const team_id = req.body.team_id;
  console.log(team_id);
  const result = await db.any(
    "select * from team where team_id = '" + team_id + "';"
  );
  res.status(200).json({
    status: 200,
    data: result,
    message: "Retrieved team successfully"
  });
});

router.get("/matchtype/:team_id", async (req, res) => {
  try {
    const team_id = req.params.team_id;
    console.log(team_id);
    const result = await db.any(
      `Select 
      (Select count(match_id) from match where (innings_one_team=${team_id} or innings_two_team=${team_id}) and match_type='Test') AS Test_played,
     (Select count(match_id) from match where (innings_one_team=${team_id} or innings_two_team=${team_id}) and match_type='ODI') AS ODI_played,
      (Select count(match_id) from match where (innings_one_team=${team_id} or innings_two_team=${team_id}) and match_type='T20') AS T20_played,
      (Select count(winner) from match where winner = ${team_id} and match_type='Test') AS Test_win,
    (Select count(winner) from match where winner = ${team_id} and match_type='ODI') AS Odi_win,
    (Select count(winner) from match where winner = ${team_id} and match_type='T20') AS T20_win,
    (Select count(winner) from match where (innings_one_team=${team_id} or innings_two_team=${team_id}) and not winner = ${team_id} and not winner=0 and match_type='Test') AS Test_loss,
 (Select count(winner) from match where (innings_one_team=${team_id} or innings_two_team=${team_id}) and not winner = ${team_id} and not winner=0 and match_type='ODI') AS ODI_loss,
 (Select count(winner) from match where (innings_one_team=${team_id} or innings_two_team=${team_id}) and not winner = ${team_id} and not winner=0 and match_type='T20') AS T20_loss,
 
      (Select count(winner) from match where  (innings_one_team=${team_id} or innings_two_team=${team_id}) and winner=0 and match_type='Test') AS Test_draw,
 (Select count(winner) from match where  (innings_one_team=${team_id} or innings_two_team=${team_id}) and winner=0 and match_type='ODI') AS ODI_draw,
 (Select count(winner) from match where  (innings_one_team=${team_id} or innings_two_team=${team_id}) and winner=0 and match_type='T20') AS T20_draw
 


      
    
      `
    );
    res.status(200).json({
      status: 200,
      data: result,
      message: "Retrieved search info successfully"
    });
  } catch (err) {
    res.status(400);
  }
});

router.get("/playerstats", async (req, res) => {
  const result = await db.any(
    "Select player_stats.match_type, player_stats.player_stats_name,player_stats.player_stats_value from team where team_id = '" +
      team_id +
      "';"
  );
  res.status(200).json({
    status: 200,
    data: result,
    message: "Retrieved team successfully"
  });
});

router.post("/teamsearch", async (req, res) => {
  try {
    let team_name = req.body.team_name;
    let tournament = req.body.tournament;
    console.log(team_name);
    const query = `select * from team where team_name ilike '${team_name}%'`;
    console.log("query", query);
    const result = await db.any(
      query

      // "select * from teams where team_name = '" +
      //   team_name +
      //   "'and tournament='" +
      //   tournament +
      //   "';"
    );

    if (result.length == 0) {
      res.status(404).json({
        statusCode: 404,
        message: "Cannot find team with the specified name",
        data: null
      });
    }
    res.status(200).json({
      status: 200,
      data: result,
      message: "Retrieved team successfully"
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "Server Error",
      data: null
    });
  }
});

module.exports = router;
