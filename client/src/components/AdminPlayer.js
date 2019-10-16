import React, { Component } from "react";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import DatePicker from 'react-date-picker/dist/entry.nostyle';
import { createPlayers } from "../actions/Players";
import { getPlayertype } from "../actions/playerType";
import "../styles/Adminplayer.css";
//stating the values that are to be used in this component -yash
const initialState = {
  player_name: "",
  gender: "male",
  player_dob: new Date(),
  nation: "",
  player_role: "choice",
  batting_style: "",
  bowling_style: "",
  player_name_Error: "",
  genderError: "",
  player_dob_Error: "",
  nationError: "",
  player_role_Error: "",
  batting_style_Error: "",
  bowling_style_Error: "",
  isDisabled: false

}
class AdminPlayer extends Component {
  constructor() {
    super();
    // all the handle change along with select tags in state are stated here -yash
    this.handleDayChange = this.handleDayChange.bind(this);
    this.state = initialState
    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
  }
  handleChange(e) {
    //handle change for gender -yash
    this.setState({ gender: e.target.value });
  }

  handleTypeChange(e) {
    //handle change for player_role -yash
    this.setState({ player_role: e.target.value });
  }
  componentDidMount() {
    //mount the player role as well as check for token -yash
    if (!localStorage.getItem("token")) {
      this.props.history.push("/");
    }
  }
  // state = {
  //   //values that are to be stored in the database -yash
  //   initialState
  // };
  onChange = event => {
    //state change when the user inputs in the inputbox -yash
    this.setState({ [event.target.name]: event.target.value });
  };
  //to check custom errors that are generated from the front end -yash
  validate = () => {
    let player_name_Error = "";
    let batting_style_Error = "";
    let bowling_style_Error = "";
    let nationError = "";
    if (this.state.player_name.length < 5 || !this.state.player_name) {
      // console.log(true, 1)
      player_name_Error = "Enter Player Name Correctly";
    }
    if (this.state.batting_style.length < 5 || !this.state.batting_style) {
      batting_style_Error = "Enter Batting Style Correctly";
    }
    if (this.state.bowling_style < 5 || !this.state.bowling_style) {
      bowling_style_Error = "Enter Bowling Style Correctly";
    }
    if (this.state.nation < 5 || !this.state.nation) {
      bowling_style_Error = "Enter Nation Correctly";
    }
    if (player_name_Error || batting_style_Error || bowling_style_Error || nationError) {
      // console.log(true, 2)
      this.setState({ player_name_Error: player_name_Error, batting_style_Error: batting_style_Error, bowling_style_Error: bowling_style_Error, nationError: nationError });

      return false;
    }
    return true;
  }

  onCreate(e) {
    e.preventDefault();
    const isValid = this.validate();
    console.log(isValid)
    if (isValid) {
      //storing the values in the players table
      let player = {
        player_name: this.state.player_name,
        gender: this.state.gender,
        //to convert date into the format eg.12/05/1993
        player_dob: this.state.player_dob.toLocaleDateString("en-GB"),
        batting_style: this.state.batting_style,
        bowling_style: this.state.bowling_style,
        player_role: this.state.player_role,
        nation: this.state.nation
      };
      //function createPlayers is called from actions user -yash
      this.props.createPlayers(player);
      //setting the current state of the values -yash
      this.setState({
        player_name: "",
        gender: "",
        player_dob: "",
        nation: "",
        player_role: "",
        batting_style: "",
        bowling_style: ""
      });
    }
  }

