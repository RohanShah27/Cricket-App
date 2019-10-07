import { LOGIN, GET_USERS, ADD_ADMIN, SEND_OTP, ADD_NEW_TEAM, RESET_PASSWORD, ERROR_TYPE } from "./Types";

import axios from "axios";
// import { resolve } from "dns";
//To get all the present admins in the database 
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
      dispatch({
        type: ERROR_TYPE,
        message: err.response.data.message
      })
    });
};

//To add a admin to the database 
export const addAdmin = user => dispatch => {
  console.log(user)
  return axios
    .post("http://localhost:5000/api/user/new", user,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      },
      user)
    .then(res => {
      dispatch({
        type: ADD_ADMIN,
        message: res.response.data.message
      });
      console.log(res.data);
    })
    .catch(err => {
      dispatch({
        type: ERROR_TYPE,
        message: err.response.data.message
      })
    });
};
//To update the password of an admin in the database
export const resetPassword = user => dispatch => {
  console.log(user)
  return axios
    .put("http://localhost:5000/api/user/resetpassword", user, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    },
      user)
    .then(res => {
      dispatch({
        type: RESET_PASSWORD
      });
      console.log(res.data);
    })
    .catch(err => {
      dispatch({
        type: ERROR_TYPE,
        data: err.response.data.message
      })
    });
}
//To add a team to the database 
export const addTeam = team => dispatch => {
  console.log(team)
  return axios
    .post("http://localhost:5000/api/user/newteam", team, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    },
      team)
    .then(res => {
      dispatch({
        type: ADD_NEW_TEAM
      });
      console.log(res.data);
    })
    .catch(err => {
      dispatch({
        type: ERROR_TYPE,
        data: err.response.data.message
      })
    });
};
//Route for sending password on the acquired email
export const sendPassword = user => dispatch => {
  // dispatch(startLoading());
  axios
    .post("http://localhost:5000/api/user/emailverify", user, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    },
      user)
    .then(res => {
      // dispatch(stopLoading());
      dispatch({
        type: SEND_OTP
      });
      // dispatch(resetPassword());
    })
    .catch(err => {
      dispatch({
        type: ERROR_TYPE,
        data: err.response.data.message
      })
    });
}

//login route for a user
export const login = (user, history) => dispatch => {
  return axios
    .post("http://localhost:5000/api/user/login", user)
    .then(res => {
      console.log(res.data.data);
      localStorage.setItem("token", res.data.data);
      history.push("/player");
      dispatch({
        type: LOGIN
      });
      console.log(res.data);
      // alert("Login successful");
      // history.push("/displayusers");
    })
    .catch(err => {
      dispatch({
        type: ERROR_TYPE,
        data: err.response.data.message
      })
    });
};
