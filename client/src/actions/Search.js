import { GET_SEARCH } from "./Types";
import axios from "axios";

export const getGlobalSearchResult = search_term => dispatch => {
  return axios
    .post("http://localhost:5000/api/searchfeature/search", search_term)
    .then(res => {
      dispatch({
        type: GET_SEARCH,
        payload: res.data.data
      });
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};
