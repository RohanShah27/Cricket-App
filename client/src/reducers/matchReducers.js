import { GET_RECENT_MATCHES } from "../actions/Types";

const initialState = {
  match: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_RECENT_MATCHES:
      return {
        ...state,
        match: action.payload
      };

    default:
      return state;
  }
}
