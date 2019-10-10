import React, { Component } from "react";
import { connect } from "react-redux";
import "../styles/Team.css";
import international from "./international.png";
import ipl from "./ipl.png";
import {
  getTournament,
  searchTeamForViewTeamPage
} from "../actions/teamActions";

export class Team extends Component {
  constructor(props) {
    super(props);
    this.sendTeam = this.sendTeam.bind(this);
  }

  state = {
    tournament: "",
    team_name: ""
  };

  componentDidMount() {
    let team = { tournament: "others" };
    this.props.getTournament(team);
  }

  OnChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    event.preventDefault();

    let teamname = {
      teamname: this.state.team_name
    };
    this.props.searchTeamForViewTeamPage(teamname);
  };

  getTeam = () => {
    let team = {
      team_name: this.state.team_name,
      tournament: this.state.tournament
    };
    console.log(team);
    this.props.searchTeamForViewTeamPage(team);
  };

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
    return (
      <div className="team-body">
        <div className="pc-playerTab">
          <input
            className="inputforbuttons"
            defaultChecked="defaultChecked"
            id="playerTab1"
            type="radio"
            name="pct"
          />
          <input
            className="inputforbuttons"
            id="playerTab2"
            type="radio"
            name="pct"
          />
          <input
            className="inputforbuttons"
            id="playerTab3"
            type="radio"
            name="pct"
          />
          <input
            className="inputforbuttons"
            id="playerTab4"
            type="radio"
            name="pct"
          />
          <nav>
            <ul>
              <li className="playerTab1">
                <label
                  htmlFor="playerTab1"
                  onClick={() => this.sendTeam("others")}
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
          <div className="team-search-box">
            <button className="team-search-button" onClick={this.getTeam}>
              <i class="fa fa-search"></i>
            </button>
            <input
              className="team-search-input"
              type="text"
              placeholder="Enter Team Name"
              name="team_name"
              onChange={this.OnChange}
            />
          </div>
          <section>
            <div className="playerTab1">
              <div className="team-teamTestimonials">
                {this.props.tournamentTeam.map(teams => (
                  <div className="teamcomponent-card">
                    <div className="team-content">
                      <img
                        src={international}
                        className="internationalLogo"
                        alt="International"
                      />
                      <p>{teams.team_name}</p>
                      {/* <p>India</p> */}
                      <div className="team-details">
                        <p>
                          <button
                            className="playerViewDetails"
                            onClick={() => {
                              this.props.history.push(
                                "/viewteam/" + teams.team_id,
                                { teams }
                              );
                            }}
                          >
                            {" "}
                            View Details
                          </button>
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
  // team: state.teamReducer.team
});

export default connect(
  mapStateToProps,
  { getTournament, searchTeamForViewTeamPage }
)(Team);
