import React, { Component } from "react";
import { getGlobalSearchResult } from "../actions/Search";
import "../styles/navbar.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import stockPlayer from "../stockPlayer.png";
import playerFemale from "../stockPlayerFemale.jpg";
import ReactCountryFlag from "react-country-flag";

export class Navigation extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    // Declaring a property for search bar section -Rohan
    search_term: ""
  };
  // Function to remove token and render page if user chooses to logOut -Rohan
  removeToken = () => {
    localStorage.removeItem("token");
    this.forceUpdate();
  };
  // Get search result on Click of search Button -Rohan
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
    // Call to the get globalsearch result as soon as user starts typing (Live Search)-Rohan
    this.props.getGlobalSearchResult(search_term);
  };

  render() {
    return (
      // Start of navbar-Rohan
      <div className="nav-container">
        <div className="nav-header">
          {/* Brand name */}
          <a className="logo" id="Brand">
            <Link to="/">Crickstrait</Link>
          </a>
          {/* Male Female Options */}
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
              id="menState"
              className="options"
              // Change the state to mens state in the App.js class component state -Rohan
              onClick={this.props.menState}
              style={{ marginRight: "5px" }}
            >
              Men
            </a>
          )}
          {this.props.gender == "female" ? (
            <a
              id="femaleState"
              className="options"
              style={{ color: "#f39c12", background: "white" }}
            >
              Women
            </a>
          ) : (
            <a
              id="femaleState"
              className="options"
              // Change the state to Female state in the App.js class component state -Rohan

              onClick={this.props.femaleState}
            >
              Women
            </a>
          )}

          <input className="menu-btn" type="checkbox" id="menu-btn" />
          <label className="menu-icon" for="menu-btn">
            <span className="navicon"></span>
          </label>

          <ul className="menu">
            <li id="Rankings">
              {/* Link to Rankings component -Rohan */}
              <Link to="/rankings">Rankings</Link>
            </li>
            <li id="matches">
              {/* Link to Matches component -Rohan */}
              <Link to="/matches">Matches</Link>
            </li>
            <li id="teams">
              {/* Link to Teams Component -Rohan */}
              <Link to="/teams">Teams</Link>
            </li>
            <li id="players">
              {/* Link to Players Comonent -Rohan */}
              <Link to="/Players">Players</Link>
            </li>
            {/* Start of Search Section-Rohan  */}
            <li style={{ textAlign: "center" }}>
              <input
                id="globalSearchBar"
                className="nav-search-bar"
                type="text"
                name="search_term" //Same as that in state -Rohan
                value={this.state.search_term}
                onChange={this.OnChange}
              />
              <button
                id="searchButton"
                className="nav-search-button"
                onClick={this.getResult} //Call to function to get the search result -Rohan
              >
                <i className="fa fa-search"></i>
              </button>
              {/* End of Search Section -Rohan */}
              {/* Mapping search results if there is data in the result else not displaying the component -Rohan */}
              {this.state.search_term == "" ? null : (
                <div className="search-result">
                  {this.props.search_result.length != 0 ? (
                    this.props.search_result.player.length != 0 ? (
                      this.props.search_result.player.map((player, index) => (
                        <span className="search_result_data">
                          {/* Link to redirect the user to details of player on click -Rohan */}
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
                            >
                              <span id={"searchPlayer" + index}>
                                {" "}
                                {player.player_name}
                              </span>
                              <img
                                className="players-img "
                                src={
                                  player.player_image
                                    ? "data:image/jpeg;base64," +
                                      new Buffer(player.player_image)
                                    : player.gender == "male"
                                    ? stockPlayer
                                    : playerFemale
                                }
                                style={{
                                  borderRadius: "8px",
                                  marginLeft: "5px",
                                  height: "30px",
                                  width: "30px"
                                }}
                              />
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
                      this.props.search_result.team.map((teams, index) => (
                        <span className="search_result_data">
                          {/* Link to redirect the user to details of team on click -Rohan */}

                          <Link
                            to={{
                              pathname: "/viewteam/" + teams.team_id,
                              state: { teams }
                            }}
                          >
                            <p
                              style={{
                                fontSize: "18px",
                                paddingTop: "0px ",
                                display: "flex",
                                justifyContent: "center"
                              }}
                            >
                              <span id={"teamName" + index}>
                                {teams.team_name}
                              </span>
                              <ReactCountryFlag
                                style={{
                                  borderRadius: "10px",
                                  marginLeft: "5px",
                                  height: "30px",
                                  width: "30px"
                                }}
                                code={
                                  teams.team_image ? teams.team_image : "af"
                                }
                                svg
                              />
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
            {/* if there is a token present only then dsplay admin option and logout else dont -Rohan */}
            {localStorage.getItem("token") ? (
              <>
                <li>
                  <a>
                    {/* Drop down for admin options for a user -Rohan */}
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
                  {/* Call to the removeToken Fncion -Rohan */}
                  <Link to="/" onClick={this.removeToken}>
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              // If no token found then display Login option to redirect user to Login component-Rohan
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
