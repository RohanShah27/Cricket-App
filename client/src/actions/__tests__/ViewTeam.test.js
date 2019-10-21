import * as actions from "../teamActions";
import {
  SEARCH_TEAM_FOR_VIEW_TEAM_PAGE,
  GET_TEAM_BY_ID,
  GET_TOURNAMENT,
  GET_TEAM_STATS,
  GET_PLAYER_STATS_FOR_TEAMS,
  GET_PLAYER_STATS_FOR_TEAMS_BOWLER,
  TEAM_STATS_GRAPH_ODI,
  TEAM_STATS_GRAPH_TEST,
  TEAM_STATS_GRAPH_T20
} from "../Types";
import moxios from "moxios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Testing viewTeam Actions using API's", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test("should return team data with respect to team id", () => {
    const responseOfApi = [{}, {}, {}];
    let id = "21";
    moxios.stubRequest("http://localhost:5000/api/team/teambyid", {
      status: 200,
      response: { data: responseOfApi }
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: GET_TEAM_BY_ID,
        payload: responseOfApi
      }
    ];
    return store.dispatch(actions.getTeamById(id)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });
});

test("should return team data with respect to search term", () => {
  const responseOfApi = [
    { team_background: null, team_id: 13, team_image: "in", team_name: "India" }
  ];
  let team = {
    team_name: "India"
  };
  moxios.stubRequest("http://localhost:5000/api/team/teamsearch", {
    status: 200,
    response: { data: responseOfApi }
  });
  const store = mockStore({});
  const expectedResponse = [
    {
      type: SEARCH_TEAM_FOR_VIEW_TEAM_PAGE,
      payload: responseOfApi
    }
  ];
  console.log(expectedResponse.payload);
  return store.dispatch(actions.searchTeamForViewTeamPage(team)).then(() => {
    expect(store.getActions()).toEqual(expectedResponse);
  });
});

test("should return team data with respect to tournament", () => {
  const responseOfApi = [];
  let tournament = {
    tournament: "ODI"
  };
  moxios.stubRequest("http://localhost:5000/api/team/tournament", {
    status: 200,
    response: { data: responseOfApi }
  });
  const store = mockStore({});
  const expectedResponse = [
    {
      type: GET_TOURNAMENT,
      payload: responseOfApi
    }
  ];
  return store.dispatch(actions.getTournament(tournament)).then(() => {
    expect(store.getActions()).toEqual(expectedResponse);
  });
});

test("should return team stats with respect to team_id", () => {
  const responseOfApi = [{}];
  let team_id = 21;
  moxios.stubRequest("http://localhost:5000/api/team/matchtype/" + team_id, {
    status: 200,
    response: { data: responseOfApi }
  });
  const store = mockStore({});
  const expectedResponse = [
    {
      type: GET_TEAM_STATS,
      payload: responseOfApi
    }
  ];
  return store.dispatch(actions.getTeamStats()).then(() => {
    expect(store.getActions()).toEqual(expectedResponse);
  });
});

test("should return player stats with respect to team_id and match_type", () => {
  const responseOfApi = [];
  let team_id = 21;
  let match_type = {
    match_type: "ODI"
  };
  moxios.stubRequest(
    "http://localhost:5000/api/team/playerstatsforteams/" + team_id,
    {
      status: 200,
      response: { data: responseOfApi }
    }
  );
  const store = mockStore({});
  const expectedResponse = [
    {
      type: GET_PLAYER_STATS_FOR_TEAMS,
      payload: responseOfApi
    }
  ];
  return store.dispatch(actions.getPlayerStatsForTeams(match_type)).then(() => {
    expect(store.getActions()).toEqual(expectedResponse);
  });
});

test("should return bowler stats with respect to team_id and match_type", () => {
  const responseOfApi = [];
  let team_id = {
    team_id: 21
  };
  let match_type = {
    match_type: "ODI"
  };
  moxios.stubRequest(
    "http://localhost:5000/api/team/playerstatsforteamsbowler/" + team_id,
    {
      status: 200,
      response: { data: responseOfApi }
    }
  );
  const store = mockStore({});
  const expectedResponse = [
    {
      type: GET_PLAYER_STATS_FOR_TEAMS_BOWLER,
      payload: responseOfApi
    }
  ];
  return store
    .dispatch(actions.getPlayerStatsForTeamsBowler(match_type))
    .then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
});

test("should return team stats visualization with respect to team_id in odi", () => {
  const responseOfApi = [];
  let team_id = 21;
  moxios.stubRequest("http://127.0.0.1:5000/odistats/" + team_id, {
    status: 200,
    response: { data: responseOfApi }
  });
  const store = mockStore({});
  const expectedResponse = [
    {
      type: TEAM_STATS_GRAPH_ODI,
      payload: responseOfApi
    }
  ];
  return store.dispatch(actions.teamStatsGraphOdi()).then(() => {
    expect(store.getActions()).toEqual(expectedResponse);
  });
});

test("should return team stats visualization with respect to team_id in test", () => {
  const responseOfApi = [];
  let team_id = 21;
  moxios.stubRequest("http://127.0.0.1:5000/teststats/" + team_id, {
    status: 200,
    response: { data: responseOfApi }
  });
  const store = mockStore({});
  const expectedResponse = [
    {
      type: TEAM_STATS_GRAPH_TEST,
      payload: responseOfApi
    }
  ];
  return store.dispatch(actions.teamStatsGraphTest()).then(() => {
    expect(store.getActions()).toEqual(expectedResponse);
  });
});

test("should return team stats visualization with respect to team_id in t20", () => {
  const responseOfApi = [];
  let team_id = 21;
  moxios.stubRequest("http://127.0.0.1:5000/t20stats/" + team_id, {
    status: 200,
    response: { data: responseOfApi }
  });
  const store = mockStore({});
  const expectedResponse = [
    {
      type: TEAM_STATS_GRAPH_T20,
      payload: responseOfApi
    }
  ];
  return store.dispatch(actions.teamStatsGraphT20()).then(() => {
    expect(store.getActions()).toEqual(expectedResponse);
  });
});
