import playerRankingReducer from "../playerRankingReducer";
import { GET_PLAYER_RANKING } from "../../actions/Types";

describe("Testing Player Ranking Reducers", () => {
  it("should return state object with players array equal to the payload in the action when the action type is GET_PLAYER_RANKING(when the state is initial state)", () => {
    let action = {
      type: GET_PLAYER_RANKING,
      payload: [{}]
    };
    const returnedState = playerRankingReducer(undefined, action);
    expect(returnedState).toEqual({
      players: action.payload
    });
  });

  it("should return state object with search array equal to the payload in the action when the action type is GET_PLAYER_RANKING(when the state is not initial state)", () => {
    const initialState = {
      players: []
    };

    const action = {
      type: GET_PLAYER_RANKING,
      payload: []
    };
    const returnedState = playerRankingReducer(initialState, action);
    expect(returnedState).toEqual({
      players: initialState.players
    });
  });
});
