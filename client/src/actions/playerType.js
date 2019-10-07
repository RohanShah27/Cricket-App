import {
    ADD_PLAYERS_TYPE, ERROR_TYPE
} from "./Types";
import axios from "axios";
//To get the player Type(i.e Batsman,Bowler,AllRounder)
export const getPlayertype = () => dispatch => {
    return axios
        .get("http://localhost:5000/api/playertype/all")
        .then(res => {
            dispatch({
                type: ADD_PLAYERS_TYPE,
                payload: res.data.data
            });
            console.log("function returned")
        })
        .catch(err => {
            dispatch({
                type: ERROR_TYPE,
                data: err.response.message
            })
        });
};