import { GET_TOURNAMENT } from "./Types";
import axios from "axios";
const url = "http://localhost:5000/api/team";

export const getTournament = tournament => dispatch => {
  console.log(tournament);
  return axios.post(url + "/tournament", tournament).then(res => {
    dispatch({
      type: GET_TOURNAMENT,
      payload: res.data.data
    });
    console.log(res.data.data);
  });
};
