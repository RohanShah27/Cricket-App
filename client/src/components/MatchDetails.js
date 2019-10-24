import React, { Component } from "react";
import { connect } from "react-redux";
import "../styles/matchDetails.css";
import ReactCountryFlag from "react-country-flag";
import {
  getAllMatchDetails,
  getScorecard,
  getMatchDetails,
  getManhattanGraphMatch,
  getPieChartBatsman1,
  getPieChartBatsman2,
  getPieChartBowler1,
  getPieChartBowler2
} from "../actions/matchActions";
import virat from "../stockPlayer.png";
export class MatchDetails extends Component {
  componentWillMount() {
    console.log("Props", this.props.location.state.match.match_id);
    let id = {
      match_id: this.props.location.state.match.match_id
    };
    this.props.getMatchDetails(id);
    this.props.getScorecard(id);
    this.props.getAllMatchDetails(id);
    this.props.getManhattanGraphMatch(this.props.location.state.match.match_id);
    this.props.getPieChartBatsman1(this.props.location.state.match.match_id, 1);
    this.props.getPieChartBatsman2(this.props.location.state.match.match_id, 2);
    this.props.getPieChartBowler1(this.props.location.state.match.match_id, 1);
    this.props.getPieChartBowler2(this.props.location.state.match.match_id, 2);
  }

