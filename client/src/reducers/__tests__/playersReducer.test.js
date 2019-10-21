import playersReducer from "../playersReducer";
import { SEARCH_PLAYER, ALL_PLAYERS, PLAYER_SEARCH } from "../../actions/Types";

describe("Testing search Reducers", () => {
  it("should return state object with player array equal to the payload in the action when the action type is SEARCH_PLAYER(when the state is initial state)", () => {
    let action = {
      type: SEARCH_PLAYER,
      payload: []
    };
    const returnedState = playersReducer(undefined, action);
    expect(returnedState).toEqual({
      player: action.payload,
      players: action.payload,
      search_player: [[]]
    });
  });

  it("should return state object with player array equal to the payload in the action when the action type is SEARCH_PLAYER(when the state is not initial state)", () => {
    const initialState = {
      player: []
    };

    const action = {
      type: SEARCH_PLAYER,
      payload: []
    };
    const returnedState = playersReducer(initialState, action);
    expect(returnedState).toEqual({
      player: initialState.player
    });
  });

  it("should return state object with player array equal to the payload in the action when the action type is ALL_PLAYERS(when the state is initial state)", () => {
    let action = {
      type: ALL_PLAYERS,
      payload: []
    };
    const returnedState = playersReducer(undefined, action);
    expect(returnedState).toEqual({
      player: action.payload,
      players: action.payload,
      search_player: [[]]
    });
  });

  it("should return state object with player array equal to the payload in the action when the action type is ALL_PLAYERS(when the state is not initial state)", () => {
    const initialState = {
      players: [],
      player: []
    };

    const action = {
      type: SEARCH_PLAYER,
      payload: []
    };
    const returnedState = playersReducer(initialState, action);
    expect(returnedState).toEqual({
      players: initialState.players,
      player: initialState.player
    });
  });

  it("should return state object with player array equal to the payload in the action when the action type is PLAYER_SEARCH(when the state is initial state)", () => {
    let action = {
      type: PLAYER_SEARCH,
      payload: []
    };
    const returnedState = playersReducer(undefined, action);
    expect(returnedState).toEqual({
      player: action.payload,
      players: action.payload,
      search_player: action.payload
    });
  });

  it("should return state on wrong type", () => {
    let action = {
      type: "SOME_TYPE",
      payload: []
    };
    const returnedState = playersReducer(undefined, action);
    expect(returnedState).toEqual({
      player: [],
      players: [],
      search_player: [[]]
    });
  });
  it("should return state object with player array equal to the payload in the action when the action type is PLAYER_SEARCH(when the state is not initial state)", () => {
    const initialState = {
      search_player: []
    };

    const action = {
      type: PLAYER_SEARCH,
      payload: []
    };
    const returnedState = playersReducer(initialState, action);
    expect(returnedState).toEqual({
      search_player: initialState.search_player
    });
  });
});
