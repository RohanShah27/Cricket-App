import React, { Component } from "react";
import { connect } from "react-redux";
import "../index.css";
import dhoni from "../DHONI.png";
import india from "../assests/india.jpg";
import pakistan from "../assests/pakistan.jpg";
import { getHeadlines, getHeadline } from "../actions/Headlines";
import { getFixtures } from "../actions/Fixtures";
import { getRecentMatches } from "../actions/matchAction";
import Navigation from "./Navigation";

export class Home extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getHeadline();
    this.props.getHeadlines();
    this.props.getFixtures();
    this.props.getRecentMatches();
  }
  render() {
    return (
      <div>
        <Navigation />
        <div className="flex-container">
          <div className="site">
            <div className="fixtures ">
              <h2 className="fixtures-header">Fixtures</h2>
              <div className="col-content">
                <ul>
                  {this.props.fixtures.map(fixture => (
                    <p>
                      <span>{fixture.match}</span>{" "}
                      <span className="time">
                        {fixture.match_date} at {fixture.time}
                      </span>
                      <hr />
                    </p>
                  ))}
                </ul>
              </div>
            </div>
            <div className="news">
              <div className="col-center">
                <h2 className="news-header">India's Tour of WestIndies</h2>
                <div col-content>
                  <figure>
                    <img className="imgforheadline" src={dhoni} />
                  </figure>
                  <figcaption>
                    <span className="newsTitle">
                      MS Dhoni Enjoys A Game Of Billiards At JSCA Stadium In
                      Ranchi
                    </span>
                    <hr />
                    <p>
                      MS Dhoni, who has not played for India since the 2019
                      World Cup, was pictured playing billiards in Ranchi.
                    </p>
                    {/* <p>{this.props.headline.headlines}</p> */}
                  </figcaption>
                </div>
              </div>
            </div>
            <div className="headlines">
              <h2 className="fixtures-header">Headlines</h2>
              <div className="col-content">
                <ul>
                  {this.props.headlines.map(headline => (
                    <>
                      <li>{headline.headlines}</li>
                      <hr />
                    </>
                  ))}
                </ul>
              </div>
            </div>
            {/* <div className="follow">
              <h2 className="fixtures-header">Follow us</h2>
              <div className="col-content">
                <ul>
                  <li>
                    <i class="fab fa-facebook-square">
                      <span>Facebook</span>
                    </i>
                  </li>
                  <li>
                    <i class="fab fa-twitter">Twitter</i>
                  </li>
                  <li>
                    <i class="fab fa-instagram">Instagram</i>
                  </li>
                  <li>
                    <i class="fab fa-youtube">Youtube</i>
                  </li>
                  <li>
                    <i class="fab fa-pinterest"></i>Pintrest
                  </li>
                </ul>
              </div>
            </div> */}
          </div>
        </div>{" "}
        <div className="match-container">
          <div className="testimonials">
            {this.props.match.map(match => (
              <div className="card">
                <div className="parent">
                  <div className="first">
                    <img className="imgformatch" src={india} />
                    <p>{match.team_name1}</p>
                    <p>250/5 (50.0)</p>
                  </div>
                  <div className="second">
                    <button className="buttonformatch">View</button>
                  </div>
                  <div className="third">
                    <img className="imgformatch" src={pakistan} />

                    <p>{match.team_name2}</p>
                    <p>224/6 (50.0)</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  headlines: state.headlinesReducer.headlines,
  headline: state.headlinesReducer.headline,
  fixtures: state.fixturesReducer.fixtures,
  match: state.matchReducer.match
});
export default connect(
  mapStateToProps,
  { getHeadlines, getFixtures, getHeadline, getRecentMatches }
)(Home);
