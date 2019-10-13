import React, { Component } from "react";
import "../styles/Players.css";
import virat from "./rishabh.jpg";
import { getAllPlayers, playerSearch } from "../actions/Players";
import { connect } from "react-redux";

export class Players extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getAllPlayers();
  }
  state = {
    playerName: ""
  };
  searchForPlayer = () => {
    let playerName = {
      playerName: this.state.playerName
    };
    this.props.playerSearch(playerName);
  };
  OnChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    let playerName = {
      playerName: this.state.playerName
    };
    this.props.playerSearch(playerName);
  };
  render() {
    if (this.state.playerName == "") {
      this.props.getAllPlayers();
    }
    return (
      <div style={{ marginTop: "80px" }}>
        <div className="players-search-section">
          <input
            type="text"
            placeholder="Search for Players"
            name="playerName"
            value={this.state.playerName}
            onChange={this.OnChange}
          />
          <button onClick={this.searchForPlayer}>
            {" "}
            <i class="fa fa-search"></i>
          </button>
        </div>
        {this.props.players.length != 0 ? (
          <div className="players-card-container">
            {this.props.players.map(player => (
              <div className="players-card">
                <img src={virat} className="players-img "></img>
                <p className="player-name">{player.player_name}</p>
                <span className="team-name">
                  <span style={{ color: "black" }}>Team:</span>{" "}
                  {player.nation ? player.nation : "NA"}
                </span>
                <button
                  onClick={() =>
                    this.props.history.push(
                      "/playerprofile/" + player.player_id,
                      { player }
                    )
                  }
                >
                  View
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="loader-container">
            <div className="user-loader"></div>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  players: state.playersReducer.players
});
export default connect(
  mapStateToProps,
  { getAllPlayers, playerSearch }
)(Players);
