import React, { Component } from "react";
import { resetPassword } from "../actions/User";
import { connect } from "react-redux";
import "../styles/resetpassword.css";
export class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.onSubmitClick = this.onSubmitClick.bind(this);
    }
    state = {
        //values in the database 
        email: "",
        password: "",
        confirmpassword: ""
    };

    OnChange = event => {
        //change of state when user enters in the text field
        this.setState({ [event.target.name]: event.target.value });
    };
    componentDidMount() {
        if (!localStorage.getItem("token")) {
            this.props.history.push("/");
        }
    }
    onSubmitClick = (e) => {
        //to prevent values to be shown on the searchbar
        e.preventDefault();
        let a = this.state.password;
        let b = this.state.confirmpassword;
        // eslint-disable-next-line
        //compare if password and confirm password are the same 
        if (a == b) {
            let user = {
                email: this.state.email,
                password: this.state.password
            };
            //function resetPassword present in actions/user
            this.props.resetPassword(user);
        } else {
            console.log("error");
        }

    }
    render() {
        return (
            <div>
                <div></div>
                <form id="resetpasswordform">
                    <fieldset>
                        <h1 className="resetpasswordheader">Reset Password</h1>
                        <input
                            className="resetpassword"
                            type="text"
                            name="email"
                            placeholder="Enter email"
                            onChange={this.OnChange}
                            value={this.state.email}
                        />
                        <input
                            className="resetpassword"
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={this.OnChange}
                            value={this.state.password}
                        />
                        <input
                            className="resetpassword"
                            type="password"
                            name="confirmpassword"
                            placeholder="Confirm Password"
                            onChange={this.OnChange}
                            value={this.state.confirmpassword}
                        />
                        <button
                            onChange={this.onChange}
                            onClick={this.onSubmitClick}
                            className="resetpassword-button"
                        >
                            Update Password
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
    { resetPassword }
)(ResetPassword);
