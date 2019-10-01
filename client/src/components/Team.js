import React, { Component } from "react";
import { connect } from "react-redux";
import "../styles/Team.css";
import international from "./international.png";
import ipl from "./ipl.png";
import { getTournament } from "../actions/Team";

export class Team extends Component {
  constructor(props) {
    super(props);
    this.sendTeam = this.sendTeam.bind(this);
  }

  state = {
    tournament: ""
  };

  componentDidMount() {
    let team = { tournament: "International" };
    this.props.getTournament(team);
  }

  sendTeam(team) {
    this.setState({
      tournament: team
    });
    let tournament = {
      tournament: this.state.tournament
    };
    this.props.getTournament(tournament);
  }

  render() {
    // console.log(this.props.team);
    return (
      <div className="team-body">
        <div className="pc-playerTab">
          <input
            defaultChecked="defaultChecked"
            id="playerTab1"
            type="radio"
            name="pct"
          />
          <input id="playerTab2" type="radio" name="pct" />
          <nav>
            <ul>
              <li className="playerTab1">
                <label
                  htmlFor="playerTab1"
                  onClick={() => this.sendTeam("International")}
                >
                  International
                </label>
              </li>
              <li className="playerTab2">
                <label
                  htmlFor="playerTab2"
                  onClick={() => this.sendTeam("IPL")}
                >
                  IPL
                </label>
              </li>
              <li className="playerTab3">
                <label
                  htmlFor="playerTab3"
                  onClick={() => this.sendTeam("Big Bash League")}
                >
                  Big Bash League
                </label>
              </li>
              <li className="playerTab4">
                <label
                  htmlFor="playerTab4"
                  onClick={() => this.sendTeam("Pakistan Super League")}
                >
                  Pakistan Super League
                </label>
              </li>
            </ul>
          </nav>

          <section>
            <div className="playerTab1">
              <div className="team-teamTestimonials">
                {this.props.tournamentTeam.map(teams => (
                  <div className="teamcomponent-card">
                    <div className="layer"></div>
                    <div className="team-content">
                      <img
                        src={international}
                        className="internationalLogo"
                        alt="International"
                      />
                      <p>{teams.team_name}</p>
                      <div className="team-details">
                        <p>
                          <button id="playerViewDetails"> View Details</button>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="playerTab2">
              <h2>IPL Teams</h2>
              <p></p>
              <div className="team-teamTestimonials">
                {this.props.tournamentTeam.map(teams => (
                  <div className="teamcomponent-card">
                    <div className="layer"></div>
                    <div className="team-content">
                      <img src={ipl} className="iplLogo" alt="IPL" />
                      <p>{teams.team_name}</p>
                      <div className="team-details">
                        <p>
                          <button id="playerViewDetails"> View Details</button>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="playerTab3">
              <h2>BBL Teams</h2>
              <p></p>
              <div
                className="
                team-teamTestimonials"
              >
                {this.props.tournamentTeam.map(teams => (
                  <div className="teamcomponent-card">
                    <div className="layer"></div>
                    <div className="team-content">
                      <p>{teams.team_name}</p>
                      <div className="team-details">
                        <p>
                          <button id="playerViewDetails"> View Details</button>
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
  tournamentTeam: state.teamReducer.tournamentTeam
});

export default connect(
  mapStateToProps,
  { getTournament }
)(Team);
