import axios from "axios";
import { GET_RECENT_MATCHES, GET_MATCHESBYTYPE } from "./Types";

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
