import axios from "axios";
import {
  SEARCH_PLAYER,
  ALL_PLAYERS,
  PLAYER_SEARCH,
  ERROR_TYPE,
  ADD_PLAYERS,
  GET_PLAYERS,
  PLAYER_STATS
} from "../actions/Types";

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
      dispatch({
        type: ERROR_TYPE,
        //dispatch error message from node -yash
        data: err.response.data.message
      });
    });
};

//To create a player in the database -yash
export const createPlayers = player => dispatch => {
  return axios
    .post(
      "http://localhost:5000/api/players/newplayers",
      player,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      },
      player
    )
    .then(res => {
      dispatch({
        type: ADD_PLAYERS
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR_TYPE,
        //dispatch error message from node -yash
        payload: err.response.data.message
      });
    });
};

// Retreiev all the players from the database -Rohan
export const getAllPlayers = genderObj => dispatch => {
  console.log(genderObj);
  return axios
    .get(url + "all/" + genderObj)
    .then(res => {
      dispatch({ type: ALL_PLAYERS, payload: res.data.data });
      console.log(res.data.data);
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

// Action to fetch playerStats graph -Rohan
export const playerStats = playerId => dispatch => {
  return axios
    .get("http://127.0.0.1:5002/playerstats/" + playerId)
    .then(res => {
      dispatch({
        type: PLAYER_STATS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
