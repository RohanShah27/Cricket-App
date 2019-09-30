import axios from "axios";
import { GET_FIXTURES } from "./Types";

const url = "http://localhost:5000/api/fixtures/";

export const getFixtures = () => dispatch => {
  return axios
    .get(url + "all")
    .then(res => {
      dispatch({
        type: GET_FIXTURES,
        payload: res.data.data
      });
      console.log(res.data.data);
    })
    .catch(err => {
      console.log(err);
    });
};
