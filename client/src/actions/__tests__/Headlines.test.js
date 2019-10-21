import * as action from "../Headlines";
import { GET_HEADLINES, GET_SINGLE_HEADLINE } from "../Types";
import moxios from "moxios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const url = "http://localhost:5000/api/headlines/";

describe("Testing Headlines action", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it("should return all headlines on call of the url", () => {
    const responseofAPI = [{}, {}, {}];
    moxios.stubRequest(url + "all", {
      status: 200,
      response: { data: responseofAPI }
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: GET_HEADLINES,
        payload: responseofAPI
      }
    ];
    return store.dispatch(action.getHeadlines()).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });
  it("should return single headline on call of the url", () => {
    const responseofAPI = [{}];
    let id = 1;
    moxios.stubRequest(url + "single_headline/" + 1, {
      status: 200,
      response: { data: responseofAPI }
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: GET_SINGLE_HEADLINE,
        payload: responseofAPI
      }
    ];
    return store.dispatch(action.getHeadline()).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });
});
