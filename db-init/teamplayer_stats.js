const pgp = require("pg-promise")();
const postdb = pgp(
  "postgres://postgres:123456@localhost:5432/crickstrait_capstone"
);

try {
  postdb.any(`insert into teamsplayer_stats with parent as(with ss as(select player_stats_id,ps.player_id,player_stats_name,player_stats_value,match_type,player_name,team_id,gender from player_stats ps 
        inner join player p on ps.player_id = p.player_id
        inner join match_team_player mtp on ps.player_id = mtp.player_id 
        group by mtp.team_id,player_stats_id,ps.player_id,player_stats_name,player_stats_value,match_type,player_name,gender)
        select player_stats_id,player_id,player_stats_name,player_stats_value,match_type,player_name,ss.team_id,team_name,gender from team t inner join ss on ss.team_id = t.team_id)
        select player_stats_id,player_id,player_stats_name,player_stats_value,match_type,team_id,team_name,player_name,gender from parent
        `);
  console.log("Inserted into teamplayer_stats");
} catch (err) {
  console.log(err);
}
