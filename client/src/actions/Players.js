import axios from "axios";
import { SEARCH_PLAYER, ADD_PLAYERS, GET_PLAYERS, ERROR_TYPE } from "../actions/Types";

const url = "http://localhost:5000/api/players/";
//If player is in the database it should be searched and shown 
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
      dispatch({
        type: ERROR_TYPE,
        data: err.response.data.message
      })
    });
};
//To create a player in the database 
export const createPlayers = player => dispatch => {
  return axios
    .post("http://localhost:5000/api/players/new", player,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      },
      player)
    .then(res => {
      dispatch({
        type: ADD_PLAYERS
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR_TYPE,
        data: err.response.data.message
      })
    });
};
//To get all the players present in the database
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
        data: err.response.data.message
      })
    });
};
