import axios from "axios";
import { GET_HEADLINES, GET_SINGLE_HEADLINE } from "./Types";

const url = "http://localhost:5000/api/headlines/";
// Retrieve all headlines from the database -Rohan
export const getHeadlines = () => dispatch => {
  return axios
    .get(url + "all")
    .then(res => {
      dispatch({
        type: GET_HEADLINES,
        payload: res.data.data
      });
      console.log(res.data.data);
    })
    .catch(err => {
      console.log(err);
    });
};
// Get a single headline from the database -Rohan
export const getHeadline = () => dispatch => {
  return axios
    .get(url + "single_headline")
    .then(res => {
      dispatch({
        type: GET_SINGLE_HEADLINE,
        payload: res.data.data
      });
      console.log(res.data.data);
    })
    .catch(err => {
      console.log(err);
    });
};
