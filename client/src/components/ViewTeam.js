import React, { Component } from "react";
import { connect } from "react-redux";
import "../styles/viewTeam.css";
import India from "../assests/india.jpg";
import {
  getTeamById,
  getTeamStats,
  getPlayerStatsForTeams,
  getPlayerStatsForTeamsBowler,
  teamStatsGraphOdi
} from "../actions/teamActions";
import {
  getMatchesByTeam,
  getMatchesByTeamAndType,
  getMatchesByDate
} from "../actions/matchActions";
import india from "../assests/india.jpg";
import pakistan from "../assests/pakistan.jpg";
import Calendar from "react-calendar";

export class ViewTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team_name: "",
      match_type: "",
      odiclick: false,
      testclick: true,
      t20click: false,
      odiclickmatch: false,
      testclickmatch: true,
      t20clickmatch: false,
      date: new Date(),
      calendarIsOpen: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.opencalendar = this.opencalendar.bind(this);
  }

  handleChange(date) {
    console.log("handleChange", date);
    this.setState({ date: date });
    this.setState({
      calendarIsOpen: false
    });
    let obj = {
      team_name: this.state.team_name,
      match_type: this.state.match_type,
      match_date: this.state.date.toJSON().slice(0, 10)
    };
    console.log(obj);
    this.props.getMatchesByDate(obj);
    // console.log("State date", this.state.date);
  }

  opencalendar = () => {
    this.setState({
      calendarIsOpen: true
    });
  };
  closecalendar = () => {
    this.setState({
      calendarIsOpen: false
    });
    {
      console.log(this.setState.calendarIsOpen);
    }
  };

  componentDidMount() {
    console.log(this.props);
    let team_id = {
      team_id: this.props.location.state.teams.team_id
    };
    let teams = {
      team: this.props.location.state.teams
    };
    let type = {
      match_type: "Test"
    };
    console.log(teams);
    console.log(team_id);
    this.props.getTeamById(team_id);
    this.props.getTeamStats(this.props.location.state.teams.team_id);
    this.props.getPlayerStatsForTeams(
      this.props.location.state.teams.team_id,
      type
    );
    this.props.getPlayerStatsForTeamsBowler(
      this.props.location.state.teams.team_id,
      type
    );
  }

  onodiclick = () => {
    this.setState({
      match_type: "ODI",
      odiclick: true,
      testclick: false,
      t20click: false
    });
    let type = {
      match_type: this.state.match_type
    };
    console.log(type);
    this.props.getPlayerStatsForTeams(
      this.props.location.state.teams.team_id,
      type
    );
    this.props.getPlayerStatsForTeamsBowler(
      this.props.location.state.teams.team_id,
      type
    );
  };

  ontestclick = () => {
    this.setState({
      match_type: "Test",
      testclick: true,
      odiclick: false,
      t20click: false
    });
    let type = {
      match_type: this.state.match_type
    };
    console.log(type);
    this.props.getPlayerStatsForTeams(
      this.props.location.state.teams.team_id,
      type
    );
    this.props.getPlayerStatsForTeamsBowler(
      this.props.location.state.teams.team_id,
      type
    );
  };

  ont20click = () => {
    this.setState({
      match_type: "T20",
      t20click: true,
      testclick: false,
      odiclick: false
    });
    let type = {
      match_type: this.state.match_type
    };
    console.log(type);
    this.props.getPlayerStatsForTeams(
      this.props.location.state.teams.team_id,
      type
    );
    this.props.getPlayerStatsForTeamsBowler(
      this.props.location.state.teams.team_id,
      type
    );
  };

  onodiclickmatch(team) {
    this.setState({
      match_type: "ODI",
      team_name: team,
      odiclickmatch: true,
      testclickmatch: false,
      t20clickmatch: false
    });
    let type = {
      match_type: this.state.match_type,
      team_name: this.state.team_name
    };
    console.log(type);
    this.props.getMatchesByTeamAndType(type);
  }

  ontestclickmatch(team) {
    setTimeout(() => {
      return (
        <div className="loader-container">
          <div className="user-loader"></div>
        </div>
      );
    }, 10);
    this.setState({
      match_type: "Test",
      team_name: team,
      odiclickmatch: false,
      testclickmatch: true,
      t20clickmatch: false
    });
    let type = {
      match_type: this.state.match_type,
      team_name: this.state.team_name
    };
    console.log(type);
    this.props.getMatchesByTeamAndType(type);
  }

  ont20clickmatch(team) {
    this.setState({
      match_type: "T20",
      team_name: team,
      odiclickmatch: false,
      testclickmatch: false,
      t20clickmatch: true
    });
    let type = {
      match_type: this.state.match_type,
      team_name: this.state.team_name
    };
    console.log(type);
    this.props.getMatchesByTeamAndType(type);
  }

  getMatches(team) {
    this.setState({
      team_name: team
    });
    let obj = {
      team_name: this.state.team_name
    };
    console.log("from team nav", obj);
    this.props.getMatchesByTeam(obj);
  }

  render() {
    console.log(
      this.props.teamstats["0"] ? this.props.teamstats["0"].test_played : "NAs"
    );
    return (
      <div>
        <div className="viewTeam-container">
          <div className="parentcoach">
            <div className="child1">
              <img src={India} className="imgforteam" />
            </div>
            {this.props.tournamentTeam.map(teams => (
              <div className="child2">
                <p className="child2p">{teams.team_name}</p>
              </div>
            ))}
          </div>
          <div className="viewTeam-pc-tab">
            <input
              defaultChecked="defaultChecked"
              id="viewTeam-tab1"
              type="radio"
              name="pct"
            />
            <input id="viewTeam-tab2" type="radio" name="pct" />
            <nav>
              <ul>
                <li className="viewTeam-tab1">
                  <label htmlFor="viewTeam-tab1">
                    <b>Stats</b>
                  </label>
                </li>
                {this.props.tournamentTeam.map(teams => (
                  <li
                    className="viewTeam-tab2"
                    onClick={() => {
                      this.ontestclickmatch(teams.team_name);
                    }}
                  >
                    <label htmlFor="viewTeam-tab2" onClick={this.loader}>
                      <b>Matches</b>
                    </label>
                  </li>
                ))}
              </ul>
            </nav>
            <section>
              <div className="viewTeam-tab1">
                <div className="viewTeam-testimonials">
                  <div className="viewTeam-table1">
                    {this.props.teamstats.map(teamstats => (
                      <table className="stats">
                        <tr>
                          <th style={{ borderTopLeftRadius: "8px" }}>Format</th>
                          <th>Total Matches</th>
                          <th>Win</th>
                          <th>Loose</th>
                          <th style={{ borderTopRightRadius: "8px" }}>Draw</th>
                        </tr>
                        <tr>
                          <td>TEST</td>
                          <td>{teamstats.test_played}</td>
                          <td>{teamstats.test_win}</td>
                          <td>{teamstats.test_loss}</td>
                          <td>{teamstats.test_draw}</td>
                        </tr>
                        <tr>
                          <td>ODI</td>
                          <td>{teamstats.odi_played}</td>
                          <td>{teamstats.odi_win}</td>
                          <td>{teamstats.odi_loss}</td>
                          <td>{teamstats.odi_draw}</td>
                        </tr>
                        <tr>
                          <td>T20</td>
                          <td>{teamstats.t20_played}</td>
                          <td>{teamstats.t20_win}</td>
                          <td>{teamstats.t20_loss}</td>
                          <td>{teamstats.t20_draw}</td>
                        </tr>
                      </table>
                    ))}
                    {this.props.teamstats.map(teamstats =>
                      teamstats.test_played == 0 &&
                      teamstats.odi_played == 0 ? (
                        <div className="viewTeam-stats">
                          <h3>Top Players</h3>
                        </div>
                      ) : (
                        <div className="viewTeam-stats">
                          <button
                            className={
                              this.state.testclick
                                ? "viewTeam-test-button viewTeam-active"
                                : "viewTeam-test-button"
                            }
                            onClick={this.ontestclick}
                          >
                            Test
                          </button>
                          <button
                            className={
                              this.state.odiclick
                                ? "viewTeam-active"
                                : "viewTeam-odi-button"
                            }
                            onClick={this.onodiclick}
                            style={{ fontFamily: "Work Sans" }}
                          >
                            ODI
                          </button>
                          <button
                            className={
                              this.state.t20click
                                ? "viewTeam-t20-active"
                                : "viewTeam-t20-button"
                            }
                            onClick={this.ont20click}
                          >
                            T20
                          </button>
                        </div>
                      )
                    )}
                    <div className="viewTeam-scrollable">
                      <table className="playerstats">
                        <tr>
                          <th style={{ borderTopLeftRadius: "8px" }}>Player</th>
                          {/* <th>
                          <a onClick={this.onodiclick}>ODI</a>
                        </th>
                        <th>
                          <a onClick={this.ont20click}>T20</a>
                        </th> */}
                          <th style={{ borderTopRightRadius: "8px" }}>
                            Total Runs
                          </th>
                        </tr>
                        {this.props.playerstatsforteams.map(
                          playerstatsforteams => (
                            <tr>
                              <td>{playerstatsforteams.player_name}</td>
                              <td>{playerstatsforteams.player_stats_value}</td>
                              {/* <td>{playerstatsforteams.player_stats_value}</td>
                            <td>{playerstatsforteams.player_stats_value}</td> */}
                            </tr>
                          )
                        )}
                      </table>
                      <table className="bowlerstats">
                        <tr>
                          <th style={{ borderTopLeftRadius: "8px" }}>Player</th>
                          <th style={{ borderTopRightRadius: "8px" }}>
                            Total Wickets
                          </th>
                        </tr>
                        {this.props.playerstatsforteamsbowler.map(
                          playerstatsforteamsbowler => (
                            <tr>
                              <td>{playerstatsforteamsbowler.player_name}</td>
                              <td>
                                {playerstatsforteamsbowler.player_stats_value}
                              </td>
                            </tr>
                          )
                        )}
                      </table>
                    </div>
                  </div>
                  {/* ))} */}
                  <div className="viewTeam-table2">
                    <h2 style={{ textAlign: "center" }}>ODI Stats</h2>
                    <iframe
                      src={this.props.odi_graph}
                      style={{ width: "100%", height: "500px", border: "none" }}
                    ></iframe>
                  </div>
                </div>
              </div>

              {/* second tab */}
              <div className="viewTeam-tab2">
                {this.props.tournamentTeam.map(teams => (
                  <div className="viewTeam-statsmatch">
                    <button
                      style={{ marginTop: "20px" }}
                      className={
                        this.state.testclickmatch
                          ? "viewTeam-test-button viewTeam-active"
                          : "viewTeam-test-button"
                      }
                      onClick={() => this.ontestclickmatch(teams.team_name)}
                    >
                      Test
                    </button>
                    <button
                      className={
                        this.state.odiclickmatch
                          ? "viewTeam-active"
                          : "viewTeam-odi-button"
                      }
                      onClick={() => this.onodiclickmatch(teams.team_name)}
                    >
                      ODI
                    </button>
                    <button
                      className={
                        this.state.t20clickmatch
                          ? "viewTeam-t20-active"
                          : "viewTeam-t20-button"
                      }
                      onClick={() => this.ont20clickmatch(teams.team_name)}
                    >
                      T20
                    </button>
                    {/* <div className="viewTeam-calendar"> */}
                    <Calendar
                      className={
                        this.state.calendarIsOpen
                          ? "viewTeam-calendaractive"
                          : "viewTeam-calendardisable"
                      }
                      onChange={this.handleChange}
                      value={this.state.date}
                      open={this.state.calendarIsOpen}
                      onClickOutside={this.closecalendar}
                    />
                    {/* {console.log(this.state.date.toJSON().slice(0, 10))} */}
                    <button
                      className="viewTeam-calendarbutton"
                      onClick={this.opencalendar}
                    >
                      Filter By Date
                    </button>
                    {/* </div> */}
                  </div>
                ))}

                <div className="viewTeamMatches-testimonials">
                  {this.props.match.length === 0 ? (
                    <h2 style={{ textAlign: "center" }}>No Matches Played</h2>
                  ) : (
                    this.props.match.map(match => (
                      <div
                        className="viewTeamMatches-card"
                        onClick={() => {
                          this.props.history.push(
                            "/matchdetails/" + match.match_id,
                            { match }
                          );
                        }}
                      >
                        <div className="viewTeamMatches-parent">
                          <div className="viewTeamMatches-first">
                            <img className="viewTeamMatches-img" src={india} />
                            <p>
                              {match.team1}
                              {/* India */}
                            </p>
                          </div>
                          <div className="viewTeamMatches-second">
                            <img
                              className="viewTeamMatches-img"
                              src={pakistan}
                            />

                            <p>
                              {match.team2}
                              {/* Pakistan */}
                            </p>
                          </div>

                          <div className="viewTeamMatches-third">
                            {match.match_winner}
                            <p>{match.won_by}</p>
                            {/* India win by 10 runs */}

                            <p>
                              MoM: {match.player_of_the_match}
                              {/* <b>MoM: Rohit Sharma */}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tournamentTeam: state.teamReducer.tournamentTeam,
  match: state.matchReducers.match,
  teamstats: state.teamReducer.teamstats,
  playerstatsforteams: state.teamReducer.playerstatsforteams,
  playerstatsforteamsbowler: state.teamReducer.playerstatsforteamsbowler,
  odi_graph: state.teamReducer.odi_graph,
  test_graph: state.teamReducer.test_graph,
  t20_graph: state.teamReducer.t20_graph
});

export default connect(
  mapStateToProps,
  {
    getTeamById,
    getMatchesByTeam,
    getTeamStats,
    getPlayerStatsForTeams,
    getPlayerStatsForTeamsBowler,
    teamStatsGraphOdi,
    getMatchesByTeamAndType,
    getMatchesByDate
  }
)(ViewTeam);
