import React, { Component } from "react";
import "../styles/Players.css";
import virat from "./rishabh.jpg";
import { getAllPlayers, playerSearch } from "../actions/Players";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

export class paginatePlayers extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    playerName: "",
    items: 10,
    loadingState: false,
    height: 800,
    pagePlayers: []
  };
  componentDidMount() {
    this.props.getAllPlayers();
  }
  componentWillReceiveProps(nextProps) {
    nextProps.players.length > 0
      ? this.displayPlayers(nextProps.players)
      : console.log(0, " players");
  }
  displayPlayers = players => {
    const { items } = this.state;

    if (players.length === 0) return;
    let pagePlayers = [];
    for (let i = 0; i < items; i++) {
      pagePlayers.push(players[i]);
    }
    this.setState({ pagePlayers });
    console.log("PagePlayers array", this.state.pagePlayers.length);
    // return this.pagePlayers;
  };
  genMarkup = player => (
    <div className="players-card">
      <img src={virat} className="players-img "></img>
      <p className="player-name">{player.player_name}</p>
      <span className="team-name">
        <span style={{ color: "black" }}>Team:</span>{" "}
        {player.nation ? player.nation : "NA"}
      </span>
      <button
        onClick={() =>
          this.props.history.push("/playerprofile/" + player.player_id, {
            player
          })
        }
      >
        View
      </button>
    </div>
  );
  loadMoreItems = () => {
    // this.setState({ loadingState: true, height: this.state.height + 800 });
    setTimeout(() => {
      this.setState({
        items: this.state.items + 10
        //   loadingState: false
      });
      this.displayPlayers(this.props.players);
    }, 1000);
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
          {this.state.playerName == "" ? null : (
            <div className="player-search-result">
              <span className="search_result_data">
                <p>
                  {this.props.search_result
                    ? this.props.search_result.map(player => (
                        <Link
                          style={{
                            textDecoration: "none"
                          }}
                          to={{
                            pathname: "/playerprofile/" + player.player_id,
                            state: { player }
                          }}
                        >
                          <p
                            style={{
                              fontSize: "18px",
                              paddingTop: "2px ",
                              display: "flex",
                              justifyContent: "center"
                            }}
                          >
                            {player.player_name}
                          </p>
                        </Link>
                      ))
                    : null}
                </p>
              </span>
            </div>
          )}
        </div>
        <InfiniteScroll
          dataLength={this.state.pagePlayers.length} //This is important field to render the next data
          next={this.loadMoreItems}
          hasMore={true}
          height={600}
          loader={
            <div className="loader-container">
              <div className="user-loader"></div>
            </div>
          }
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen all Players</b>
            </p>
          }
        >
          <div className="players-card-container">
            {this.state.pagePlayers.map(player => {
              return (
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
                        {
                          player
                        }
                      )
                    }
                  >
                    View
                  </button>
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  players: state.playersReducer.players,
  search_result: state.playersReducer.search_player
});
export default connect(
  mapStateToProps,
  { getAllPlayers, playerSearch }
)(paginatePlayers);
