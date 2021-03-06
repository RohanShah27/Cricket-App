import React from "react";
import { shallow } from "enzyme";
import Footer from "../Footer";

const footer = jest.fn();
const wrapper = shallow(<Footer footer={footer} />);

describe("Testing Footer Component", () => {
  it("should mount the component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("no of div tags", () => {
    expect(wrapper.find("div").length).toBe(2);
  });

  it("no of p tags", () => {
    expect(wrapper.find("p").length).toBe(1);
  });

  it("no of i tags", () => {
    expect(wrapper.find("i").length).toBe(4);
  });

  it("no of div tag className", () => {
    expect(
      wrapper
        .find("div")
        .at(0)
        .props().className
    ).toBe("footer");
  });

  it("no of div tag className", () => {
    expect(
      wrapper
        .find("div")
        .at(0)
        .props().className
    ).toBe("footer");
  });

  it("no of i tag className", () => {
    expect(
      wrapper
        .find("div")
        .at(1)
        .props().className
    ).toBe("footer-follow");
  });

  it("no of i tag className", () => {
    expect(
      wrapper
        .find("i")
        .at(1)
        .props().className
    ).toBe("fab fa-facebook footer-fab");
  });

  it("no of i tag className", () => {
    expect(
      wrapper
        .find("i")
        .at(2)
        .props().className
    ).toBe("fab fa-instagram footer-fab");
  });

  it("no of i tag className", () => {
    expect(
      wrapper
        .find("i")
        .at(3)
        .props().className
    ).toBe("fab fa-pinterest footer-fab");
  });
  it("should check for footer info text", () => {
    expect(wrapper.find("#footerInfo").text()).toBe(" © Powered By Headstrait");
  });
});
