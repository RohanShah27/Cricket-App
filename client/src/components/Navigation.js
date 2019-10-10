import React, { Component } from "react";
import {} from "../actions/Players";
import "../styles/navbar.css";
import { Link } from "react-router-dom";

export default class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    gender: "male"
  };
  removeToken = () => {
    localStorage.removeItem("token");
    this.forceUpdate();
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
  OnChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    console.log(this.props);
    return (
      <div className="nav-container">
        <div class="nav-header">
          <a class="logo">
            <Link to="/">Crickstrait</Link>
          </a>
          {this.state.gender == "male" ? (
            <a class="options" style={{ color: "#c2c2c2c2" }}>
              Men
            </a>
          ) : (
            <a class="options" onClick={this.menState}>
              Men
            </a>
          )}
          {this.state.gender == "female" ? (
            <a class="options" style={{ color: "#c2c2c2c2" }}>
              Women
            </a>
          ) : (
            <a class="options" onClick={this.femaleState}>
              Women
            </a>
          )}

          <input class="menu-btn" type="checkbox" id="menu-btn" />
          <label class="menu-icon" for="menu-btn">
            <span class="navicon"></span>
          </label>

          <ul class="menu">
            <li>
              <Link to="/rankings">Rankings</Link>
            </li>
            <li>
              <Link to="/matches">Matches</Link>
            </li>
            <li>
              <Link to="/teams">Teams</Link>
            </li>
            <li>
              <Link to="/players">Players</Link>
            </li>
            <li style={{ textAlign: "center" }}>
              <input class="nav-search-bar" type="text" />
              <button class="nav-search-button">
                <i class="fa fa-search"></i>
              </button>
            </li>
            {localStorage.getItem("token") ? (
              <li>
                <Link to="/" onClick={this.removeToken}>
                  Logout
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}
