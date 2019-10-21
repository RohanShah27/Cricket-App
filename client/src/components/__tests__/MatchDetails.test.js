import React from "react";
import { shallow, mount } from "enzyme";
import { MatchDetails } from "../MatchDetails";

const matchDetails = jest.fn();
const getMatchDetails = jest.fn();
let getScorecard = jest.fn();
const player1 = [{}, {}];
const player2 = [{}, {}];
const player1_bowler = [{}, {}];
const player2_bowler = [{}, {}];
const result = [{}];
const toss = [{}, {}];
const umpire = [{}, {}];
const date = [{}, {}];
const innings = jest.fn();
const venue = [{}];
const country = [{}, {}];
const runs = [{}];
const fours = [{}];
let getAllMatchDetails = jest.fn();
const getManhattanGraphMatch = jest.fn();
const getPieChartBatsman2 = jest.fn();
const getPieChartBatsman1 = jest.fn();
const getPieChartBowler1 = jest.fn();
const getPieChartBowler2 = jest.fn();
let singlematch = [
  {
    scorecard: [
      {
        striker_name: "Umar Akmal",
        striker_rate: "44.00",
        wicket_type: "caught"
      }
    ]
  }

  // (scorecard = {
  //   ball_faced: "25",
  //   batsman_run: "11",
  //   bowler_name: "MA Starc",
  //   fielder_name: "PJ Cummins",
  //   fielder_two_name: null,
  //   fours: "0",
  //   sixes: "0",
  //   striker_name: "Umar Akmal",
  //   striker_rate: "44.00",
  //   wicket_type: "caught"
  // })
];
const current_match = {
  player1,
  toss,
  player2,
  player1_bowler,
  player2_bowler,
  result,
  umpire,
  date,
  venue,
  country,
  runs,
  fours
};
let history = {
  location: {
    state: {
      match: {
        match_id: 111
      }
    }
  }
};
let location = {
  state: {
    match: {
      match_id: 111
    }
  }
};
let summary = [
  {
    match_id: 2,
    match_type: "ODI",
    player_of_the_match: ["DA Warner"],
    team1_image: "au",
    team2_image: "pk",
    teamOne: "Australia",
    teamOneScore: "353",
    teamTwo: "Pakistan",
    teamTwoScore: "267",
    team_one_total_over: "49",
    team_two_total_over: "43",
    team_winner: "Australia",
    teamone_wicket: "6",
    teamtwo_wicket: "10",
    won_by: "won by 86 runs"
  }
];
const wrapper = mount(
  <MatchDetails
    matchDetails={matchDetails}
    current_match={current_match}
    player1={player1}
    singlematch={singlematch}
    history={history}
    innings={innings}
    getManhattanGraphMatch={getManhattanGraphMatch}
    getPieChartBatsman1={getPieChartBatsman1}
    getPieChartBatsman2={getPieChartBatsman2}
    getPieChartBowler1={getPieChartBowler1}
    getPieChartBowler2={getPieChartBowler2}
    singlematch={singlematch}
    getMatchDetails={getMatchDetails}
    location={location}
    getScorecard={getScorecard}
    getAllMatchDetails={getAllMatchDetails}
    summary={summary}
  />
);

describe("Test MAtch Component", () => {
  it("should render the component", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should check for component did mount as a function", () => {
    const componentWillMount = jest.spyOn(
      MatchDetails.prototype,
      "componentWillMount"
    );
    wrapper.instance().componentWillMount();
    expect(componentWillMount).toHaveBeenCalled();
  });

  it("should have a name of two teams ", () => {
    expect(wrapper.find("#matchHeader0").props().children).toStrictEqual([
      "ODI ",
      "Australia",
      " VS ",
      "Pakistan"
    ]);
  });

  it("should have a name of Result ", () => {
    expect(wrapper.find("#matchResult0").props().children).toStrictEqual([
      "Result : ",
      "Australia",
      " ",
      "won by 86 runs"
    ]);
  });

  it("should have display score of team one", () => {
    expect(wrapper.find("#matchteamOneScore0").props().children).toStrictEqual([
      "353",
      "/",
      "6",
      " (",
      "49",
      " Overs)"
    ]);
  });

  it("should have display score of team Two", () => {
    expect(wrapper.find("#matchteamTwoScore0").props().children).toStrictEqual([
      "267",
      "/",
      "10",
      " (",
      "43",
      " Overs)"
    ]);
  });

  it("should have display POM", () => {
    expect(wrapper.find("#pom0").props().children).toStrictEqual(["DA Warner"]);
  });

  it("should have a iframe fro manhattan", () => {
    expect(wrapper.find("#manhattan")).toBeTruthy();
  });

  it("should have a iframe fro piebats1", () => {
    expect(wrapper.find("#piebats1")).toBeTruthy();
  });

  it("should have a iframe fro piebats2", () => {
    expect(wrapper.find("#piebats2")).toBeTruthy();
  });

  it("should have a iframe fro piebowler1", () => {
    expect(wrapper.find("#piebowler1")).toBeTruthy();
  });

  it("should have a iframe fro piebowler2", () => {
    expect(wrapper.find("#piebowler2")).toBeTruthy();
  });
  it("should have a strikername", () => {
    expect(wrapper.find("#striker0")).toBe("Umar Akmal");
  });
});
