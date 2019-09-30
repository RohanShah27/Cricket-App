import React, { Component } from "react";
import {} from "../actions/Players";
import "../styles/navbar.css";
import { searchPlayer } from "../actions/Players";
import { connect } from "react-redux";

export default class Navigation extends Component {
  constructor(props) {
    // super(props) -> its parents and all of its parents properties
    super(props);
    // this.searchForPlayer = this.searchForPlayer.bind(this);
  }
  state = {
    playerName: ""
  };
  OnChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="container">
        <h3 className="heading">
          <a>Crickstrait</a>
          <a className="options">Men</a>
          <a className="options">Women</a>
        </h3>

        <ol className="main-menu">
          <li>
            <a>Teams</a>
          </li>
          <li>
            <a>Top Players</a>
          </li>
          <li>
            <a>Series</a>
          </li>
          <li>
            <form>
              <input
                type="text"
                placeholder="eg: Virat Kohli"
                name="playerName"
                onChange={this.OnChange}
                value={this.state.playerName}
              />
              <button
                type="submit"
                onClick={() => {
                  this.props.history.push(
                    "/playerprofile",
                    this.state.playerName
                  );
                }}
              >
                <i class="fa fa-search"></i>
              </button>
            </form>
          </li>
        </ol>
      </div>
    );
  }
}
