import {
    ADD_PLAYERS_TYPE, ERROR_TYPE
} from "../actions/Types";

const initialstate = {
    playerType: [],
    error: ""
};

export default function (state = initialstate, action) {
    switch (action.type) {
        case ADD_PLAYERS_TYPE:
            return { ...state, playerType: action.payload };
        case ERROR_TYPE:
            return { ...state, users: action.payload };
        default:
            return state;
    }
}
