import React, { Component } from "react";
import { login } from "../actions/User";

import { connect } from "react-redux";
import "../styles/login.css";
export class Login extends Component {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
  }
  //values to be taken in the current component
  state = {
    email: "",
    password: ""
  };

  OnChange = event => {
    //state change when the user inputs in the inputbox
    this.setState({ [event.target.name]: event.target.value });
  };
  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.props.history.push("/");
      console.log(this.props);
    }
  }

  onLogin(e) {
    //does not allow login values should be shown on the searchbar
    e.preventDefault();
    let user = {
      email: this.state.email,
      password: this.state.password
    };
    //login function in actions/user
    this.props.login(user, this.props.history);
    //set current state
    this.setState({
      email: "",
      password: ""
    });
  }

  render() {
    console.log(this.props)
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
            {this.props.error ? <><p>{this.props.error}</p></> : null}
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
  users: state.userReducer.users,
  error: state.userReducer.error
});

export default connect(
  mapStateToProps,
  //call to login function
  { login }
)(Login);
