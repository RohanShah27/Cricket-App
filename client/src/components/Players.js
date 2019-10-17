import React, { Component } from "react";
import "../styles/Players.css";
import virat from "./rishabh.jpg";
import { getAllPlayers, playerSearch } from "../actions/Players";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component"

export class Players extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tournamentTeam: Array.from({ length: 20 }),
      hasMore: true
    }
  }

  fetchMoreData = () => {
    if (this.state.tournamentTeam.length >= 500) {
      this.setState({ hasMore: false });
      return;
    }
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      this.setState({
        tournamentTeam: this.state.tournamentTeam.concat(Array.from({ length: 20 }))
      });
    }, 500);
  };

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
        <div id="scrollableDiv" style={{ height: 700, overflow: "auto" }}>
          <InfiniteScroll
            dataLength={this.state.tournamentTeam.length}
            next={this.fetchMoreData}
            hasMore={this.state.hasMore}
            loader={<h4>Loading...</h4>}
            scrollableTarget="scrollableDiv"
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {this.props.players.length != 0 ? (
              <div className="players-card-container">
                {this.props.players.map(player => (
                  <div className="players-card">
                    <img src={virat} className="players-img "></img>
                    <p className="player-name">{player.player_name}</p>
                    <span className="team-name">India</span>
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
          </InfiniteScroll>
        </div>
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
