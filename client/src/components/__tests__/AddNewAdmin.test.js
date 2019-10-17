import React from "react";
import { mount } from "enzyme";
import AddNewAdmin from "../AddNewAdmin";
import { Provider } from "react-redux";
import store from "../../store";

// const AddNewAdmin = jest.fn();
const wrapper = mount(
  <Provider store={store}>
    <AddNewAdmin addnewadmin={AddNewAdmin} history={[]} />
  </Provider>
);

describe("Test AddNewAdmin Component", () => {
  it("should render the component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should have exactly one input fields", () => {
    expect(wrapper.find("input").length).toBe(1);
  });

  it("should have exactly one button", () => {
    expect(wrapper.find("button").length).toBe(1);
  });

  it("should have exactly add user text on Button", () => {
    expect(wrapper.find("button").text()).toEqual("Add User");
  });

  it("should have Email placeholder on email input field", () => {
    expect(
      wrapper
        .find("input")
        .at(0)
        .props().placeholder
    ).toBe("Enter email");
  });
  it("should simulate add admin button", () => {
    expect(
      wrapper
        .find("button")
        .at(1)
        .simulate("click")
    );
  });
});
