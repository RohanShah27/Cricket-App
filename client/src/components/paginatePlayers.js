import React, { Component } from "react";
import "../styles/Players.css";
import virat from "./user.png";
import { getAllPlayers, playerSearch } from "../actions/Players";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import playerFemale from "../female.jpg";
import { Link } from "react-router-dom";

export class PaginatePlayers extends Component {
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
    this.props.getAllPlayers(this.props.gender);
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
  };
  // genMarkup = player => (
  //   <div className="players-card">
  //     <img src={virat} className="players-img "></img>
  //     <p className="player-name">{player.player_name}</p>
  //     <span className="team-name">
  //       <span style={{ color: "black" }}>Team:</span>{" "}
  //       {player.nation ? player.nation : "NA"}
  //     </span>
  //     <button
  //       onClick={() =>
  //         this.props.history.push("/playerprofile/" + player.player_id, {
  //           player
  //         })
  //       }
  //     >
  //       View
  //     </button>
  //   </div>
  // );
  loadMoreItems = () => {
    setTimeout(() => {
      this.setState({
        items: this.state.items + 10
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
    console.log("Paginate props", this.props.players);
    return (
      <div style={{ marginTop: "80px" }}>
        <div className="players-search-section">
          <input
            id="searchPlayer"
            type="text"
            placeholder="Search for Players"
            name="playerName"
            value={this.state.playerName}
            onChange={this.OnChange}
          />
          <button id="searchButton" onClick={this.searchForPlayer}>
            {" "}
            <i class="fa fa-search"></i>
          </button>
          {this.state.playerName == "" ? null : (
            <div className="player-search-result">
              <span className="search_result_data">
                <p>
                  {this.props.search_result
                    ? this.props.search_result.map((player, index) => (
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
                            id={"name" + index}
                            style={{
                              fontSize: "18px",
                              paddingTop: "10px ",
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
            {this.state.pagePlayers.map((player, index) => {
              return (
                <div className="players-card">
                  {/* <img src={virat} className="players-img "></img> */}
                  <img
                    className="players-img "
                    src={
                      player.player_image
                        ? "data:image/jpeg;base64," +
                          new Buffer(player.player_image)
                        : this.props.gender == "male"
                        ? virat
                        : playerFemale
                    }
                  />
                  <p className="player-name" id={"playerName" + index}>
                    {player.player_name}
                  </p>
                  <span className="team-name">
                    <span style={{ color: "black" }} id={"playerTeam" + index}>
                      Team:
                    </span>{" "}
                    <span id={"playerTeamInfo" + index}>
                      {player.nation ? player.nation : "NA"}
                    </span>
                  </span>
                  <button
                    id={"playerButton" + index}
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
)(PaginatePlayers);
