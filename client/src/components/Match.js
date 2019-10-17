import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import "../styles/match.css";
import india from "../assests/india.jpg";
import pakistan from "../assests/pakistan.jpg";
import { getMatchesByType } from "../actions/matchActions";
var json;
export class Match extends Component {
  constructor(props) {
    super(props);
    // this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    let type = { type: "ODI" };
    this.props.getMatchesByType(type);
  }

  state = {
    type: "",
    matchType: "ODI",
    activeClass: "match-active-option",
    data: [],
    userId: 1,
    loading: false
  };
  sendType() {
    console.log("type" + this.state.type);
    let matches = {
      type: this.state.type
    };
    this.props.getMatchesByType(matches);
  }

  sendData(types) {
    this.setState({ matchType: types });
    console.log(types);
    this.setState({
      type: types
    });
    this.sendType();
  }

  render() {
    console.log(this.props.match.result);
    return (
      <div>
        <div className="match-pc-tab">
          <input
            defaultChecked="defaultChecked"
            id="match-tab1"
            type="radio"
            name="pct"
            onClick={() => this.sendData("ODI")}
          />
          <input
            id="match-tab2"
            type="radio"
            name="pct"
            onClick={() => this.sendData("Test")}
          />
          <input
            id="match-tab3"
            type="radio"
            name="pct"
            onClick={() => this.sendData("T20")}
          />
          <nav>
            <ul>
              <li className="match-tab1">
                <label htmlFor="match-tab1">
                  <b>ODI</b>
                </label>
              </li>
              <li className="match-tab2">
                <label htmlFor="match-tab2">
                  <b>TEST</b>
                </label>
              </li>
              <li className="match-tab3">
                <label htmlFor="match-tab3">
                  <b>T20</b>
                </label>
              </li>
            </ul>
          </nav>
          <section>
            <div className="match-tab1">
              <div className="match-testimonials">
                {this.props.viewmatch.map(match => (
                  <div
                    className="match-card"
                    onClick={() => {
                      this.props.history.push(
                        "/matchdetails/" + match.match_id,
                        { match }
                      );
                    }}
                  >
                    <div className="match-parent">
                      <div className="match-first">
                        <img className="match-img" src={india} />
                        <p>{match.team1}</p>
                        <p className="match-p">250/5 (50.0)</p>
                      </div>
                      <div className="match-second">
                        <img className="match-img" src={pakistan} />

                        <p>{match.team2}</p>
                        <p className="match-p">224/6 (50.0)</p>
                      </div>

                      <div className="match-third">
                        {match.match_winner} {match.won_by}
                        <p>MoM: {match.player_of_the_match}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  viewmatch: state.matchReducers.viewmatch
});

export default connect(
  mapStateToProps,
  { getMatchesByType }
)(Match);
