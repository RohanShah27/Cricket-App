import React from "react";
import { shallow, mount } from "enzyme";
import { PaginatePlayers } from "../paginatePlayers";
// import { BrowserRouter as Router } from "react-router-dom";
const history = { push: jest.fn() };
const paginate = jest.fn();
const getAllPlayers = jest.fn();
const playerSearch = jest.fn();
const searchForPlayer = jest.fn();
let state = {
  height: 800,
  items: 10,
  loadingState: false,
  pagePlayers: [
    { player_id: 1, player_name: "test name", nation: "test nation" },
    { player_id: 2, player_name: "test name", nation: "test nation" },
    { player_id: 3, player_name: "test name", nation: "test nation" },
    { player_id: 4, player_name: "test name", nation: "test nation" },
    { player_id: 5, player_name: "test name", nation: "test nation" },
    { player_id: 6, player_name: "test name", nation: "test nation" },
    { player_id: 7, player_name: "test name", nation: "test nation" },
    { player_id: 8, player_name: "test name", nation: "test nation" },
    { player_id: 9, player_name: "test name", nation: "test nation" },
    { player_id: 10, player_name: "test name", nation: "test nation" }
  ],
  playerName: "Virat"
};
let pagePlayers = [];
for (var i = 1; i < 21; i++) {
  pagePlayers.push({
    player_id: i,
    player_name: "test name",
    nation: "test nation"
  });
}
let players = [
  {
    player_id: 1,
    player_name: "test name",
    nation: "test nation"
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
const wrapper = shallow(
  <PaginatePlayers
    paginate={paginate}
    playerSearch={playerSearch}
    getAllPlayers={getAllPlayers}
    history={history}
    players={players}
    search_result={search_result}
    searchForPlayer={searchForPlayer}
  />
);

describe("Test paginatePlayers Component", () => {
  it("should render the component", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should check for component did mount as a function", () => {
    const componentDidMount = jest.spyOn(
      PaginatePlayers.prototype,
      "componentDidMount"
    );
    wrapper.instance().componentDidMount();
    expect(componentDidMount).toHaveBeenCalled();
    expect(getAllPlayers).toHaveBeenCalled();
  });
  it("should check for componentWillReceiveProps mount as a function", () => {
    const componentWillReceiveProps = jest.spyOn(
      PaginatePlayers.prototype,
      "componentWillReceiveProps"
    );
    let playersArray = [];
    for (var i = 1; i < 21; i++) {
      playersArray.push({
        player_id: i,
        player_name: "test name",
        nation: "test nation"
      });
    }
    let nextProps = {
      players: playersArray
    };
    const displayPlayers = jest.spyOn(wrapper.instance(), "displayPlayers");
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceiveProps).toHaveBeenCalledWith(nextProps);
    expect(displayPlayers).toHaveBeenCalledWith(nextProps.players);
  });
  it("should dislay playerName and playerNation/playerTeamName", () => {
    const displayPlayers = jest.spyOn(wrapper.instance(), "displayPlayers");
    expect(displayPlayers).toHaveBeenCalledWith(pagePlayers);
    expect(wrapper.find("#playerName0").props().children).toBe("test name");
    expect(wrapper.find("#playerTeam0").props().children).toBe("Team:");
    expect(wrapper.find("#playerTeamInfo0").props().children).toBe(
      "test nation"
    );
  });
  it("should have only one search bar", () => {
    expect(wrapper.find("#searchPlayer").length).toBe(1);
  });
  it("should have placeholder", () => {
    expect(wrapper.find("#searchPlayer").props("placeholder")).toBe(
      "Search for Players"
    );
  });
  it("shoudl check for input value", () => {
    const e = {
      target: {
        name: "playerName",
        value: "virat"
      }
    };
    expect(wrapper.state().playerName).toBe("");
    wrapper.instance().OnChange(e);
    expect(wrapper.state().playerName).toBe(e.target.value);
    expect(playerSearch).toBeCalledWith({ playerName: e.target.value });
  });
  it("should search player on click of button", () => {
    expect(wrapper.find("#searchButton").simulate("click"));
    expect(searchForPlayer).toBeCalledTimes(0);
  });
  it("should display search results", () => {
    wrapper.setState({ playerName: "Virat" });
    console.log(wrapper.props().props);
    expect(wrapper.find("#name0").text()).toBe(search_result[0].player_name);
  });
  it("should check if Infinite Scroll component is present or not", () => {
    expect(wrapper.find("InfiniteScroll").exists()).toBeTruthy();
  });
  it("should checck if Link Component exxists or not", () => {
    expect(wrapper.find("Link").exists()).toBeTruthy();
  });
  it("should checck if React Country Flags Component exxists or not", () => {
    expect(wrapper.find("ReactCountryFlag").exists()).toBeTruthy();
  });
  it("should check for state", () => {
    expect(wrapper.state()).toStrictEqual(state);
  });
});
