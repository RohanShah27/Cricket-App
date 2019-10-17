import React, { Component } from "react";
import { getGlobalSearchResult } from "../actions/Search";
import "../styles/navbar.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import virat from "../virat-kohli.png";
import ipl from "./ipl.png";

export class Navigation extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    search_term: ""
  };
  removeToken = () => {
    localStorage.removeItem("token");
    this.forceUpdate();
  };
  getResult = () => {
    let search_term = {
      search_term: this.state.search_term
    };
    this.props.getGlobalSearchResult(search_term);
  };

  OnChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    let search_term = {
      search_term: this.state.search_term
    };
    this.props.getGlobalSearchResult(search_term);
  };

  render() {
    console.log(this.props);
    return (
      <div className="nav-container">
        <div className="nav-header">
          <a className="logo">
            <Link to="/">Crickstrait</Link>
          </a>
          {this.props.gender == "male" ? (
            <a
              className="options"
              style={{
                color: "#f39c12",
                background: "white",
                marginRight: "5px"
              }}
            >
              Men
            </a>
          ) : (
            <a
              className="options"
              onClick={this.props.menState}
              style={{ marginRight: "5px" }}
            >
              Men
            </a>
          )}
          {this.props.gender == "female" ? (
            <a
              className="options"
              style={{ color: "#f39c12", background: "white" }}
            >
              Women
            </a>
          ) : (
            <a className="options" onClick={this.props.femaleState}>
              Women
            </a>
          )}

          <input className="menu-btn" type="checkbox" id="menu-btn" />
          <label className="menu-icon" for="menu-btn">
            <span className="navicon"></span>
          </label>

          <ul className="menu">
            <li>
              <Link to="/rankings">Rankings</Link>
            </li>
            <li>
              <Link to="/matches">Matches</Link>
            </li>
            <li>
              <Link to="/teams">Teams</Link>
            </li>
            <li>
              <Link to="/paginatePlayers">Players</Link>
            </li>
            <li style={{ textAlign: "center" }}>
              <input
                className="nav-search-bar"
                type="text"
                name="search_term"
                value={this.state.search_term}
                onChange={this.OnChange}
              />
              <button className="nav-search-button" onClick={this.getResult}>
                <i className="fa fa-search"></i>
              </button>
              {this.state.search_term == "" ? null : (
                <div className="search-result">
                  {this.props.search_result.length != 0 ? (
                    this.props.search_result.player.length != 0 ? (
                      this.props.search_result.player.map((player, index) => (
                        <span className="search_result_data">
                          <Link
                            to={{
                              pathname: "/playerprofile/" + player.player_id,
                              state: { player }
                            }}
                          >
                            <p
                              style={{
                                fontSize: "18px",
                                paddingTop: "0px ",
                                display: "flex",
                                justifyContent: "center"
                              }}
                              id={"searchPlayer" + index}
                            >
                              {player.player_name}
                              <img
                                src={virat}
                                style={{
                                  borderRadius: "8px",
                                  marginLeft: "5px",
                                  height: "30px",
                                  width: "30px"
                                }}
                              ></img>
                            </p>
                          </Link>
                        </span>
                      ))
                    ) : (
                      <p style={{ padding: "10px 10px" }}>No Player Found</p>
                    )
                  ) : null}
                  <hr style={{ width: "100px", marginLeft: "50px" }} />
                  {this.props.search_result.length != 0 ? (
                    this.props.search_result.team.length != 0 ? (
                      this.props.search_result.team.map(teams => (
                        <span className="search_result_data">
                          <Link
                            to={{
                              pathname: "/viewteam/" + teams.team_id,
                              state: { teams }
                            }}
                          >
                            {/* <Link to={"/viewteam/" + team.team_id}> */}
                            <p
                              style={{
                                fontSize: "18px",
                                paddingTop: "0px ",
                                display: "flex",
                                justifyContent: "center"
                              }}
                            >
                              {teams.team_name}
                              <img
                                src={ipl}
                                style={{
                                  borderRadius: "10px",
                                  marginLeft: "5px",
                                  height: "30px",
                                  width: "30px"
                                }}
                              ></img>
                            </p>
                          </Link>
                        </span>
                      ))
                    ) : (
                      <p style={{ padding: "10px 10px" }}>No Team Found</p>
                    )
                  ) : null}
                </div>
              )}
            </li>
            {localStorage.getItem("token") ? (
              <>
                <li>
                  <a>
                    <div className="drop-down">
                      Admin
                      <div className="drop-down-content">
                        <span>
                          <Link to="/addnewteam">Add Team</Link>
                        </span>
                        <span>
                          <Link to="/adminplayer">Add Player</Link>
                        </span>
                        <span>
                          <Link to="/addnewadmin">Add Admin</Link>
                        </span>
                        <span>
                          <Link to="/resetpassword">Reset Passsword</Link>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <Link to="/" onClick={this.removeToken}>
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  search_result: state.searchReducer.search_result
});
export default connect(
  mapStateToProps,
  { getGlobalSearchResult }
)(Navigation);
