import axios from "axios";
import { SEARCH_PLAYER } from "../actions/Types";

const url = "http://localhost:5000/api/players/";

export const searchPlayer = playerName => dispatch => {
  return axios
    .post(url + "player_search", playerName)
    .then(res => {
      dispatch({
        type: SEARCH_PLAYER,
        payload: res.data.data
      });
      console.log(res.data.data);
    })
    .catch(err => {
      console.log(err);
    });
};
