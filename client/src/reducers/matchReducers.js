import {
  GET_RECENT_MATCHES,
  GET_MATCHESBYTYPE,
  SEARCH_TEAM,
  GET_MATCH_DETAILS,
  GET_SCORECARD,
  MATCH_SUMMARY,
  GET_MATCHES_BY_TEAM,
  GET_MATCHES_BY_TEAM_AND_TYPE,
  GET_MATCHES_BY_DATE,
  MANHATTAN_GRAPH_MATCH,
  PIECHART_BATSMAN_INNINGS1,
  PIECHART_BATSMAN_INNINGS2,
  PIECHART_BOWLER_INNINGS1,
  PIECHART_BOWLER_INNINGS2
} from "../actions/Types";

const initialState = {
  match: [],
  singlematch: [],
  viewmatch: [],
  manhattan: [],
  piebatsman1: [],
  piebatsman2: [],
  piebolwer1: [],
  piebolwer2: [],
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
        singlematch: action.payload
      };
    case SEARCH_TEAM:
      return { match: action.payload };
    case GET_MATCH_DETAILS:
      return { ...state, current_match: action.payload };
    case MATCH_SUMMARY:
      return { ...state, summary: action.payload };

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
    case MANHATTAN_GRAPH_MATCH:
      return {
        ...state,
        manhattan: action.payload
      };

    case PIECHART_BATSMAN_INNINGS1:
      return { ...state, piebatsman1: action.payload };
    case PIECHART_BATSMAN_INNINGS2:
      return { ...state, piebatsman2: action.payload };
    case PIECHART_BOWLER_INNINGS1:
      return { ...state, piebolwer1: action.payload };
    case PIECHART_BOWLER_INNINGS2:
      return { ...state, piebolwer2: action.payload };
    default:
      return state;
  }
}
