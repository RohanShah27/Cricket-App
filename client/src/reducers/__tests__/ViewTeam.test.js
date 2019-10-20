import teamReducer from "../teamReducer";
import {
  SEARCH_TEAM_FOR_VIEW_TEAM_PAGE,
  GET_TEAM_BY_ID,
  GET_TOURNAMENT,
  GET_MATCHES_BY_TEAM_AND_TYPE,
  GET_TEAM_STATS,
  GET_PLAYER_STATS_FOR_TEAMS,
  GET_PLAYER_STATS_FOR_TEAMS_BOWLER,
  TEAM_STATS_GRAPH_ODI,
  TEAM_STATS_GRAPH_TEST,
  TEAM_STATS_GRAPH_T20
} from "../../actions/Types";

describe("Testing  ViewTeam Reducers", () => {
  it("should return state object with match array equal to the payload in the action when the action type is GET_TOURNAMENT(when the state is initial state)", () => {
    let action = {
      type: GET_TOURNAMENT,
      payload: []
    };
    const returnedState = teamReducer(undefined, action);
    expect(returnedState).toEqual({
      tournamentTeam: action.payload,
      teamstats: action.payload,
      playerstatsforteams: action.payload,
      playerstatsforteamsbowler: action.payload,
      t20_graph: action.payload,
      test_graph: action.payload,
      odi_graph: action.payload,
      teamsearch: action.payload
    });
  });

  it("should return state object with match array equal to the payload in the action when the action type is GET_TOURNAMENT(when the state is not initial state)", () => {
    const initialState = {
      tournamentTeam: []
    };

    const action = {
      type: GET_TOURNAMENT,
      payload: []
    };
    const returnedState = teamReducer(initialState, action);
    expect(returnedState).toEqual({
      tournamentTeam: initialState.tournamentTeam
    });
  });
});

describe("Testing  ViewTeam Reducers", () => {
  it("should return state object with match array equal to the payload in the action when the action type is GET_TEAM_BY_ID(when the state is initial state)", () => {
    let action = {
      type: GET_TEAM_BY_ID,
      payload: []
    };
    const returnedState = teamReducer(undefined, action);
    expect(returnedState).toEqual({
      tournamentTeam: action.payload,
      teamstats: action.payload,
      playerstatsforteams: action.payload,
      playerstatsforteamsbowler: action.payload,
      t20_graph: action.payload,
      test_graph: action.payload,
      odi_graph: action.payload,
      teamsearch: action.payload
    });
  });

  it("should return state object with match array equal to the payload in the action when the action type is GET_TOURNAMENT(when the state is not initial state)", () => {
    const initialState = {
      tournamentTeam: [{}]
    };

    const action = {
      type: GET_TEAM_BY_ID,
      payload: [{}]
    };
    const returnedState = teamReducer(initialState, action);
    expect(returnedState).toEqual({
      tournamentTeam: initialState.tournamentTeam
    });
  });
});

describe("Testing  ViewTeam Reducers", () => {
  it("should return state object with match array equal to the payload in the action when the action type is SEARCH_TEAM_FOR_VIEW_TEAM_PAGE(when the state is initial state)", () => {
    let action = {
      type: SEARCH_TEAM_FOR_VIEW_TEAM_PAGE,
      payload: []
    };
    const returnedState = teamReducer(undefined, action);
    expect(returnedState).toEqual({
      tournamentTeam: action.payload,
      teamstats: action.payload,
      playerstatsforteams: action.payload,
      playerstatsforteamsbowler: action.payload,
      t20_graph: action.payload,
      test_graph: action.payload,
      odi_graph: action.payload,
      teamsearch: action.payload
    });
  });

  it("should return state object with match array equal to the payload in the action when the action type is SEARCH_TEAM_FOR_VIEW_TEAM_PAGE(when the state is not initial state)", () => {
    const initialState = {
      teamsearch: [{}]
    };

    const action = {
      type: SEARCH_TEAM_FOR_VIEW_TEAM_PAGE,
      payload: [{}]
    };
    const returnedState = teamReducer(initialState, action);
    expect(returnedState).toEqual({
      teamsearch: initialState.teamsearch
    });
  });
});

