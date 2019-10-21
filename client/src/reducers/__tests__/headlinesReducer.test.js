import headlinesReducer from "../headlinesReducer";
import { GET_HEADLINES, GET_SINGLE_HEADLINE } from "../../actions/Types";

describe("Testing headlines Reducers", () => {
  it("should return state object with headlines array equal to the payload in the action when the action type is GET_HEADLINES(when the state is initial state)", () => {
    let action = {
      type: GET_HEADLINES,
      payload: [{}]
    };
    const returnedState = headlinesReducer(undefined, action);
    expect(returnedState).toEqual({
      headlines: action.payload,
      headline: action.payload
    });
  });

  it("should return state object with headlines array equal to the payload in the action when the action type is GET_HEADLINES(when the state is not initial state)", () => {
    const initialState = {
      headlines: []
    };

    const action = {
      type: GET_HEADLINES,
      payload: []
    };
    const returnedState = headlinesReducer(initialState, action);
    expect(returnedState).toEqual({
      headlines: initialState.headlines
    });
  });

  it("should return state object with headline array equal to the payload in the action when the action type is GET_SINGLE_HEADLINE(when the state is initial state)", () => {
    let action = {
      type: GET_SINGLE_HEADLINE,
      payload: []
    };
    const returnedState = headlinesReducer(undefined, action);
    expect(returnedState).toEqual({
      headline: action.payload,
      headlines: action.payload
    });
  });

  it("should return state object with headline array equal to the payload in the action when the action type is GET_SINGLE_HEADLINE(when the state is not initial state)", () => {
    const initialState = {
      headline: [],
      headlines: []
    };

    const action = {
      type: GET_SINGLE_HEADLINE,
      payload: []
    };
    const returnedState = headlinesReducer(initialState, action);
    expect(returnedState).toEqual({
      headline: initialState.headline,
      headlines: initialState.headlines
    });
  });
});
