import React from "react";
import { mount } from "enzyme";
import Login from "../Login";
import { Provider } from "react-redux";
import store from "../../store";

const login = jest.fn();
const wrapper = mount(
    <Provider store={store}>
        <Login login={login} />
    </Provider>
);

describe("Test Login Component", () => {
    it("should render the component", () => {
        expect(wrapper).toMatchSnapshot();
    });

    it("should have exactly two input fields", () => {
        expect(wrapper.find("input").length).toBe(2);
    });

    it("should have exactly one button", () => {
        expect(wrapper.find("button").length).toBe(1);
    });

    it("should have exactly Login text on Button", () => {
        expect(wrapper.find("button").text()).toEqual("Login");
    });

    it("should have Password placeholder on email input field", () => {
        expect(
            wrapper
                .find("input")
                .at(0)
                .props().placeholder
        ).toBe("Enter email");
    });

    it("should have Password placeholder on password input field", () => {
        expect(
            wrapper
                .find("input")
                .at(1)
                .props().placeholder
        ).toBe("Enter Password");
    });
});