  render() {
    return (
      <div>
        {this.props.summary ? this.props.summary.map((match, index) => (
          // Main Div Container
          <div>
          <section>
            {/* Mapping The Header of the Match Component whoch contains the contenders,result and pom */}
            <div className="matchDetails-flex-container">
              <div className="matchDetails-parent">
                <p id={"matchHeader" + index}>
                  {/* Mapping name of team one and team two */}
                  ODI {match.teamOne} VS {match.teamTwo}
                </p>
                <div class="matchDetails-headercard">
                  {/* Mapping flag of team one */}
                  <p className="matchDetails-country-name">
                    <ReactCountryFlag
                      styleProps={{
                        width: "50px",
                        height: "50px"
                      }}
                      // Checks if the image is present , if there is no image returned by db db then display a stock image
                      code={match.team1_image ? match.team1_image : "ao"}
                      svg
                    />{" "}
                    {/* Mapping team one name */}
                    {match.teamOne}
                  </p>

                  <p className="matchDetails-country-name">
                    {/* Team two flag */}
                    <ReactCountryFlag
                      styleProps={{
                        width: "50px",
                        height: "50px"
                      }}
                      // Checks if the image is present , if there is no image returned by db db then display a stock image
                      code={match.team2_image ? match.team2_image : "in"}
                      svg
                    />{" "}
                    {/* Name of team two */}
                    {match.teamTwo}
                  </p>

                      {/* Mapping the Result of the match */}
                  <p className="matchDetails-result" id={"matchResult" + index}>
                    Result : {match.team_winner} {match.won_by}
                  </p>
                </div>

                <div className="matchDetails-headercard">
                  <p id={"matchteamOneScore" + index}>
                    {/* Mapping statistics of team1 */}
                    {match.teamOneScore}/{match.teamone_wicket} (
                    {match.team_one_total_over} Overs)
                  </p>
                  <p id={"matchteamTwoScore" + index}>
                    {/* Statistics of team2 */}
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
                  {/* Mapping Player of the Match */}
                  <p>Player of the Match</p>
                  <div className="POM-section">
                    {/* Image for player of the match */}
                    <p>
                      <img src={virat} className="matchDetails-pom-image" />{" "}
                    </p>
                    <p id={"pom" + index}>{match.player_of_the_match}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        
        {/* Start of Tab Container */}
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
            {/* Tab for Summary */}
              <li className="matchDetails-tab1">
                <label htmlFor="matchDetails-tab1">Summary</label>
              </li>
              {/* Tab for Scoreboard */}
              <li className="matchDetails-tab2">
                <label htmlFor="matchDetails-tab2">Scoreboard</label>
              </li>
              {/* Tab for Statictics */}
              <li className="matchDetails-tab3">
                <label htmlFor="matchDetails-tab3">Statistics</label>
              </li>
            </ul>
          </nav>
          {/* Content mapping for each Taba */}
          <section>
            {/* Start of Tab2 */}
            <div className="matchDetails-tab2">
              <div className="matchDetails-testimonials">
                <div className="matchDetails-details">
                  {/* Mapping of scoreboard basec on each innings */}
                  {this.props.singlematch.map(inning => (
                    <div className="innings-container">
                      <h2 className="matchDetails-scoreboard-header">
                        Innings {inning.inning}
                      </h2>
                      {/* Start of Container of Batsman Innings Container */}
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

                            {/* Mapping the inningwise batsman stats */}
                            {inning.scorecard.map((score, index) => (
                              // Batsman Name
                              <tr>
                                <td id={"striker" + index}>
                                  {score.striker_name}
                                </td>
                                {/* How the batsman was out */}
                                {score.wicket_type ? (
                                  <td id={"wicketType" + index}>
                                    {/* If the batsman was out then display the type of wicket , otherwise diaply not out */}
                                    {score.wicket_type == "caught"
                                      ? "c"
                                      : score.wicket_type}{" "}
                                    {""}
                                    {score.fielder_name} (b) {score.bowler_name}
                                  </td>
                                ) : (
                                  <td>Not Out</td>
                                )}

                                  {/* Runs scored by Batsman */}
                                <td>{score.batsman_run}</td>
                                {/* Balls Faced by Batsman */}
                                <td>{score.ball_faced}</td>
                                {/* NO of fours  */}
                                <td>{score.fours}</td>
                                {/* No of Sixes */}
                                <td>{score.sixes}</td>
                                {/* Strike Rate */}
                                <td>{score.striker_rate}</td>
                              </tr>
                            ))}

                            {/* Mapping total of each inning */}
                            {inning.total.map(total => (
                              <div>
                                <tr>
                                  <b>
                                    {/* Total rund made in each innings */}
                                    <td>Total : </td>
                                  </b>
                                  <td>
                                    {total.runs} ({total.wickets} wkts,{" "}
                                    {total.overs} Overs)
                                  </td>
                                </tr>
                                <tr style={{ background: "none" }}>
                                  <b>
                                    {/* Total extras in an innings */}
                                    <td>Extras : </td>
                                  </b>
                                  <td>{total.extras}</td>
                                </tr>
                              </div>
                            ))}
                          </table>
                        </div>
                      </div>
                      {/* End of Batsman Innings Container */}

                      {/* Start of Bowler Conatiner */}
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
                              {/* Name of Bowler */}
                              <td>{bowler.player_name}</td>
                              {/* Overs bowled by bowler */}
                              <td>{bowler.overs}</td>
                              {/* Runs conceeded by Bolwer */}
                              <td>{bowler.runs_conceeded}</td>
                              {/* WIckets taken */}
                              <td>{bowler.wickets}</td>
                              {/* Economy Rate (Rounding upto single decimal)*/}
                              <td>{Number(bowler.economy).toFixed(1)}</td>
                              {/* Extras */}
                              <td>{bowler.extras}</td>
                            </tr>
                          ))}
                        </table>
                      </div>
                    </div> 
                  ))}
                  {/* End of Bowler Container */}
                </div>
              </div>
            </div>
            {/* End of Tab2 */}
           
        {/* Start of Tab3 */}
            <div className="matchDetails-tab3">
              <div className="matchDetails-testimonials">
                {/* Mapping Runs per over Manhattan Graph */}
                <div className="matchDetails-statistics-container">
                  <h2>Runs Per Over graph</h2>
                  <div className="manhattan-match">
                    
                    <iframe
                      id="manhattan"
                      src={this.props.manhattan}
                      style={{ width: "100%", height: "300px", border: "none" }}
                    />
                  </div>
                </div>
                
                {/* Mapping Batman Contribution of each innings */}
                <div className="matchDetails-statistics-container">
                  <h2>Innings1 Batsman Contribution</h2>
                  <div className="manhattan-match">
                    <iframe
                      id="piebats1"
                      src={this.props.piebatsman1}
                      style={{ width: "100%", height: "300px", border: "none" }}
                    />
                  </div>
                </div>
                {/* Mapping Batman Contribution of each innings */}
                <div className="matchDetails-statistics-container">
                  <h2>Innings2 Batsman Contribution</h2>
                  <div className="manhattan-match">
                    <iframe
                      id="piebats2"
                      src={this.props.piebatsman2}
                      style={{ width: "100%", height: "300px", border: "none" }}
                    />
                  </div>
                </div>
                {/* Mapping Bowler Contribution of each innings */}
                <div className="matchDetails-statistics-container">
                  <h2>Innings1 Bowler Contribution</h2>
                  <div className="manhattan-match">
                    <iframe
                      id="piebowler1"
                      src={this.props.piebolwer1}
                      style={{ width: "100%", height: "300px", border: "none" }}
                    />
                  </div>
                </div>
                {/* Mapping Bowler Contribution of each innings */}
                <div className="matchDetails-statistics-container">
                  <h2>Innings2 Bowler Contribution</h2>
                  <div className="manhattan-match">
                    <iframe
                      id="piebowler2"
                      src={this.props.piebolwer2}
                      style={{ width: "100%", height: "300px", border: "none" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* End of Tab3 */}

            {/* Start of tab1 */}
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
                              {/* Mapping top two batsman of 1st innings */}
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
                              {/* Mapping top two batsman of 2nd innings */}
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
                          </th>
                          <tr>
                            {/* Mapping top two bowler of 1st innings */}
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
                              {/* Mapping top two batsman of 2nd innings */}
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
                                {/* Mapping Series Name */}
                                {this.props.current_match.result[0].competition}
                              </td>
                            </tr>
                            <tr>
                              {/* Match Type */}
                              <td>Match Type</td>
                              <td>
                                {this.props.current_match.result[0].match_type}
                              </td>
                            </tr>
                            <tr>
                              {/* Match Played */}
                              <td>Match</td>
                              <td>
                                {this.props.current_match.country[0].team_name}{" "}
                                vs{" "}
                                {this.props.current_match.country[1].team_name}
                              </td>
                            </tr>
                            <tr>
                              {/* Match Date */}
                              <td>Match Date</td>{" "}
                              <td>
                                {new Date(
                            this.props.current_match.date[0].match_date
                          ).toLocaleDateString("en-IN", {
                            month: "short",
                            day: "2-digit",
                            year: "numeric"
                          })}
                              </td>
                            </tr>
                            <tr>
                              {/* Venue of Match */}
                              <td>Venue</td>{" "}
                              <td>
                                {this.props.current_match.venue[0].venue_name}
                              </td>
                            </tr>

                            <tr>
                              {/* Umpires of the mathc */}
                              <td>Umpires </td>
                              <td>
                                {this.props.current_match.umpire[0].umpire_name}
                                ,{" "}
                                {this.props.current_match.umpire[1].umpire_name}
                              </td>
                            </tr>
                            <tr>
                              {/* Toss Winner ad Toss Decision */}
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
                              {/* Result of the match */}
                              <td>Result </td>
                              <td>
                                {" "}
                                {this.props.current_match.result[0].winner}{" "}
                                {this.props.current_match.result[0].outcome}
                              </td>
                            </tr>
                            <tr>
                              {/* Player of the match */}
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
        </div> </div>)) : <div className="loader-container" style={{top:"0px"}}>
              <div className="user-loader"></div>
            </div>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  current_match: state.matchReducers.current_match,
  singlematch: state.matchReducers.singlematch,
  summary: state.matchReducers.summary,
  manhattan: state.matchReducers.manhattan,
  piebatsman1: state.matchReducers.piebatsman1,
  piebatsman2: state.matchReducers.piebatsman2,
  piebolwer1: state.matchReducers.piebolwer1,
  piebolwer2: state.matchReducers.piebolwer2
});

export default connect(
  mapStateToProps,
  {
    getAllMatchDetails,
    getScorecard,
    getMatchDetails,
    getManhattanGraphMatch,
    getPieChartBatsman1,
    getPieChartBatsman2,
    getPieChartBowler1,
    getPieChartBowler2
  }
)(MatchDetails);
