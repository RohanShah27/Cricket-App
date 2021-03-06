import * as actions from "../Players";
import { getPlayerType } from "../Players";
import { ADD_PLAYERS_TYPE, GET_PLAYERS } from "../Types";
// import { getPlayertype } from "../Players";
import moxios from "moxios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Testing contacts actions", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it("should create an action with type GET_PLAYERS and the payload sgould be same as the API response when the response is 20*", () => {
    const responseofAPI = [{}, {}, {}];
    moxios.stubRequest("http://localhost:5000/api/playertype/all", {
      status: 200,
      response: { data: responseofAPI }
    });

    const store = mockStore({});
    const expectedActions = [
      {
        type: ADD_PLAYERS_TYPE,
        payload: responseofAPI
      }
    ];
    console.log(responseofAPI);
    store.dispatch(actions.getPlayertype()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("should go into catch with type GET_PLAYERS and the payload should be same as the API response when the response is 40*", () => {
    const responseofAPI = [];
    moxios.stubRequest("http://localhost:5000/api/playertype/all", {
      status: 400,
      response: { data: responseofAPI }
    });

    const store = mockStore({});
    const expectedActions = [];
    store.dispatch(actions.getPlayertype()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
