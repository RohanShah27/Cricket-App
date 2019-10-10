import React from "react";
import { mount } from "enzyme";
import ResetPassword from "../ResetPassword";
import { Provider } from "react-redux";
import store from "../../store";

// const AddNewAdmin = jest.fn();
const wrapper = mount(
  <Provider store={store}>
    <ResetPassword resetpassword={ResetPassword} history={[]} />
  </Provider>
);

describe("Test ResetPassword Component", () => {
  it("should render the component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should have exactly three input fields", () => {
    expect(wrapper.find("input").length).toBe(3);
  });

  it("should have exactly one button", () => {
    expect(wrapper.find("button").length).toBe(1);
  });

  it("should have exactly Reset password text on Button", () => {
    expect(wrapper.find("button").text()).toEqual("Update Password");
  });

  it("should have Email placeholder on email input field", () => {
    expect(
      wrapper
        .find("input")
        .at(0)
        .props().placeholder
    ).toBe("Enter email");
  });
});

it("should have Password placeholder on password input field", () => {
  expect(
    wrapper
      .find("input")
      .at(1)
      .props().placeholder
  ).toBe("Password");
});

it("should have Confirm Password placeholder on confirmpassword input field", () => {
  expect(
    wrapper
      .find("input")
      .at(2)
      .props().placeholder
  ).toBe("Confirm Password");
});
