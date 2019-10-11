import React from "react";
import { shallow } from "enzyme";
import Home from "../Home";

const home = jest.fn();
const fixtures = jest.fn();
const wrapper = shallow(<Home home={home} fixtures={fixtures} />);

describe("Test Team Component", () => {
  it("should render the component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
