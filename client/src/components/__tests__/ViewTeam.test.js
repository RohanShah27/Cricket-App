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
});
