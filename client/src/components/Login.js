import React, { Component } from "react";
import { login } from "../actions/user";

import { connect } from "react-redux";
import "../styles/login.css";
export class Login extends Component {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
  }
  state = {
    email: "",
    password: ""
  };

  OnChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.props.history.push("/");
    }
  }

  onLogin(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.login(user, this.props.history);
    this.setState({
      email: "",
      password: ""
    });
  }

  render() {
    return (
      <div>
        <div></div>
        <form id="loginform">
          <fieldset>
            <h1 className="loginheader">Login</h1>
            <input
              className="login"
              type="text"
              name="email"
              placeholder="Enter email"
              onChange={this.OnChange}
              value={this.state.email}
            />
            <input
              className="login"
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={this.OnChange}
              value={this.state.password}
            />
            <button
              onChange={this.onChange}
              onClick={this.onLogin}
              className="login-button"
            >
              Login
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.userReducer.users
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
