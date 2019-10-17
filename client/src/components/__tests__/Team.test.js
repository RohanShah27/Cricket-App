import React from "react";
import { shallow } from "enzyme";
import { Team } from "../Team";

const teams = [{}, {}];
const getTeam = jest.fn();
const getTournament = jest.fn();
const tournamentTeam = [{}, {}];
const wrapper = shallow(
  <Team
    getTeam={getTeam}
    teams={teams}
    getTournament={getTournament}
    tournamentTeam={tournamentTeam}
  />
);

describe("Test Team Component", () => {
  it("should render the component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should have exactly 11 countriess in the slider", () => {
    expect(wrapper.find("li").length).toBe(4);
  });

  it("should have exactly 11 countriess in the slider", () => {
    expect(wrapper.find("ul").length).toBe(1);
  });

  it("should have exactly 11 countriess in the slider", () => {
    expect(wrapper.find("nav").length).toBe(1);
  });

  it("should have list of countries", () => {
    expect(wrapper.find("ul").length).toBe(1);
  });

  it("should have list of countries", () => {
    expect(wrapper.find("label").length).toBe(4);
  });

  it("should have list of countries", () => {
    expect(wrapper.find("img").length).toBe(4);
  });

  it("should have a nav bar", () => {
    expect(wrapper.find("nav").length).toBe(1);
  });

  it("should have a nav bar", () => {
    expect(wrapper.find("div").length).toBe(32);
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("div")
        .at(1)
        .props().className
    ).toBe("pc-playerTab");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("div")
        .at(2)
        .props().className
    ).toBe("playerTab1");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("div")
        .at(3)
        .props().className
    ).toBe("team-teamTestimonials");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("div")
        .at(4)
        .props().className
    ).toBe("teamcomponent-card");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("div")
        .at(5)
        .props().className
    ).toBe("layer");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("div")
        .at(6)
        .props().className
    ).toBe("team-content");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("div")
        .at(7)
        .props().className
    ).toBe("team-details");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("div")
        .at(8)
        .props().className
    ).toBe("teamcomponent-card");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("div")
        .at(9)
        .props().className
    ).toBe("layer");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("div")
        .at(10)
        .props().className
    ).toBe("team-content");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("div")
        .at(11)
        .props().className
    ).toBe("team-details");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("div")
        .at(12)
        .props().className
    ).toBe("playerTab2");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("div")
        .at(13)
        .props().className
    ).toBe("team-teamTestimonials");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("div")
        .at(14)
        .props().className
    ).toBe("teamcomponent-card");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("div")
        .at(15)
        .props().className
    ).toBe("layer");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("div")
        .at(16)
        .props().className
    ).toBe("team-content");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("div")
        .at(17)
        .props().className
    ).toBe("team-details");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("div")
        .at(18)
        .props().className
    ).toBe("teamcomponent-card");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("div")
        .at(19)
        .props().className
    ).toBe("layer");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("div")
        .at(20)
        .props().className
    ).toBe("team-content");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("div")
        .at(21)
        .props().className
    ).toBe("team-details");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("li")
        .at(0)
        .props().className
    ).toBe("playerTab1");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("li")
        .at(1)
        .props().className
    ).toBe("playerTab2");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("li")
        .at(2)
        .props().className
    ).toBe("playerTab3");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("li")
        .at(3)
        .props().className
    ).toBe("playerTab4");
  });
});
