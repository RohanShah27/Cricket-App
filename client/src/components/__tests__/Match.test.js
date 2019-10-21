import React from "react";
import { shallow, mount } from "enzyme";
import { Match } from "../Match";
const history = { push: jest.fn() };

let matches = [
  {
    match_id: 2,
    match_competition: "Big bAsh leagues",
    match_type: "ODI",
    team1: "India",
    team2: "Pakistan",
    team1_image: "in",
    team2_image: "pk"
  },
  {
    match_id: 3,
    match_competition: "Big bAsh leagues",
    match_type: "T20",
    team1: "India",
    team2: "Srilanka",
    team1_image: "in",
    team2_image: "lk"
  }
];

const match = jest.fn();
const getMatchesByType = jest.fn();
const wrapper = mount(
  <Match match={match} getMatchesByType={getMatchesByType} matches={matches} />
);

describe("Test Match Component", () => {
  it("should render the component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should check for component did mount as a function", () => {
    const componentDidMount = jest.spyOn(Match.prototype, "componentDidMount");
    wrapper.instance().componentDidMount();
    expect(componentDidMount).toHaveBeenCalled();
  });
  it("should check if Infinite Scroll component is present or not", () => {
    expect(wrapper.find("InfiniteScroll").exists()).toBeTruthy();
  });

  it("should have a conatiner with name matchtype-tab", () => {
    expect(wrapper.find("#matchtypetab")).toBeTruthy();
  });

  it("should have a conatiner with name matchCard", () => {
    expect(wrapper.find("#matchCard")).toBeTruthy();
  });
  it("should have a match team one in matches ", () => {
    expect(wrapper.find("#matchTeamOne0").props().children).toBe(
      matches[0].team1
    );
  });
  it("should have a match team two in matches ", () => {
    expect(wrapper.find("#matchTeamTwo0").props().children).toBe(
      matches[0].team2
    );
  });

  it("should have a match team one in matches ", () => {
    expect(wrapper.find("#matchTeamOne1").props().children).toBe(
      matches[1].team1
    );
  });
  it("should have a match team two in matches ", () => {
    expect(wrapper.find("#matchTeamTwo1").props().children).toBe(
      matches[1].team2
    );
  });
});