  handleDayChange = date => {

    //handle date change  -yash
    this.setState({ player_dob: date });
  };
  render() {
    console.log(this.state)
    console.log(this.props)
    return (
      //start of div -yash
      <div>
        {/* start of form -yash */}
        <form id="playerform" noValidate >
          {/* start of fieldset -yash */}
          <fieldset>
            {/* start of div player adding -yash */}
            <div className="PlayerAdding">
              {/* start and end of header -yash */}
              <h1 className="playerheader">Add Player</h1>
              {/* start of input playerdetails -yash */}
              <input
                className="playerdetails"
                type="text"
                name="player_name"
                placeholder=" Player Name"
                onChange={this.onChange}
                value={this.state.player_name}
                required
              />
              {/* <div className="teamnameerror" style={{ fontSize: 15, color: "red" }}>{this.state.player_name_Error}</div> */}
              {/* end of input -yash */}
              {/* start of playerflex container -yash*/}
              <div className="playerflex-container">
                {/* start of division container -yash*/}
                <div className="division">
                  {/* start of select tag for gender -yash */}
                  <select
                    value={this.state.gender}
                    onChange={this.handleChange}
                    className="genders"
                    required
                  >
                    {/* <div className="teamnameerror" style={{ fontSize: 15, color: "red" }}>{this.state.genderError}</div> */}
                    {/* options for select tag -yash */}
                    <option name="choice" className="choice">
                      Gender
                    </option>
                    <option name="male"> Male</option>
                    <option name="female">Female</option>
                    {/* end of options for select tag -yash */}
                  </select>
                  {/* end of select tag -yash */}
                </div>
                {/* end of division container -yash*/}
                {/* start of division container -yash */}
                <div className="division">
                  {/* datepicker function called -yash */}
                  <DatePicker
                    className="playerdate"
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
                    required
                  />
                  {/* error generation if there is any error -yash */}
                  {/* <div className="teamnameerror" style={{ fontSize: 15, color: "red" }}>{this.state.player_dob_Error}</div> */}
                  {/* end of error generation -yash */}
                </div>
                {/* end of division container -yash */}
              </div>
              {/* end of playerflex container -yash */}
              {/* start of p tag -yash */}
              <p>
                {/* start of input for playerdetails -yash */}
                <input
                  className="playerdetails"
                  type="text"
                  name="nation"
                  placeholder="Nationality"
                  onChange={this.onChange}
                  value={this.state.nation}
                  required
                />{" "}
                {/* <div className="teamnameerror" style={{ fontSize: 15, color: "red" }}>{this.state.nationError}</div> */}
                {/* end of playerdetails input tag -yash */}
              </p>
              {/*end of p tag -yash*/}

              {/* start of p tag -yash */}
              <p>
                {/* start of select tag for player role -yash */}
                <select
                  value={this.state.player_role}
                  onChange={this.handleTypeChange}
                  className="playerType"
                  required
                >
                  <option name="choice">player type</option>
                  <option name="Batsman">Batsman</option>
                  <option name="Bowler">Bowler</option>
                  <option name="All Rounder">All Rounder</option>
                  <option name="batsman wk">Batsman Wicket Keeper</option>
                </select>
                {/* end of select tag -yash */}
                {/* start of error generation if error occurs-yash */}
                {/* <div className="teamnameerror" style={{ fontSize: 15, color: "red" }}>{this.state.player_role_Error}</div> */}
                {/* end of error generation -yash */}
              </p>
              {/* end of p tag -yash */}
              {/* start of p tag -yash */}
              <p>
                {/* start of input for batting style -yash */}
                <input
                  className="playerdetails"
                  type="text"
                  name="batting_style"
                  placeholder="Batting Style"
                  onChange={this.onChange}
                  value={this.state.batting_style}
                  required
                />
                {/* end of input for batting style -yash */}
                {/* <div className="teamnameerror" style={{ fontSize: 15, color: "red" }}>{this.state.batting_style_Error}</div> */}
              </p>
              {/* end of p tag -yash */}
              {/* start of p tag -yash */}
              <p>
                {/* start of input for bowling style -yash */}
                <input
                  className="playerdetails"
                  type="text"
                  name="bowling_style"
                  placeholder="Bowling Style"
                  onChange={this.onChange}
                  value={this.state.bowling_style}
                  required
                />
                {/* <div className="teamnameerror" style={{ fontSize: 15, color: "red" }}>{this.state.bowling_style_Error}</div> */}
                {/* end of input for bowling style -yash */}
              </p>
              {/* end of p tag -yash */}
            </div>
            {/* end of div tag for player adding -yash */}
            {/* display of error -yash */}
            <div className="teamnameerror" style={{ fontSize: 15, color: "red" }}>
              {this.props.error ? (
                <>
                  <p>{this.props.error}</p>
                </>
              ) : this.state.player_name_Error || this.state.nationError || this.state.batting_style_Error || this.state.bowling_style_Error}
            </div>
            {/* start of button add player -yash */}
            <button
              onChange={this.onChange}
              onClick={this.onCreate}
              className="playerbutton"
            >
              Add Player
            </button>
            {/* end of button -yash */}
          </fieldset>
          {/* end of fieldset */}
        </form>
        {/* end of form -yash */}
      </div>
      // end of main div tag -yash
    );
  }
}
const mapStateToProps = state => ({
  adminplayers: state.AdminplayerReducer.adminplayers,
  error: state.AdminplayerReducer.error
});

export default connect(
  mapStateToProps,
  // connect to createPlayers and getPlayertype -yash
  { createPlayers, getPlayertype }
)(AdminPlayer);
