import {
  LOGIN,
  GET_USERS,
  SEND_OTP,
  ADD_NEW_TEAM,
  RESET_PASSWORD,
  ERROR_TYPE
} from "../actions/Types";

const initialstate = {
  users: [],
  error: ""
};

export default function(state = initialstate, action) {
  switch (action.type) {
    case LOGIN:
      return state;
    case ADD_NEW_TEAM:
      return state;
    case RESET_PASSWORD:
      return state;
    case SEND_OTP:
      return state;
    case GET_USERS:
      return { ...state, users: action.payload };
    case ERROR_TYPE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
