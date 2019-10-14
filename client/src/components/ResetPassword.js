import React, { Component } from "react";
import { resetPassword } from "../actions/User";
import { connect } from "react-redux";
import "../styles/resetpassword.css";
const initialState = {
    email: "",
    password: "",
    confirmpassword: "",
    emailError: "",
}
export class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.onSubmitClick = this.onSubmitClick.bind(this);
    }
    state = {
        //values in the database -yash
        initialState
    };

    OnChange = event => {
        //checkbox method to check if the error validation methods are met -yash
        const isCheckbox = event.target.type === "checkbox";
        //state change when the user inputs in the inputbox -yash
        this.setState({ [event.target.name]: isCheckbox ? event.target.checked : event.target.value });
    };
    componentDidMount() {
        //checking if token is not present -yash
        if (localStorage.getItem("token")) {
            this.props.history.push("/");
        }
    }
    //errors which are validated in the front end 
    validate = () => {
        let emailError = "";

        if (!this.state.email || this.state.email.length <= 5 || !this.state.email.includes("@") || !this.state.email.includes(".") || !this.state.password || this.state.password.length <= 5 || !this.state.password == this.state.confirmpassword) {
            emailError = "enter all fields correctly";
        }
        // if (!this.state.password || this.state.password.length <= 5 || !this.state.password == this.state.confirmpassword) {
        //     passwordError = "passwords do not match";
        // }

        if (emailError) {
            this.setState({ emailError: emailError });

            return false;
        }
        return true;
    }
    onSubmitClick = (e) => {
        //to prevent values to be shown on the searchbar -yash
        e.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            let a = this.state.password;
            let b = this.state.confirmpassword;
            // eslint-disable-next-line
            //compare if password and confirm password are the same -yash
            if (a == b) {
                let user = {
                    email: this.state.email,
                    password: this.state.password
                };
                //function resetPassword present in actions/user -yash
                this.props.resetPassword(user);
            } else {
                console.log("error");
            }
        }
    }
    render() {
        return (
            //start of div -yash
            <div>
                {/* start of form -yash */}
                <form id="resetpasswordform">
                    <fieldset>
                        {/* start of fieldset -yash */}

                        {/* start and end of header -yash */}
                        <h1 className="resetpasswordheader">Reset Password</h1>

                        {/* start of input field for email -yash */}
                        <input
                            className="resetpassword"
                            type="text"
                            name="email"
                            placeholder="Enter email"
                            onChange={this.OnChange}
                            value={this.state.email}
                        />
                        {/* end of input field -yash */}

                        {/* start of input field for password -yash */}
                        <input
                            className="resetpassword"
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={this.OnChange}
                            value={this.state.password}
                        />
                        {/* end of input field -yash */}

                        {/* start of input field for confirm password -yash */}
                        <input
                            className="resetpassword"
                            type="password"
                            name="confirmpassword"
                            placeholder="Confirm Password"
                            onChange={this.OnChange}
                            value={this.state.confirmpassword}
                        />
                        {/* end of input field -yash*/}
                        <div className="loginerror" style={{ fontSize: 15, color: "red" }}>{this.state.emailError}</div>
                        {this.props.error ? (
                            <>
                                <p>{this.props.error}</p>
                            </>
                        ) : null}
                        {/* start of button reset password -yash*/}
                        <button
                            onChange={this.onChange}
                            onClick={this.onSubmitClick}
                            className="resetpassword-button"
                        >
                            Update Password
            </button>
                        {/* end of button -yash*/}
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
    users: state.userReducer.users,
    error: state.userReducer.error
});

export default connect(
    mapStateToProps,
    //call to reset password function -yash
    { resetPassword }
)(ResetPassword);
