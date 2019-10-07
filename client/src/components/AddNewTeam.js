import React, { Component } from "react";
import { addTeam } from "../actions/User";

import { connect } from "react-redux";
import "../styles/Adminaddnewteam.css";
export class AddNewTeam extends Component {
    constructor(props) {
        super(props);
        //to make function onaddAdminClick execute when clicked 
        this.onaddAdminClick = this.onaddAdminClick.bind(this);
    }
    state = {
        //parameter in table teams
        team_name: ""
    };

    OnChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    componentDidMount() {
        if (!localStorage.getItem("token")) {
            this.props.history.push("/");
        }
    }

    onaddAdminClick(e) {
        //prevent values showing on the searchbar
        e.preventDefault();
        let team = {
            team_name: this.state.team_name
        };
        //function on actions to add the team_name to the team database 
        this.props.addTeam(team)
        this.setState({
            team_name: ""
        });
    }

    render() {
        return (
            <div>
                <form id="addnewteamform">
                    <fieldset>
                        <h1 className="teamadminheader">Add New Team</h1>
                        <input
                            className="teamadminnewinput"
                            type="text"
                            name="team_name"
                            placeholder="Enter New Team Name"
                            onChange={this.OnChange}
                            value={this.state.team_name}
                        />
                        {this.props.error ? <><p>{this.props.error}</p></> : null}
                        <button
                            onChange={this.onChange}
                            onClick={this.onaddAdminClick}
                            className="teamadmin-new-button"
                        >
                            Add Team
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
    //function add team in actions 
    { addTeam }
)(AddNewTeam);
