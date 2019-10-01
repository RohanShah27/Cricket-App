import { GET_TEAM, GET_TOURNAMENT } from "../actions/Types";

const initialState = {
  tournamentTeam: []
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TEAM:
      return {
        ...state,
        team: action.payload
      };
    case GET_TOURNAMENT:
      return {
        ...state,
        tournamentTeam: action.payload
      };
    default:
      return state;
  }
}
