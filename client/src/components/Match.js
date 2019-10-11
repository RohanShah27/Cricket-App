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
    let obj = {
      match_id: 14,
      inning: 2
    };
    this.props.getGraphs(obj);
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
                {this.props.match.map(match => (
                  <div className="match-card">
                    <div className="match-parent">
                      <div className="match-first">
                        <img className="match-img" src={india} />
                        <p>
                          <b>{match.team_name1}</b>
                        </p>
                        <p className="match-p">
                          <b>250/5 (50.0)</b>
                        </p>
                      </div>
                      <div className="match-second">
                        <b>
                          <img className="match-img" src={pakistan} />
                        </b>
                        <p>
                          <b>{match.team_name2}</b>
                        </p>
                        <p className="match-p">
                          <b>224/6 (50.0)</b>
                        </p>
                      </div>

                      <div className="match-third">
                        <b>
                          {match.winner}
                          {match.result}
                        </b>
                        <p>
                          <b>MoM: {match.pom}</b>
                        </p>
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
  match: state.matchReducers.match
});

export default connect(
  mapStateToProps,
  { getMatchesByType }
)(Match);
