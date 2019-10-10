import React, { Component } from "react";
import { addAdmin, sendPassword } from "../actions/User";

import { connect } from "react-redux";
import "../styles/AddNewAdmin.css";
export class AddNewAdmin extends Component {
    constructor(props) {
        super(props);
        //To allow the function this.onaddAdminClick to send data to the actions page -yash
        this.onaddAdminClick = this.onaddAdminClick.bind(this);
    }
    //The values that are going to be used in this component -yash
    state = {
        email: "",
        password: "123456"
    };

    OnChange = event => {
        //To change the text fields to accept input -yash
        this.setState({ [event.target.name]: event.target.value });
    };
    componentDidMount() {
        //If Token not present return to landing screen -yash
        if (!localStorage.getItem("token")) {
            this.props.history.push("/");
        }
    }
    //(e) used to prevent data being shown on the searchbar -yash
    onaddAdminClick(e) {
        e.preventDefault();
        //storing values email and password in an object user -yash
        let user = {
            email: this.state.email,
            password: this.state.password
        };
        //calling addAdmin function from actions -yash
        this.props.addAdmin(user)
        //calling sendpassword function from actions -yash
        this.props.sendPassword(user);
        //set current state of the values email and password -yash
        this.setState({
            email: "",
            password: "123456"
        });
    }

    render() {
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
                        />
                        {/* end of input tag email -yash */}
                        {/* display error from node  -yash */}
                        {this.props.error ? <><p>{this.props.error}</p></> : null}
                        {/* start of button add user -yash */}
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
