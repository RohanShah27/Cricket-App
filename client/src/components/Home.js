import React, { Component } from "react";
import { connect } from "react-redux";
import "../index.css";
import dhoni from "../DHONI.png";
import { getHeadlines, getHeadline } from "../actions/Headlines";
import { getMatchesRecentMatches } from "../actions/matchActions";
import { getFixtures } from "../actions/Fixtures";
import ReactCountryFlag from "react-country-flag";

export class Home extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.getMatchesRecentMatches(this.props.gender);
    this.props.getHeadline(1);
    this.props.getHeadlines();
    this.props.getFixtures();
  }
  render() {
    console.log("check props home", this.props.fixtures);
    return (
      <div style={{ marginTop: "80px" }}>
        <div className="home-flex-container" id="test">
          <div className="site">
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
                      <span className="home-time">
                        {fixture.match_date} at {fixture.match_time}
                      </span>
                      <hr className="home-hr" />
                    </p>
                  ))}
                </ul>
              </div>
            </div>
            {/* News Section */}
            <div className="news">
              <div className="col-center">
                <h2 className="news-header" id="news-Section">
                  India's Tour of WestIndies
                </h2>
                <div col-content>
                  <figure>
                    <img
                      src={
                        this.props.headline[0]
                          ? "data:image/jpeg;base64," +
                            this.props.headline[0].headlines_image
                          : dhoni
                      }
                      className="homeimg"
                    />
                  </figure>
                  <figcaption>
                    <span className="newsTitle">
                      {this.props.headline[0]
                        ? this.props.headline[0].headlines
                        : "NA"}
                    </span>
                    <hr className="home-hr" />
                    <p
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
                          this.props.getHeadline(single_headline.headline_id)
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
            <div className="home-match-container">
              <div className="testimonials" id="#recent-matches">
                {this.props.match.map((match, index) => (
                  <div className="card">
                    <span className="tournament-home" id={"matchData" + index}>
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
                          code={match.team1_image ? match.team1_image : "ao"}
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
                        <button
                          id={"recent-match" + index}
                          className="buttonformatch"
                          onClick={() => {
                            this.props.history.push(
                              "/matchdetails/" + match.match_id,
                              match
                            );
                          }}
                        >
                          View
                        </button>
                      </div>
                      <div className="third">
                        <ReactCountryFlag
                          styleProps={{
                            width: "50px",
                            height: "50px"
                          }}
                          code={match.team2_image ? match.team2_image : "bm"}
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
        </div>{" "}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  headlines: state.headlinesReducer.headlines,
  headline: state.headlinesReducer.headline,
  fixtures: state.fixturesReducer.fixtures,
  match: state.matchReducers.match
});
export default connect(
  mapStateToProps,
  { getHeadlines, getFixtures, getHeadline, getMatchesRecentMatches }
)(Home);
