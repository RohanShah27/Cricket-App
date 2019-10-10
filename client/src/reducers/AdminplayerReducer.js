import {
    ADD_PLAYERS,
    ERROR_TYPE
} from "../actions/Types";

const initialstate = {
    players: [],
    error: ""
};

export default function (state = initialstate, action) {
    switch (action.type) {
        case ADD_PLAYERS:
            return state;
        case ERROR_TYPE:
            return { ...state, users: action.payload };
        default:
            return state;
    }
}