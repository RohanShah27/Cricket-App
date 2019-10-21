import React from "react";
import { mount } from "enzyme";
import { ViewTeam } from "../ViewTeam";

let team_stats = [
  {
    test_played: 1,
    tes_win: 1,
    test_loss: 1,
    test_draw: 1,
    odi_played: 1,
    odi_win: 1,
    odi_loss: 1,
    odi_draw: 1,
    t20_played: 1,
    t20_win: 1,
    t20_loss: 1,
    t20_draw: 1
  }
];
const wrapper = mount(
  <ViewTeam
    tournamentTeam={[]}
    match={[]}
    location={[]}
    team_stats={team_stats}
  />
);

describe("Testing viewTeam component", () => {
  it("should render the component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
