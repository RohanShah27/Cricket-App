import React from "react";
import { mount } from "enzyme";
import AddNewTeam from "../AddNewTeam";
import { Provider } from "react-redux";
import store from "../../store";

const AddnewTeam = jest.fn();
const wrapper = mount(
  <Provider store={store}>
    <AddNewTeam addnewteam={AddnewTeam} history={[]} />
  </Provider>
);

describe("Test AddNewTeam Component", () => {
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
    expect(wrapper.find("button").text()).toEqual("Add Team");
  });

  it("should have Team Name placeholder on team name input field", () => {
    expect(
      wrapper
        .find("input")
        .at(0)
        .props().placeholder
    ).toBe("Enter New Team Name");
  });
});
