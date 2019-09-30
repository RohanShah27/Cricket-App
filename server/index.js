const express = require("express");
const headlines = require("./routes/api/headlines");
const fixtures = require("./routes/api/fixtures");
const players = require("./routes/api/players");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
// Make route for Headlines
app.use("/api/headlines/", headlines);
// Make route for Fixtures
app.use("/api/fixtures/", fixtures);
// Make route for Players
app.use("/api/players/", players);
const port = process.env.port || 5000;
app.listen(port, () => console.log(`Server is listening on port : ${port}`));
module.exports = app;
