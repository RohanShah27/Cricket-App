import React, { Component } from "react";
import { addTeam } from "../actions/User";

import { connect } from "react-redux";
import "../styles/Adminaddnewteam.css";
//initial state for the values used in this component -yash
const initialState = {
    team_name: "",
    team_name_Error: ""
}
export class AddNewTeam extends Component {
    constructor(props) {
        super(props);
        //to make function onaddAdminClick execute when clicked  -yash
        this.onaddAdminClick = this.onaddAdminClick.bind(this);
        this.state = {
            isDisabled: false
        }
    }
    state = {
        //parameter in table teams -yash
        initialState
    };

    OnChange = event => {
        //checkbox to check if all error conditions are surpassed -yash
        const isCheckbox = event.target.type === "checkbox";
        //state change when the user inputs in the inputbox -yash
        this.setState({ [event.target.name]: isCheckbox ? event.target.checked : event.target.value });
    };
    componentDidMount() {
        //check if token is present -yash
        if (!localStorage.getItem("token")) {
            this.props.history.push("/");
        }
    }
    //errors generated from the client side -yash
    validate = () => {
        let team_name_Error = "";

        if (!this.state.team_name) {
            team_name_Error = "Team Name Cannot Be Empty";
        }

        if (team_name_Error) {
            this.setState({ team_name_Error: team_name_Error });

            return false;
        }
        return true;
    }

    onaddAdminClick(e) {
        //prevent values showing on the searchbar -yash
        e.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            let team = {
                team_name: this.state.team_name
            };
            //function on actions to add the team_name to the team database -yash
            this.props.addTeam(team)
            this.setState({
                team_name: ""
            });
        }
    }

    render() {
        console.log(this.props)
        return (
            //start of div -yash
            <div>
                {/* start of form addnewteamform -yash*/}
                <form id="addnewteamform">
                    {/* start of fieldset -yash*/}
                    <fieldset>
                        {/* start and end of header -yash */}
                        <h1 className="teamadminheader">Add New Team</h1>
                        {/* start of input team-name -yash */}
                        <input
                            className="teamadminnewinput"
                            type="text"
                            name="team_name"
                            placeholder="Enter New Team Name"
                            onChange={this.OnChange}
                            value={this.state.team_name}
                        />
                        {/* end of input team-name -yash */}
                        {/* error generation if there is an error -yash */}
                        <div className="teamnameerror" style={{ fontSize: 15, color: "red" }}>
                            {/* end of error generation -yash */}
                            {/* display error from node -yash */}
                            {this.props.error ? <><p>{this.props.error}</p></> : <p>{this.state.team_name_Error}</p>}
                            {/* ṣtart of button add team -yash */}
                        </div>
                        <button
                            onChange={this.onChange}
                            onClick={this.onaddAdminClick}
                            className="teamadmin-new-button"
                        >
                            Add Team
            </button>
                        {/* end of button add team -yash */}
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
    //function add team in actions  -yash
    { addTeam }
)(AddNewTeam);
