import React, { Component } from "react";
import "../styles/playerProfile.css";
import { connect } from "react-redux";
import { searchPlayer } from "../actions/Players";
import stockPlayer from "../stockPlayer.png";

export class PlayerProfile extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    console.log(this.props.match.params.player_id);
    this.props.searchPlayer(this.props.match.params.player_id);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.player_id != this.props.match.params.player_id) {
      this.props.searchPlayer(this.props.match.params.player_id);
    }
  }
  render() {
    return (
      <div style={{ marginBottom: "80px" }}>
        <div className="main-section">
          {/* Start of flex container for image and Player Name -Rohan*/}
          <div className="player-flex-container">
            <div style={{ flexGrow: 2, alignItems: "center" }}>
              <img
                className="profile-img"
                style={{ borderRadius: 5 + "em" }}
                src={
                  this.props.location.state.player.player_image
                    ? "data:image/jpeg;base64," +
                      new Buffer(this.props.location.state.player.player_image)
                    : stockPlayer
                }
              />
            </div>
            <div style={{ flexGrow: 8 }}>
              <h1 id="playerName">
                {this.props.history.location.state.player.player_name
                  ? this.props.history.location.state.player.player_name
                  : "NA"}
              </h1>
              <h5 id="playerNation">
                Team:
                {this.props.location.state.player.nation
                  ? this.props.location.state.player.nation
                  : "NA"}
              </h5>
              <div className="profile">
                Passionate. No word describes Virat Kohli better. His passion
                for cricket has made him one of the best batsmen in the world
                across formats, and has also helped him grow into a ruthless
                captain. It's also passion that defines Kohli's emotional,
                effervescent and at times firecracker character. Virat Kohli
                does not hold back and that remains his strength.
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
                  {this.props.location.state.player.player_dob
                    ? this.props.location.state.player.player_dob
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
                    ? Object.keys(this.props.player).map((keyName, i) => (
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
                    : console.log("no player found")}
                </table>
              </div>
            </div>
          </div>
        </div>
        <div id="playerStatsVisualizationSection"></div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  player: state.playersReducer.player
});
export default connect(
  mapStateToProps,
  { searchPlayer }
)(PlayerProfile);
