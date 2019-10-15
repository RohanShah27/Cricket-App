import React, { Component } from "react";
import { login } from "../actions/User";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../styles/login.css";

const initialState = {
  email: "",
  password: "",
  emailError: "",
  passwordError: ""
}
export class Login extends Component {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
    this.state = {
      isDisabled: true
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //values to be taken in the current component -yash
  state = {
    initialState
  };

  OnChange = (event) => {
    const isCheckbox = event.target.type === "checkbox";
    //state change when the user inputs in the inputbox -yash
    this.setState({ [event.target.name]: isCheckbox ? event.target.checked : event.target.value });
  }
  validate = () => {
    let emailError = "";
    let passwordError = "";

    if (!this.state.email || this.state.email.length <= 5 || !this.state.email.includes("@") || !this.state.email.includes(".") || !this.state.password || this.state.password <= 5) {
      emailError = "Enter All Fields";
    }
    if (!this.state.password || this.state.password.length <= 5) {
      passwordError = "invalid credentials";
    }

    if (emailError || passwordError) {
      this.setState({ emailError: emailError, passwordError: passwordError });

      return false;
    }
    return true;
  }
  handleSubmit = event => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {

      console.log(this.state);
      this.setState(initialState);
    }
  }

  componentDidMount() {
    // check if token preset -yash
    if (localStorage.getItem("token")) {
      this.props.history.push("/");
    }

  }


  onLogin(e) {
    //does not allow login values should be shown on the searchbar -yash
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {
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
    }
  }
  error(state, props) {
    const reducererror = props.error;
    const clienterror = state.error;
    if (reducererror) {
      return this.props.error
    }
    else if (clienterror) {
      return this.state.error
    }
  }

  render() {
    console.log(this.props)
    return (
      //start of div -yash
      <div>
        {/* start of form -yash */}
        <form id="loginform" onSubmit={this.handleSubmit}>
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
              required

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
              // validation={this.state.error}
              required
            />

            {/* end of password input field -yash */}
            <div className="loginerror" style={{ fontSize: 15, color: "red" }}>
              {/* dispatch error from node -yash */}
              {this.props.error ? (
                <>
                  <p>{this.props.error}</p>
                </>
              ) : <p>{this.state.emailError}</p>}

            </div>
            {/* button for login -yash */}
            <button
              onChange={this.onChange}
              // onSubmit={this.onsubmit}
              onClick={this.onLogin}
              className="login-button"
            // disabled={!this.state.email || !this.state.password}
            >
              Login
            </button>
            {/* end of button for login -yash */}
            <Link to="/resetpassword" className="login-link">Forgot Password?</Link>
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
