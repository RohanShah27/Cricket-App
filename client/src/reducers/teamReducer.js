import {
  GET_TEAM,
  GET_TOURNAMENT,
  SEARCH_TEAM_FOR_VIEW_TEAM_PAGE,
  GET_TEAM_BY_ID,
  GET_TEAM_STATS,
  GET_PLAYER_STATS_FOR_TEAMS,
  GET_PLAYER_STATS_FOR_TEAMS_BOWLER,
  TEAM_STATS_GRAPH_TEST,
  TEAM_STATS_GRAPH_T20,
  TEAM_STATS_GRAPH_ODI
} from "../actions/Types";

const initialState = {
  tournamentTeam: [],
  teamsearch: [],
  teamstats: [],
  playerstatsforteams: [],
  playerstatsforteamsbowler: [],
  odi_graph: [],
  test_graph: [],
  t20_graph: []
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TOURNAMENT:
      return {
        ...state,
        tournamentTeam: action.payload
      };

    case SEARCH_TEAM_FOR_VIEW_TEAM_PAGE:
      return {
        ...state,
        teamsearch: action.payload
      };

    case GET_TEAM_BY_ID:
      return {
        ...state,
        tournamentTeam: action.payload
      };

    case GET_TEAM_STATS:
      return {
        ...state,
        teamstats: action.payload
      };

    case GET_PLAYER_STATS_FOR_TEAMS:
      return {
        ...state,
        playerstatsforteams: action.payload
      };

    case GET_PLAYER_STATS_FOR_TEAMS_BOWLER:
      return {
        ...state,
        playerstatsforteamsbowler: action.payload
      };
    case TEAM_STATS_GRAPH_ODI:
      return {
        ...state,
        odi_graph: action.payload
      };
    case TEAM_STATS_GRAPH_TEST:
      return {
        ...state,
        test_graph: action.payload
      };
    case TEAM_STATS_GRAPH_T20:
      return {
        ...state,
        t20_graph: action.payload
      };
    default:
      return state;
  }
}
