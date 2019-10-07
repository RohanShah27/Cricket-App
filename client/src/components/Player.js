import React, { Component } from 'react'
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import DatePicker from 'react-date-picker/dist/entry.nostyle';
import { createPlayers } from "../actions/Players";
import { getPlayertype } from "../actions/playerType";
import "../styles/player.css"
class Player extends Component {
    constructor() {
        super();
        this.handleDayChange = this.handleDayChange.bind(this);
        this.state = {
            gender: "male",
            player_role: "choice"

        };
        this.handleChange = this.handleChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
    }
    handleChange(e) {
        this.setState({ gender: e.target.value });
    }

    handleTypeChange(e) {
        this.setState({ player_role: e.target.value });
    };
    componentDidMount() {
        this.props.getPlayertype();
        if (!localStorage.getItem("token")) {
            this.props.history.push("/");
        }
    }
    state = {
        player_name: "",
        gender: "",
        player_dob: new Date(),
        player_nation: "",
        player_role: "",
        batting_style: "",
        bowling_style: "",
    }
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    onCreate() {
        let player = {
            player_name: this.state.player_name,
            gender: this.state.gender,
            player_dob: this.state.player_dob.toLocaleDateString('en-GB'),
            batting_style: this.state.batting_style,
            bowling_style: this.state.bowling_style,
            player_role: this.state.player_role,
            player_nation: this.state.player_nation
        };


        this.props.createPlayers(player);
        this.setState({
            player_name: "",
            gender: "",
            player_dob: "",
            player_nation: "",
            player_role: "",
            batting_style: "",
            bowling_style: "",
        });
    }

    handleDayChange = date => {
        this.setState({ player_dob: date });
    };
    render() {
        return (

            < div >
                {/* <h1>{this.props.players_type.player_type}</h1> */}
                {/* <p>{this.props.players_type.map(player => (<p>{player.player_type}</p>))}</p> */}
                <form id="playerform">
                    <fieldset>

                        <div className="PlayerAdding">
                            <h1 className="playerheader">Add Player</h1>
                            <input className="playerdetails"
                                type="text"
                                name="player_name"
                                placeholder=" Player Name"
                                onChange={this.onChange}
                                value={this.state.player_name}
                            />

                            <div className="playerflex-container">
                                <div className="division">
                                    <select value={this.state.gender} onChange={this.handleChange} className="genders">
                                        <option name="choice" className="choice">Gender</option>
                                        <option name="male"> Male</option>
                                        <option name="female">Female</option>
                                    </select>
                                </div>
                                <div className="division">
                                    <DatePicker className="playerdate"
                                        dateFormat="dd-MM-yyyy"
                                        placeholderText="DOB"
                                        selected={this.state.player_dob}
                                        onChange={this.handleDayChange}
                                        popperPlacement="bottom"
                                        popperModifiers={{
                                            flip: {
                                                behavior: ["bottom"] // don't allow it to flip to be above
                                            },
                                            preventOverflow: {
                                                enabled: false // tell it not to try to stay within the view (this prevents the popper from covering the element you clicked)
                                            },
                                            hide: {
                                                enabled: false // turn off since needs preventOverflow to be enabled
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                            <p>
                                <input className="playerdetails"
                                    type="text"
                                    name="player_nation"
                                    placeholder="Nationality"
                                    onChange={this.onChange}
                                    value={this.state.player_nation}
                                />{" "}
                            </p>
                            <p>
                                <select value={this.state.player_role} onChange={this.handleTypeChange} className="playerType">
                                    <option name="choice">player type</option>
                                    {this.props.playerType.map(playerType => (

                                        <option name="Batsman">{playerType.player_role}</option>

                                    ))}

                                </select>
                            </p>
                            <p>
                                <input className="playerdetails"
                                    type="text"
                                    name="batting_style"
                                    placeholder="Batting Style"
                                    onChange={this.onChange}
                                    value={this.state.batting_style}
                                />
                            </p>
                            <p>
                                <input className="playerdetails"
                                    type="text"
                                    name="bowling_style"
                                    placeholder="Bowling Style"
                                    onChange={this.onChange}
                                    value={this.state.bowling_style}
                                />
                            </p>
                            {/* <p>
                <input className="playerdetails"
                  type="text"
                  name="playerdescription"
                  placeholder=" Description"
                  onChange={this.onChange}
                  value={this.state.playerdescription}
                />
              </p> */}
                        </div>
                        {this.props.error ? <><p>{this.props.error}</p></> : null}
                        <button onChange={this.onChange} onClick={this.onCreate} className="playerbutton">
                            Add Player
              </button>
                    </fieldset>
                </form >
            </div >
        )
    }
}
const mapStateToProps = state => ({
    Adminplayers: state.AdminplayerReducer.Adminplayers,
    playerType: state.playertypeReducer.playerType,
    error: state.userReducer.error

});

export default connect(
    mapStateToProps,
    { createPlayers, getPlayertype }
)(Player);

