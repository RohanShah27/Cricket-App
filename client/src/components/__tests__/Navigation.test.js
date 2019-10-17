import React from "react";
import { shallow, mount } from "enzyme";
import { Navigation } from "../Navigation";

let search_result = {
  player: [
    {
      player_id: 4,
      player_name: "Test name"
    }
  ],
  team: [
    {
      team_id: 4,
      team_name: "Team Test Name"
    }
  ]
};
const navigation = jest.fn();
const getGlobalSearchResult = jest.fn();
const wrapper = shallow(
  <Navigation
    navigation={navigation}
    getGlobalSearchResult={getGlobalSearchResult}
    search_result={search_result}
  />
);

describe("Testing Footer Component", () => {
  it("should mount the component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("no of div tags", () => {
    expect(wrapper.find("div").length).toBe(2);
  });

  it("no of p tags", () => {
    expect(wrapper.find("p").length).toBe(0);
  });

  it("no of i tags", () => {
    expect(wrapper.find("i").length).toBe(1);
  });

  it("no of div tag className", () => {
    expect(
      wrapper
        .find("div")
        .at(0)
        .props().className
    ).toBe("nav-container");
  });

  it("no of div tag className", () => {
    expect(
      wrapper
        .find("div")
        .at(0)
        .props().className
    ).toBe("nav-container");
  });

  it("simulate search button", () => {
    expect(
      wrapper
        .find("button")
        .at(0)
        .simulate("click")
    );
  });
  // it("should map players from search result", () => {
  //   expect(wrapper.find("#searchPlayer1").props().children).toBe(
  //     search_result.player[0].player_name
  //   );
  // });
});
