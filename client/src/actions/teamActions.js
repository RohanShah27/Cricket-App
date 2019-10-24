import {
  GET_TOURNAMENT,
  SEARCH_TEAM_FOR_VIEW_TEAM_PAGE,
  GET_TEAM_BY_ID,
  GET_TEAM_STATS,
  GET_PLAYER_STATS_FOR_TEAMS,
  GET_PLAYER_STATS_FOR_TEAMS_BOWLER,
  TEAM_STATS_GRAPH_ODI,
  TEAM_STATS_GRAPH_TEST,
  TEAM_STATS_GRAPH_T20
} from "./Types";
import axios from "axios";
const url = "http://localhost:5000/api/team";

// getting teams with respect to tournament
export const getTournament = tournament => dispatch => {
  console.log(tournament);
  return axios.post(url + "/tournament", tournament).then(res => {
    dispatch({
      type: GET_TOURNAMENT,
      payload: res.data.data
    });
    console.log(res.data.data);
  });
};

// getting team searched with team name passed
export const searchTeamForViewTeamPage = team => dispatch => {
  console.log(team);
  return axios
    .post(url + "/teamsearch", team)
    .then(res => {
      dispatch({
        type: SEARCH_TEAM_FOR_VIEW_TEAM_PAGE,
        payload: res.data.data
      });
      console.log(res.data.data);
    })
    .catch(err => {
      console.log(err);
    });
};

// getting team details with id passed
export const getTeamById = team_id => dispatch => {
  return axios
    .post(url + "/teambyid", team_id)
    .then(res => {
      dispatch({
        type: GET_TEAM_BY_ID,
        payload: res.data.data
      });
      console.log(res.data.data);
    })
    .catch(err => {
      console.log(err);
    });
};

// getting team stats matches played, win, loss, draw with team_id passed
export const getTeamStats = team_id => dispatch => {
  console.log(team_id);
  return axios
    .get("http://localhost:5000/api/team/matchtype/" + team_id)
    .then(res => {
      dispatch({
        type: GET_TEAM_STATS,
        payload: res.data.data
      });
      console.log(res.data.data);
    })
    .catch(err => {
      console.log(err);
    });
};

// getting top 5 batsmen and their stats for that team
export const getPlayerStatsForTeams = (
  team_id,
  match_type,
  gender
) => dispatch => {
  console.log(gender);
  return axios
    .post(
      "http://localhost:5000/api/team/playerstatsforteams/" +
        team_id +
        "/" +
        gender,
      match_type
    )
    .then(res => {
      dispatch({
        type: GET_PLAYER_STATS_FOR_TEAMS,
        payload: res.data.data
      });
      console.log(res.data.data);
    })
    .catch(err => {
      console.log(err);
    });
};

// getting top 5 bowlers and their stats for that team
export const getPlayerStatsForTeamsBowler = (
  team_id,
  match_type,
  gender
) => dispatch => {
  return axios
    .post(
      "http://localhost:5000/api/team/playerstatsforteamsbowler/" +
        team_id +
        "/" +
        gender,
      match_type
    )
    .then(res => {
      dispatch({
        type: GET_PLAYER_STATS_FOR_TEAMS_BOWLER,
        payload: res.data.data
      });
      console.log(res.data.data);
    })
    .catch(err => {
      console.log(err);
    });
};

// Graph For mapping team stats for match_type = "ODI"
export const teamStatsGraphOdi = id => dispatch => {
  return axios
    .get("http://127.0.0.1:5000/odistats/" + id)
    .then(res => {
      dispatch({
        type: TEAM_STATS_GRAPH_ODI,
        payload: res.data
      });
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};

// Graph For mapping team stats for match_type = "test"
export const teamStatsGraphTest = id => dispatch => {
  return axios
    .get("http://127.0.0.1:5000/teststats/" + id)
    .then(res => {
      dispatch({
        type: TEAM_STATS_GRAPH_TEST,
        payload: res.data
      });
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};

// Graph For mapping team stats for match_type = "T20"
export const teamStatsGraphT20 = id => dispatch => {
  return axios
    .get("http://127.0.0.1:5000/t20stats/" + id)
    .then(res => {
      dispatch({
        type: TEAM_STATS_GRAPH_T20,
        payload: res.data
      });
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};
