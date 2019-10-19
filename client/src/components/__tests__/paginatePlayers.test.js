import React from "react";
import { shallow, mount } from "enzyme";
import { PaginatePlayers } from "../paginatePlayers";
import { BrowserRouter as Router } from "react-router-dom";
const history = { push: jest.fn() };
const paginate = jest.fn();
const getAllPlayers = jest.fn();
const playerSearch = jest.fn();
const searchForPlayer = jest.fn();
let pagePlayers = [];
for (var i = 1; i < 21; i++) {
  pagePlayers.push({
    player_id: i,
    player_name: "test name",
    player_nation: "test nation"
  });
}
let players = [
  {
    player_id: 1,
    player_name: "test name",
    player_nation: "test nation"
  }
];
let search_result = [
  {
    player_id: 1,
    player_name: "virat"
  },
  {
    player_id: 2,
    player_name: "Kohli"
  }
];
const wrapper = mount(
  <Router>
    <PaginatePlayers
      paginate={paginate}
      playerSearch={playerSearch}
      getAllPlayers={getAllPlayers}
      history={history}
      search_result={search_result}
      searchForPlayer={searchForPlayer}
    />
  </Router>
);

describe("Test paginatePlayers Component", () => {
  it("should render the component", () => {
    expect(wrapper).toMatchSnapshot();
    // expect(wrapper.state()).toBe("");
  });
  // it("should check for component did mount as a function", () => {
  //   const componentDidMount = jest.spyOn(
  //     PaginatePlayers.prototype,
  //     "componentDidMount"
  //   );
  //   wrapper.instance().componentDidMount();
  //   expect(componentDidMount).toHaveBeenCalled();
  //   expect(getAllPlayers).toHaveBeenCalled();
  // });
  // it("should check for componentWillReceiveProps mount as a function", () => {
  //   const componentWillReceiveProps = jest.spyOn(
  //     PaginatePlayers.prototype,
  //     "componentWillReceiveProps"
  //   );
  //   let playersArray = [];
  //   for (var i = 1; i < 21; i++) {
  //     playersArray.push({
  //       player_id: i,
  //       player_name: "test name",
  //       player_nation: "test nation"
  //     });
  //   }
  //   let nextProps = {
  //     players: playersArray
  //   };
  //   const displayPlayers = jest.spyOn(wrapper.instance(), "displayPlayers");
  //   wrapper.instance().componentWillReceiveProps(nextProps);
  //   expect(displayPlayers).toHaveBeenCalledWith(nextProps.players);
  // });
  // it("should dislay playerName", () => {
  //   // expect(wrapper.state().pagePlayers).toBe("");
  //   const displayPlayers = jest.spyOn(wrapper.instance(), "displayPlayers");
  //   expect(displayPlayers).toHaveBeenCalledWith(pagePlayers);
  //   expect(wrapper.find("#playerName0").props().children).toBe("test name");
  // });
  // it("should have only one search bar", () => {
  //   expect(wrapper.find("#searchPlayer").length).toBe(1);
  // });
  // it("should have placeholder", () => {
  //   expect(wrapper.find("#searchPlayer").prop("placeholder")).toBe(
  //     "Search for Players"
  //   );
  // });
  // it("shoudl check for input value", () => {
  //   const e = {
  //     target: {
  //       name: "playerName",
  //       value: "virat"
  //     }
  //   };
  //   expect(wrapper.state().playerName).toBe("");
  //   wrapper.instance().OnChange(e);
  //   expect(wrapper.state().playerName).toBe(e.target.value);
  //   expect(playerSearch).toBeCalledWith({ playerName: e.target.value });
  // });
  // it("should search player on click of button", () => {
  //   expect(wrapper.find("#searchButton").simulate("click"));
  //   expect(searchForPlayer).toBeCalledTimes(0);
  // });
  it("should display search results", () => {
    wrapper.setState({ playerName: "Virat" });
    console.log(wrapper.props().props);
    expect(wrapper.find("#name0").text()).toBe(search_result[0].player_name);
  });
});
