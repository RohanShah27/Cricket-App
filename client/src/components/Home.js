import React, { Component } from "react";
import { connect } from "react-redux";
import "../index.css";
import dhoni from "../DHONI.png";
import pakistan from "../assests/pakistan.jpg";
import india from "../assests/india.jpg";
import { getHeadlines, getHeadline } from "../actions/Headlines";
import { getMatchesRecentMatches } from "../actions/matchActions";
import { getFixtures } from "../actions/Fixtures";

export class Home extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.getMatchesRecentMatches();
    this.props.getHeadline(1);
    this.props.getHeadlines();
    this.props.getFixtures();
  }
  render() {
    console.log("check props home", this.props);
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
                  {this.props.fixtures.map((index, fixture) => (
                    <p class="home-p">
                      <span id={"matchName"}>{fixture.match}</span>{" "}
                      <span className="home-time">
                        {fixture.match_date} at {fixture.time}
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
                    <img src={dhoni} className="homeimg" />
                  </figure>
                  <figcaption>
                    <span className="newsTitle">
                      {this.props.headline[0].headlines}
                    </span>
                    <hr className="home-hr" />
                    <p
                      className="home-p"
                      style={{ fontSize: "15px", paddingLeft: "5px" }}
                    >
                      {/* Single Headline */}
                      {this.props.headline[0].headlines_description}
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
                  {this.props.headlines.map(single_headline => (
                    <>
                      <a
                        onClick={() =>
                          this.props.getHeadline(single_headline.headline_id)
                        }
                      >
                        {" "}
                        <li className="home-li" style={{ cursor: "pointer" }}>
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
                {this.props.match.map(match => (
                  <div className="card">
                    <span className="tournament-home">
                      {" "}
                      {match.competition == "others"
                        ? "International"
                        : match.competition}{" "}
                      - {match.match_type}
                    </span>

                    <div className="parent">
                      <div className="first">
                        <img className="imgformatch" src={india} />
                        <p style={{ wordBreak: "break-word" }}>{match.team1}</p>
                      </div>
                      <div className="second">
                        <button className="buttonformatch">View</button>
                      </div>
                      <div className="third">
                        <img className="imgformatch" src={pakistan} />

                        <p>{match.team2}</p>
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
