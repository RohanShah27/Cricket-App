import React, { Component } from "react";
import Navigation from "./Navigation";
import "../styles/playerProfile.css";
import { connect } from "react-redux";
import { searchPlayer } from "../actions/Players";

export class PlayerProfile extends Component {
  constructor(props) {
    // super(props) -> its parents and all of its parents properties
    super(props);
    // this.searchForPlayer = this.searchForPlayer.bind(this);
  }
  componentDidMount() {
    console.log(this.props);
    let player = {
      playerName: "Virat Kohli"
    };
    this.props.searchPlayer(player);
    console.log(this.props);
  }
  render() {
    console.log(this.props.player[0].batting_style);
    return (
      <div>
        <div className="navigation">
          <Navigation />
        </div>
        <div className="main">
          <div className="image-container"></div>
          <div className="playerdetails">
            <h1>{this.props.player[0].player_name}</h1>
            <p>{this.props.player[0].player_nation}</p>
          </div>
          <div className="personalinfo">
            {" "}
            <p>Date Of Birth: {this.props.player[0].player_dob}</p>
            <p>Batting Style: {this.props.player[0].batting_style}</p>
            <p>Bowling Style: {this.props.player[0].bowling_style}</p>
            <p>Role: {this.props.player[0].player_role}</p>
          </div>

          <div className="playerstats">
            <div className="wrapper">
              <div className="box-a">
                <b>ODI Ranking</b>
              </div>
              <div className="box-b">
                <b>Test Ranking</b>
              </div>
              <div className="box-c">
                <b>T20 Ranking</b>
              </div>
              <div className="row">
                <div className="box-d">{this.props.player[0].odi_ranking}</div>
                <div className="box-e">{this.props.player[0].test_ranking}</div>
                <div className="box-f">{this.props.player[0].t20_ranking}</div>
              </div>
            </div>
          </div>
          <div className="graphs"></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  player: state.playerReducer.player
});
export default connect(
  mapStateToProps,
  { searchPlayer }
)(PlayerProfile);
