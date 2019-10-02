import React, { Component } from "react";
import {} from "../actions/Players";
import "../styles/navbar.css";
import { Link } from "react-router-dom";

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.changeState = this.changeState.bind(this);
    this.menState = this.menState.bind(this);
  }

  state = {
    playerName: "",
    menSelected: true
  };
  removeToken = () => {
    localStorage.removeItem("token");
    this.forceUpdate();
  };
  changeState = () => {
    this.setState({
      menSelected: false
    });
  };
  menState = () => {
    this.setState({
      menSelected: true
    });
  };
  OnChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    console.log(this.props);
    return (
      <div className="nav-container">
        <h3 className="nav-heading">
          <a>
            <Link to={"/"}>Crickstrait</Link>
          </a>
          {this.state.menSelected == true ? (
            <a className="nav-options" onClick={this.menState}>
              Men
            </a>
          ) : (
            <a
              className="nav-options"
              onClick={this.menState}
              style={{ color: "#c2c2c2" }}
            >
              Men
            </a>
          )}
          {this.state.menSelected == true ? (
            <a
              className="nav-options"
              onClick={this.changeState}
              style={{ color: "#c2c2c2" }}
            >
              Women
            </a>
          ) : (
            <a className="nav-options" onClick={this.changeState}>
              Women
            </a>
          )}
        </h3>

        <ol className="nav-main-menu">
          <li>
            {this.state.menSelected == true ? (
              <a>
                <Link to="/teams">Teams</Link>
              </a>
            ) : (
              <a>
                <Link to="/teams">Teams</Link>
              </a>
            )}
          </li>
          <li>
            {this.state.menSelected == true ? (
              <a>
                <Link to="/rankings">Rankings</Link>
              </a>
            ) : (
              <a>
                <Link to="/rankings">Rankings</Link>
              </a>
            )}
          </li>
          <li>
            <a>
              <Link to="/series">Series</Link>
            </a>
          </li>
          <li>
            <form>
              <input
                className="nav-input"
                type="text"
                placeholder="eg: Virat Kohli"
                name="playerName"
                onChange={this.OnChange}
                value={this.state.playerName}
              />
              <button className="nav-button">
                <Link to={"/playerprofile/" + this.state.playerName}>
                  <i class="fa fa-search"></i>
                </Link>
              </button>
            </form>
          </li>
          {localStorage.getItem("token") ? (
            <li>
              <Link to="/createPlayer">
                <a>Admin</a>
              </Link>
            </li>
          ) : null}
          <li>
            {localStorage.getItem("token") ? (
              <Link to="/">
                {" "}
                <a onClick={this.removeToken}>Logout</a>
              </Link>
            ) : (
              <a>
                <Link to="/login">Admin?</Link>
              </a>
            )}
          </li>
        </ol>
      </div>
    );
  }
}
