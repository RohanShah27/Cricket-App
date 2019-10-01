import React, { Component } from "react";
import { getPlayerRanking, getTeamRanking } from "../actions/Rankings";
import { connect } from "react-redux";
import "../styles/PlayerRanking.css";
import playeruser from "./player.jpg";
export class PlayerRanking extends Component {
  constructor(props) {
    super(props);
    this.sendData = this.sendData.bind(this);
    this.sendTeam = this.sendTeam.bind(this);
  }

  componentDidMount() {
    let ranking = {
      type: "Batting",
      format: "Test"
    };
    this.props.getPlayerRanking(ranking);
  }

  state = {
    type: "",
    format: "",
    teams_ranking: false
  };

  sendData(types, formats) {
    console.log(types);
    this.setState({
      type: types,
      format: formats,
      teams_ranking: false
    });
    let ranking = {
      type: this.state.type,
      format: this.state.format
    };
    this.props.getPlayerRanking(ranking);
  }

  sendTeam(types) {
    console.log(types);
    this.setState({
      format: types,
      teams_ranking: true
    });
    let ranking = {
      format: this.state.format
    };
    this.props.getTeamRanking(ranking);
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <div className="navbar">
          <div className="subnav">
            <button className="subnavbtn">
              Batting <i className="fa fa-caret-down"></i>
            </button>
            <div className="subnav-content">
              <p onClick={() => this.sendData("Batting", "Test")}>Test</p>
              <p onClick={() => this.sendData("Batting", "ODI")}>ODI</p>
              <p onClick={() => this.sendData("Batting", "T20")}>T20</p>
            </div>
          </div>
          <div className="subnav">
            <button className="subnavbtn">
              Bowling <i className="fa fa-caret-down"></i>
            </button>
            <div className="subnav-content">
              <p onClick={() => this.sendData("Bowling", "Test")}>Test</p>
              <p onClick={() => this.sendData("Bowling", "ODI")}>ODI</p>
              <p onClick={() => this.sendData("Bowling", "T20")}>T20</p>
            </div>
          </div>
          <div className="subnav">
            <button className="subnavbtn">
              All-Rounder <i className="fa fa-caret-down"></i>
            </button>
            <div className="subnav-content">
              <p onClick={() => this.sendData("All-rounder", "Test")}>Test</p>
              <p onClick={() => this.sendData("All-rounder", "ODI")}>ODI</p>
              <p onClick={() => this.sendData("All-rounder", "T20")}>T20</p>
            </div>
          </div>
          <div className="subnav">
            <button className="subnavbtn">
              Teams <i className="fa fa-caret-down"></i>
            </button>
            <div className="subnav-content">
              <p onClick={() => this.sendTeam("Test")}>Test</p>
              <p onClick={() => this.sendTeam("ODI")}>ODI</p>
              <p onClick={() => this.sendTeam("T20")}>T20</p>
            </div>
          </div>
        </div>
        {this.state.teams_ranking === false ? (
          <h1 className="rankining-content-header">
            ICC Cricket Rankings - Men's {this.state.format} {this.state.type}
          </h1>
        ) : (
          <h1 className="rankining-content-header">
            ICC Cricket Rankings - Men's {this.state.format}
          </h1>
        )}

        {this.state.teams_ranking === false ? (
          <div className="rankings-wrapper">
            <div className="rankings-box a">
              <b>Position</b>
            </div>
            <div className="rankings-box b"></div>
            <div className="rankings-box b">
              <b>Player</b>
            </div>
            <div className="rankings-box c">
              <b>Ratings</b>
            </div>
            {this.props.players.map(player => (
              <div className="rankings-row">
                <div className="rankings-box d">{player.position}</div>
                <div className="rankings-box e">
                  <img
                    src={playeruser}
                    alt="player"
                    className="rankingplayerIcon"
                  />
                </div>
                <div className="rankings-box f">{player.player_name}</div>
                <div className="rankings-box g">{player.ratings}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rankings-wrapper">
            <div className="rankings-box a">
              <b>Ranking</b>
            </div>
            <div className="rankings-box b">
              <b>Team</b>
            </div>
            <div className="rankings-box b">
              <b>Ratings</b>
            </div>
            <div className="rankings-box c">
              <b>Points</b>
            </div>
            {this.props.teams.map(team => (
              <div className="rankings-row">
                <div className="rankings-box d">{team.position}</div>
                <div className="rankings-box e">{team.team_name}</div>
                <div className="rankings-box f">{team.rating}</div>
                <div className="rankings-box g">{team.points}</div>
              </div>
            ))}
          </div>
        )}
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
