import { GET_PLAYER_RANKING, GET_TEAM_RANKING } from "./Types";
import axios from "axios";

// Get Player Ranking based on match type and gender - Bhavana
export const getPlayerRanking = ranking => dispatch => {
  return (
    axios
      // Making axios request to server
      .post("http://localhost:5000/api/playerRanking/ranking", ranking)
      .then(res => {
        dispatch({
          type: GET_PLAYER_RANKING,
          payload: res.data.data
        });
      })
      .catch(err => {
        console.log(err);
      })
  );
};

// Get Team Ranking based on match type and gender - Bhavana
export const getTeamRanking = type => dispatch => {
  return (
    axios
      // Making axios request to server
      .post("http://localhost:5000/api/playerRanking/teamranking", type)
      .then(res => {
        dispatch({
          type: GET_TEAM_RANKING,
          payload: res.data.data
        });
      })
      .catch(err => {
        console.log(err);
      })
  );
};
