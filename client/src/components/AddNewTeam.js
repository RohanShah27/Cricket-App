import React, { Component } from "react";
import { addTeam } from "../actions/User";

import { connect } from "react-redux";
import "../styles/Adminaddnewteam.css";
export class AddNewTeam extends Component {
    constructor(props) {
        super(props);
        //to make function onaddAdminClick execute when clicked  -yash
        this.onaddAdminClick = this.onaddAdminClick.bind(this);
    }
    state = {
        //parameter in table teams -yash
        team_name: ""
    };

    OnChange = event => {
        // change the input state -yash
        this.setState({ [event.target.name]: event.target.value });
    };
    componentDidMount() {
        //check if token is present -yash
        if (!localStorage.getItem("token")) {
            this.props.history.push("/");
        }
    }

    onaddAdminClick(e) {
        //prevent values showing on the searchbar -yash
        e.preventDefault();
        let team = {
            team_name: this.state.team_name
        };
        //function on actions to add the team_name to the team database -yash
        this.props.addTeam(team)
        this.setState({
            team_name: ""
        });
    }

    render() {
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
                        {/* display error from node -yash */}
                        {this.props.error ? <><p>{this.props.error}</p></> : null}
                        {/* ṣtart of button add team -yash */}
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
