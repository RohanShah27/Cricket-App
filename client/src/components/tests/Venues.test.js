import React from "react";
import { shallow } from "enzyme";
import { Venues } from "../Venues";

const Venue = [{}, {}];
const getVenuesByCountry = jest.fn();
const getVenues = jest.fn();
const wrapper = shallow(
  <Venues
    getVenues={getVenues}
    getVenuesByCountry={getVenuesByCountry}
    Venue={Venue}
  />
);

describe("Test Update user Component", () => {
  it("should render the component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should have a section", () => {
    expect(wrapper.find("section").length).toBe(1);
  });

  it("should have exactly 11 counrties in the slider", () => {
    expect(wrapper.find(".image").length).toBe(11);
  });

  it("should have a Carousel", () => {
    expect(wrapper.find("Carousel").length).toBe(1);
  });

  it("contains h1", () => {
    expect(
      wrapper
        .find("h1")
        .at(0)
        .text()
    ).toEqual("Cricket Venues");
  });

  it("it should have button with text ", () => {
    expect(wrapper.find(".countryHeading").text()).toEqual("Indian Venues");
  });

  it("should have images in card", () => {
    expect(wrapper.find(".groundImages").length).toBe(5);
  });

  it("contains h2 tag which displays ground name", () => {
    expect(wrapper.find("h2").length).toBe(5);
  });

  it("stadium names should be in bold", () => {
    expect(wrapper.find("b").length).toBe(5);
  });

  it("it should have a picture of every ground/stadium", () => {
    expect(wrapper.find(".groundImages").length).toBe(5);
  });

  it("stadium should be displayed in a grid format", () => {
    expect(wrapper.find(".grid-container").length).toBe(0);
  });
});
