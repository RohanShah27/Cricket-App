import React, { Component } from "react";
import { connect } from "react-redux";
import "../styles/Team.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";

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
    team_name: "",
    items: 8,
    loadingState: false,
    height: 800,
    pageTeams: []
  };

  componentDidMount() {
    let team = { tournament: "others" };
    this.props.getTournament(team);
  }

  componentWillReceiveProps(nextProps) {
    nextProps.tournamentTeam.length > 0
      ? this.displayTeams(nextProps.tournamentTeam)
      : console.log(0, " teams");
  }
  OnChange = event => {
    this.setState({ [event.target.name]: event.target.value });

    let team_name = {
      team_name: this.state.team_name
    };
    this.props.searchTeamForViewTeamPage(team_name);
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

  displayTeams = teams => {
    console.log(teams);
    const { items } = this.state;

    if (teams.length === 0) return;
    let pageTeams = [];
    for (let i = 0; i < items; i++) {
      pageTeams.push(teams[i]);
    }
    this.setState({ pageTeams });
    console.log("PageTeams array", this.state.pageTeams.length);
  };

  loadMoreItems = () => {
    setTimeout(() => {
      this.setState({
        items: this.state.items + 8
      });

      console.log("Teams", this.props.tournamentTeam);
      this.displayTeams(this.props.tournamentTeam);
    }, 1000);
  };
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
                  id="othersTab"
                  htmlFor="playerTab1"
                  onClick={() => {
                    this.sendTeam("others");
                  }}
                >
                  International
                </label>
              </li>
              <li className="playerTab2">
                <label
                  id="iplTab"
                  htmlFor="playerTab2"
                  onClick={() => {
                    this.sendTeam("IPL");
                  }}
                >
                  IPL
                </label>
              </li>
              <li className="playerTab3">
                <label
                  id="BBLTab"
                  htmlFor="playerTab3"
                  onClick={() => {
                    this.sendTeam("Big Bash League");
                  }}
                >
                  Big Bash League
                </label>
              </li>
              <li className="playerTab4">
                <label
                  id="PSLTab"
                  htmlFor="playerTab4"
                  onClick={() => {
                    this.sendTeam("Pakistan Super League");
                  }}
                >
                  Pakistan Super League
                </label>
              </li>
            </ul>
          </nav>
          <div className="team-search-box">
            <button
              className="team-search-button"
              id="searchTeamButton"
              onClick={() => this.getTeam}
            >
              <i class="fa fa-search"></i>
            </button>
            <input
              id="searchTeamTextBox"
              className="team-search-input"
              type="text"
              placeholder="Enter Team Name"
              name="team_name"
              onChange={this.OnChange}
            />
            {this.state.team_name == "" ? null : (
              <div className="team-search-result">
                <span className="search_result_data">
                  <p>
                    {this.props.teamsearch
                      ? this.props.teamsearch.map(teams => (
                          <Link
                            style={{
                              textDecoration: "none"
                            }}
                            to={{
                              pathname: "/viewteam/" + teams.team_id,
                              state: { teams }
                            }}
                          >
                            {" "}
                            <p
                              style={{
                                fontSize: "18px",
                                paddingTop: "10px ",
                                display: "flex",
                                justifyContent: "center"
                              }}
                            >
                              {teams.team_name}
                            </p>
                          </Link>
                        ))
                      : null}
                  </p>
                </span>
              </div>
            )}
          </div>
          <section>
            <div className="playerTab1">
              <InfiniteScroll
                dataLength={this.state.pageTeams.length} //This is important field to render the next data
                next={this.loadMoreItems}
                hasMore={true}
                height={600}
                loader={
                  <div className="loader-container">
                    <div className="user-loader"></div>
                  </div>
                }
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen all Teams</b>
                  </p>
                }
              >
                <div className="team-teamTestimonials">
                  {this.state.pageTeams.map((teams, index) => {
                    return (
                      <div>
                        {teams ? (
                          <div className="teamcomponent-card">
                            <div className="team-content">
                              {/* <p>Started</p> */}
                              <ReactCountryFlag
                                styleProps={{
                                  width: "70px",
                                  height: "70px"
                                }}
                                code={
                                  teams.team_image ? teams.team_image : "ao"
                                }
                                svg
                                className="internationalLogo"
                              />{" "}
                              <p id={"teamName" + index}>{teams.team_name}</p>
                              {/* <p>India</p> */}
                              <div className="team-details">
                                <p>
                                  <button
                                    id={"teamDetailsButton" + index}
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
                            {/* </div> */}
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </InfiniteScroll>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tournamentTeam: state.teamReducer.tournamentTeam,
  teamsearch: state.teamReducer.teamsearch
});

export default connect(
  mapStateToProps,
  { getTournament, searchTeamForViewTeamPage }
)(Team);
