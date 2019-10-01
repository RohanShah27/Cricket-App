import { GET_MATCHESBYTYPE, GET_RECENTMATCHES } from "../actions/Types";

const initialState = {
  match: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MATCHESBYTYPE:
      return {
        ...state,
        match: action.payload
      };

    case GET_RECENTMATCHES:
      return {
        ...state,
        match: action.payload
      };

    default:
      return state;
  }
}
