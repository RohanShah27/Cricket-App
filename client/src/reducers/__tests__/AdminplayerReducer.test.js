import players from "../AdminplayerReducer";
import { ADD_PLAYERS } from "../../actions/Types";

describe("Testing Users Reducers", () => {
  it("should return a state object with players array equal to the payload in the action when the action type is GET_USERS (when the returned state is initial state", () => {
    const action = {
      type: ADD_PLAYERS,
      payload: []
    };
    const returnedState = players(undefined, action);
    expect(returnedState).toEqual({ error: "", players: action.payload });
  });

  it("should return a state object with PLAYERS array equal to the payload in the action when the action type is GET_USERS (when the returned state is not an initial state", () => {
    const initialState = {
      error: "",
      players: []
    };
    const action = {
      type: ADD_PLAYERS,
      payload: []
    };
    const returnedState = players(initialState, action);
    expect(returnedState).toEqual({ error: "", players: action.payload });
  });

  it("should return the initial state object when the action type is not mentioned or doesn't concern the reducer (when the returned state is initial state", () => {
    let action = {
      payload: [{}, {}, {}]
    };
    let returnedState = players(undefined, action);
    expect(returnedState).toEqual({ error: "", players: [] });
    action = {
      type: "SOME_TYPE",
      payload: [{}, {}, {}]
    };
    returnedState = players(undefined, action);
    expect(returnedState).toEqual({ error: "", players: [] });
  });

  it("should return a state object with contacts array equal to the payload in the action when the action type is GET_USERS (when the returned state is not an initial state", () => {
    const initialState = {
      error: "",
      players: [1, 2, 3, 4, 5]
    };
    let action = {
      payload: [{}, {}, {}]
    };
    let returnedState = players(initialState, action);
    expect(returnedState).toEqual({ error: "", players: initialState.players });
    action = {
      type: "SOME_TYPE",
      payload: [{}, {}, {}]
    };
    returnedState = players(initialState, action);
    expect(returnedState).toEqual({ error: "", players: initialState.players });
  });
});
