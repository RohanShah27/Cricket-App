import searchReducer from "../searchReducer";
import { GET_SEARCH } from "../../actions/Types";

describe("Testing search Reducers", () => {
  it("should return state object with search array equal to the payload in the action when the action type is GET_SEARCH(when the state is initial state)", () => {
    let action = {
      type: GET_SEARCH,
      payload: [{}]
    };
    const returnedState = searchReducer(undefined, action);
    expect(returnedState).toEqual({
      search_result: action.payload
    });
  });

  it("should return state object with search array equal to the payload in the action when the action type is GET_SEARCH(when the state is not initial state)", () => {
    const initialState = {
      search_result: []
    };

    const action = {
      type: GET_SEARCH,
      payload: []
    };
    const returnedState = searchReducer(initialState, action);
    expect(returnedState).toEqual({
      search_result: initialState.search_result
    });
  });
});
