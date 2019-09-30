import { SEARCH_PLAYER } from "../actions/Types";
const initialState = {
  player: [[]]
};
export default function(state = initialState, action) {
  switch (action.type) {
    case SEARCH_PLAYER:
      return { player: action.payload };
    default:
      return state;
  }
}
