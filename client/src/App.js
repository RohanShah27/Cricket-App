import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import PlayerProfile from "./components/PlayerProfile";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
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
        <Footer />
      </div>
    </Router>
  );
}

export default App;
