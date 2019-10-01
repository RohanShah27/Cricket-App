import { GET_PLAYER_RANKING } from "../actions/Types";

const initialstate = {
  players: []
};

export default function(state = initialstate, action) {
  switch (action.type) {
    case GET_PLAYER_RANKING:
      return { ...state, players: action.payload };
    default:
      return state;
  }
}
