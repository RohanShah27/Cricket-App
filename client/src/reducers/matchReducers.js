import {
  GET_RECENT_MATCHES,
  GET_MATCHESBYTYPE,
  SEARCH_TEAM,
  GET_MATCH_DETAILS,
  GET_SCORECARD,
  MATCH_SUMMARY
} from "../actions/Types";

const initialState = {
  match: [],
  viewmatch: [],
  current_match: {
    player1: [{}, {}],
    toss: [{}, {}],
    player2: [{}, {}],
    player1_bowler: [{}, {}],
    player2_bowler: [{}, {}],
    result: [{}],
    umpire: [{}, {}],
    date: [{}, {}],
    venue: [{}],
    country: [{}, {}],
    runs: [{}],
    fours: [{}]
  },
  summary: []
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
        viewmatch: action.payload
      };

    case GET_SCORECARD:
      return {
        ...state,
        match: action.payload
      };
    case SEARCH_TEAM:
      return { match: action.payload };
    case GET_MATCH_DETAILS:
      return { ...state, current_match: action.payload };
    case MATCH_SUMMARY:
      return { ...state, summary: action.payload };
    default:
      return state;
  }
}
