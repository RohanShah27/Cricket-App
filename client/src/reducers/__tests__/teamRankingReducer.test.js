import teamRanking from "../teamRanking";
import { GET_TEAM_RANKING } from "../../actions/Types";

describe("Testing Team Ranking Reducers", () => {
  it("should return state object with teams array equal to the payload in the action when the action type is GET_TEAM_RANKING(when the state is initial state)", () => {
    let action = {
      type: GET_TEAM_RANKING,
      payload: [{}]
    };
    const returnedState = teamRanking(undefined, action);
    expect(returnedState).toEqual({
      teams: action.payload
    });
  });

  it("should return state object with teams array equal to the payload in the action when the action type is GET_TEAM_RANKING(when the state is not initial state)", () => {
    const initialState = {
      teams: []
    };

    const action = {
      type: GET_TEAM_RANKING,
      payload: []
    };
    const returnedState = teamRanking(initialState, action);
    expect(returnedState).toEqual({
      teams: initialState.teams
    });
  });
});
