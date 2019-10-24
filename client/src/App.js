import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

// Bhavana Gupta
import PlayerRanking from "./components/PlayerRanking";
import Match from "./components/Match";
// Rohan Shah
import Home from "./components/Home";
import PlayerProfile from "./components/PlayerProfile";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import PaginatePlayers from "./components/paginatePlayers";
// Yash Bhatia
import Login from "./components/Login";
import AdminPlayer from "./components/AdminPlayer";
import AddNewAdmin from "./components/AddNewAdmin";
import AddNewTeam from "./components/AddNewTeam";
import ResetPassword from "./components/ResetPassword";
import MatchDetails from "./components/MatchDetails";
//RohanK
import ViewTeam from "./components/ViewTeam";
import Team from "./components/Team";
// exporting App.js as a Class component
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    gender: "male"
  };
  // function to change gender to female -Rohan
  femaleState = () => {
    this.setState({
      gender: "female"
    });
  };
  // function to change gender to male -Rohan

  menState = () => {
    this.setState({
      gender: "male"
    });
  };
  render() {
    return (
      <Router>
        <div>
          {/* Call to Navigation component with props as femaleState and maleState functions and state as gender */}
          <Navigation
            femaleState={this.femaleState}
            menState={this.menState}
            gender={this.state.gender}
          />
          {/* Passing the gender property as props to the home component -Rohan */}
          <Route
            exact
            path="/"
            render={() => <Home gender={this.state.gender} />}
          ></Route>
          <Route
            exact
            path="/playerprofile/:player_id"
            component={PlayerProfile}
          ></Route>
          <Route exact path="/venues" component={Venues}></Route>
          <Route exact path="/teams" component={Team}></Route>
          {/* Passing the gender property as props to the PlayerRanking component -Rohan */}
          <Route
            exact
            path="/rankings"
            render={() => <PlayerRanking gender={this.state.gender} />}
          ></Route>
          {/* Passing the gender property as props to the Matches component -Rohan */}
          <Route
            exact
            path="/matches"
            component={props => <Match {...props} gender={this.state.gender} />}
          ></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/adminplayer" component={AdminPlayer}></Route>
          <Route exact path="/addnewadmin" component={AddNewAdmin} />
          <Route exact path="/addnewteam" component={AddNewTeam} />
          <Route exact path="/resetpassword" component={ResetPassword} />
          {/* Passing state props to view team component -Rohan */}
          <Route
            exact
            path="/viewteam/:team_id"
            component={props => (
              <ViewTeam {...props} gender={this.state.gender} />
            )}
          ></Route>
          {/* Passing state props to view Players component -Rohan */}
          <Route
            exact
            path="/Players"
            component={props => (
              <PaginatePlayers {...props} gender={this.state.gender} />
            )}
          ></Route>
          <Route
            exact
            path="/matchdetails/:match_id"
            component={MatchDetails}
          ></Route>

          <Footer />
        </div>
      </Router>
    );
  }
}
