import headlines from "./headlinesReducer";
import fixtures from "./fixturesReducer";
import player from "./playersReducer";
import { combineReducers } from "redux";
export default combineReducers({
  headlinesReducer: headlines,
  fixturesReducer: fixtures,
  playerReducer: player
});
