import React from "react";
import { shallow } from "enzyme";
import { ViewTeam } from "../ViewTeam";
import { Provider } from "react-redux";
import store from "../../store";

const viewteam = jest.fn();
const wrapper = shallow(
  <Provider store={store}>
    <ViewTeam
      viewteam={viewteam}
      tournamentTeam={[]}
      match={[]}
      location={[]}
    />
  </Provider>
);

describe("Testing viewTeam component", () => {
  it("should mount", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should have exactly 3 buttons", () => {
    expect(wrapper.find("button").length).toBe(3);
  });

  it("no of div tags", () => {
    expect(wrapper.find("div").length).toBe(5);
  });

  it("no of p tags", () => {
    expect(wrapper.find("p").length).toBe(2);
  });

  it("test", () => {
    expect(
      wrapper
        .find("button")
        .at(0)
        .simulate()
        .click("ODI").props.state.match_type
    ).toBe("ODI");
  });
});
