import React from "react";
import { shallow } from "enzyme";
import { PlayerRanking } from "../PlayerRanking";

const ranking = jest.fn();
const getPlayerRanking = jest.fn();
const getTeamRanking = jest.fn();
const players = [{}, {}];
const teams = [{}, {}];
const wrapper = shallow(
  <PlayerRanking
    ranking={ranking}
    players={players}
    teams={teams}
    getPlayerRanking={getPlayerRanking}
    getTeamRanking={getTeamRanking}
  />
);

describe("Test Team Component", () => {
  it("should render the component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should have exactly 3 buttons", () => {
    expect(wrapper.find("button").length).toBe(3);
  });

  it("should have exactly 4 tables", () => {
    expect(wrapper.find("table").length).toBe(4);
  });
});
