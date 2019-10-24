import React, { Component } from "react";
import "../styles/Players.css";
import playerMale from "./user.png";
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
    // Get allplayers from the database -Rohan
    this.props.getAllPlayers(this.props.gender);
  }
  componentWillReceiveProps(nextProps) {
    nextProps.players.length > 0
      ? // display more players when scroll limit is reached-Rohan
        this.displayPlayers(nextProps.players)
      : console.log(0, " players");
  }
  // Takes parameter all players and slices them with 10 players at one time -Rohan
  displayPlayers = players => {
    const { items } = this.state;

    if (players.length === 0) return;
    let pagePlayers = [];
    for (let i = 0; i < items; i++) {
      pagePlayers.push(players[i]);
    }
    // Returning the batch of players to the state -Rohan
    this.setState({ pagePlayers });
  };

  // Function that calls display palayers function aftera timeout of 1s when scroll limit is reached -Rohan
  loadMoreItems = () => {
    setTimeout(() => {
      this.setState({
        items: this.state.items + 10
      });
      this.displayPlayers(this.props.players);
    }, 1000);
  };
  // Local search for a player -Rohan
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
    // Live search on change of state value of playerName -Rohan
    this.props.playerSearch(playerName);
  };
  render() {
    return (
      <div style={{ marginTop: "80px" }}>
        {/* Player search Secction -Rohan */}
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
          {/* End of playerSearch Section -Rohan */}
          {this.state.playerName == "" ? null : (
            <div className="player-search-result">
              <span className="search_result_data">
                <p>
                  {/* If search_result has data then map player names as search result  -Rohan */}
                  {this.props.search_result
                    ? this.props.search_result.map((player, index) => (
                        // Redirect user to players profile on click of player name -Rohan
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
        {/* Start of infinite scroll component -Rohan */}
        <InfiniteScroll
          dataLength={this.state.pagePlayers.length} //This is important field to render the next data -Rohan
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
            {/* Mapping the batches of players items 10 -Rohan */}
            {this.state.pagePlayers.map((player, index) => {
              return (
                // Player Card --Rohan
                <div className="players-card">
                  <img
                    className="players-img "
                    src={
                      // Converting the byte array image into .img format using Buffer -Rohan
                      player.player_image
                        ? "data:image/jpeg;base64," +
                          new Buffer(player.player_image)
                        : this.props.gender == "male"
                        ? playerMale //stock image for male player
                        : playerFemale //stock image for female player
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
                  {/* Redirect user to player profile component when user click view button -Rohan */}
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
        {/* End of infinite scroll component -Rohan */}
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
