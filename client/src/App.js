import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import PlayerProfile from "./components/PlayerProfile";
function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/playerprofile" component={PlayerProfile}></Route>
      </div>
    </Router>
  );
}

export default App;
