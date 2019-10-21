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
const menState = jest.fn();
const femaleState = jest.fn();
const navigation = jest.fn();
const getGlobalSearchResult = jest.fn();
const wrapper = shallow(
  <Navigation
    navigation={navigation}
    menState={menState}
    femaleState={femaleState}
    getGlobalSearchResult={getGlobalSearchResult}
    search_result={search_result}
  />
);

describe("Testing Footer Component", () => {
  it("should mount the component", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("shoudl check for input value", () => {
    const e = {
      target: {
        name: "search_term",
        value: "virat"
      }
    };
    expect(wrapper.state().search_term).toBe("");
    wrapper.instance().OnChange(e);
    expect(wrapper.state().search_result).toBe(undefined);
    expect(getGlobalSearchResult).toBeCalledTimes(1);
  });
  it("should map players from search result", () => {
    expect(wrapper.find("#searchPlayer0").props().children).toStrictEqual([
      " ",
      search_result.player[0].player_name
    ]);
  });
  it("should map teams from search result", () => {
    expect(wrapper.find("#teamName0").props().children).toBe(
      search_result.team[0].team_name
    );
  });
  it("should check if Link is present", () => {
    expect(wrapper.find("Link").exists()).toBeTruthy();
  });
  it("should check for brand name and links", () => {
    expect(wrapper.find("#Brand").text()).toBe("Crickstrait");
  });
  it("should check for links", () => {
    expect(wrapper.find("#Rankings").text()).toBe("Rankings");
    expect(wrapper.find("#teams").text()).toBe("Teams");
    expect(wrapper.find("#matches").text()).toBe("Matches");
    expect(wrapper.find("#players").text()).toBe("Players");
  });
  it("should check for search bar", () => {
    expect(wrapper.find("#globalSearchBar").length).toBe(1);
    expect(wrapper.find("#globalSearchBar").props().placeholder).toBe(
      undefined
    );
  });
  it("should check for button", () => {
    expect(wrapper.find("#searchButton").length).toBe(1);
    // expect(wrapper.find("#searchButton").simulate());
    let getResult = jest.spyOn(wrapper.instance(), "getResult");
    expect(getResult).toBeCalledTimes(0);
  });
  it("should check for men state function", () => {
    expect(wrapper.find("#menState").text()).toBe("Men");
  });
  it("should check for feamale state ", () => {
    expect(wrapper.find("#femaleState").text()).toBe("Women");
  });
  it("should check for presense of remove token function", () => {
    let removeToken = jest.spyOn(wrapper.instance(), "removeToken");
    expect(removeToken).toBeTruthy();
  });
  it("no of div tags", () => {
    expect(wrapper.find("div").length).toBe(3);
  });

  it("no of p tags", () => {
    expect(wrapper.find("p").length).toBe(2);
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
});
