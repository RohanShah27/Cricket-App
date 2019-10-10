import { combineReducers } from "redux";
import players from "./playerRankingReducer";
import teams from "./teamRanking";
import venueByCountry from "./Venues";
import tournamentTeam from "./teamReducer";
import headlines from "./headlinesReducer";
import fixtures from "./fixturesReducer";
import player from "./playersReducer";
import match from "./matchReducers";
import users from "./userReducer";

export default combineReducers({
  playerRankingReducer: players,
  teamRankingReducer: teams,
  venuesReducer: venueByCountry,
  teamReducer: tournamentTeam,
  headlinesReducer: headlines,
  fixturesReducer: fixtures,
  playerReducer: player,
  matchReducers: match,
  userReducer: users
});
