import React from "react";
import { shallow, mount } from "enzyme";
import { MatchDetails } from "../MatchDetails";

const matchDetails = jest.fn();
const getMatchDetails = jest.fn();
let getScorecard = jest.fn();
const player1 = [{}, {}];
let getAllMatchDetails = jest.fn();
const summary = [];
const singlematch = [];
const current_match = [];
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
const wrapper = mount(
  <MatchDetails
    matchDetails={matchDetails}
    current_match={current_match}
    player1={player1}
    history={history}
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
  //   it("should check for component did mount as a function", () => {
  //     const componentWillMount = jest.spyOn(
  //       MatchDetails.prototype,
  //       "componentWillMount"
  //     );
  //     wrapper.instance().componentWillMount();
  //     expect(componentWillMount).toHaveBeenCalled();
  //   });
});
