import matchReducers from "../matchReducers";
import {
  GET_RECENT_MATCHES,
  GET_MATCHESBYTYPE,
  SEARCH_TEAM,
  GET_MATCH_DETAILS,
  GET_MATCHES_BY_TEAM,
  GET_MATCHES_BY_TEAM_AND_TYPE,
  GET_MATCHES_BY_DATE,
  GET_SCORECARD,
  MATCH_SUMMARY,
  MANHATTAN_GRAPH_MATCH
} from "../../actions/Types";

describe("Testing match Reducers", () => {
  it("should return state object with match array equal to the payload in the action when the action type is GET_RECENT_MATCHES(when the state is initial state)", () => {
    let action = {
      type: GET_RECENT_MATCHES,
      payload: [{}]
    };
    const returnedState = matchReducers(undefined, action);
    expect(returnedState).toEqual({
      current_match: {
        country: [{}, {}],
        date: [{}, {}],
        fours: [{}],
        player1: [{}, {}],
        player1_bowler: [{}, {}],
        player2: [{}, {}],
        player2_bowler: [{}, {}],
        result: [{}],
        runs: [{}],
        toss: [{}, {}],
        umpire: [{}, {}],
        venue: [{}]
      },
      match: action.payload,
      manhattan: [],
      viewmatch: [],
      summary: [],
      singlematch: []
    });
  });

  it("should return state object with match array equal to the payload in the action when the action type is GET_RECENT_MATCHES(when the state is not initial state)", () => {
    const initialState = {
      match: []
    };

    const action = {
      type: GET_RECENT_MATCHES,
      payload: []
    };
    const returnedState = matchReducers(initialState, action);
    expect(returnedState).toEqual({
      match: initialState.match
    });
  });

  it("should return state object with match array equal to the payload in the action when the action type is GET_MATCHESBYTYPE(when the state is initial state)", () => {
    let action = {
      type: GET_MATCHESBYTYPE,
      payload: [{}]
    };
    const returnedState = matchReducers(undefined, action);
    expect(returnedState).toEqual({
      current_match: {
        country: [{}, {}],
        date: [{}, {}],
        fours: [{}],
        player1: [{}, {}],
        player1_bowler: [{}, {}],
        player2: [{}, {}],
        player2_bowler: [{}, {}],
        result: [{}],
        runs: [{}],
        toss: [{}, {}],
        umpire: [{}, {}],
        venue: [{}]
      },
      match: [],
      manhattan: [],
      viewmatch: action.payload,
      summary: [],
      singlematch: []
    });
  });

  it("should return state object with match array equal to the payload in the action when the action type is GET_MATCHESBYTYPE(when the state is not initial state)", () => {
    const initialState = {
      viewmatch: []
    };

    const action = {
      type: GET_MATCHESBYTYPE,
      payload: []
    };
    const returnedState = matchReducers(initialState, action);
    expect(returnedState).toEqual({
      viewmatch: initialState.viewmatch
    });
  });

  it("should return state object with match array equal to the payload in the action when the action type is SEARCH_TEAM(when the state is initial state)", () => {
    let action = {
      type: SEARCH_TEAM,
      payload: [{}]
    };
    const returnedState = matchReducers(undefined, action);
    expect(returnedState).toEqual({
      match: action.payload
    });
  });

  it("should return state object with match array equal to the payload in the action when the action type is SEARCH_TEAM(when the state is not initial state)", () => {
    const initialState = {
      match: []
    };

    const action = {
      type: SEARCH_TEAM,
      payload: []
    };
    const returnedState = matchReducers(initialState, action);
    expect(returnedState).toEqual({
      match: []
    });
  });

  it("should return state object with match array equal to the payload in the action when the action type is GET_MATCH_DETAILS(when the state is initial state)", () => {
    let action = {
      type: GET_MATCH_DETAILS,
      payload: [{}]
    };
    const returnedState = matchReducers(undefined, action);
    expect(returnedState).toEqual({
      current_match: action.payload,
      manhattan: [],
      match: [],
      singlematch: [],
      summary: [],
      viewmatch: []
    });
  });

  it("should return state object with match array equal to the payload in the action when the action type is GET_MATCH_DETAILS(when the state is not initial state)", () => {
    const initialState = {
      current_match: []
    };

    const action = {
      type: GET_MATCH_DETAILS,
      payload: []
    };
    const returnedState = matchReducers(initialState, action);
    expect(returnedState).toEqual({
      current_match: initialState.current_match
    });
  });

  it("should return state object with match array equal to the payload in the action when the action type is GET_MATCHES_BY_TEAM(when the state is initial state)", () => {
    let action = {
      type: GET_MATCHES_BY_TEAM,
      payload: [{}]
    };
    const returnedState = matchReducers(undefined, action);
    expect(returnedState).toEqual({
      current_match: {
        country: [{}, {}],
        date: [{}, {}],
        fours: [{}],
        player1: [{}, {}],
        player1_bowler: [{}, {}],
        player2: [{}, {}],
        player2_bowler: [{}, {}],
        result: [{}],
        runs: [{}],
        toss: [{}, {}],
        umpire: [{}, {}],
        venue: [{}]
      },
      match: action.payload,
      manhattan: [],
      viewmatch: [],
      summary: [],
      singlematch: []
    });
  });

  it("should return state object with match array equal to the payload in the action when the action type is GET_MATCHES_BY_TEAM(when the state is not initial state)", () => {
    const initialState = {
      match: []
    };

    const action = {
      type: GET_MATCHES_BY_TEAM,
      payload: []
    };
    const returnedState = matchReducers(initialState, action);
    expect(returnedState).toEqual({
      match: initialState.match
    });
  });

  it("should return state object with match array equal to the payload in the action when the action type is GET_MATCHES_BY_TEAM_AND_TYPE(when the state is initial state)", () => {
    let action = {
      type: GET_MATCHES_BY_TEAM_AND_TYPE,
      payload: [{}]
    };
    const returnedState = matchReducers(undefined, action);
    expect(returnedState).toEqual({
      current_match: {
        country: [{}, {}],
        date: [{}, {}],
        fours: [{}],
        player1: [{}, {}],
        player1_bowler: [{}, {}],
        player2: [{}, {}],
        player2_bowler: [{}, {}],
        result: [{}],
        runs: [{}],
        toss: [{}, {}],
        umpire: [{}, {}],
        venue: [{}]
      },
      match: action.payload,
      manhattan: [],
      viewmatch: [],
      summary: [],
      singlematch: []
    });
  });

  it("should return state object with match array equal to the payload in the action when the action type is GET_MATCHES_BY_TEAM_AND_TYPE(when the state is not initial state)", () => {
    const initialState = {
      match: []
    };

    const action = {
      type: GET_MATCHES_BY_TEAM_AND_TYPE,
      payload: []
    };
    const returnedState = matchReducers(initialState, action);
    expect(returnedState).toEqual({
      match: initialState.match
    });
  });

  it("should return state object with match array equal to the payload in the action when the action type is GET_MATCHES_BY_DATE(when the state is initial state)", () => {
    let action = {
      type: GET_MATCHES_BY_DATE,
      payload: [{}]
    };
    const returnedState = matchReducers(undefined, action);
    expect(returnedState).toEqual({
      current_match: {
        country: [{}, {}],
        date: [{}, {}],
        fours: [{}],
        player1: [{}, {}],
        player1_bowler: [{}, {}],
        player2: [{}, {}],
        player2_bowler: [{}, {}],
        result: [{}],
        runs: [{}],
        toss: [{}, {}],
        umpire: [{}, {}],
        venue: [{}]
      },
      match: action.payload,
      manhattan: [],
      viewmatch: [],
      summary: [],
      singlematch: []
    });
  });

  it("should return state object with match array equal to the payload in the action when the action type is GET_MATCHES_BY_DATE(when the state is not initial state)", () => {
    const initialState = {
      match: []
    };

    const action = {
      type: GET_MATCHES_BY_DATE,
      payload: []
    };
    const returnedState = matchReducers(initialState, action);
    expect(returnedState).toEqual({
      match: initialState.match
    });
  });

  it("should return state object with match array equal to the payload in the action when the action type is GET_SCORECARD(when the state is initial state)", () => {
    let action = {
      type: GET_SCORECARD,
      payload: []
    };
    const returnedState = matchReducers(undefined, action);
    expect(returnedState).toEqual({
      current_match: {
        country: [{}, {}],
        date: [{}, {}],
        fours: [{}],
        player1: [{}, {}],
        player1_bowler: [{}, {}],
        player2: [{}, {}],
        player2_bowler: [{}, {}],
        result: [{}],
        runs: [{}],
        toss: [{}, {}],
        umpire: [{}, {}],
        venue: [{}]
      },
      match: [],
      manhattan: [],
      viewmatch: [],
      summary: [],
      singlematch: action.payload
    });
  });

  it("should return state object with match array equal to the payload in the action when the action type is GET_SCORECARD(when the state is not initial state)", () => {
    const initialState = {
      singlematch: []
    };

    const action = {
      type: GET_SCORECARD,
      payload: []
    };
    const returnedState = matchReducers(initialState, action);
    expect(returnedState).toEqual({
      singlematch: initialState.singlematch
    });
  });

  it("should return state object with match array equal to the payload in the action when the action type is MATCH_SUMMARY(when the state is initial state)", () => {
    let action = {
      type: MATCH_SUMMARY,
      payload: []
    };
    const returnedState = matchReducers(undefined, action);
    expect(returnedState).toEqual({
      current_match: {
        country: [{}, {}],
        date: [{}, {}],
        fours: [{}],
        player1: [{}, {}],
        player1_bowler: [{}, {}],
        player2: [{}, {}],
        player2_bowler: [{}, {}],
        result: [{}],
        runs: [{}],
        toss: [{}, {}],
        umpire: [{}, {}],
        venue: [{}]
      },
      match: [],
      manhattan: [],
      viewmatch: [],
      summary: action.payload,
      singlematch: []
    });
  });

  it("should return state object with match array equal to the payload in the action when the action type is MATCH_SUMMARY(when the state is not initial state)", () => {
    const initialState = {
      summary: []
    };

    const action = {
      type: MATCH_SUMMARY,
      payload: []
    };
    const returnedState = matchReducers(initialState, action);
    expect(returnedState).toEqual({
      summary: initialState.summary
    });
  });

  it("should return state object with match array equal to the payload in the action when the action type is MANHATTAN_GRAPH_MATCH(when the state is initial state)", () => {
    let action = {
      type: MANHATTAN_GRAPH_MATCH,
      payload: []
    };
    const returnedState = matchReducers(undefined, action);
    expect(returnedState).toEqual({
      current_match: {
        country: [{}, {}],
        date: [{}, {}],
        fours: [{}],
        player1: [{}, {}],
        player1_bowler: [{}, {}],
        player2: [{}, {}],
        player2_bowler: [{}, {}],
        result: [{}],
        runs: [{}],
        toss: [{}, {}],
        umpire: [{}, {}],
        venue: [{}]
      },
      match: [],
      manhattan: action.payload,
      viewmatch: [],
      summary: [],
      singlematch: []
    });
  });

  it("should return state object with match array equal to the payload in the action when the action type is MANHATTAN_GRAPH_MATCH(when the state is not initial state)", () => {
    const initialState = {
      manhattan: []
    };

    const action = {
      type: MANHATTAN_GRAPH_MATCH,
      payload: []
    };
    const returnedState = matchReducers(initialState, action);
    expect(returnedState).toEqual({
      manhattan: initialState.manhattan
    });
  });
});
