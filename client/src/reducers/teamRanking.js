import { GET_TEAM_RANKING } from "../actions/Types";

const initialstate = {
  teams: []
};

export default function(state = initialstate, action) {
  switch (action.type) {
    // Get Team Rankings based on format and gender
    case GET_TEAM_RANKING:
      return { ...state, teams: action.payload };
    default:
      return state;
  }
}
