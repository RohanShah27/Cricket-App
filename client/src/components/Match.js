import React, { Component } from "react";
import { connect } from "react-redux";
import "../styles/match.css";
import { getMatchesByType } from "../actions/matchActions";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactCountryFlag from "react-country-flag";

export class Match extends Component {
  constructor(props) {
    super(props);
    // this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    let type = { type: "ODI", gender: this.props.gender };
    this.props.getMatchesByType(type);
  }

  state = {
    type: "",
    matchType: "ODI",
    activeClass: "match-active-option",
    data: [],
    items: 9,
    loadingstate: false,
    height: 800,
    pageMatches: [],
    userId: 1,
    loading: false
  };
  sendType() {
    console.log("type" + this.state.type);
    let matches = {
      type: this.state.type,
      gender: this.props.gender
    };
    this.props.getMatchesByType(matches);
  }

  sendData(types) {
    this.setState({ matchType: types });
    console.log(types);
    this.setState({
      type: types
    });
    this.sendType();
  }

  componentWillReceiveProps(nextProps) {
    nextProps.viewmatch.length > 0
      ? this.displayMatches(nextProps.viewmatch)
      : console.log(0, " Matches");
  }

  displayMatches = Matches => {
    console.log(Matches);
    const { items } = this.state;

    if (Matches.length === 0) return;
    let pageMatches = [];
    for (let i = 0; i < items; i++) {
      pageMatches.push(Matches[i]);
    }
    this.setState({ pageMatches });
    console.log("PageMatches array", this.state.pageMatches.length);
  };

  loadMoreItems = () => {
    setTimeout(() => {
      this.setState({
        items: this.state.items + 9
      });

      console.log("Matches", this.props.viewmatch);
      this.displayMatches(this.props.viewmatch);
    }, 1000);
  };

  render() {
    return (
      <div>
        <div className="match-pc-tab">
          <input
            defaultChecked="defaultChecked"
            id="match-tab1"
            type="radio"
            name="pct"
            onClick={() => this.sendData("ODI")}
          />
          <input
            id="match-tab2"
            type="radio"
            name="pct"
            onClick={() => this.sendData("Test")}
          />
          <input
            id="match-tab3"
            type="radio"
            name="pct"
            onClick={() => this.sendData("T20")}
          />

          {/* Checking the gender */}
          {this.props.gender == "male" ? (
            // Start of nav i.e Buttons for Test,ODI,T20
            <nav>
              <ul>
                <li className="match-tab1">
                  <label htmlFor="match-tab1">
                    <b>ODI</b>
                  </label>
                </li>
                <li className="match-tab2">
                  <label htmlFor="match-tab2">
                    <b>TEST</b>
                  </label>
                </li>
                <li className="match-tab3">
                  <label htmlFor="match-tab3">
                    <b>T20</b>
                  </label>
                </li>
              </ul>
            </nav>
          ) : (
            <nav>
              <ul>
                <li className="match-tab1">
                  <label htmlFor="match-tab1">
                    <b>ODI</b>
                  </label>
                </li>

                <li className="match-tab3">
                  <label htmlFor="match-tab3">
                    <b>T20</b>
                  </label>
                </li>
              </ul>
            </nav>
          )}
          <section>
            <div className="match-tab1">
              <InfiniteScroll
                dataLength={this.state.pageMatches.length} //This is important field to render the next data
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
                <div className="match-testimonials">
                  {this.state.pageMatches.map(match => (
                    <div
                      className="match-card"
                      onClick={() => {
                        this.props.history.push(
                          "/matchdetails/" + match.match_id,
                          { match }
                        );
                      }}
                    >
                      <div className="match-parent">
                        <div className="match-first">
                          <ReactCountryFlag
                            styleProps={{
                              width: "60px",
                              height: "60px"
                            }}
                            code={match.team1_image ? match.team1_image : "ao"}
                            svg
                          />{" "}
                          <p>{match.team1}</p>
                          <p className="match-p">250/5 (50.0)</p>
                        </div>
                        <div className="match-second">
                          <ReactCountryFlag
                            styleProps={{
                              width: "60px",
                              height: "60px"
                            }}
                            code={match.team2_image ? match.team2_image : "ao"}
                            svg
                          />{" "}
                          <p>{match.team2}</p>
                          <p className="match-p">224/6 (50.0)</p>
                        </div>

                        <div className="match-third">
                          {match.match_winner} {match.won_by}
                          <p>MoM: {match.player_of_the_match}</p>
                        </div>
                      </div>
                    </div>
                  ))}
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
  viewmatch: state.matchReducers.viewmatch
});

export default connect(
  mapStateToProps,
  { getMatchesByType }
)(Match);