describe("Testing  ViewTeam Reducers", () => {
  it("should return state object with match array equal to the payload in the action when the action type is GET_TEAM_STATS(when the state is initial state)", () => {
    let action = {
      type: GET_TEAM_STATS,
      payload: []
    };
    const returnedState = teamReducer(undefined, action);
    expect(returnedState).toEqual({
      tournamentTeam: action.payload,
      teamstats: action.payload,
      playerstatsforteams: action.payload,
      playerstatsforteamsbowler: action.payload,
      t20_graph: action.payload,
      test_graph: action.payload,
      odi_graph: action.payload,
      teamsearch: action.payload
    });
  });

  it("should return state object with match array equal to the payload in the action when the action type is GET_TEAM_STATS(when the state is not initial state)", () => {
    const initialState = {
      teamstats: [{}]
    };

    const action = {
      type: GET_TEAM_STATS,
      payload: [{}]
    };
    const returnedState = teamReducer(initialState, action);
    expect(returnedState).toEqual({
      teamstats: initialState.teamstats
    });
  });
});

describe("Testing  ViewTeam Reducers", () => {
  it("should return state object with match array equal to the payload in the action when the action type is GET_PLAYER_STATS_FOR_TEAMS(when the state is initial state)", () => {
    let action = {
      type: GET_PLAYER_STATS_FOR_TEAMS,
      payload: []
    };
    const returnedState = teamReducer(undefined, action);
    expect(returnedState).toEqual({
      tournamentTeam: action.payload,
      teamstats: action.payload,
      playerstatsforteams: action.payload,
      playerstatsforteamsbowler: action.payload,
      t20_graph: action.payload,
      test_graph: action.payload,
      odi_graph: action.payload,
      teamsearch: action.payload
    });
  });

  it("should return state object with match array equal to the payload in the action when the action type is GET_PLAYER_STATS_FOR_TEAMS(when the state is not initial state)", () => {
    const initialState = {
      playerstatsforteams: [{}]
    };

    const action = {
      type: GET_PLAYER_STATS_FOR_TEAMS,
      payload: [{}]
    };
    const returnedState = teamReducer(initialState, action);
    expect(returnedState).toEqual({
      playerstatsforteams: initialState.playerstatsforteams
    });
  });
});

