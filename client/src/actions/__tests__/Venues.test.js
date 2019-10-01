import * as action from "../Venues";
import { GET_VENUE_BYCOUNTRY } from "../types";
import moxios from "moxios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Testing Venues actions", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it("Should return venues with repect to their country", () => {
    const responseofAPI = [{}, {}, {}];
    let team = {
      country: "India"
    };
    moxios.stubRequest("http://localhost:5000/api/venues/all", {
      status: 200,
      response: { data: responseofAPI }
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: GET_VENUE_BYCOUNTRY,
        payload: responseofAPI
      }
    ];
    // console.log("Second");
    return store.dispatch(action.getVenuesByCountry(team)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  it("Should return empty object with repect to their country", () => {
    const responseofAPI = [];
    let team = {
      country: "China"
    };
    moxios.stubRequest("http://localhost:5000/api/venues/all", {
      status: 200,
      response: { data: responseofAPI }
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: GET_VENUE_BYCOUNTRY,
        payload: responseofAPI
      }
    ];
    // console.log("Second");
    return store.dispatch(action.getVenuesByCountry(team)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });
});
