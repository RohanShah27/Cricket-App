import React, { Component } from "react";
import { connect } from "react-redux";
import "../index.css";
import { getHeadlines, getHeadline } from "../actions/Headlines";
import { getMatchesRecentMatches } from "../actions/matchActions";
import { getFixtures } from "../actions/Fixtures";
import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router-dom";

export class Home extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.getMatchesRecentMatches(this.props.gender);
    this.props.getHeadline(46);
    this.props.getHeadlines();
    this.props.getFixtures();
  }
  componentWillReceiveProps(nextProps) {
    // Will check if the user changes the male or female option
    if (this.props.gender != nextProps.gender)
      this.props.getMatchesRecentMatches(nextProps.gender);
  }
  render() {
    console.log("check props home", this.props);
    return (
      <div style={{ marginTop: "80px" }}>
        {this.props.headline[0] ? (
          this.props.headline[0].headlines_image ? (
            <div className="home-flex-container" id="test">
              <div className="site">
                {/* Start of Fixtures section -Rohan */}
                <div className="fixtures ">
                  <h2 className="fixtures-header" id="fixtures-header">
                    Fixtures
                  </h2>
                  <div className="col-content">
                    <ul className="home-ul">
                      {this.props.fixtures.map((fixture, index) => (
                        <p class="home-p" style={{ cursor: "pointer" }}>
                          <span id={"matchName" + index}>
                            {fixture.team1_name} VS {fixture.team2_name} -{" "}
                            {fixture.match_type}
                          </span>{" "}
                          <span
                            className="home-time"
                            id={"matchTimings" + index}
                          >
                            {fixture.match_date} at {fixture.match_time}
                          </span>
                          <hr className="home-hr" />
                        </p>
                      ))}
                    </ul>
                  </div>
                </div>
                {/* End of Fixtures Section -Rohan */}
                {/* Start News Section -Rohan */}
                <div className="news">
                  <div className="col-center">
                    <h2 className="news-header" id="news-Section">
                      News
                    </h2>
                    <div col-content>
                      <figure>
                        <img
                          src={
                            this.props.headline[0]
                              ? "data:image/jpeg;base64," +
                                this.props.headline[0].headlines_image
                              : null
                          }
                          className="homeimg"
                        />
                      </figure>
                      <figcaption>
                        <span className="newsTitle" id="headlineTitle">
                          {this.props.headline[0]
                            ? this.props.headline[0].headlines
                            : "NA"}
                        </span>
                        <hr className="home-hr" />
                        <p
                          id="headlineDescription"
                          className="home-p"
                          style={{ fontSize: "15px", paddingLeft: "5px" }}
                        >
                          {/* Single Headline */}
                          {this.props.headline[0]
                            ? this.props.headline[0].headlines_description
                            : "NA"}
                        </p>
                      </figcaption>
                    </div>
                  </div>
                </div>
                {/* End of News Section -Rohan */}
                <div className="headlines">
                  <h2 className="fixtures-header" id="headlines">
                    Headlines
                  </h2>
                  <div className="col-content">
                    <ul className="home-ul">
                      {this.props.headlines.map((single_headline, index) => (
                        <>
                          <a
                            id={"getHeadlineData" + index}
                            onClick={() =>
                              this.props.getHeadline(
                                single_headline.headline_id
                              )
                            }
                          >
                            {" "}
                            <li
                              className="home-li"
                              id={"singleheadline" + index}
                              style={{ cursor: "pointer" }}
                            >
                              {single_headline.headlines}
                            </li>
                          </a>
                          <hr className="home-hr" />
                        </>
                      ))}
                    </ul>
                  </div>
                </div>
                {/* End of Headlines Section -Rohan */}
                {/* Displaying Recent matches according to Date for male or female gender according to user selection -Rohan */}
                <div className="home-match-container">
                  <div className="testimonials" id="#recent-matches">
                    {this.props.match.map((match, index) => (
                      <div className="card">
                        <span
                          className="tournament-home"
                          id={"matchData" + index}
                        >
                          {" "}
                          {match.competition == "others"
                            ? "International"
                            : match.competition}{" "}
                          - {match.match_type}
                        </span>

                        <div className="parent">
                          <div className="first">
                            <ReactCountryFlag
                              styleProps={{
                                width: "50px",
                                height: "50px"
                              }}
                              code={
                                match.team1_image ? match.team1_image : "ao"
                              }
                              svg
                              className="imgformatch"
                            />
                            <p
                              style={{ wordBreak: "break-word" }}
                              id={"matchTeamOne" + index}
                            >
                              {match.team1}
                            </p>
                          </div>
                          <div className="second">
                            {/* redirect user to details of match  -Rohan*/}
                            <Link
                              to={{
                                pathname: "/matchdetails/" + match.match_id,
                                state: { match: match }
                              }}
                            >
                              <button
                                id={"recent-match" + index}
                                className="buttonformatch"
                              >
                                View
                              </button>
                            </Link>
                          </div>
                          <div className="third">
                            <ReactCountryFlag
                              styleProps={{
                                width: "50px",
                                height: "50px"
                              }}
                              code={
                                match.team2_image ? match.team2_image : "bm"
                              }
                              svg
                              className="imgformatch"
                            />

                            <p id={"matchTeamTwo" + index}>{match.team2}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* End of Recent matches section -Rohan */}
            </div>
          ) : (
            // Display Loader when data is still not on the client side
            <div className="loader-container" style={{ marginTop: "20vw" }}>
              <div className="user-loader"></div>
            </div>
          )
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  // Reducers recuired for data on client side -Rohan
  headlines: state.headlinesReducer.headlines,
  headline: state.headlinesReducer.headline,
  fixtures: state.fixturesReducer.fixtures,
  match: state.matchReducers.match
});
export default connect(
  mapStateToProps,
  { getHeadlines, getFixtures, getHeadline, getMatchesRecentMatches }
)(Home);
