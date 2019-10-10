import {
  GET_TEAM,
  GET_TOURNAMENT,
  SEARCH_TEAM_FOR_VIEW_TEAM_PAGE,
  GET_TEAM_BY_ID,
  GET_TEAM_STATS,
  GET_PLAYER_STATS_FOR_TEAMS,
  GET_PLAYER_STATS_FOR_TEAMS_BOWLER
} from "../actions/Types";

const initialState = {
  tournamentTeam: [],
  teamstats: [],
  playerstatsforteams: [],
  playerstatsforteamsbowler: []
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
        tournamentTeam: action.payload
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
    default:
      return state;
  }
}
