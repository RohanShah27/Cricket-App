import { GET_TEAM_RANKING } from "../actions/Types";

const initialstate = {
  teams: []
};

export default function(state = initialstate, action) {
  switch (action.type) {
    case GET_TEAM_RANKING:
      return { ...state, teams: action.payload };
    default:
      return state;
  }
}
