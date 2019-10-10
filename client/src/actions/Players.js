import axios from "axios";
import {
  SEARCH_PLAYER,
  ALL_PLAYERS,
  PLAYER_SEARCH,
  ERROR_TYPE,
  ADD_PLAYERS,
  GET_PLAYERS
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
      "http://localhost:5000/api/players/new",
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
        data: err.response.data.message
      });
    });
};

//To get all the players present in the database -yash
export const getPlayers = () => dispatch => {
  return axios
    .get("http://localhost:5000/api/players/all")
    .then(res => {
      dispatch({
        type: GET_PLAYERS,
        payload: res.data.data
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR_TYPE,
        //dispatch error message from node -yash
        data: err.response.data.message
      });
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
