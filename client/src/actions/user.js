import {
  LOGIN,
  GET_USERS,
  ADD_ADMIN,
  SEND_OTP,
  ADD_NEW_TEAM,
  RESET_PASSWORD,
  ERROR_TYPE
} from "./Types";

import axios from "axios";

//To get all the present admins in the database - yash
export const getUsers = () => dispatch => {
  return axios
    .get("http://localhost:5000/api/user/all")
    .then(res => {
      dispatch({
        type: GET_USERS,
        payload: res.data.data
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR_TYPE,
        //dispatch error message from node -yash
        payload: err.response.data.message
      });
      console.log(err.response.data.message);
    });
};

//To add a admin to the database - yash
export const addAdmin = user => dispatch => {
  return axios
    .post(
      "http://localhost:5000/api/user/new",
      user,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      },
      user
    )
    .then(res => {
      dispatch({
        type: ADD_ADMIN
        //dispatch error message from node -yash
        // message: res.response.data.message
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

//To update the password of an admin in the database -yash
export const resetPassword = user => dispatch => {
  return axios
    .put("http://localhost:5000/api/user/resetpassword", user)
    .then(res => {
      dispatch({
        type: RESET_PASSWORD
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR_TYPE,
        //dispatch error message from node -yash
        payload: err.response.data.message
      });
      console.log(err);
    });
};
//To add a team to the database -yash
export const addTeam = team => dispatch => {
  return axios
    .post(
      "http://localhost:5000/api/user/newteam",
      team,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      },
      team
    )
    .then(res => {
      dispatch({
        type: ADD_NEW_TEAM
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

//Route for sending password on the acquired email -yash
export const sendPassword = user => dispatch => {
  axios
    .post(
      "http://localhost:5000/api/user/emailverify",
      user,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      },
      user
    )
    .then(res => {
      dispatch({
        type: SEND_OTP
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR_TYPE,
        //dispatch error message from node -yash
        payload: err.response.data.message
      });
      console.log(err.response.data.message);
    });
};

//login route for a user - yash
export const login = (user, history) => dispatch => {
  return axios
    .post("http://localhost:5000/api/user/login", user)
    .then(res => {
      localStorage.setItem("token", res.data.data);
      history.push("/");
      dispatch({
        type: LOGIN
      });
      localStorage.setItem("token", res.data.data);
      history.push("/");
    })
    .catch(err => {
      dispatch({
        type: ERROR_TYPE,
        //dispatch error message from node -yash
        payload: err.response.data.message
      });
      console.log(err.response.data.message);
    });
};
