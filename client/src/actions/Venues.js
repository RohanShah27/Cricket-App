import { GET_VENUE_BYCOUNTRY } from "./types";
import axios from "axios";
const url = "http://localhost:5000/api/venues";

export const getVenuesByCountry = countryName => dispatch => {
  console.log("action " + countryName);
  return axios.get(url + "/all", countryName).then(res => {
    dispatch({
      type: GET_VENUE_BYCOUNTRY,
      payload: res.data.data
    });
    console.log("data " + res.data.data);
  });
};
