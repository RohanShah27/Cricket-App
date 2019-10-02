import * as action from "../Team";
import { GET_TOURNAMENT } from "../types";
import moxios from "moxios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Testing Team actions", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it("Should return team with repect to their tournament", () => {
    const responseofAPI = [{}, {}, {}];
    let team = {
      tournament: "IPL"
    };
    moxios.stubRequest("http://localhost:5000/api/team/tournament", {
      status: 200,
      response: { data: responseofAPI }
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: GET_TOURNAMENT,
        payload: responseofAPI
      }
    ];
    // console.log("Second");
    return store.dispatch(action.getTournament(team)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  it("Should return 400 error if the path is incorrect", () => {
    const responseofAPI = [];
    let team = {
      tournament: "ISL"
    };
    moxios.stubRequest("http://localhost:5000/api/team/tournament", {
      status: 200,
      response: { data: responseofAPI }
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: GET_TOURNAMENT,
        payload: responseofAPI
      }
    ];
    // console.log("Second");
    return store.dispatch(action.getTournament(team)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });
});
