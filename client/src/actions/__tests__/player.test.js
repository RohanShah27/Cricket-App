import * as actions from "../Players";
import { GET_PLAYERS } from "../Types";
import moxios from "moxios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Testing contacts actions", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it("should create an action with type GET_PLAYERS and the payload sgould be same as the API response when the response is 20*", () => {
    const responseofAPI = [{}, {}, {}];
    moxios.stubRequest("http://localhost:5000/api/player/all", {
      status: 200,
      response: { data: responseofAPI }
    });

    const store = mockStore({});
    const expectedActions = [
      {
        type: GET_PLAYERS,
        payload: responseofAPI
      }
    ];
    console.log(responseofAPI);
    return store.dispatch(actions.getPlayers()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("should go into catch with type GET_PLAYERS and the payload should be same as the API response when the response is 40*", () => {
    const responseofAPI = [];
    moxios.stubRequest("http://localhost:5000/api/player/all", {
      status: 400,
      response: { data: responseofAPI }
    });

    const store = mockStore({});
    const expectedActions = [];
    return store.dispatch(actions.getPlayers()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

it("should return Response successful", () => {
  const responseofAPI = [];
  let types = {
    player_name: "Iyer",
    gender: "male",
    DOB: "12/12/1993",
    Nationality: "Indian",
    player_role: "Batsman",
    Batting_Style: "Right Handed",
    Bowling_Style: "Spinner"
  };
  moxios.stubRequest("http://localhost:5000/api/player/new", {
    status: 200,
    response: { data: responseofAPI }
  });
  const store = mockStore({});
  const expectedResponse = [{ payload: "player already exists", type: "ERROR_TYPE" }];
  return store.dispatch(actions.createPlayers(types)).then(() => {
    expect(store.getActions()).toEqual(expectedResponse);
  });
});

it("should Add a player unsuccessfully", () => {
  const responseofAPI = [];
  let types = {
    player_name: "Rohit Sharma",
    gender: "male",
    DOB: "12/12/1993",
    Nationality: "Ind",
    player_Type: "Batsman",
    Batting_Style: "Right Handed",
    Bowling_Style: "Spinner"
  };
  moxios.stubRequest("http://localhost:5000/api/player/new", {
    status: 500,
    response: { data: responseofAPI }
  });
  const store = mockStore({});
  const expectedResponse = [{ payload: "player already exists", type: "ERROR_TYPE" }];
  return store
    .dispatch(actions.createPlayers(types))
    .then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    })
    .catch(e => {
      console.log(e);
    });
});

it("should Add a player unsuccessfully", () => {
  const responseofAPI = [];
  let types = {
    player_name: "Rohit Sharma",
    gender: "male",
    DOB: "12/12/193",
    Nationality: "Indian",
    player_Type: "Batsman",
    Batting_Style: "Right Handed",
    Bowling_Style: "Spinner"
  };
  moxios.stubRequest("http://localhost:5000/api/player/new", {
    status: 500,
    response: { data: responseofAPI }
  });
  const store = mockStore({});
  const expectedResponse = [{ payload: "player already exists", type: "ERROR_TYPE" }];
  return store.dispatch(actions.createPlayers(types)).then(() => {
    expect(store.getActions()).toEqual(expectedResponse);
  });
});

it("should Add a player unsuccessfully", () => {
  const responseofAPI = [];
  let types = {
    player_name: "Rohit Sharma",
    gender: "",
    DOB: "12/12/1993",
    Nationality: "Indian",
    player_Type: "Batsman",

    Batting_Style: "Right Handed",
    Bowling_Style: "Spinner"
  };
  moxios.stubRequest("http://localhost:5000/api/player/new", {
    status: 500,
    response: { data: responseofAPI }
  });
  const store = mockStore({});
  const expectedResponse = [{ payload: "player already exists", type: "ERROR_TYPE" }];
  return store.dispatch(actions.createPlayers(types)).then(() => {
    expect(store.getActions()).toEqual(expectedResponse);
  });
});

it("should Add a player unsuccessfully", () => {
  const responseofAPI = [];
  let types = {
    player_name: "Rohit Sharma",
    gender: "Male",
    DOB: "12/12/1993",
    Nationality: "Indian",
    player_Type: "",

    Batting_Style: "Right Handed",
    Bowling_Style: "Spinner"
  };
  moxios.stubRequest("http://localhost:5000/api/player/new", {
    status: 500,
    response: { data: responseofAPI }
  });
  const store = mockStore({});
  const expectedResponse = [{ payload: "player already exists", type: "ERROR_TYPE" }];
  return store.dispatch(actions.createPlayers(types)).then(() => {
    expect(store.getActions()).toEqual(expectedResponse);
  });
});

it("should Add a player unsuccessfully", () => {
  const responseofAPI = [];
  let types = {
    player_name: "Rohit Sharma",
    gender: "Male",
    DOB: "12/12/1993",
    Nationality: "Indian",
    player_Type: "Batsman",

    Batting_Style: "d",
    Bowling_Style: "Spinner"
  };
  moxios.stubRequest("http://localhost:5000/api/player/new", {
    status: 500,
    response: { data: responseofAPI }
  });
  const store = mockStore({});
  const expectedResponse = [{ payload: "player already exists", type: "ERROR_TYPE" }];
  return store.dispatch(actions.createPlayers(types)).then(() => {
    expect(store.getActions()).toEqual(expectedResponse);
  });
});

it("should Add a player unsuccessfully", () => {
  const responseofAPI = [];
  let types = {
    player_name: "Rohit Sharma",
    gender: "Male",
    DOB: "12/12/1993",
    Nationality: "Indian",
    player_Type: "Batsman",

    Batting_Style: "Right Handed",
    Bowling_Style: "S"
  };
  moxios.stubRequest("http://localhost:5000/api/player/new", {
    status: 500,
    response: { data: responseofAPI }
  });
  const store = mockStore({});
  const expectedResponse = [{ data: "Field Empty", payload: "player already exists", type: "ERROR_TYPE" }
  ];
  return store.dispatch(actions.createPlayers(types)).then(() => {
    expect(store.getActions()).toEqual(expectedResponse);
  });
});
