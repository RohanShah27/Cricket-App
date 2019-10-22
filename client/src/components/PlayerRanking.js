import React, { Component } from "react";
import { getPlayerRanking, getTeamRanking } from "../actions/Rankings";
import { connect } from "react-redux";
import "../styles/PlayerRanking.css";
import playermale from "../stockPlayer.png";
import teamIcon from "../teamStock.jpg";
import playerFemale from "../stockPlayerFemale.jpg";
export class PlayerRanking extends Component {
  constructor(props) {
    super(props);
    this.sendData = this.sendData.bind(this);
  }

  componentDidMount() {
    let ranking = {
      format: "Test",
      gender: this.props.gender
    };
    this.props.getPlayerRanking(ranking);
    this.props.getTeamRanking(ranking);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.gender != nextProps.gender)
      this.props.getPlayerRanking(nextProps.gender);
  }

  state = {
    type: "",
    format: "",
    testClick: true,
    odiClick: false,
    t20Click: false
  };

  sendData(formats) {
    this.setState({
      format: formats
    });
    let ranking = {
      format: this.state.format,
      gender: this.props.gender
    };
    this.props.getPlayerRanking(ranking);
    this.props.getTeamRanking(ranking);
  }

  render() {
    let playerBatting = this.props.players.slice(0, 10);
    let playerBowling = this.props.players.slice(10, 20);
    let playerallRounder = this.props.players.slice(20, 30);
    console.log(this.props.gender);
    return (
      <div>
        {/* Start of Button-Container fer Navigating through format -- Bhavana */}

        {this.props.gender == "male" ? (
          <div className="rankings-button-container">
            <button
              id="testTab"
              className={
                this.state.testClick
                  ? "ranking-test-button ranking-active"
                  : "ranking-test-button"
              }
              onClick={() => {
                this.sendData("Test");
                this.setState({
                  testClick: true,
                  odiClick: false,
                  t20Click: false
                });
              }}
            >
              Test
            </button>
            <button
              id="odiTab"
              className={
                this.state.odiClick ? " ranking-active" : "ranking-odi-button"
              }
              onClick={() => {
                this.sendData("ODI");
                this.setState({
                  testClick: false,
                  odiClick: true,
                  t20Click: false
                });
              }}
            >
              ODI
            </button>
            <button
              id="t20Tab"
              className={
                this.state.t20Click
                  ? "ranking-t20-active"
                  : "ranking-t20-button"
              }
              onClick={() => {
                this.sendData("T20");
                this.setState({
                  testClick: false,
                  odiClick: false,
                  t20Click: true
                });
              }}
            >
              T20
            </button>
          </div>
        ) : (
          <div className="rankings-button-container">
            <button
              className={
                this.state.testClick
                  ? "ranking-test-button ranking-active"
                  : "ranking-test-button"
              }
              onClick={() => {
                this.sendData("ODI");
                this.setState({
                  testClick: true,
                  odiClick: false,
                  t20Click: false
                });
              }}
            >
              ODI
            </button>

            <button
              className={
                this.state.t20Click
                  ? "ranking-t20-active"
                  : "ranking-t20-button"
              }
              onClick={() => {
                this.sendData("T20");
                this.setState({
                  testClick: false,
                  odiClick: false,
                  t20Click: true
                });
              }}
            >
              T20
            </button>
          </div>
        )}
        {/* End of Button-Container fer Navigating through format -- Bhavana */}

        {/* Start of main container for embedding all tables - Bhavana */}
        <div className="rankingmain-container">
          {/* Conatiner for first row -- Bhavana */}
          <div class="ranking-container">
            {/* Start of Table for Batting Stats for all Formats -- Bhavana*/}
            <div>
              <h2 className="rankings-container-header">
                {" "}
                ICC {this.state.format} Batting
              </h2>
              <table class="ranking-table">
                <tr>
                  <th>Rank</th>
                  <th></th>
                  <th>Player</th>
                  <th>Team</th>
                  <th>Ratings</th>
                </tr>
                {playerBatting.map((player, index) => (
                  <tr>
                    <td id={"battingPosition" + index}>{player.position}</td>
                    <td>
                      <img
                        className="rankingplayerIcon"
                        src={
                          this.props.gender == "male"
                            ? playermale
                            : playerFemale
                        }
                      />
                    </td>
                    <td id={"battingName" + index}>{player.player_name}</td>
                    <td id={"battingTeam" + index}>{player.player_team}</td>
                    <td id={"battingRating" + index}>{player.ratings}</td>
                  </tr>
                ))}
              </table>
            </div>
            {/* End of Table for Batting Stats for all Formats -- Bhavana*/}

            {/* Start of Table for Bowling Stats for all Formats -- Bhavana*/}
            <div>
              <h2 className="rankings-container-header">
                ICC {this.state.format} Bowling
              </h2>
              <table class="ranking-table">
                <tr>
                  <th>Rank</th>
                  <th></th>
                  <th>Player</th>
                  <th>Team</th>
                  <th>Ratings</th>
                </tr>
                {playerBowling.map((player, index) => (
                  <tr>
                    <td id={"bowlingPosition" + index}>{player.position}</td>
                    <td>
                      <img
                        className="rankingplayerIcon"
                        src={
                          this.props.gender == "male"
                            ? playermale
                            : playerFemale
                        }
                      />
                    </td>
                    <td id={"bowlingName" + index}>{player.player_name}</td>
                    <td id={"bowlingTeam" + index}>{player.player_team}</td>
                    <td id={"bowlingRating" + index}>{player.ratings}</td>
                  </tr>
                ))}
              </table>
            </div>
            {/* End of Table for Bowling Stats for all Formats -- Bhavana*/}
          </div>
          {/* Conatiner for first row -- Bhavana */}

          {/*  Start ofSecond row for ranking starts here */}
          <div class="ranking-container1">
            {/* Start of Table for All-Rounder Stats for all Formats */}
            <div>
              <h2 className="rankings-container-header">
                ICC {this.state.format} All-Rounder
              </h2>
              <table class="ranking-table">
                <tr>
                  <th>Rank</th>
                  <th></th>
                  <th>Player</th>
                  <th>Team</th>
                  <th>Ratings</th>
                </tr>
                {playerallRounder.map((player, index) => (
                  <tr>
                    <td id={"allRounderPosition" + index}>{player.position}</td>
                    <td>
                      <img
                        className="rankingplayerIcon"
                        src={
                          this.props.gender == "male"
                            ? playermale
                            : playerFemale
                        }
                      />
                    </td>
                    <td id={"allRounderName" + index}>{player.player_name}</td>
                    <td id={"allRounderTeam" + index}>{player.player_team}</td>
                    <td id={"allRounderRating" + index}>{player.ratings}</td>
                  </tr>
                ))}
              </table>
            </div>
            {/* End of Table for All-Rounder Stats for all Formats */}

            {/* Start of Table for Team Stats for all Formats */}
            <div>
              <h2 className="rankings-container-header">
                ICC {this.state.format} Teams
              </h2>
              <table class="ranking-table">
                <tr>
                  <th>Rank</th>
                  <th>Team</th>
                  <th>Ratings</th>
                  <th>Points</th>
                </tr>
                {this.props.teams.map((team, index) => (
                  <tr>
                    <td id={"teamPosition" + index}>{team.position}</td>
                    <td>
                      <img className="rankingplayerIcon" src={teamIcon} />
                    </td>
                    <td id={"teamName" + index}>{team.team_name}</td>
                    <td id={"teamRating" + index}>{team.rating}</td>
                    <td id={"teamPoints" + index}>{team.points}</td>
                  </tr>
                ))}
              </table>
            </div>
            {/* End of Table for Team Stats for all Formats */}
          </div>
          {/*  End ofSecond row for ranking starts here */}
        </div>
        {/* End of main container for embedding all tables - Bhavana */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  players: state.playerRankingReducer.players,
  teams: state.teamRankingReducer.teams
});

export default connect(
  mapStateToProps,
  { getPlayerRanking, getTeamRanking }
)(PlayerRanking);
