import * as action from "../Players";
import { SEARCH_PLAYER, ALL_PLAYERS, PLAYER_STATS } from "../Types";
import moxios from "moxios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const url = "http://localhost:5000/api/players/";

describe("Testing Players action", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it("should return all players on call of the url", () => {
    const responseOfApi = [{}, {}, {}];
    moxios.stubRequest(url + "all", {
      status: 200,
      response: { data: responseOfApi }
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: ALL_PLAYERS,
        payload: responseOfApi
      }
    ];
    return store.dispatch(action.getAllPlayers()).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });
  it("should return single player details on call of the url", () => {
    const responseOfApi = [{}];
    let playerId = 1;
    moxios.stubRequest(url + "player_search/" + playerId, {
      status: 200,
      response: { data: responseOfApi }
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: SEARCH_PLAYER,
        payload: responseofApi
      }
    ];
    return store.dispatch(action.searchPlayer()).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });
  it("should return single empty array on call of the url with wrong value", () => {
    const responseOfApi = [];
    let playerId = "abc";
    moxios.stubRequest(url + "player_search/" + playerId, {
      status: 200,
      response: { data: responseOfApi }
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: SEARCH_PLAYER,
        payload: responseofapi
      }
    ];
    return store.dispatch(action.searchPlayer()).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });
  it("should return player stats on call of the url", () => {
    const responseOfApi = [{}];
    let playerId = 1;
    moxios.stubRequest(url + "playerstats/" + playerId, {
      status: 200,
      response: { data: responseOfApi }
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: PLAYER_STATS,
        payload: responseofApi
      }
    ];
    return store.dispatch(action.playerStats()).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });
});
