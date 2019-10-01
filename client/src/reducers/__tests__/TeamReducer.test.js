import teams from "../Team";
import { GET_TOURNAMENT } from "../../actions/types";

describe("Testing Teams Reducers", () => {
  it("should return a state object with with the teams in tournament", () => {
    const initialState = {
      tournamentTeam: [{}]
    };
    const action = {
      type: GET_TOURNAMENT,
      payload: [{}, {}, {}]
    };
    const returnedState = teams(initialState, action);
    expect(returnedState).toEqual(returnedState);
  });
});
