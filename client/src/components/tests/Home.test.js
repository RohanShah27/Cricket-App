import React from "react";
import Home from "../Home";
import { Provider } from "react-redux";
import store from "../../store";
import { mount } from "enzyme";

const home = jest.fn();
const fixtures = jest.fn();
const wrapper = mount(
  <Provider store={store}>
    <Home home={home} />
  </Provider>
);

describe("Test Home Component", () => {
  it("should render the component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

it("should have exactly 12 div fields", () => {
  expect(wrapper.find("div").length).toBe(12);
});

it("should have exactly 4 p tags", () => {
  expect(wrapper.find("p").length).toBe(1);
});
