import {
  GET_RECENT_MATCHES,
  GET_MATCHESBYTYPE,
  GET_MATCHES_BY_TEAM,
  GET_MATCHES_BY_TEAM_AND_TYPE,
  GET_MATCHES_BY_DATE
} from "../actions/Types";

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

    case GET_MATCHESBYTYPE:
      return {
        ...state,
        match: action.payload
      };

    case GET_MATCHES_BY_TEAM:
      return {
        ...state,
        match: action.payload
      };

    case GET_MATCHES_BY_TEAM_AND_TYPE:
      return {
        ...state,
        match: action.payload
      };

    case GET_MATCHES_BY_DATE:
      return {
        ...state,
        match: action.payload
      };
    default:
      return state;
  }
}
