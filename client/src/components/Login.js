import React, { Component } from "react";
import { login } from "../actions/User";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import "../styles/login.css";
export class Login extends Component {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
  }
  //values to be taken in the current component -yash
  state = {
    email: "",
    password: ""
  };

  OnChange = event => {
    //state change when the user inputs in the inputbox -yash
    this.setState({ [event.target.name]: event.target.value });
  };
  componentDidMount() {
    // check if token preset -yash
    if (localStorage.getItem("token")) {
      this.props.history.push("/");
    }
  }

  onLogin(e) {
    //does not allow login values should be shown on the searchbar -yash
    e.preventDefault();
    let user = {
      email: this.state.email,
      password: this.state.password
    };
    //login function in actions/user -yash
    this.props.login(user, this.props.history);
    //set current state -yash
    this.setState({
      email: "",
      password: ""
    });
    this.forceUpdate();
  }

  render() {
    return (
      //start of div -yash
      <div>
        {/* start of form -yash */}
        <form id="loginform">
          {/* start of fieldset -yash */}
          <fieldset>
            {/* start and end of header -yash */}
            <h1 className="loginheader">Login</h1>
            {/* input tag for email -yash */}
            <input
              className="login"
              type="text"
              name="email"
              placeholder="Enter email"
              onChange={this.OnChange}
              value={this.state.email}
            />
            {/* end of email input tag -yash */}

            {/* start of password input field -yash */}
            <input
              className="login"
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={this.OnChange}
              value={this.state.password}
            />
            {/* end of password input field -yash */}

            {/* dispatch error from node -yash */}
            {this.props.error ? (
              <>
                <p>{this.props.error}</p>
              </>
            ) : null}

            {/* button for login -yash */}
            <button
              onChange={this.onChange}
              onClick={this.onLogin}
              className="login-button"
            >
              Login
            </button>
            {/* end of button for login -yash */}
            <Link to="/resetpassword">
              <p
                style={{
                  color: "#f39c12",
                  textDecoration: "none",
                  borderBottom: "none"
                }}
              >
                Forgot Password ?
              </p>
            </Link>
            {/* end of fieldset -yash */}
          </fieldset>
          {/* end of form -yash */}
        </form>
        {/* end of div -yash */}
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
  //call to login function -yash
  { login }
)(Login);