describe("Testing  ViewTeam Reducers", () => {
  it("should return state object with match array equal to the payload in the action when the action type is GET_PLAYER_STATS_FOR_TEAMS_BOWLER(when the state is initial state)", () => {
    let action = {
      type: GET_PLAYER_STATS_FOR_TEAMS_BOWLER,
      payload: []
    };
    const returnedState = teamReducer(undefined, action);
    expect(returnedState).toEqual({
      odi_graph: action.payload,
      tournamentTeam: action.payload,
      teamstats: action.payload,
      t20_graph: action.payload,
      test_graph: action.payload,
      playerstatsforteams: action.payload,
      playerstatsforteamsbowler: action.payload,
      teamsearch: action.payload
    });
  });

  it("should return state object with match array equal to the payload in the action when the action type is GET_TEAM_STATS(when the state is not initial state)", () => {
    const initialState = {
      playerstatsforteamsbowler: [{}]
    };

    const action = {
      type: GET_PLAYER_STATS_FOR_TEAMS_BOWLER,
      payload: [{}]
    };
    const returnedState = teamReducer(initialState, action);
    expect(returnedState).toEqual({
      playerstatsforteamsbowler: initialState.playerstatsforteamsbowler
    });
  });

  it("should return state object with match array equal to the payload in the action when the action type is GET_MATCHES_BY_TEAM_AND_TYPE(when the state is initial state)", () => {
    let action = {
      type: GET_MATCHES_BY_TEAM_AND_TYPE,
      payload: []
    };
    const returnedState = teamReducer(undefined, action);
    expect(returnedState).toEqual({
      tournamentTeam: action.payload,
      teamstats: action.payload,
      playerstatsforteams: action.payload,
      playerstatsforteamsbowler: action.payload,
      t20_graph: action.payload,
      test_graph: action.payload,
      odi_graph: action.payload,
      teamsearch: action.payload
    });
  });

  it("should return state object with match array equal to the payload in the action when the action type is GET_MATCHES_BY_TEAM_AND_TYPE(when the state is not initial state)", () => {
    const initialState = {
      tournamentTeam: []
    };

    const action = {
      type: GET_MATCHES_BY_TEAM_AND_TYPE,
      payload: []
    };
    const returnedState = teamReducer(initialState, action);
    expect(returnedState).toEqual({
      tournamentTeam: initialState.tournamentTeam
    });
  });

  it("should return state object with match array equal to the payload in the action when the action type is TEAM_STATS_GRAPH_TEST(when the state is initial state)", () => {
    let action = {
      type: TEAM_STATS_GRAPH_TEST,
      payload: []
    };
    const returnedState = teamReducer(undefined, action);
    expect(returnedState).toEqual({
      tournamentTeam: action.payload,
      teamstats: action.payload,
      playerstatsforteams: action.payload,
      playerstatsforteamsbowler: action.payload,
      t20_graph: action.payload,
      test_graph: action.payload,
      odi_graph: action.payload,
      teamsearch: action.payload
    });
  });

  it("should return state object with match array equal to the payload in the action when the action type is GET_TOURNAMENT(when the state is not initial state)", () => {
    const initialState = {
      test_graph: []
    };

    const action = {
      type: TEAM_STATS_GRAPH_TEST,
      payload: []
    };
    const returnedState = teamReducer(initialState, action);
    expect(returnedState).toEqual({
      test_graph: initialState.test_graph
    });
  });

  it("should return state object with match array equal to the payload in the action when the action type is TEAM_STATS_GRAPH_ODI(when the state is initial state)", () => {
    let action = {
      type: TEAM_STATS_GRAPH_ODI,
      payload: []
    };
    const returnedState = teamReducer(undefined, action);
    expect(returnedState).toEqual({
      tournamentTeam: action.payload,
      teamstats: action.payload,
      playerstatsforteams: action.payload,
      playerstatsforteamsbowler: action.payload,
      t20_graph: action.payload,
      test_graph: action.payload,
      odi_graph: action.payload,
      teamsearch: action.payload
    });
  });

  it("should return state object with match array equal to the payload in the action when the action type is GET_TOURNAMENT(when the state is not initial state)", () => {
    const initialState = {
      odi_graph: []
    };

    const action = {
      type: TEAM_STATS_GRAPH_ODI,
      payload: []
    };
    const returnedState = teamReducer(initialState, action);
    expect(returnedState).toEqual({
      odi_graph: initialState.odi_graph
    });
  });

  it("should return state object with match array equal to the payload in the action when the action type is TEAM_STATS_GRAPH_T20(when the state is initial state)", () => {
    let action = {
      type: TEAM_STATS_GRAPH_T20,
      payload: []
    };
    const returnedState = teamReducer(undefined, action);
    expect(returnedState).toEqual({
      tournamentTeam: action.payload,
      teamstats: action.payload,
      playerstatsforteams: action.payload,
      playerstatsforteamsbowler: action.payload,
      t20_graph: action.payload,
      test_graph: action.payload,
      odi_graph: action.payload,
      teamsearch: action.payload
    });
  });

  it("should return state object with match array equal to the payload in the action when the action type is GET_TOURNAMENT(when the state is not initial state)", () => {
    const initialState = {
      t20_graph: []
    };

    const action = {
      type: TEAM_STATS_GRAPH_T20,
      payload: []
    };
    const returnedState = teamReducer(initialState, action);
    expect(returnedState).toEqual({
      t20_graph: initialState.t20_graph
    });
  });
});
