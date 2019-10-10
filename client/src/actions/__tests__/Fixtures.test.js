import * as action from "../Fixtures";
import { GET_FIXTURES } from "../Types";
import moxios from "moxios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const url = "http://localhost:5000/api/fixtures/";

describe("Testing Headlines action", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it("should return all headlines on call of the url", () => {
    const responseOfApi = [{}, {}, {}];
    moxios.stubRequest(url + "all", {
      status: 200,
      response: { data: responseOfApi }
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: GET_FIXTURES,
        payload: responseofAPI
      }
    ];
    return store.dispatch(action.getFixtures()).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });
});
