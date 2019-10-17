import * as actions from "../teamActions";
import {
  SEARCH_TEAM_FOR_VIEW_TEAM_PAGE,
  GET_TEAM_BY_ID,
  GET_TOURNAMENT
} from "../Types";
import moxios from "moxios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Testing viewTeam Actions using API's", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test("should return team data with team id", () => {
    const responseOfApi = [{}, {}, {}];
    let id = {
      id: "7"
    };
    moxios.stubRequest("http://localhost:5000/api/team/teambyid", {
      status: 200,
      response: { data: responseOfApi }
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: GET_TEAM_BY_ID,
        payload: responseOfApi
      }
    ];
    return store.dispatch(actions.getTeamById(id)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });
});

// test("should return status code 200 and response null", () => {
//   const responseOfApi = [];
//   let id = {
//     id: "8"
//   };
//   moxios.stubRequest("http://localhost:5000/api/team/teambyid", {
//     status: 200,
//     response: { data: responseOfApi }
//   });
//   const store = mockStore({});
//   const expectedResponse = [
//     {
//       type: GET_TEAM_BY_ID,
//       payload: responseOfApi
//     }
//   ];
//   return store.dispatch(actions.getTeamById(id)).then(() => {
//     expect(store.getActions()).toEqual(expectedResponse);
//   });
// });

describe("Testing viewTeam Actions using API's", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test("should return match data with match id", () => {
    const responseOfApi = [{}, {}, {}];
    let team = {
      team: "India"
    };
    moxios.stubRequest("http://localhost:5000/api/team/teamsearch", {
      status: 200,
      response: { data: responseOfApi }
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: SEARCH_TEAM_FOR_VIEW_TEAM_PAGE,
        payload: responseOfApi
      }
    ];
    return store.dispatch(actions.searchTeamForViewTeamPage(team)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });
});

describe("Testing viewTeam Actions using API's", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test("should return match data with match id", () => {
    const responseOfApi = [{}, {}, {}];
    let tournament = {
      tournament: "ODI"
    };
    moxios.stubRequest("http://localhost:5000/api/team/tournament", {
      status: 200,
      response: { data: responseOfApi }
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: GET_TOURNAMENT,
        payload: responseOfApi
      }
    ];
    return store.dispatch(actions.getTournament(tournament)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });
});
