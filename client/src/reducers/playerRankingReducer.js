import { GET_PLAYER_RANKING } from "../actions/Types";

const initialstate = {
  players: []
};

export default function(state = initialstate, action) {
  switch (action.type) {
    // Get Player Rankings based on format and gender
    case GET_PLAYER_RANKING:
      return { ...state, players: action.payload };
    default:
      return state;
  }
}
