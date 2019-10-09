import React from "react";
import { shallow } from "enzyme";
import { PlayerRanking } from "../PlayerRanking";

const ranking = jest.fn();
const getPlayerRanking = jest.fn();
const players = [{}, {}];
const wrapper = shallow(
  <PlayerRanking
    ranking={ranking}
    players={players}
    getPlayerRanking={getPlayerRanking}
  />
);

describe("Test Team Component", () => {
  it("should render the component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should have exactly 4 buttons", () => {
    expect(wrapper.find("button").length).toBe(4);
  });

  it("should have exactly 4 buttons", () => {
    expect(
      wrapper
        .find("button")
        .at(0)
        .text()
    ).toBe("Batting ");
  });

  it("should have exactly 4 buttons", () => {
    expect(
      wrapper
        .find("button")
        .at(1)
        .text()
    ).toBe("Bowling ");
  });

  it("should have exactly 4 buttons", () => {
    expect(
      wrapper
        .find("button")
        .at(2)
        .text()
    ).toBe("All-Rounder ");
  });

  it("should have exactly 4 buttons", () => {
    expect(
      wrapper
        .find("button")
        .at(3)
        .text()
    ).toBe("Teams ");
  });

  it("should have exactly 4 buttons", () => {
    expect(wrapper.find("b").length).toBe(3);
  });

  it("should have exactly 4 i", () => {
    expect(wrapper.find("i").length).toBe(4);
  });

  it("should have exactly 25 div tags", () => {
    expect(wrapper.find("div").length).toBe(25);
  });

  it("should have exactly 12 p tags", () => {
    expect(wrapper.find("p").length).toBe(12);
  });

  it("should have exactly subnavbtn classname", () => {
    expect(
      wrapper
        .find("button")
        .at(0)
        .props().className
    ).toBe("subnavbtn");
  });

  it("should have exactly subnavbtn classname", () => {
    expect(
      wrapper
        .find("button")
        .at(1)
        .props().className
    ).toBe("subnavbtn");
  });

  it("should have exactly subnavbtn classname", () => {
    expect(
      wrapper
        .find("button")
        .at(2)
        .props().className
    ).toBe("subnavbtn");
  });

  it("should have exactly subnavbtn classname", () => {
    expect(
      wrapper
        .find("button")
        .at(3)
        .props().className
    ).toBe("subnavbtn");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("div")
        .at(1)
        .props().className
    ).toBe("navbar");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("div")
        .at(2)
        .props().className
    ).toBe("subnav");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("div")
        .at(3)
        .props().className
    ).toBe("subnav-content");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("div")
        .at(4)
        .props().className
    ).toBe("subnav");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("div")
        .at(5)
        .props().className
    ).toBe("subnav-content");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("div")
        .at(6)
        .props().className
    ).toBe("subnav");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("div")
        .at(7)
        .props().className
    ).toBe("subnav-content");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("div")
        .at(8)
        .props().className
    ).toBe("subnav");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("div")
        .at(9)
        .props().className
    ).toBe("subnav-content");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("div")
        .at(10)
        .props().className
    ).toBe("rankings-wrapper");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("div")
        .at(11)
        .props().className
    ).toBe("rankings-box a");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("div")
        .at(12)
        .props().className
    ).toBe("rankings-box b");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("div")
        .at(13)
        .props().className
    ).toBe("rankings-box b");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("div")
        .at(14)
        .props().className
    ).toBe("rankings-box c");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("div")
        .at(15)
        .props().className
    ).toBe("rankings-row");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("div")
        .at(16)
        .props().className
    ).toBe("rankings-box d");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("div")
        .at(17)
        .props().className
    ).toBe("rankings-box e");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("div")
        .at(18)
        .props().className
    ).toBe("rankings-box f");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("div")
        .at(19)
        .props().className
    ).toBe("rankings-box g");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("div")
        .at(20)
        .props().className
    ).toBe("rankings-row");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("div")
        .at(21)
        .props().className
    ).toBe("rankings-box d");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("div")
        .at(22)
        .props().className
    ).toBe("rankings-box e");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("div")
        .at(23)
        .props().className
    ).toBe("rankings-box f");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("div")
        .at(24)
        .props().className
    ).toBe("rankings-box g");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("i")
        .at(0)
        .props().className
    ).toBe("fa fa-caret-down");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("i")
        .at(1)
        .props().className
    ).toBe("fa fa-caret-down");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("i")
        .at(2)
        .props().className
    ).toBe("fa fa-caret-down");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("i")
        .at(3)
        .props().className
    ).toBe("fa fa-caret-down");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("p")
        .at(0)
        .text()
    ).toBe("Test");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("p")
        .at(1)
        .text()
    ).toBe("ODI");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("p")
        .at(2)
        .text()
    ).toBe("T20");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("p")
        .at(3)
        .text()
    ).toBe("Test");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("p")
        .at(4)
        .text()
    ).toBe("ODI");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("p")
        .at(5)
        .text()
    ).toBe("T20");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("p")
        .at(6)
        .text()
    ).toBe("Test");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("p")
        .at(7)
        .text()
    ).toBe("ODI");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("p")
        .at(8)
        .text()
    ).toBe("T20");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("p")
        .at(9)
        .text()
    ).toBe("Test");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("p")
        .at(10)
        .text()
    ).toBe("ODI");
  });

  it("should have exactly defined classname", () => {
    expect(
      wrapper
        .find("p")
        .at(11)
        .text()
    ).toBe("T20");
  });
});
