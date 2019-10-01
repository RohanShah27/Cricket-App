import { combineReducers } from "redux";
import players from "./playerRankingReducer";
import teams from "./teamRanking";
import venueByCountry from "./Venues";
import team from "./Team";
import headlines from "./headlinesReducer";
import fixtures from "./fixturesReducer";
import player from "./playersReducer";
import match from "./matchReducer";

export default combineReducers({
  playerRankingReducer: players,
  teamRankingReducer: teams,
  venuesReducer: venueByCountry,
  teamReducer: team,
  headlinesReducer: headlines,
  fixturesReducer: fixtures,
  playerReducer: player,
  matchReducer: match
});
