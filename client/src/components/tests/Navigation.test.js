import React from "react";
import { shallow } from "enzyme";
import Navigation from "../Navigation";

const navigation = jest.fn();
const wrapper = shallow(<Navigation navigation={navigation} />);

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
});
