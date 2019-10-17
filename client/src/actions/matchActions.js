import axios from "axios";
import {
  GET_RECENT_MATCHES,
  GET_MATCHESBYTYPE,
  SEARCH_TEAM,
  GET_MATCH_DETAILS,
  GET_SCORECARD,
  MATCH_SUMMARY
} from "./Types";

const url = "http://localhost:5000/api/matches";

export const getMatchesRecentMatches = () => dispatch => {
  return axios
    .get(url + "/getrecent")
    .then(res => {
      dispatch({
        type: GET_RECENT_MATCHES,
        payload: res.data.data
      });
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};

export const getMatchesByType = matches => dispatch => {
  console.log("Actions", matches);
  return axios
    .post(url + "/getbytype", matches)
    .then(res => {
      dispatch({
        type: GET_MATCHESBYTYPE,
        payload: res.data.data
      });
      console.log("ODI", res.data.data);
    })
    .catch(err => {
      console.log(err);
    });
};

export const getScorecard = id => dispatch => {
  return axios
    .get(url + "/getscorecard/" + id.match_id)
    .then(res => {
      dispatch({
        type: GET_SCORECARD,
        payload: res.data.data
      });
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};

export const getMatchDetails = id => dispatch => {
  console.log(" id actions " + id.match_id);
  return axios
    .get(url + "/getmatchdetails/" + id.match_id)
    .then(res => {
      dispatch({
        type: GET_MATCH_DETAILS,
        payload: res.data.data
      });
      console.log(res.data.data);
    })
    .catch(err => {
      console.log(err);
    });
};

export const searchTeam = team_name => dispatch => {
  console.log(team_name);
  return axios
    .post(url + "/match_search", team_name)
    .then(res => {
      dispatch({
        type: SEARCH_TEAM,
        payload: res.data.data
      });
      console.log(res.data.data);
    })
    .catch(err => {
      console.log(err);
    });
};
export const getAllMatchDetails = id => dispatch => {
  console.log(id);
  return axios
    .get(url + "/summary/" + id.match_id)
    .then(res => {
      dispatch({
        type: MATCH_SUMMARY,
        payload: res.data.data
      });
      console.log("Details", res.data.data);
    })
    .catch(err => {
      console.log(err);
    });
};
