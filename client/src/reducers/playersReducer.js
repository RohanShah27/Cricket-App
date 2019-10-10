import { SEARCH_PLAYER, ALL_PLAYERS, PLAYER_SEARCH } from "../actions/Types";
const initialState = {
  player: [],
  players: []
};
export default function(state = initialState, action) {
  switch (action.type) {
    case SEARCH_PLAYER:
      return { ...state, player: action.payload };
    case ALL_PLAYERS:
      return { ...state, players: action.payload };
    case PLAYER_SEARCH:
      return { ...state, players: action.payload };
    default:
      return state;
  }
}
