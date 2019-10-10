import axios from "axios";
import { SEARCH_PLAYER, ALL_PLAYERS, PLAYER_SEARCH } from "../actions/Types";

const url = "http://localhost:5000/api/players/";

// Getting player details of a particular player -Rohan
export const searchPlayer = playerId => dispatch => {
  console.log(playerId);
  return axios
    .post(url + "player_search/" + playerId)
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
// Retreiev all the players from the database -Rohan
export const getAllPlayers = () => dispatch => {
  return axios
    .get(url + "all")
    .then(res => {
      dispatch({ type: ALL_PLAYERS, payload: res.data.data });
    })
    .catch(err => {
      console.log(err);
    });
};

// Action for player page search bar -Rohan
export const playerSearch = playerName => dispatch => {
  return axios
    .post(url + "searchPlayer", playerName)
    .then(res => {
      dispatch({
        type: PLAYER_SEARCH,
        payload: res.data.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
