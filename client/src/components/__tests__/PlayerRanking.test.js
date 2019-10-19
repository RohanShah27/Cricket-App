import React from "react";
import { mount } from "enzyme";
import { PlayerRanking } from "../PlayerRanking";

const onClick = jest.fn();
// const sendData = jest.fn();
const playerRanking = jest.fn();
const getPlayerRanking = jest.fn();
const getTeamRanking = jest.fn();
let gender = "male";
const players = [];
for (var i = 0; i < 30; i++) {
  players.push({
    position: "test position",
    player_name: "test name",
    player_team: "test team",
    ratings: "test ratings"
  });
}
const teams = [
  {
    position: "test position",
    team_name: "test name",
    rating: "test rating",
    points: "test points"
  }
];
const wrapper = mount(
  <PlayerRanking
    playerRanking={playerRanking}
    players={players}
    teams={teams}
    gender={gender}
    getPlayerRanking={getPlayerRanking}
    getTeamRanking={getTeamRanking}
    onClick={onClick}
  />
);

describe("Test Team Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should render the component", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should check for component did mount as a function", () => {
    const componentDidMount = jest.spyOn(
      PlayerRanking.prototype,
      "componentDidMount"
    );
    wrapper.instance().componentDidMount();
    expect(componentDidMount).toHaveBeenCalled();
    componentDidMount.mockClear();
  });

  it("should check mapping of playerbatting Position array", () => {
    expect(wrapper.find("#battingPosition0").props().children).toBe(
      "test position"
    );
  });
  it("should check mapping of playerbatting Position array", () => {
    expect(wrapper.find("#battingName0").props().children).toBe("test name");
  });
  it("should check mapping of playerbatting Position array", () => {
    expect(wrapper.find("#battingTeam0").props().children).toBe("test team");
  });
  it("should check mapping of playerbatting Position array", () => {
    expect(wrapper.find("#battingRating0").props().children).toBe(
      "test ratings"
    );
  });
  it("should check mapping of playerbowling Position array", () => {
    expect(wrapper.find("#bowlingPosition0").props().children).toBe(
      "test position"
    );
  });
  it("should check mapping of playerbowling Position array", () => {
    expect(wrapper.find("#bowlingName0").props().children).toBe("test name");
  });
  it("should check mapping of playerbowling Position array", () => {
    expect(wrapper.find("#bowlingTeam0").props().children).toBe("test team");
  });
  it("should check mapping of playerbowling Position array", () => {
    expect(wrapper.find("#bowlingRating0").props().children).toBe(
      "test ratings"
    );
  });
  it("should check mapping of All Rounder Position array", () => {
    expect(wrapper.find("#allRounderPosition0").props().children).toBe(
      "test position"
    );
  });
  it("should check mapping of All Rounder Position array", () => {
    expect(wrapper.find("#allRounderName0").props().children).toBe("test name");
  });
  it("should check mapping of All Rounder Position array", () => {
    expect(wrapper.find("#allRounderTeam0").props().children).toBe("test team");
  });
  it("should check mapping of All Rounder Position array", () => {
    expect(wrapper.find("#allRounderRating0").props().children).toBe(
      "test ratings"
    );
  });
  it("should simulate button click on Test button tab ", () => {
    // const sendData = jest.spyOn(PlayerRanking.prototype, "sendData");
    // console.log(sendData);
    wrapper.find("#testTab").simulate("click");
    // expect(sendData).toHaveBeenCalledWith("Test");
    expect(wrapper.state().testClick).toBe(true);
    expect(wrapper.state().t20Click).toBe(false);
    expect(wrapper.state().odiClick).toBe(false);
  });
  it("should simulate button click on ODI button tab ", () => {
    // const sendData = jest.spyOn(PlayerRanking.prototype, "sendData");

    wrapper.find("#odiTab").simulate("click");
    expect(wrapper.state().testClick).toBe(false);
    expect(wrapper.state().t20Click).toBe(false);
    expect(wrapper.state().odiClick).toBe(true);
    // expect(sendData).toBeCalledWith("ODI");
  });
  it("should simulate button click on T20 button tab ", () => {
    wrapper.find("#t20Tab").simulate("click");
    expect(wrapper.state().testClick).toBe(false);
    expect(wrapper.state().t20Click).toBe(true);
    expect(wrapper.state().odiClick).toBe(false);
    // expect(sendData).toBeCalledWith("T20");
  });
  it("should check mapping of Team Position array", () => {
    expect(wrapper.find("#teamPosition0").props().children).toBe(
      "test position"
    );
  });
  it("should check mapping of Team Name array", () => {
    expect(wrapper.find("#teamName0").props().children).toBe("test name");
  });
  it("should check mapping of Team Rating array", () => {
    expect(wrapper.find("#teamRating0").props().children).toBe("test rating");
  });
  it("should check mapping of Team Points array", () => {
    expect(wrapper.find("#teamPoints0").props().children).toBe("test points");
  });

  it("should simulate test button", () => {
    expect(
      wrapper
        .find("button")
        .at(0)
        .simulate("click")
    );
  });
  it("should simulate odi button", () => {
    expect(
      wrapper
        .find("button")
        .at(1)
        .simulate("click")
    );
  });
});
