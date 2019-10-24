const express = require("express");
const router = express.Router();
const pg = require("pg-promise")();
// Conneccting to the hosted database fixtures
const db = pg("postgres://postgres:123456@localhost:5432/crickstrait_capstone");

router.get("/getrecent/:gender", async (req, res) => {
  try {
    const gender = req.params.gender;
    let result = await db.any(`with ss as (with s as ( select m.match_id, m.innings_one_team, m.innings_two_team, m.outcome as won_by,m.competition, winner, m.match_type, m.player_of_the_match, t.team_name as team1,t.team_image as team1_image
      , d.match_date, v.venue_name,v.venue_city from match as m
       inner join team as t on t.team_id = m.innings_one_team
       inner join venue as v on m.venue_id = v.venue_id
       inner join match_date d on m.match_id = d.match_id where gender='${gender}'),
       ps as (select team_id, team_name as team2,team_image as team2_image from team
       where team_id in (select innings_two_team from s))
       select match_id, innings_one_team, team1, innings_two_team, team2, winner, won_by, match_type, player_of_the_match, match_date,venue_name,venue_city,competition, team1_image,team2_image from ps
       inner join s on s.innings_two_team = ps.team_id),
       pss as (select team_id, team_name as match_winner from team where team_id in (select winner from ss))
       select match_id, team1, team2, match_winner, won_by, match_type, player_of_the_match, match_date ,venue_name,venue_city,competition, team1_image,team2_image
       from pss inner join ss on ss.winner = pss.team_id limit 8;`);
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

router.post("/getbyteam", async (req, res) => {
  const team_name = req.body.team_name;
  const gender = req.body.gender;
  console.log(team_name);
  try {
    const result = await db.any(
      `with ss as (with s as ( select m.match_id, m.innings_one_team, m.innings_two_team, m.outcome as won_by,m.competition, winner, m.match_type, m.player_of_the_match, t.team_name
        as team1, t.team_image as team1_image,d.match_date, v.venue_name,v.venue_city from match as m
         inner join team as t on t.team_id = m.innings_one_team
         inner join venue as v on m.venue_id = v.venue_id
         inner join match_date d on m.match_id = d.match_id ),
         ps as (select team_id, team_name as team2,team_image as team2_image from team
         where team_id in (select innings_two_team from s))
         select match_id, innings_one_team, team1, innings_two_team, team2, winner, won_by, match_type, player_of_the_match, match_date,venue_name,venue_city,competition,team1_image,team2_image from ps
         inner join s on s.innings_two_team = ps.team_id),
         pss as (select team_id, team_name as match_winner from team where team_id in (select winner from ss))
         select match_id, team1, team2, match_winner, won_by, match_type, player_of_the_match, match_date ,venue_name,venue_city,competition,team1_image,team2_image
         from pss inner join ss on ss.winner = pss.team_id where team1='${team_name}' or team2='${team_name}' and gender='${gender}';
       `
    );
    if (!result) {
      res.status(404).json({
        statusCode: 404,
        message: "Cannot find match with the specified team",
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
    console.log(err);
  }
});

router.post("/getbyteamandtype", async (req, res) => {
  const team_name = req.body.team_name;
  const match_type = req.body.match_type;
  const gender = req.body.gender;
  console.log(team_name);
  console.log(match_type);
  try {
    const result = await db.any(
      `with ss as (with s as ( select m.match_id, m.innings_one_team, m.innings_two_team, m.outcome as won_by,m.competition, winner, m.match_type, m.player_of_the_match, t.team_name as team1,t.team_image as team1_image
        , d.match_date, v.venue_name,m.gender,v.venue_city from match as m
         inner join team as t on t.team_id = m.innings_one_team
         inner join venue as v on m.venue_id = v.venue_id
         inner join match_date d on m.match_id = d.match_id where match_type='${match_type}' and gender='${gender}'),
         ps as (select team_id, team_name as team2,team_image as team2_image from team
         where team_id in (select innings_two_team from s))
         select match_id, innings_one_team, team1, innings_two_team, team2, winner, won_by, match_type, player_of_the_match, match_date,venue_name,venue_city,competition, team1_image,team2_image,gender from ps
         inner join s on s.innings_two_team = ps.team_id),
         pss as (select team_id, team_name as match_winner from team where team_id in (select winner from ss))
         select match_id, team1, team2, match_winner, won_by, match_type, player_of_the_match, match_date ,venue_name,venue_city,competition, team1_image,team2_image,gender
         from pss inner join ss on ss.winner = pss.team_id where team1='${team_name}' or team2='${team_name}' ;
       `
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
    console.log(err);
  }
});

router.post("/getbydate", async (req, res) => {
  const team_name = req.body.team_name;
  const match_type = req.body.match_type;
  const match_date = req.body.match_date;
  const gender = req.body.gender;
  try {
    const result = await db.any(
      `with ss as (with s as ( select m.match_id, m.innings_one_team, m.innings_two_team, m.outcome as won_by,m.competition, winner, m.match_type, m.player_of_the_match, t.team_name
        as team1, d.match_date, v.venue_name,m.gender,v.venue_city from match as m
         inner join team as t on t.team_id = m.innings_one_team
         inner join venue as v on m.venue_id = v.venue_id
         inner join match_date d on m.match_id = d.match_id where match_type='${match_type}' and match_date='${match_date}' and gender='${gender}'),
         ps as (select team_id, team_name as team2 from team
         where team_id in (select innings_two_team from s))
         select match_id, innings_one_team, team1, innings_two_team, team2, winner, won_by, match_type, player_of_the_match, match_date,venue_name,venue_city,competition,gender from ps
         inner join s on s.innings_two_team = ps.team_id),
         pss as (select team_id, team_name as match_winner from team where team_id in (select winner from ss))
         select match_id, team1, team2, match_winner, won_by, match_type, player_of_the_match, match_date ,venue_name,venue_city,competition,gender
         from pss inner join ss on ss.winner = pss.team_id where team1='${team_name}' or team2='${team_name}';
       `
    );
    if (!result) {
      res.status(404).json({
        statusCode: 404,
        message: "Cannot find match with the specified date",
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
    console.log(err);
  }
});

router.post("/getbytype", async (req, res) => {
  const type = req.body.type;
  const gender = req.body.gender;
  console.log(type);
  try {
    const result = await db.any(
      `with ss as (with s as ( select m.match_id, m.innings_one_team, m.innings_two_team, m.outcome as won_by,m.competition, winner, m.match_type, m.player_of_the_match, t.team_name as team1,t.team_image as team1_image
        , d.match_date, v.venue_name,v.venue_city from match as m
         inner join team as t on t.team_id = m.innings_one_team
         inner join venue as v on m.venue_id = v.venue_id
         inner join match_date d on m.match_id = d.match_id where match_type='${type}' and gender='${gender}'),
         ps as (select team_id, team_name as team2,team_image as team2_image from team
         where team_id in (select innings_two_team from s))
         select match_id, innings_one_team, team1, innings_two_team, team2, winner, won_by, match_type, player_of_the_match, match_date,venue_name,venue_city,competition, team1_image,team2_image from ps
         inner join s on s.innings_two_team = ps.team_id),
         pss as (select team_id, team_name as match_winner from team where team_id in (select winner from ss))
         select match_id, team1, team2, match_winner, won_by, match_type, player_of_the_match, match_date ,venue_name,venue_city,competition, team1_image,team2_image
         from pss inner join ss on ss.winner = pss.team_id  ;`
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

// Fetching summary of the match - Chhaya
router.get("/summary/:match_id", async (req, res, next) => {
  try {
    var data = new Array();
    let match_id = req.params.match_id;
    const match_detail = await db.any(`with ss as (with s as (select m.match_id, m.innings_one_team, m.innings_two_team, 
      m.outcome as won_by,winner, m.match_type, m.player_of_the_match,t.team_name as team_one_name ,t.team_image as team1_image
      from match as m 
      inner join team as t on t.team_id=m.innings_one_team where match_id='${match_id}'),
      ps as( select team_id,team_name as team_two_name ,team_image as team2_image from team
      where team_id in(select innings_two_team from s))
      select match_id, innings_one_team, team_one_name, innings_two_team,team_two_name, team1_image,team2_image,
      winner,won_by, match_type, player_of_the_match 
      from ps inner join s on s.innings_two_team=ps.team_id),
      pss as( select team_id, team_name as match_winner from team 
      where team_id in(select cast(winner as int) from ss))
      select match_id, innings_one_team, team_one_name, innings_two_team,team_two_name, team1_image,team2_image,
      winner,match_winner,won_by, match_type, player_of_the_match 
      from pss inner join ss on cast(ss.winner as int)=pss.team_id`);
    const match_total_of_score = await db.any(`with ss as (with s as (select inning as inning_one, 
                sum(total_runs) as total_score 
                from delivery where match_id=${match_id} group by inning),
                ps as(select inning, count(wicket_id) as total_wicket from delivery 
                where match_id=${match_id} and wicket_id>0 and
                inning in( select inning from s) group by inning)
                select inning_one, total_score, total_wicket from ps
                inner join s on s.inning_one=ps.inning),
                pss as(select inning, count(overs)/6 as total_over 
                from delivery where match_id=${match_id} and extra_id=0 and
                inning in(select inning from ss) group by inning)
                select inning,total_score, total_wicket, total_over from pss
                inner join ss on ss.inning_one=pss.inning`);

    console.log(match_total_of_score);

    data.push({
      match_id: match_detail[0].match_id,
      match_type: match_detail[0].match_type,
      teamOne: match_detail[0].team_one_name,
      teamTwo: match_detail[0].team_two_name,
      team_winner: match_detail[0].match_winner,
      team1_image: match_detail[0].team1_image,
      team2_image: match_detail[0].team2_image,
      won_by: match_detail[0].won_by,
      player_of_the_match: match_detail[0].player_of_the_match,
      teamOneScore: match_total_of_score[0].total_score,
      teamTwoScore: match_total_of_score[1].total_score,
      teamone_wicket: match_total_of_score[0].total_wicket,
      teamtwo_wicket: match_total_of_score[1].total_wicket,
      team_one_total_over: match_total_of_score[0].total_over,
      team_two_total_over: match_total_of_score[1].total_over
    });

    res.status(200).json({
      status: 200,
      data: data,
      message: "Retrived matches list by date successfully!!"
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// Get the Match info-Chhaya
router.get("/getmatchdetails/:match_id", async (req, res) => {
  const matchid = req.params.match_id;
  try {
    const result = await db.any(
      `select toss_winner,toss_decision,match_type,outcome,toss_decision,competition,team_name as winner,player_of_the_match from match left join team t on winner=t.team_id group by toss_winner,toss_decision,competition,match_type,outcome,toss_decision,team_name,player_of_the_match,match_id having match_id=${matchid};`
    );
    const toss = await db.any(
      `select team_name as toss_winner from match left join team t on toss_winner=t.team_id group by match_id,team_name having match_id=${matchid};`
    );
    const date = await db.any(
      `select md.match_date from match_date md left join match m on md.match_id=m.match_id group by md.match_id,md.match_date,m.match_id having m.match_id=${matchid}`
    );
    const country = await db.any(
      `select team_name from team t left join match m on t.team_id=m.innings_one_team or t.team_id=m.innings_two_team where match_id=${matchid};`
    );
    const player1 = await db.any(
      `with s as (select striker as batsman_id , sum(batsman_run) as total_runs, count(batsman_run)as total_ball from delivery where match_id='${matchid}' and inning=1 group by striker order by total_runs desc limit 2), ps as(select player_name,player_id from player where player_id in (select batsman_id from s)) select player_name,total_runs,total_ball from ps inner join s on s.batsman_id=ps.player_id order by total_runs desc;`
    );
    const player2 = await db.any(
      `with s as (select striker as batsman_id , sum(batsman_run) as total_runs, count(batsman_run)as total_ball from delivery where match_id='${matchid}' and inning=2 group by striker order by total_runs desc limit 2), ps as(select player_name,player_id from player where player_id in (select batsman_id from s)) select player_name,total_runs,total_ball from ps inner join s on s.batsman_id=ps.player_id order by total_runs desc;`
    );
    const player1_bowler = await db.any(
      `with s as (select bowler as bowler_name, (sum(cast(wicket_id > 0 as int))) as wickets,
      (count(overs) / 6) as overs
    from delivery d
    inner join player p on
    d.striker = p.player_id where
    match_id = '${matchid}' and inning = 1
    group by bowler),
  ps as (select player_id, player_name from player where player_id in (select bowler_name from s))
select player_name, wickets, overs from ps inner join s on s.bowler_name = ps.player_id order by wickets desc limit 2;`
    );
    const player2_bowler = await db.any(
      `with s as (select bowler as bowler_name, (sum(cast(wicket_id > 0 as int))) as wickets,
      (count(overs) / 6) as overs
    from delivery d
    inner join player p on
    d.striker = p.player_id where
    match_id = '${matchid}' and inning = 2
    group by bowler),
  ps as (select player_id, player_name from player where player_id in (select bowler_name from s))
select player_name, wickets, overs from ps inner join s on s.bowler_name = ps.player_id order by wickets desc limit 2;`
    );
    const umpire = await db.any(
      `select umpire_name from umpire u left join match_umpire mu on u.umpire_id=mu.umpire_id where mu.match_id=${matchid};`
    );
    const venue = await db.any(
      `select venue_name, venue_city from venue u left join match mu on u.venue_id=mu.venue_id where mu.match_id= ${matchid};`
    );
    let data = {};
    data.date = date;
    data.toss = toss;
    data.result = result;
    data.country = country;
    data.player1 = player1;
    data.player2 = player2;
    data.player1_bowler = player1_bowler;
    data.player2_bowler = player2_bowler;
    data.umpire = umpire;
    data.venue = venue;
    if (!result) {
      res.status(404).json({
        statusCode: 404,
        message: "Cannot fetch the match details",
        data: null
      });
    }
    res.status(200).json({
      status: 200,
      data: data,
      message: "Retrieved selected match successfully"
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "Server Error",
      data: null
    });
  }
});

// COmputing scorecard for a particular match
router.get("/getscorecard/:matchid", async (req, res) => {
  // Fetching the match_id from params using req.params
  const matchid = req.params.matchid;
  var data = new Array();
  try {
    const innings = await db.any(
      `select distinct(inning) from delivery where match_id='${matchid}' order by inning`
    );

    // Start of For Loop for innings
    for (inning of innings) {
      console.log(inning.inning);

      // Computing the batsman of innings
      const scorecard = await db.any(`with b as(with aaaa as (with aaa as (with aa as (with a as(with ssss as (select striker,(sum(cast(batsman_run as int))) as batsman_run,
(count(overs)) as ball_faced, round(cast((sum(cast(batsman_run as float))/(count(overs))*100) as numeric),2) as striker_rate ,
sum(cast(batsman_run=4 as int)) as fours, sum(cast(batsman_run=6 as int))as sixes
from delivery d inner join player p on d.striker=p.player_id where match_id='${matchid}' and inning='${inning.inning}'  
group by striker),pssss as(select striker as striker1, wicket_id, bowler from delivery where match_id='${matchid}' and inning='${inning.inning}' and wicket_id>0 and striker
in(select striker from ssss))
select striker, batsman_run, ball_faced, fours, sixes, striker_rate, wicket_id,bowler from pssss
full outer join ssss on ssss.striker=pssss.striker1),
b as(select wicket_id, wicket_type, fielder_one, fielder_two from wickets where wicket_id
in(select wicket_id from a))
select striker, batsman_run, ball_faced, fours, sixes, striker_rate, wicket_type,bowler, fielder_one, fielder_two from b
full outer join a on a.wicket_id=b.wicket_id),
bb as( select player_name as striker_name,player_id from player where player_id
in(select striker from aa))
select striker_name, batsman_run, ball_faced, fours, sixes, striker_rate, wicket_type,bowler, fielder_one, fielder_two from bb
full outer join aa on aa.striker=bb.player_id),
bbb as (select player_name as fielder_name,player_id from player where player_id
in(select fielder_one from aaa))
select striker_name, batsman_run, ball_faced, fours, sixes, striker_rate, wicket_type,bowler, fielder_name, fielder_two from bbb
full outer join aaa on aaa.fielder_one=bbb.player_id),
bbbb as (select player_name as fielder_two_name,player_id from player where player_id
in(select fielder_two from aaaa))
select striker_name, batsman_run, ball_faced, fours, sixes, striker_rate, wicket_type,bowler, fielder_name, fielder_two_name from bbbb
full outer join aaaa on aaaa.fielder_two=bbbb.player_id),
d as(select player_name as bowler_name ,player_id from player where player_id
in(select bowler from b))
select striker_name, batsman_run, ball_faced, fours, sixes, striker_rate, wicket_type,bowler_name, fielder_name, fielder_two_name from d
full outer join b on b.bowler=d.player_id
`);

      // COmputing wickets nad runs of bowler in aprticular innings
      const bowler = await db.any(
        `with s as (select bowler as bowler_name, (sum(cast(wicket_id > 0 as int))) as wickets,
      (sum(cast(extra_id > 0 as int))) as extras,
      (count(overs) / 6) as overs, sum(total_runs) as runs_conceeded,
      ((sum(cast(total_runs as float))) / (count(overs) / 6)) as economy
    from delivery d
    inner join player p on
    d.striker = p.player_id where
    match_id = '${matchid}' and inning = '${inning.inning}'
    group by bowler),
  ps as (select player_id, player_name from player where player_id in (select bowler_name from s))
select player_name, wickets, extras, overs, runs_conceeded, economy from ps inner join s on s.bowler_name = ps.player_id;
   `
      );

      // Computing total score for each and every inning
      const total = await db.any(`select (sum(cast(total_runs as int))) as Runs ,(sum(cast(wicket_id > 0 as int))) as wickets,
      (sum(cast(extra_id > 0 as int))) as extras,
      (count(overs) / 6) as overs
    from delivery d
     where
    match_id = '${matchid}' and inning = '${inning.inning}'`);
      data.push({
        inning: inning.inning,
        scorecard: scorecard,
        bowler: bowler,
        total: total
      });
    }
    // End of for loop for innings

    // If the query cannot find any match with id specified , throw an 400 error
    if (data == []) {
      res.status(400).json({
        statusCode: 400,
        message: "Cannot fetch the match details with the id specified",
        data: null
      });
    }
    // Show the meaasge specified and status 200 if the query returns an successfull result
    res.status(200).json({
      status: 200,
      data: data,
      message: "Retrieved selected match successfully"
    });
  } catch (err) {
    console.log(err);
    res
      .status(err.statusCode ? err.statusCode : 500)
      .send(
        err.customMessage ? err.customMessage : "Please contact System Admin"
      );
  }
});

router.post("/match_search", async (req, res) => {
  try {
    let teamName = req.body.team_name;
    console.log(teamName);
    const result = await db.any(
      `with  s as ( select team_id from team where team_name ilike '${teamName}%' or team_name ilike '${teamName}%') select * from match where innings_one_team in (select team_id from s)`
    );

    res.status(200).json({
      status: 200,
      data: result,
      message: "Team Retrieved"
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "Server error"
    });
  }
});

module.exports = router;
