import { LOGIN, GET_USERS } from "../actions/Types";

const initialstate = {
  users: []
};

export default function(state = initialstate, action) {
  switch (action.type) {
    case LOGIN:
      return state;
    case GET_USERS:
      return { ...state, users: action.payload };
    default:
      return state;
  }
}
