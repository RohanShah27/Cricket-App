import React from "react";
import { mount } from "enzyme";
import { ViewTeam } from "../ViewTeam";
let location = {
  state: {
    teams: {
      team_id: 1
    }
  }
};
let gender = "male";
let teamstats = [
  {
    test_played: "1",
    tes_win: "1",
    test_loss: "1",
    test_draw: "1",
    odi_played: "1",
    odi_win: "1",
    odi_loss: "1",
    odi_draw: "1",
    t20_played: "1",
    t20_win: "1",
    t20_loss: "1",
    t20_draw: "1"
  }
];
let playerstatsforteams = [
  {
    player_name: "Virat",
    player_stats_value: 2
  }
];
let playerstatsforteamsbowler = [
  {
    player_name: "Virat",
    player_stats_value: 2
  }
];
let tournamentTeam = [
  {
    team_id: 1,
    team_name: "test"
  }
];
let getTeamById = jest.fn();
let getTeamStats = jest.fn();
let getPlayerStatsForTeams = jest.fn();
let getPlayerStatsForTeamsBowler = jest.fn();
const wrapper = mount(
  <ViewTeam
    gender={gender}
    getTeamById={getTeamById}
    getTeamStats={getTeamStats}
    getPlayerStatsForTeams={getPlayerStatsForTeams}
    getPlayerStatsForTeamsBowler={getPlayerStatsForTeamsBowler}
    tournamentTeam={[]}
    match={[]}
    location={[]}
    teamstats={teamstats}
    playerstatsforteams={playerstatsforteams}
    playerstatsforteamsbowler={playerstatsforteamsbowler}
    tournamentTeam={tournamentTeam}
    location={location}
  />
);

describe("Testing viewTeam component", () => {
  it("should render the component", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should check for component did mount as a function", () => {
    const componentDidMount = jest.spyOn(
      ViewTeam.prototype,
      "componentDidMount"
    );
    wrapper.instance().componentDidMount();
    expect(componentDidMount).toHaveBeenCalled();
    let team_id = {
      team_id: location.state.teams.team_id
    };
    expect(getTeamById).toHaveBeenCalledWith(team_id);
    expect(getTeamStats).toHaveBeenCalledWith(location.state.teams.team_id);
    let teams = {
      team: location.state.teams
    };
    let type = {
      match_type: "Test"
    };
    expect(getPlayerStatsForTeams).toHaveBeenCalledWith(1, type, gender);
    expect(getPlayerStatsForTeamsBowler).toHaveBeenCalledWith(1, type);
  });
  it("should check component will recieve props", () => {
    const componentWillRecieveProps = jest.spyOn(
      ViewTeam.prototype,
      "componentWillReceiveProps"
    );
    let nextProps = {
      gender: "female"
    };
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(componentWillRecieveProps).toHaveBeenCalledWith(nextProps);
    expect(getPlayerStatsForTeams).toHaveBeenCalledWith(nextProps.gender);
  });
  it("should check team name", () => {
    expect(wrapper.find("#teamName0").text()).toBe(tournamentTeam[0].team_name);
    expect(wrapper.find("#teamNameStats0").text()).toBe("Matches");
  });
  it("should check team stats data", () => {
    expect(wrapper.find("#testPlayed0").text()).toBe(teamstats[0].test_played);
    expect(wrapper.find("#testWon0").text()).toBe("");
    expect(wrapper.find("#testLoss0").text()).toBe(teamstats[0].test_loss);
    expect(wrapper.find("#testDraw0").text()).toBe(teamstats[0].test_draw);

    expect(wrapper.find("#odiPlayed0").text()).toBe(teamstats[0].odi_played);
    expect(wrapper.find("#odiWon0").text()).toBe("1");
    expect(wrapper.find("#odiLoss0").text()).toBe(teamstats[0].odi_loss);
    expect(wrapper.find("#odiDraw0").text()).toBe(teamstats[0].odi_draw);

    expect(wrapper.find("#t20Played0").text()).toBe(teamstats[0].t20_played);
    expect(wrapper.find("#t20Won0").text()).toBe("1");
    expect(wrapper.find("#t20Loss0").text()).toBe(teamstats[0].t20_loss);
    expect(wrapper.find("#t20Draw0").text()).toBe(teamstats[0].t20_draw);
  });
  it("should check for functions of component", () => {
    let handleChange = jest.spyOn(ViewTeam.prototype, "handleChange");
    expect(handleChange).toBeTruthy();
    let openCalendar = jest.spyOn(wrapper.instance(), "openCalendar");
    expect(openCalendar).toBeTruthy();
    let onodiclick = jest.spyOn(wrapper.instance(), "onodiclick");
    expect(onodiclick).toBeTruthy();
    let ontestclick = jest.spyOn(wrapper.instance(), "ontestclick");
    let ont20click = jest.spyOn(wrapper.instance(), "ont20click");
    expect(ont20click).toBeTruthy();
  });
});
