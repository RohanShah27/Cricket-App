import React from "react";
import { mount } from "enzyme";
import { Team } from "../Team";

const history = { push: jest.fn() };
let teams = [];
let state = {
  height: 800,
  items: 8,
  loadingState: false,
  pageTeams: [
    { team_id: 0, team_name: "test name" },
    { team_id: 1, team_name: "test name" },
    { team_id: 2, team_name: "test name" },
    { team_id: 3, team_name: "test name" },
    { team_id: 4, team_name: "test name" },
    { team_id: 5, team_name: "test name" },
    { team_id: 6, team_name: "test name" },
    { team_id: 7, team_name: "test name" }
  ],
  team_name: "India",
  tournament: "Pakistan Super League"
};
for (var i = 0; i < 21; i++) {
  teams.push({
    team_id: i,
    team_name: "test name"
  });
}
let tournamentTeam = [];
for (var i = 0; i < 21; i++) {
  tournamentTeam.push({
    team_id: i,
    team_name: "test name"
  });
}
const getTeam = jest.fn();
const getTournament = jest.fn();
const searchTeamForViewTeamPage = jest.fn();
const sendTeam = jest.spyOn(Team.prototype, "sendTeam");
const wrapper = mount(
  <Team
    getTeam={getTeam}
    teams={teams}
    history={history}
    getTournament={getTournament}
    tournamentTeam={tournamentTeam}
    searchTeamForViewTeamPage={searchTeamForViewTeamPage}
  />
);

describe("Test Team Component", () => {
  it("should render the component", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should check for component did mount as a function and to call function getTournament", () => {
    const componentDidMount = jest.spyOn(Team.prototype, "componentDidMount");
    wrapper.instance().componentDidMount();
    expect(componentDidMount).toHaveBeenCalled();
    let team = {
      tournament: "others"
    };
    expect(getTournament).toHaveBeenCalledWith(team);
  });
  it("should check onChange as a function", () => {
    let event = {
      target: {
        name: "team_name",
        value: "India"
      }
    };
    wrapper.instance().OnChange(event);
    expect(wrapper.state().team_name).toBe(event.target.value);
    expect(searchTeamForViewTeamPage).toBeCalledWith({
      team_name: event.target.value
    });
  });
  it("should check for search bar on teams page", () => {
    expect(wrapper.find("#searchTeamTextBox").length).toBe(1);
    expect(wrapper.find("#searchTeamTextBox").props().placeholder).toBe(
      "Enter Team Name"
    );
  });
  it("should check for search bar button and its function", () => {
    expect(wrapper.find("#searchTeamButton").length).toBe(1);
    expect(wrapper.find("#searchTeamButton").simulate("click"));
    const getTeam = jest.spyOn(wrapper.instance(), "getTeam");
    expect(getTeam).toBeCalledTimes(0);
  });
  it("should check if Infinite Scroll component is present or not", () => {
    expect(wrapper.find("InfiniteScroll").exists()).toBeTruthy();
  });
  it("should check for othersTab", () => {
    expect(wrapper.find("#othersTab").simulate("click"));
    expect(sendTeam).toHaveBeenCalledWith("others");
  });
  it("should check for IPLTab", () => {
    expect(wrapper.find("#iplTab").simulate("click"));
    expect(sendTeam).toHaveBeenCalledWith("IPL");
  });
  it("should check for BBLTab", () => {
    expect(wrapper.find("#BBLTab").simulate("click"));
    expect(sendTeam).toHaveBeenCalledWith("Big Bash League");
  });
  it("should check for PSLTab", () => {
    expect(wrapper.find("#PSLTab").simulate("click"));
    expect(sendTeam).toHaveBeenCalledWith("Pakistan Super League");
  });
  it("shouuld check for Component will recieve props function", () => {
    let componentWillReceiveProps = jest.spyOn(
      Team.prototype,
      "componentWillReceiveProps"
    );
    let nextProps = {
      tournamentTeam: tournamentTeam
    };
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceiveProps).toHaveBeenCalledWith(nextProps);
    let displayTeams = jest.spyOn(wrapper.instance(), "displayTeams");
    expect(displayTeams).toBeCalledTimes(0);
  });
  it("should expect the state to be latest data", () => {
    expect(wrapper.state()).toStrictEqual(state);
  });
  it("shouuld check for mapping of teams data", () => {
    expect(wrapper.find("#teamName0")).toBeTruthy();
    expect(wrapper.find("#teamName0").props().children).toBe("test name");
  });
  it("Check history push as a function ", () => {
    // expect(wrapper.state().pageTeams).toBe("");
    wrapper.find("#teamDetailsButton0").simulate("click");
    expect(history.push).toBeCalledWith("/viewteam/" + 1, {
      team_id: 1,
      team_name: "test name"
    });
  });
});
