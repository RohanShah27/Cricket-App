import React, { Component } from "react";
import { addAdmin, sendPassword } from "../actions/User";

import { connect } from "react-redux";
import "../styles/AddNewAdmin.css";
export class AddNewAdmin extends Component {
    constructor(props) {
        super(props);
        //To allow the function this.onaddAdminClick to send data to the actions page 
        this.onaddAdminClick = this.onaddAdminClick.bind(this);
    }
    //The values that are going to be used in this component
    state = {
        email: "",
        password: "123456"
    };

    OnChange = event => {
        //To change the text fields to accept input 
        this.setState({ [event.target.name]: event.target.value });
    };
    componentDidMount() {
        //If Token not present return to landing screen
        if (!localStorage.getItem("token")) {
            this.props.history.push("/");
        }
    }
    //(e) used to prevent data beign shown on the searchbar
    onaddAdminClick(e) {
        e.preventDefault();
        //storing values email and password in an object user 
        let user = {
            email: this.state.email,
            password: this.state.password
        };
        //calling addAdmin function from actions 
        this.props.addAdmin(user)
        //calling sendpassword function from actions
        this.props.sendPassword(user);
        //set current state of the values email and password 
        this.setState({
            email: "",
            password: "123456"
        });
    }

    render() {
        return (
            <div>
                <form id="addnewadminform">
                    <fieldset>
                        <h1 className="adminheader">Add New Admin</h1>
                        <input
                            className="adminnewinput"
                            type="text"
                            name="email"
                            placeholder="Enter email"
                            onChange={this.OnChange}
                            value={this.state.email}
                        />
                        {this.props.error ? <><p>{this.props.error}</p></> : null}
                        <button
                            onChange={this.onChange}
                            onClick={this.onaddAdminClick}
                            className="admin-new-button"
                        >
                            Add User
            </button>
                    </fieldset>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    //value entered in react is passed throught user reducer 
    users: state.userReducer.users,
    error: state.userReducer.error
});

export default connect(
    mapStateToProps,
    //functions (addAdmin) for creation of new admin and (sendPassword) send password via email on nodemailer
    { addAdmin, sendPassword }
)(AddNewAdmin);
