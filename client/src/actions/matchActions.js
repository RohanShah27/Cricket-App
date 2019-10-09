import axios from "axios";
import { GET_RECENT_MATCHES, GET_MATCHESBYTYPE, GET_GRAPH } from "./Types";

const url = "http://localhost:5000/api/matches/";

export const getMatchesRecentMatches = () => dispatch => {
  return axios
    .get(url + "getrecent")
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
  console.log(matches);
  return axios
    .post(url + "/getbytype", matches)
    .then(res => {
      dispatch({
        type: GET_MATCHESBYTYPE,
        payload: res.data.data
      });
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};

export const getGraphs = match_id => dispatch => {
  console.log(match_id.match_id);
  console.log(match_id.inning);
  // console.log(inning);
  return axios
    .get(
      "http://127.0.0.1:5000/player/" +
        match_id.match_id +
        "/" +
        match_id.inning
    )
    .then(res => {
      dispatch({
        type: GET_GRAPH,
        payload: res.data.data
      });
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};
