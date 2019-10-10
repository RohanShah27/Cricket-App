import * as action from "../Rankings";
import { GET_PLAYER_RANKING, GET_TEAM_RANKING } from "../Types";
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
      type: "Batting",
      format: "ODI"
    };
    moxios.stubRequest("http://localhost:5000/api/playerRanking/ranking", {
      status: 200,
      response: { data: responseofAPI }
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: GET_PLAYER_RANKING,
        payload: responseofAPI
      }
    ];
    // console.log("Second");
    return store.dispatch(action.getPlayerRanking(team)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  it("Should return 400 error if the path is incorrect", () => {
    const responseofAPI = [];
    let team = {
      type: "Batting",
      format: "OI"
    };
    moxios.stubRequest("http://localhost:5000/api/playerRanking/ranking", {
      status: 200,
      response: { data: responseofAPI }
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: GET_PLAYER_RANKING,
        payload: responseofAPI
      }
    ];
    // console.log("Second");
    return store.dispatch(action.getPlayerRanking(team)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  it("Should return team with repect to their tournament", () => {
    const responseofAPI = [{}, {}, {}];
    let team = {
      format: "ODI"
    };
    moxios.stubRequest("http://localhost:5000/api/playerRanking/teamranking", {
      status: 200,
      response: { data: responseofAPI }
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: GET_TEAM_RANKING,
        payload: responseofAPI
      }
    ];
    // console.log("Second");
    return store.dispatch(action.getTeamRanking(team)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  it("Should return 400 error if the path is incorrect", () => {
    const responseofAPI = [];
    let team = {
      format: "OI"
    };
    moxios.stubRequest("http://localhost:5000/api/playerRanking/teamranking", {
      status: 200,
      response: { data: responseofAPI }
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: GET_TEAM_RANKING,
        payload: responseofAPI
      }
    ];
    // console.log("Second");
    return store.dispatch(action.getTeamRanking(team)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });
});
