import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Venues from "./components/Venues";
import Team from "./components/Team";
import PlayerRanking from "./components/PlayerRanking";
import Home from "./components/Home";
import PlayerProfile from "./components/PlayerProfile";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Match from "./components/Match";
import Login from "./components/Login";
import Pagination from "./components/Pagination";

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Route exact path="/" component={Home}></Route>
        <Route
          exact
          path="/playerprofile/:playerName"
          component={PlayerProfile}
        ></Route>
        <Route exact path="/venues" component={Venues}></Route>
        <Route exact path="/teams" component={Team}></Route>
        <Route exact path="/rankings" component={PlayerRanking}></Route>
        <Route exact path="/series" component={Match}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/pagination" component={Pagination}></Route>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
