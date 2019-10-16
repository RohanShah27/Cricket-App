import { SEARCH_PLAYER, ALL_PLAYERS, PLAYER_SEARCH } from "../actions/Types";
const initialState = {
  player: [],
  players: [],
  search_player: [[]]
};
export default function(state = initialState, action) {
  switch (action.type) {
    // Get Stats of a particular player
    case SEARCH_PLAYER:
      return { ...state, player: action.payload };
    // Get all players from database
    case ALL_PLAYERS:
      return { ...state, players: action.payload };
    // Search particular player on the players page
    case PLAYER_SEARCH:
      return { ...state, search_player: action.payload };
    default:
      return state;
  }
}
