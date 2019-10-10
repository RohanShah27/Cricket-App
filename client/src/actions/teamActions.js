import {
  GET_TOURNAMENT,
  SEARCH_TEAM_FOR_VIEW_TEAM_PAGE,
  GET_TEAM_BY_ID,
  GET_TEAM_STATS,
  GET_PLAYER_STATS_FOR_TEAMS,
  GET_PLAYER_STATS_FOR_TEAMS_BOWLER
} from "./Types";
import axios from "axios";
const url = "http://localhost:5000/api/team";

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

export const searchTeamForViewTeamPage = team => dispatch => {
  console.log(team);
  return axios
    .post(url + "/teamsearch", team)
    .then(res => {
      dispatch({
        type: SEARCH_TEAM_FOR_VIEW_TEAM_PAGE,
        payload: res.data.data
      });
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};

export const getTeamById = team_id => dispatch => {
  return axios
    .post(url + "/teambyid", team_id)
    .then(res => {
      dispatch({
        type: GET_TEAM_BY_ID,
        payload: res.data.data
      });
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};

export const getTeamStats = team_id => dispatch => {
  console.log(team_id);
  return axios
    .get("http://localhost:5000/api/team/matchtype/" + team_id)
    .then(res => {
      dispatch({
        type: GET_TEAM_STATS,
        payload: res.data.data
      });
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

export const getPlayerStatsForTeams = (team_id, match_type) => dispatch => {
  return axios
    .post(
      "http://localhost:5000/api/team/playerstatsforteams/" + team_id,
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

export const getPlayerStatsForTeamsBowler = (
  team_id,
  match_type
) => dispatch => {
  return axios
    .post(
      "http://localhost:5000/api/team/playerstatsforteamsbowler/" + team_id,
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
