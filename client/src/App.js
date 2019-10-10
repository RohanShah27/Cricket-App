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
import Players from "./components/Players";
// Yash Bhatia
import Player from "./components/Player";
import AddNewAdmin from "./components/AddNewAdmin";
import AddNewTeam from "./components/AddNewTeam";
import ResetPassword from "./components/ResetPassword";
export default class App extends React.Component {
  state = {
    gender: "male"
  };
  femaleState = () => {
    this.setState({
      gender: "female"
    });
  };
  menState = () => {
    this.setState({
      gender: "male"
    });
  };
  render() {
    return (
      <Router>
        <div>
          <Navigation
            femaleState={this.femaleState}
            menState={this.menState}
            gender={this.state.gender}
          />
          <Route exact path="/" component={Home}></Route>
          <Route
            exact
            path="/playerprofile/:player_id"
            component={PlayerProfile}
          ></Route>
          <Route exact path="/players" component={Players}></Route>
          <Route exact path="/venues" component={Venues}></Route>
          <Route exact path="/teams" component={Team}></Route>
          <Route exact path="/rankings" component={PlayerRanking}></Route>
          <Route exact path="/series" component={Match}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/player" component={Player}></Route>
          <Route exact path="/addnewadmin" component={AddNewAdmin} />
          <Route exact path="/addnewteam" component={AddNewTeam} />
          <Route exact path="/resetpassword" component={ResetPassword} />
          <Footer />
        </div>
      </Router>
    );
  }
}
