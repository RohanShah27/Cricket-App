import React, { Component } from "react";
import "../styles/playerProfile.css";
import { connect } from "react-redux";
import { searchPlayer, playerStats } from "../actions/Players";
import stockPlayer from "../stockPlayer.png";
import playerfemale from "../stockPlayerFemale.jpg";

export class PlayerProfile extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    // Getting details of the player + Playing Stats -Rohan
    this.props.searchPlayer(this.props.match.params.player_id);
    // Call to action to fetch the graph for player Statiticis -Rohan
    this.props.playerStats(this.props.match.params.player_id);
  }
  componentWillReceiveProps(nextProps) {
    // If the user searches for a different player on global search then call to the function to get new details and new stats
    if (nextProps.player_id != this.props.match.params.player_id) {
      this.props.searchPlayer(this.props.match.params.player_id);
      this.props.playerStats(this.props.match.params.player_id);
    }
  }
  render() {
    return (
      <div style={{ marginBottom: "80px" }}>
        {this.props.player ? (
          <>
            <div className="main-section">
              {/* Start of flex container for image and Player Name -Rohan*/}
              <div className="player-flex-container">
                <div className="flexGrowForPlayer">
                  <img
                    className="profile-img"
                    src={
                      // Converting the byte array image format to image format using Buffer -Rohan
                      this.props.location.state.player.player_image
                        ? "data:image/jpeg;base64," +
                          new Buffer(
                            this.props.location.state.player.player_image
                          )
                        : this.props.location.state.player.gender == "male"
                        ? stockPlayer //Stock image for male players -Rohan
                        : playerfemale //Stock image for female player -Rohan
                    }
                  />
                </div>
                {/* Player name  -Rohan*/}
                <div className="flexGrowEight">
                  <h1 id="playerName">
                    {this.props.history.location.state.player.player_name
                      ? this.props.history.location.state.player.player_name
                      : "NA"}
                  </h1>
                  <h5 id="playerNation">
                    Team: {/*Display Team name from database -Rohan*/}
                    {this.props.location.state.player.nation
                      ? this.props.location.state.player.nation
                      : "NA"}
                  </h5>
                  {/* Dummy data for players info -Rohan */}

                  <div className="profile">
                    {this.props.location.state.player.info ? (
                      this.props.location.state.player.info
                    ) : (
                      <>
                        Passionate. No word describes Virat Kohli better. His
                        passion for cricket has made him one of the best batsmen
                        in the world across formats, and has also helped him
                        grow into a ruthless captain. It's also passion that
                        defines Kohli's emotional, effervescent and at times
                        firecracker character. Virat Kohli does not hold back
                        and that remains his strength.
                      </>
                    )}
                  </div>
                </div>
              </div>
              {/* End of Flex container -Rohan*/}
              <div className="player-row">
                {/* Personal Details of player -Rohan*/}
                <div className="side">
                  <h2>Personal Details</h2>
                  <p>
                    Date Of Birth:
                    <br />
                    <span className="personal-detail-content" id="playerDOB">
                      {" "}
                      {/* Convert the date from GMT to 27-Nov-1997 format -Rohan */}
                      {this.props.location.state.player.player_dob
                        ? new Date(
                            this.props.location.state.player.player_dob
                          ).toLocaleDateString("en-IN", {
                            month: "short",
                            day: "2-digit",
                            year: "numeric"
                          })
                        : "NA"}
                    </span>
                  </p>
                  <hr className="line" />
                  <p>
                    Role: <br />
                    <span className="personal-detail-content" id="playerRole">
                      {this.props.location.state.player.player_role
                        ? this.props.location.state.player.player_role
                        : "NA"}
                    </span>
                  </p>
                  <hr className="line" />
                  <p>
                    Batting Style:
                    <br />{" "}
                    <span className="personal-detail-content" id="battingStyle">
                      {this.props.location.state.player.batting_style
                        ? this.props.location.state.player.batting_style
                        : "NA"}
                    </span>
                  </p>

                  <hr className="line" />
                  <p>
                    Bowling Style: <br />
                    <span className="personal-detail-content" id="bowlingStyle">
                      {this.props.location.state.player.bowling_style
                        ? this.props.location.state.player.bowling_style
                        : "NA"}
                    </span>{" "}
                  </p>
                </div>
                {/* End of personal Details -Rohan*/}
                {/* Player Stats section -Rohan*/}
                <div className="main">
                  <h2 id="playerStats">Player Stats</h2>
                  <div>
                    <table className="players-stats-table">
                      <tr>
                        <th>Format</th>
                        <th>200's</th>
                        <th>100's</th>
                        <th>Runs</th>
                        <th>6's</th>
                        <th>4's</th>
                        <th>Wickets</th>
                        <th>50's</th>
                      </tr>
                      {/* Mapping the values receieved from the server -Rohan */}
                      {this.props.player.ODI
                        ? // Objecct maping -Rohan
                          Object.keys(this.props.player).map((keyName, i) => (
                            <tr>
                              <td id={"keyName" + i}>{keyName}</td>
                              {Object.keys(this.props.player[keyName]).map(
                                (keys, i) => (
                                  <>
                                    <td id={"keyValue" + i}>
                                      {this.props.player[keyName][keys]}
                                    </td>
                                  </>
                                )
                              )}
                            </tr>
                          ))
                        : null}
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* Visualization section for player stats in bar graph format -Rohan */}
            <div id="playerStatsVisualizationSection">
              <h1>Bar graph for Total Runs</h1>
              <iframe
                id="visualization"
                className="playerProfileStat"
                src={this.props.playerstats}
              />
            </div>
          </>
        ) : (
          <div className="loader-container" style={{ marginTop: "20vw" }}>
            <div className="user-loader"></div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  player: state.playersReducer.player,
  playerstats: state.playersReducer.playerstats
});
export default connect(
  mapStateToProps,
  { searchPlayer, playerStats }
)(PlayerProfile);
