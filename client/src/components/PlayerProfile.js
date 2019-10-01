import React, { Component } from "react";
import Navigation from "./Navigation";
import "../styles/playerProfile.css";
import { connect } from "react-redux";
import { searchPlayer } from "../actions/Players";
import virat from "../virat-kohli.png";

export class PlayerProfile extends Component {
  constructor(props) {
    // super(props) -> its parents and all of its parents properties
    super(props);
    // this.searchForPlayer = this.searchForPlayer.bind(this);
  }
  componentDidMount() {
    console.log(this.props);
    let player = {
      playerName: this.props.match.params.playerName
    };
    this.props.searchPlayer(player);
    console.log(this.props);
  }
  render() {
    console.log(this.props.player[0].batting_style);
    return (
      <div>
        <div className="main-section">
          <div className="flex-container">
            <div style={{ flexGrow: 1 }}>
              <img src={virat}></img>
            </div>
            <div style={{ flexGrow: 8 }}>
              <h1>{this.props.player[0].player_name}</h1>
              <h5>Team: {this.props.player[0].player_nation}</h5>
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
          <div className="row">
            <div className="side">
              <h2>Personal Details</h2>
              <p>Date Of Birth: {this.props.player[0].player_dob}</p>
              <p>Batting Style: {this.props.player[0].batting_style}</p>
              <p>Bowling Style: {this.props.player[0].bowling_style}</p>
              <p>Role: {this.props.player[0].player_role}</p>
            </div>
            <div className="main">
              <h2>Player Stats</h2>
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
                <div className="stats-row">
                  <div className="box-d">
                    {this.props.player[0].odi_ranking}
                  </div>
                  <div className="box-e">
                    {this.props.player[0].test_ranking}
                  </div>
                  <div className="box-f">
                    {this.props.player[0].t20_ranking}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="image-container"></div>
          <div className="playerdetails"></div>
          <div className="personalinfo"> </div>

          <div className="playerstats">
            
          </div>
          <div className="graphs"></div> */}
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
