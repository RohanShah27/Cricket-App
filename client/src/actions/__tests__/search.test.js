import * as action from "../Search";
import { GET_SEARCH } from "../Types";
import moxios from "moxios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const url = "http://localhost:5000/api/searchfeature/";

describe("Testing Search action", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it("should return all search results on call of the url", () => {
    const responseOfApi = [{}, {}, {}];
    moxios.stubRequest(url + "search", {
      status: 200,
      response: { data: responseOfApi }
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: GET_SEARCH,
        payload: responseOfApi
      }
    ];
    return store.dispatch(action.getGlobalSearchResult()).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });
});
