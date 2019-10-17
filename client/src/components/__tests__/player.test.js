import React from "react";
import { mount } from "enzyme";
import Player from "../player";
import { Provider } from "react-redux";
import store from "../../store";

const player = jest.fn();
const wrapper = mount(
    <Provider store={store}>
        <Player player={player} history={[]} />
    </Provider>
);

describe("Test player Component", () => {
    it("should render the component", () => {
        expect(wrapper).toMatchSnapshot();
    });

    it("should have exactly 5 input fields", () => {
        expect(wrapper.find("input").length).toBe(5);
    });

    it("should have exactly one button", () => {
        expect(wrapper.find("button").length).toBe(1);
    });

    it("should have exactly Add Player text on Button", () => {
        expect(wrapper.find("button").text()).toEqual("Add Player");
    });

    it("should have exactly two select option", () => {
        expect(wrapper.find("select").length).toBe(2);
    });


});
