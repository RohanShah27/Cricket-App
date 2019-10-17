import React from "react";
import { shallow, mount } from "enzyme";
import Home from "../Home";
import { Provider } from "react-redux";
import store from "../../store";

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
let match = [
  {
    match_id: 2,
    match_competition: "Big bAsh leagues",
    match_type: "ODI",
    team1: "India",
    team2: "Pakistan"
  },
  {
    match_id: 2,
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
  <Provider store={store}>
    <Home
      home={home}
      // props={fixtures={fixtures}, headlines, match)}
      getFixtures={getFixtures}
      getMatchesRecentMatches={getMatchesRecentMatches}
      getHeadline={getHeadline}
      getHeadlines={getHeadlines}
      fixtures={fixtures}
      headlines={headlines}
      match={match}
    />
  </Provider>
);

describe("Test Team Component", () => {
  it("should render the component", () => {
    expect(wrapper).toMatchSnapshot();
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
    console.log("MATCH WALA", wrapper.find("#matchName"));
    expect(wrapper.find("#matchName").props().children).toBe(fixtures[0].match);
  });
  it("should have a match name in fixture ", () => {
    expect(wrapper.find("#matchName0")).toBeTruthy();
  });
});
