import { GET_PLAYER_RANKING, GET_TEAM_RANKING } from "./Types";
import axios from "axios";

export const getPlayerRanking = ranking => dispatch => {
  console.log(ranking);
  return axios
    .post("http://localhost:5000/api/playerRanking/ranking", ranking)
    .then(res => {
      dispatch({
        type: GET_PLAYER_RANKING,
        payload: res.data.data
      });
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};

export const getTeamRanking = type => dispatch => {
  console.log(type);
  return axios
    .post("http://localhost:5000/api/playerRanking/teamranking", type)
    .then(res => {
      dispatch({
        type: GET_TEAM_RANKING,
        payload: res.data.data
      });
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};
