import React, { Component } from "react";
import { connect } from "react-redux";
import "../styles/Team.css";
import international from "./international.png";
import ipl from "./ipl.png";
import {
  getTournament,
  searchTeamForViewTeamPage
} from "../actions/teamActions";
import InfiniteScroll from "react-infinite-scroll-component";

export class Team extends Component {
  constructor(props) {
    super(props);
    this.sendTeam = this.sendTeam.bind(this);
    this.state = {
      tournamentTeam: Array.from({ length: 5 }),
      hasMore: true
    }
  }

  fetchMoreData = () => {
    if (this.state.tournamentTeam.length >= 500) {
      this.setState({ hasMore: false });
      return;
    }
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      this.setState({
        tournamentTeam: this.state.tournamentTeam.concat(Array.from({ length: 5 }))
      });
    }, 500);
  };

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
              <div id="scrollableDiv" style={{ height: 700, overflow: "auto" }}>
                <InfiniteScroll
                  dataLength={this.state.tournamentTeam.length}
                  next={this.fetchMoreData}
                  hasMore={this.state.hasMore}
                  loader={<h4>Loading...</h4>}
                  scrollableTarget="scrollableDiv"
                  endMessage={
                    <p style={{ textAlign: "center" }}>
                      <b>Yay! You have seen it all</b>
                    </p>
                  }
                >
                  <div className="team-teamTestimonials">
                    {this.props.tournamentTeam.map((teams, index) => (
                      <div className="teamcomponent-card" key={index}>
                        <div className="team-content" >
                          <img
                            src={international}
                            className="internationalLogo"
                            alt="International"
                          />
                          <p>{teams.team_name}</p>
                          {/* <p>India</p> */}
                          <div className="team-details" key={index}>
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
                </InfiniteScroll>
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
