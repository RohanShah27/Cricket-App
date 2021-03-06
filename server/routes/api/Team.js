const express = require("express");
const router = express.Router();
const pg = require("pg-promise")();
const db = pg("postgres://postgres:123456@localhost/cricket_capstone");

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
//retrieving teams with respect to tournaments such as International, IPL
router.post("/tournament", async (req, res) => {
  const tournament = req.body.tournament;
  console.log(tournament);
  const result = await db.any(
    `with ss as(select match.innings_one_team, match.innings_two_team, match.competition, team.team_name, team.team_id ,team.team_image,team.team_background from match 
      inner join team on match.innings_one_team = team.team_id), 
      t2 as (select match.innings_two_team, match.competition, team.team_name, team.team_id,team.team_image,team.team_background  from match 
      inner join team on match.innings_two_team = team.team_id) select distinct(team_name), team_id,team_image,team_background  from t2 where competition='${tournament}'`
  );
  if (!result) {
    res.status(404).json({
      statusCode: 404,
      message: "Cannot fetch the team details",
      data: null
    });
  }
  res.status(200).json({
    status: 200,
    data: result,
    message: "Retrieved all tournaments  successfully"
  });
});

//Retrieving top 5 batsmen with respect to team and match type and gender
router.post("/playerstatsforteams/:team_id/:gender", async (req, res) => {
  const gender = req.params.gender;
  console.log(gender);
  const match_type = req.body.match_type;
  const team_id = req.params.team_id;
  const result = await db.any(
    `Select distinct player_name, player_stats_value from teamplayer_stats where player_stats_name = 'total_runs' and team_id= ${team_id} and match_type = '${match_type}' and gender='${gender}' order by player_stats_value desc fetch first 5 rows only`
  );
  console.log(result);
  if (!result) {
    res.status(404).json({
      statusCode: 404,
      message: "Cannot fetch the stats",
      data: null
    });
  }
  res.status(200).json({
    status: 200,
    data: result,
    message: "Retrieved all data successfully"
  });
});

//Retrieving top 5 bowlers with respect to team and match type and gender
router.post("/playerstatsforteamsbowler/:team_id/:gender", async (req, res) => {
  const match_type = req.body.match_type;
  const gender = req.params.gender;
  const team_id = req.params.team_id;
  const result = await db.any(
    `Select distinct player_name, player_stats_value from teamplayer_stats where player_stats_name = 'total_wickets' and team_id= ${team_id} and match_type = '${match_type}' and gender = '${gender}'order by player_stats_value desc fetch first 5 rows only`
  );
  if (!result) {
    res.status(404).json({
      statusCode: 404,
      message: "Cannot fetch the stats",
      data: null
    });
  }
  res.status(200).json({
    status: 200,
    data: result,
    message: "Retrieved all data successfully"
  });
});

//Retrieving team with respect to id
router.post("/teambyid", async (req, res) => {
  const team_id = req.body.team_id;
  console.log(team_id);
  const result = await db.any(
    "select * from team where team_id = '" + team_id + "';"
  );
  if (!result) {
    res.status(404).json({
      statusCode: 404,
      message: "Cannot fetch the team",
      data: null
    });
  }
  res.status(200).json({
    status: 200,
    data: result,
    message: "Retrieved team successfully"
  });
});

//Retrieving team stats(matches played, wins, loss, draw) with respect to team id and match type
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

router.get("/playerstats/:team_id", async (req, res) => {
  const team_id = req.params.team_id;
  const result = await db.any(
    "Select player_stats.match_type, player_stats.player_stats_name,player_stats.player_stats_value from team where team_id = '" +
      team_id +
      "';"
  );
  res.status(200).json({
    status: 200,
    data: result,
    message: "Retrieved stats successfully"
  });
});

//Retrieving team with respect to search query
router.post("/teamsearch", async (req, res) => {
  try {
    let team_name = req.body.team_name;
    let tournament = req.body.tournament;
    console.log(team_name);
    const query = `select * from team where team_name ilike '${team_name}%' or team_name ilike '%${team_name}'`;
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
