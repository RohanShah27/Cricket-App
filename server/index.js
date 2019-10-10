const express = require("express");
const playersRanking = require("./routes/api/playerRanking");
const venues = require("./routes/api/Venues");
const team = require("./routes/api/Team");
const user = require("./routes/api/user");
const headlines = require("./routes/api/headlines");
const fixtures = require("./routes/api/fixtures");
const players = require("./routes/api/players");
const matches = require("./routes/api/matches");
const playerType = require("./routes/api/playerType");
const search = require("./routes/api/search");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const logger = require("morgan");
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(logger("common"));
app.use(bodyParser.json());
// Make route for Headlines
app.use("/api/headlines/", headlines);
// Make route for Fixtures
app.use("/api/fixtures/", fixtures);
// Make route for Players
app.use("/api/players/", players);
// Make route for Matches
app.use("/api/matches/", matches);
//Make route for playersRanking
app.use("/api/playerRanking/", playersRanking);
app.use("/api/venues", venues);
app.use("/api/team", team);
//Make route for admin
app.use("/api/user/", user);
//make route for player_role
app.use("/api/playertype/", playerType);
// Make route for global search feauture
app.use("/api/searchfeature/", search);

const port = process.env.port || 5000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
module.exports = app;
