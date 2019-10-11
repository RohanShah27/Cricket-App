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
  componentDidMount() {
    this.props.getMatchesRecentMatches();
    this.props.getHeadline();
    this.props.getHeadlines();
    this.props.getFixtures();
  }
  render() {
    console.log(this.props.match);
    return (
      <div style={{ marginTop: "80px" }}>
        <div className="home-flex-container">
          <div className="site">
            <div className="fixtures ">
              <h2 className="fixtures-header">Fixtures</h2>
              <div className="col-content">
                <ul className="home-ul">
                  {this.props.fixtures.map(fixture => (
                    <p class="home-p">
                      <span>{fixture.match}</span>{" "}
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
                <h2 className="news-header">India's Tour of WestIndies</h2>
                <div col-content>
                  <figure>
                    <img src={dhoni} className="homeimg" />
                  </figure>
                  <figcaption>
                    <span className="newsTitle">
                      MS Dhoni Enjoys A Game Of Billiards At JSCA Stadium In
                      Ranchi
                    </span>
                    <hr className="home-hr" />
                    <p
                      className="home-p"
                      style={{ fontSize: "15px", paddingLeft: "5px" }}
                    >
                      {/* Single Headline */}
                      {this.props.headline[0].headlines}
                    </p>
                  </figcaption>
                </div>
              </div>
            </div>
            <div className="headlines">
              <h2 className="fixtures-header">Headlines</h2>
              <div className="col-content">
                <ul className="home-ul">
                  {this.props.headlines.map(headline => (
                    <>
                      <li className="home-li">{headline.headlines}</li>
                      <hr className="home-hr" />
                    </>
                  ))}
                </ul>
              </div>
            </div>
            <div className="home-match-container">
              <div className="testimonials">
                {this.props.match.map(match => (
                  <div className="card">
                    <span className="tournament-home">
                      {" "}
                      {match.competition} - {match.match_type}
                    </span>
                    {/* <span style={{ fontSize: "14px" }}>
                      {console.log(match.date.split("T"))}
                    </span> */}
                    <div className="parent">
                      <div className="first">
                        <img className="imgformatch" src={india} />
                        <p>{match.innings_one_team}</p>
                      </div>
                      <div className="second">
                        <button className="buttonformatch">View</button>
                      </div>
                      <div className="third">
                        <img className="imgformatch" src={pakistan} />

                        <p>{match.innings_two_team}</p>
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
