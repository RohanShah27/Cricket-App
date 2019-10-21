import React, { Component } from "react";
import { connect } from "react-redux";
import "../styles/matchDetails.css";
import ReactCountryFlag from "react-country-flag";
import {
  getAllMatchDetails,
  getScorecard,
  getMatchDetails,
  getManhattanGraphMatch
} from "../actions/matchActions";
import virat from "../stockPlayer.png";
export class MatchDetails extends Component {
  componentWillMount() {
    console.log("Props", this.props.location.state.match.match_id);
    let id = {
      match_id: this.props.location.state.match.match_id
    };
    console.log(id);
    this.props.getMatchDetails(id);
    this.props.getScorecard(id);
    this.props.getAllMatchDetails(id);
    // this.props.getManhattanGraphMatch(id);
  }

  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.summary.map(match => (
          <section>
            <div className="matchDetails-flex-container">
              <div className="matchDetails-parent">
                <p>
                  ODI {match.teamOne} VS {match.teamTwo}
                </p>
                <div class="matchDetails-headercard">
                  <p className="matchDetails-country-name">
                    <ReactCountryFlag
                      styleProps={{
                        width: "50px",
                        height: "50px"
                      }}
                      code={match.team1_image ? match.team1_image : "ao"}
                      svg
                    />{" "}
                    {match.teamOne}
                  </p>
                  {console.log(match.team1_image)}

                  <p className="matchDetails-country-name">
                    <ReactCountryFlag
                      styleProps={{
                        width: "50px",
                        height: "50px"
                      }}
                      code={match.team2_image ? match.team2_image : "in"}
                      svg
                    />{" "}
                    {match.teamTwo}
                  </p>

                  <p className="matchDetails-result">
                    Result : {match.team_winner} {match.won_by}
                  </p>
                </div>

                <div className="matchDetails-headercard">
                  <p>
                    {match.teamOneScore}/{match.teamone_wicket} (
                    {match.team_one_total_over} Overs)
                  </p>
                  <p>
                    {match.teamTwoScore}/{match.teamtwo_wicket} (
                    {match.team_two_total_over} Overs)
                  </p>
                </div>
              </div>
              <div className="matchDetails-parent">
                <div className="matchDetails-flex-container-inner">
                  <div>
                    {/* <img className="matchDetails-imgforplayer" src={dhoni} /> */}
                  </div>
                  <p>Player of the Match</p>
                  <div className="POM-section">
                    <p>
                      <img src={virat} className="matchDetails-pom-image" />{" "}
                    </p>
                    <p>{match.player_of_the_match}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
        {/* tabs for match details page Scoreboard, Stats, Summary */}
        <div className="matchDetails-pc-tab">
          <input
            defaultChecked="defaultChecked"
            id="matchDetails-tab1"
            type="radio"
            name="pct"
          />
          <input id="matchDetails-tab2" type="radio" name="pct" />
          <input id="matchDetails-tab3" type="radio" name="pct" />
          <nav>
            <ul>
              <li className="matchDetails-tab1">
                <label htmlFor="matchDetails-tab1">Summary</label>
              </li>
              <li className="matchDetails-tab2">
                <label htmlFor="matchDetails-tab2">Scoreboard</label>
              </li>
              <li className="matchDetails-tab3">
                <label htmlFor="matchDetails-tab3">Statistics</label>
              </li>
            </ul>
          </nav>
          {/* tab bodies */}
          <section>
            <div className="matchDetails-tab2">
              <div className="matchDetails-testimonials">
                <div className="matchDetails-details">
                  {this.props.singlematch.map(inning => (
                    <div className="innings-container">
                      <h2 className="matchDetails-scoreboard-header">
                        Innings {inning.inning}
                      </h2>
                      <div className="matchDetails-flex-container">
                        <div>
                          <table className="matchDetails-scoreboard-table">
                            <tr>
                              <th>Batsman</th>
                              <th>{"   "}</th>
                              <th>R</th>
                              <th>B</th>
                              <th>4s</th>
                              <th>6s</th>
                              <th>SR</th>
                            </tr>

                            {inning.scorecard.map(score => (
                              <tr>
                                <td>{score.striker_name}</td>

                                {score.wicket_type ? (
                                  <td>
                                    {score.wicket_type == "caught"
                                      ? "c"
                                      : score.wicket_type}{" "}
                                    {""}
                                    {score.fielder_name} (b) {score.bowler_name}
                                  </td>
                                ) : (
                                  <td>Not Out</td>
                                )}

                                <td>{score.batsman_run}</td>
                                <td>{score.ball_faced}</td>
                                <td>{score.fours}</td>
                                <td>{score.sixes}</td>
                                <td>{score.striker_rate}</td>
                              </tr>
                            ))}
                            {inning.total.map(total => (
                              <div>
                                <tr>
                                  <b>
                                    <td>Total : </td>
                                  </b>
                                  <td>
                                    {total.runs} ({total.wickets} wkts,{" "}
                                    {total.overs} Overs)
                                  </td>
                                </tr>
                                <tr style={{ background: "none" }}>
                                  <b>
                                    <td>Extras : </td>
                                  </b>
                                  <td>{total.extras}</td>
                                </tr>
                              </div>
                            ))}
                          </table>
                        </div>
                      </div>

                      <div>
                        <table className="matchDetails-scoreboard-table">
                          <tr>
                            <th>Bowlers</th>
                            <th>Overs</th>
                            <th>Runs</th>
                            <th>Wickets</th>
                            <th>Economy</th>
                            <th>Extras</th>
                          </tr>
                          {inning.bowler.map(bowler => (
                            <tr>
                              <td>{bowler.player_name}</td>
                              <td>{bowler.overs}</td>
                              <td>{bowler.runs_conceeded}</td>
                              <td>{bowler.wickets}</td>
                              <td>{Number(bowler.economy).toFixed(1)}</td>
                              <td>{bowler.extras}</td>
                            </tr>
                          ))}
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="matchDetails-tab3">
              <div className="matchDetails-testimonials">
                <div className="matchDetails-statistics-container">
                  <div className="manhattan-match">
                    <iframe
                      src={this.props.manhattan}
                      style={{ width: "100%", height: "300px", border: "none" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="matchDetails-tab1">
              <div className="matchDetails-testimonials">
                <div className="matchDetails-details">
                  <div className="matchDetails-flex-container">
                    <div className="matchDetails-mainInfoTable">
                      <h2 className="matchDetails-info-header">Top Players</h2>
                      <div className="matchDetails-topbatsman">
                        <table className="matchDetails-top-player-table">
                          <th style={{ background: "none" }}>
                            {this.props.summary["0"]
                              ? this.props.summary["0"].teamOne
                                ? this.props.summary["0"].teamOne
                                : "NA"
                              : "NA"}{" "}
                          </th>
                          <tr>
                            <td>
                              {this.props.current_match.player1[0].player_name}
                            </td>
                            <td>
                              {this.props.current_match.player1[0].total_runs} (
                              {this.props.current_match.player1[0].total_ball})
                            </td>
                          </tr>
                          <tr>
                            <td>
                              {this.props.current_match.player1[1].player_name}
                            </td>
                            <td>
                              {this.props.current_match.player1[1].total_runs} (
                              {this.props.current_match.player1[1].total_ball})
                            </td>
                          </tr>
                          <tbody>
                            <th style={{ background: "none" }}>
                              {this.props.summary["0"]
                                ? this.props.summary["0"].teamTwo
                                  ? this.props.summary["0"].teamTwo
                                  : "NA"
                                : "NA"}
                            </th>
                            <tr>
                              <td>
                                {
                                  this.props.current_match.player2[0]
                                    .player_name
                                }
                              </td>
                              <td>
                                {this.props.current_match.player2[0].total_runs}{" "}
                                (
                                {this.props.current_match.player2[0].total_ball}
                                )
                              </td>
                            </tr>
                            <tr>
                              <td>
                                {
                                  this.props.current_match.player2[1]
                                    .player_name
                                }
                              </td>
                              <td>
                                {this.props.current_match.player2[1].total_runs}{" "}
                                (
                                {this.props.current_match.player2[1].total_ball}
                                )
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Bowlers */}
                      <div className="matchDetails-topbatsman">
                        <table className="matchDetails-top-player-table">
                          <th style={{ background: "none", color: "white" }}>
                            Hello
                          </th>
                          <tr>
                            <td>
                              {
                                this.props.current_match.player1_bowler[0]
                                  .player_name
                              }
                            </td>
                            <td>
                              {
                                this.props.current_match.player1_bowler[0]
                                  .wickets
                              }
                              /
                              {this.props.current_match.player1_bowler[0].overs}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              {
                                this.props.current_match.player1_bowler[1]
                                  .player_name
                              }
                            </td>
                            <td>
                              {
                                this.props.current_match.player1_bowler[1]
                                  .wickets
                              }
                              /
                              {this.props.current_match.player1_bowler[1].overs}
                            </td>
                          </tr>
                          <tbody>
                            <th style={{ background: "none", color: "white" }}>
                              Hello
                            </th>
                            <tr>
                              <td>
                                {
                                  this.props.current_match.player2_bowler[0]
                                    .player_name
                                }
                              </td>
                              <td>
                                {
                                  this.props.current_match.player2_bowler[0]
                                    .wickets
                                }
                                /
                                {
                                  this.props.current_match.player2_bowler[0]
                                    .overs
                                }
                              </td>
                            </tr>
                            <tr>
                              <td>
                                {
                                  this.props.current_match.player2_bowler[1]
                                    .player_name
                                }
                              </td>
                              <td>
                                {
                                  this.props.current_match.player2_bowler[1]
                                    .wickets
                                }
                                /
                                {
                                  this.props.current_match.player2_bowler[1]
                                    .overs
                                }
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h2 className="matchDetails-info-header">Match Info</h2>
                      <div>
                        <table className="matchDetails-info-table">
                          <tbody>
                            <tr>
                              <td>Series</td>
                              <td>
                                {this.props.current_match.result[0].competition}
                              </td>
                            </tr>
                            <tr>
                              <td>Match Type</td>
                              <td>
                                {this.props.current_match.result[0].match_type}
                              </td>
                            </tr>
                            <tr>
                              <td>Match</td>
                              <td>
                                {this.props.current_match.country[0].team_name}{" "}
                                vs{" "}
                                {this.props.current_match.country[1].team_name}
                              </td>
                            </tr>
                            <tr>
                              <td>Match Date</td>{" "}
                              <td>
                                {this.props.current_match.date[0].match_date}
                              </td>
                            </tr>
                            <tr>
                              <td>Venue</td>{" "}
                              <td>
                                {this.props.current_match.venue[0].venue_name}
                              </td>
                            </tr>

                            <tr>
                              <td>Umpires </td>
                              <td>
                                {this.props.current_match.umpire[0].umpire_name}
                                ,{" "}
                                {this.props.current_match.umpire[1].umpire_name}
                              </td>
                            </tr>
                            <tr>
                              <td>Toss</td>
                              <td>
                                {this.props.current_match.toss[0].toss_winner} ,
                                elected to{" "}
                                {
                                  this.props.current_match.result[0]
                                    .toss_decision
                                }
                              </td>
                            </tr>
                            <tr>
                              <td>Result </td>
                              <td>
                                {" "}
                                {this.props.current_match.result[0].winner}{" "}
                                {this.props.current_match.result[0].outcome}
                              </td>
                            </tr>
                            <tr>
                              <td>MoM</td>
                              <td>
                                {
                                  this.props.current_match.result[0]
                                    .player_of_the_match
                                }
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  current_match: state.matchReducers.current_match,
  singlematch: state.matchReducers.singlematch,
  summary: state.matchReducers.summary,
  manhattan: state.matchReducers.manhattan
});

export default connect(
  mapStateToProps,
  { getAllMatchDetails, getScorecard, getMatchDetails, getManhattanGraphMatch }
)(MatchDetails);
