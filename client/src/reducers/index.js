import { combineReducers } from "redux";
import players from "./playerRankingReducer";
import teams from "./teamRanking";
import venueByCountry from "./Venues";
import team from "./Team";
import headlines from "./headlinesReducer";
import fixtures from "./fixturesReducer";
import player from "./playersReducer";
import match from "./matchReducers";
import users from "./userReducer";
import adminplayers from "./AdminplayerReducer";
import playerType from "./playertypeReducer";
import search from "./searchReducer";

export default combineReducers({
  playerRankingReducer: players,
  teamRankingReducer: teams,
  venuesReducer: venueByCountry,
  teamReducer: team,
  headlinesReducer: headlines,
  fixturesReducer: fixtures,
  AdminplayerReducer: adminplayers,
  playersReducer: player,
  playertypeReducer: playerType,
  matchReducers: match,
  userReducer: users,
  searchReducer: search
});
