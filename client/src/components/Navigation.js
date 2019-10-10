import React, { Component } from "react";
import { getGlobalSearchResult } from "../actions/Search";
import "../styles/navbar.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

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
            <a className="options" style={{ color: "#c2c2c2c2" }}>
              Men
            </a>
          ) : (
            <a className="options" onClick={this.props.menState}>
              Men
            </a>
          )}
          {this.props.gender == "female" ? (
            <a className="options" style={{ color: "#c2c2c2c2" }}>
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
              <Link to="/players">Players</Link>
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
                  {this.props.search_result.length != 0
                    ? this.props.search_result.player.length != 0
                      ? this.props.search_result.player.map(player => (
                          <span className="search_result_data">
                            <Link
                              to={{
                                pathname: "/playerprofile/" + player.player_id,
                                state: { player }
                              }}
                            >
                              <p>{player.player_name}</p>
                            </Link>
                          </span>
                        ))
                      : "No Player Found"
                    : null}
                  {this.props.search_result.length != 0
                    ? this.props.search_result.team.length != 0
                      ? this.props.search_result.team.map(team => (
                          <span className="search_result_data">
                            <Link
                              to={{
                                pathname: "/viewteam/" + team.team_id,
                                state: { team }
                              }}
                            >
                              <p>{team.team_name}</p>
                            </Link>
                          </span>
                        ))
                      : "No Team Found"
                    : null}
                </div>
              )}
            </li>
            {localStorage.getItem("token") ? (
              <li>
                <Link to="/" onClick={this.removeToken}>
                  Logout
                </Link>
              </li>
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
