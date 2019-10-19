import React from "react";
import { shallow, mount } from "enzyme";
import { PlayerProfile } from "../PlayerProfile";
let playerProfile = jest.fn();
let match = { params: { player_id: 1 }, isExact: true, path: "", url: "" };
let history = {
  location: {
    state: {
      player: {
        player_name: "test name"
      }
    }
  }
};
let location = {
  state: {
    player: {
      player_id: 1,
      player_name: "test name",
      nation: "test nation",
      player_dob: "1/2/3",
      player_role: "test role",
      batting_style: "test style",
      bowling_style: "test style"
    }
  }
};
let player = {
  ODI: {
    totalRuns: 1,
    totalWickets: 1,
    total50s: 1,
    total4s: 1,
    total6s: 1,
    totalcenturies: 1,
    totaldoublecenturies: 1
  },
  Test: {
    totalRuns: 1,
    totalWickets: 1,
    total50s: 1,
    total4s: 1,
    total6s: 1,
    totalcenturies: 1,
    totaldoublecenturies: 1
  },
  T20: {
    totalRuns: 1,
    totalWickets: 1,
    total50s: 1,
    total4s: 1,
    total6s: 1,
    totalcenturies: 1,
    totaldoublecenturies: 1
  }
};

let searchPlayer = jest.fn();
const wrapper = mount(
  <PlayerProfile
    player={player}
    playerProfile={playerProfile}
    match={match}
    history={history}
    location={location}
    searchPlayer={searchPlayer}
  />
);
describe("Test suite for Player Profile Component", () => {
  it("Should Render the component and match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should display player name", () => {
    expect(wrapper.find("#playerName").props().children).toBe(
      history.location.state.player.player_name
    );
  });
  it("should display player Nation", () => {
    expect(wrapper.find("#playerNation").props().children).toStrictEqual(
      ["Team:", "test nation"]
      //   "Team: " + location.state.player.nation
    );
  });
  it("should display player DOB", () => {
    expect(wrapper.find("#playerDOB").props().children).toStrictEqual([
      " ",
      "1/2/3"
    ]);
  });
  it("should display player Role", () => {
    expect(wrapper.find("#playerRole").props().children).toBe(
      location.state.player.player_role
    );
  });
  it("should display player BattingStyle", () => {
    expect(wrapper.find("#battingStyle").props().children).toBe(
      location.state.player.batting_style
    );
  });
  it("should display player BowlingStyle", () => {
    expect(wrapper.find("#bowlingStyle").props().children).toBe(
      location.state.player.bowling_style
    );
  });
  it("should display player StatsKey for ODI", () => {
    expect(wrapper.find("#keyName0").props().children).toBe("ODI");
  });

  it("should display player StatsKEY for Test", () => {
    expect(wrapper.find("#keyName1").props().children).toBe("Test");
  });
  it("should display player StatsKEy for T20", () => {
    expect(wrapper.find("#keyName2").props().children).toBe("T20");
  });
  it("should check if player stats table is present ", () => {
    expect(wrapper.find("#playerStats").props().children).toBe("Player Stats");
  });
  it("check if player cisualization section is present or nor", () => {
    expect(wrapper.find("playerStatsVisualizationSection")).toBeTruthy();
  });
  it("should check for component will mount as a function", () => {
    const componentWillMount = jest.spyOn(
      PlayerProfile.prototype,
      "componentWillMount"
    );
    wrapper.instance().componentWillMount();
    expect(componentWillMount).toHaveBeenCalled();
    expect(searchPlayer).toBeCalledWith(match.params.player_id);
  });
  it("should check for component will recieve as a function", () => {
    const componentWillReceiveProps = jest.spyOn(
      PlayerProfile.prototype,
      "componentWillReceiveProps"
    );
    let nextProps = {
      player_id: 1
    };
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceiveProps).toBeCalledWith(nextProps);
    expect(searchPlayer).toBeCalledWith(nextProps.player_id);
  });
  it("should test for player image present or not", () => {
    expect(wrapper.find("#playerImage")).toBeTruthy();
  });
});
