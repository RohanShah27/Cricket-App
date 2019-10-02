import { LOGIN, GET_USERS } from "./Types";

import axios from "axios";

export const getUsers = () => dispatch => {
  return axios
    .get("http://localhost:5000/api/user/all")
    .then(res => {
      dispatch({
        type: GET_USERS,
        payload: res.data.data
      });
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};

export const login = (user, history) => dispatch => {
  return axios
    .post("http://localhost:5000/api/user/login", user)
    .then(res => {
      console.log(res.data.data);
      localStorage.setItem("token", res.data.data);
      history.push("/");
      dispatch({
        type: LOGIN
      });
      console.log(res.data);
      // history.push("/displayusers");
    })
    .catch(err => {
      console.log(err);
      alert("Invalid Credentials");
    });
};
