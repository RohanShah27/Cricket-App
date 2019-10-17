import React, { Component } from "react";
import { addAdmin, sendPassword } from "../actions/User";

import { connect } from "react-redux";
import "../styles/AddNewAdmin.css";
//setting initial state that is to be used in this component -yash
const initialState = {
  email: "",
  password: "12356",
  emailError: ""
};
export class AddNewAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true
    };
    //To allow the function this.onaddAdminClick to send data to the actions page -yash
    this.onaddAdminClick = this.onaddAdminClick.bind(this);
  }
  //The values that are going to be used in this component -yash
  state = {
    initialState
  };

  OnChange = event => {
    //checkbox method to check if there are no errors from client side -yash
    const isCheckbox = event.target.type === "checkbox";
    //state change when the user inputs in the inputbox -yash
    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value
    });
  };
  componentDidMount() {
    //If Token not present return to landing screen -yash
    if (!localStorage.getItem("token")) {
      this.props.history.push("/");
    }
  }
  //error vlidation from the front end -yash
  validate = () => {
    let emailError = "";

    if (
      !this.state.email ||
      this.state.email.length <= 5 ||
      !this.state.email.includes("@") ||
      !this.state.email.includes(".")
    ) {
      emailError = "Enter a valid Email";
    }

    if (emailError) {
      this.setState({ emailError: emailError });

      return false;
    }
    return true;
  };
  //(e) used to prevent data being shown on the searchbar -yash
  onaddAdminClick(e) {
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      //storing values email and password in an object user -yash
      let user = {
        email: this.state.email,
        password: this.state.password
      };
      //calling addAdmin function from actions -yash
      this.props.addAdmin(user);
      //calling sendpassword function from actions -yash
      this.props.sendPassword(user);
      //set current state of the values email and password -yash
      this.setState({
        email: "",
        password: "123456"
      });
    }
  }

  render() {
    console.log(this.props);
    return (
      // /start of main div -yash
      <div>
        {/* start of form -yash */}
        <form id="addnewadminform">
          {/* start of fieldset -yash */}
          <fieldset>
            {/* start and end of header -yash */}
            <h1 className="adminheader">Add New Admin</h1>
            {/* start of input tag email -yash */}
            <input
              className="adminnewinput"
              type="text"
              name="email"
              placeholder="Enter email"
              onChange={this.OnChange}
              value={this.state.email}
              required
            />
            {/* end of input tag email -yash */}
            <div className="adminerror" style={{ fontSize: 15, color: "red" }}>
              {/* display error from node  -yash */}
              {this.props.error ? (
                <>
                  <p>{this.props.error}</p>
                </>
              ) : (
                <p>{this.state.emailError}</p>
              )}
              {/* start of button add user -yash */}
            </div>
            <button
              onChange={this.onChange}
              onClick={this.onaddAdminClick}
              className="admin-new-button"
            >
              Add User
            </button>
            {/* end of button add user -yash */}
          </fieldset>
          {/* end of fieldset -yash */}
        </form>
        {/* end of form -yash */}
      </div>
      // end of div -yash
    );
  }
}

const mapStateToProps = state => ({
  //value entered in react is passed throught user reducer -yash
  users: state.userReducer.users,
  error: state.userReducer.error
});

export default connect(
  mapStateToProps,
  //functions (addAdmin) for creation of new admin and (sendPassword) send password via email on nodemailer-yash
  { addAdmin, sendPassword }
)(AddNewAdmin);
