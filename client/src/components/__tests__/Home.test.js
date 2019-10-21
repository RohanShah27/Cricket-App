import React from "react";
import { shallow, mount } from "enzyme";
import { Home } from "../Home";
const history = { push: jest.fn() };

let fixtures = [
  {
    match: "India vs Pakistan",
    match_date: "29/11/1997",
    time: "12:00 IST"
  },
  {
    match: "India vs Srilanka",
    match_date: "5/12/1997",
    time: "12:00 IST"
  }
];
let headlines = [
  { headline_id: 1, headlines: "Master Blaster Sachin baby" },
  { headline_id: 2, headlines: "BCCI President elections coming up" }
];
let headline = [
  {
    headlines: "Test headline",
    headline_description: "test Descrption"
  }
];
let match = [
  {
    match_id: 2,
    match_competition: "Big bAsh leagues",
    match_type: "ODI",
    team1: "India",
    team2: "Pakistan"
  },
  {
    match_id: 3,
    match_competition: "Big bAsh leagues",
    match_type: "T20",
    team1: "India",
    team2: "Srilanka"
  }
];
const home = jest.fn();
const getFixtures = jest.fn();
const getMatchesRecentMatches = jest.fn();
const getHeadline = jest.fn();
const getHeadlines = jest.fn();
const wrapper = mount(
  <Home
    home={home}
    getFixtures={getFixtures}
    getMatchesRecentMatches={getMatchesRecentMatches}
    getHeadline={getHeadline}
    getHeadlines={getHeadlines}
    fixtures={fixtures}
    headlines={headlines}
    match={match}
    headline={headline}
    history={history}
  />
);

describe("Test MAtch Component", () => {
  it("should render the component", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should check for component did mount as a function", () => {
    const componentWillMount = jest.spyOn(Home.prototype, "componentWillMount");
    wrapper.instance().componentWillMount();
    expect(componentWillMount).toHaveBeenCalled();
  });
  it("should have a container with heading called fixtures", () => {
    expect(wrapper.find("#fixtures-header")).toBeTruthy();
    console.log(wrapper.find("#fixtures-header"));
  });
  it("should have a container with heading called fixtures", () => {
    expect(wrapper.find("#fixtures-header").props().children).toBe("Fixtures");
  });
  it("should have a container with heading called news", () => {
    expect(wrapper.find("#news-Section").props().children).toBe(
      "India's Tour of WestIndies"
    );
  });
  it("should have a container with heading called HEadlines", () => {
    expect(wrapper.find("#headlines").props().children).toBe("Headlines");
  });
  it("should have a match name in fixture ", () => {
    expect(wrapper.find("#matchName0").props().children).toBe(
      fixtures[0].match
    );
  });
  it("should have a match name in fixture ", () => {
    expect(wrapper.find("#matchName1").props().children).toBe(
      fixtures[1].match
    );
  });
  it("should have a headline in headlines ", () => {
    expect(wrapper.find("#singleheadline0").props().children).toBe(
      headlines[0].headlines
    );
  });
  it("should have a match team one in matches ", () => {
    expect(wrapper.find("#matchTeamOne0").props().children).toBe(
      match[0].team1
    );
  });
  it("should have a match team two in matches ", () => {
    expect(wrapper.find("#matchTeamTwo0").props().children).toBe(
      match[0].team2
    );
  });
  it("should have a match team one in matches ", () => {
    expect(wrapper.find("#matchTeamOne1").props().children).toBe(
      match[1].team1
    );
  });
  it("should have a match team two in matches ", () => {
    expect(wrapper.find("#matchTeamTwo1").props().children).toBe(
      match[1].team2
    );
  });
  it("should have a match name in fixture ", () => {
    expect(wrapper.find("#matchName0")).toBeTruthy();
  });
  it("Check history push as a function ", () => {
    wrapper.find("#recent-match0").simulate("click");
    expect(history.push).toBeCalledWith(
      "/matchdetails/" + match[0].match_id,
      match[0]
    );
  });
  it("check recent match Data", () => {
    expect(wrapper.find("#matchData0").text()).toEqual("  - ODI");
  });
  it("Check history push as a function ", () => {
    wrapper.find("#recent-match1").simulate("click");
    expect(history.push).toBeCalledWith(
      "/matchdetails/" + match[1].match_id,
      match[1]
    );
  });
  it("Check function call to GetHeadline ", () => {
    wrapper.find("#getHeadlineData0").simulate("click");
    expect(getHeadline).toBeCalledWith(headlines[0].headline_id);
  });
});
