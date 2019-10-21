import fixturesReducer from "../fixturesReducer";
import { GET_FIXTURES } from "../../actions/Types";

describe("Testing  fixtures Reducers", () => {
  it("should return state object with match array equal to the payload in the action when the action type is GET_FIXTURES(when the state is initial state)", () => {
    let action = {
      type: GET_FIXTURES,
      payload: []
    };
    const returnedState = fixturesReducer(undefined, action);
    expect(returnedState).toEqual({
      fixtures: action.payload
    });
  });

  it("should return state object with match array equal to the payload in the action when the action type is GET_TOURNAMENT(when the state is not initial state)", () => {
    const initialState = {
      fixtures: []
    };

    const action = {
      type: GET_FIXTURES,
      payload: []
    };
    const returnedState = fixturesReducer(initialState, action);
    expect(returnedState).toEqual({
      fixtures: initialState.fixtures
    });
  });
});
