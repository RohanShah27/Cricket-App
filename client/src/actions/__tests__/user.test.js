import * as actions from "../User";
import { GET_USERS, SEND_OTP } from "../Types";
import moxios from "moxios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Testing users actions", () => {
  // let data;
  beforeEach(() => {
    // data = { email: 'ykb238@gmail.com', password: '123456' }
    moxios.install();
  });
  afterEach(() => {
    // data = { email: 'ykb238@gmail.com', password: '123456' }
    moxios.uninstall();
  });

  it("should return log in successful", () => {
    const responseofAPI = [];
    let types = {
      email: "ykb238@gmail.com",
      password: "123456"
    };
    moxios.stubRequest("http://localhost:5000/api/user/login", {
      status: 200,
      response: { data: responseofAPI }
    });
    const store = mockStore({});
    const expectedResponse = [];
    return store.dispatch(actions.login(types)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });
  it("should return password reset successfully", () => {
    const responseofAPI = [];
    let types = {
      email: "ykb238@gmail.com",
      password: "123456"
    };
    moxios.stubRequest("http://localhost:5000/api/user/resetpassword", {
      status: 200,
      response: { data: responseofAPI }
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: "RESET_PASSWORD"
      }
    ];
    return store.dispatch(actions.resetPassword(types)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  it("should return password reset failed", () => {
    const responseofAPI = [];
    let types = {
      email: "ykb238@gmail.com",
      password: "123456"
    };
    moxios.stubRequest("http://localhost:5000/api/users/resetpassword", {
      status: 200,
      response: { data: responseofAPI }
    });
    const store = mockStore({});
    const expectedResponse = [];
    return store.dispatch(actions.resetPassword(types)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  it("should return added new admin successfully", () => {
    const responseofAPI = [];
    let types = {
      email: "ykb238@gmail.com"
    };
    moxios.stubRequest("http://localhost:5000/api/user/emailverify", {
      status: 200,
      response: { data: responseofAPI }
    });
    const store = mockStore({});
    const expectedResponse = [];
    store.dispatch(actions.sendPassword(types)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  it("should return added new admin successfully", () => {
    const responseofAPI = [];
    let types = {
      email: "ykb238@gmailss.com"
    };
    moxios.stubRequest("http://localhost:5000/api/users/emailverify", {
      status: 200,
      response: { data: responseofAPI }
    });
    const store = mockStore({});
    const expectedResponse = [];
    store.dispatch(actions.sendPassword(types)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  it("should return log in failed", () => {
    const responseofAPI = [];
    let types = {
      email: "ykb238@gmailiii.com",
      password: "123456"
    };
    moxios.stubRequest("http://localhost:5000/api/users/login", {
      status: 400,
      response: { data: responseofAPI }
    });
    const store = mockStore({});
    const expectedResponse = [];
    store.dispatch(actions.login(types)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  it("should return User created", () => {
    const responseofAPI = [];
    let types = {
      email: "ykb238@gmail.com"
    };
    moxios.stubRequest("http://localhost:5000/api/user/resetpassword", {
      status: 200,
      response: { data: responseofAPI }
    });
    const store = mockStore({});
    const expectedResponse = [{ type: "SEND_OTP" }];
    store.dispatch(actions.sendPassword(types)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });
  it("should return User does not exist", () => {
    const responseofAPI = [];
    let types = {
      email: "ykb238@gmaissdsdsdl.com"
    };
    moxios.stubRequest("http://localhost:5000/api/users/resetpassword", {
      status: 200,
      response: { data: responseofAPI }
    });
    const store = mockStore({});
    const expectedResponse = [];
    store.dispatch(actions.sendPassword(types)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  it("should return Team created", () => {
    const responseofAPI = [];
    let types = {
      team_name: "Banglore"
    };
    moxios.stubRequest("http://localhost:5000/api/user/newteam", {
      status: 200,
      response: { data: responseofAPI }
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: "ADD_NEW_TEAM"
      }
    ];
    store.dispatch(actions.addTeam(types)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  it("should return Team created", () => {
    const responseofAPI = [];
    let types = {
      team_name: "India"
    };
    moxios.stubRequest("http://localhost:5000/api/users/newteam", {
      status: 200,
      response: { data: responseofAPI }
    });
    const store = mockStore({});
    const expectedResponse = [];
    store.dispatch(actions.addTeam(types)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  it("should create an action with type GET_USERS and the payload sgould be same as the API response when the response is 20*", () => {
    const responseofAPI = [{}, {}, {}];
    moxios.stubRequest("http://localhost:5000/api/user/all", {
      status: 200,
      response: { data: responseofAPI }
    });

    const store = mockStore({});
    const expectedActions = [
      {
        type: GET_USERS,
        payload: responseofAPI
      }
    ];
    console.log(responseofAPI);
    store.dispatch(actions.getUsers()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });

    // const responseofAPI = [{}, {}, {}];
    // moxios.stubRequest("http://localhost:5000/api/user/all", {
    //     status: 200,
    //     response: { data: responseofAPI }
    // });

    // const store = mockStore({});
    // const expectedActions = [
    //     {
    //         type: GET_USERS,
    //         payload: responseofAPI
    //     }
    // ];
    // return store.dispatch(actions.getUsers()).then(() => {
    //     expect(store.getActions()).toEqual(expectedActions);
    // });
  });

  it("should go into catch with type ADD_PLAYER_TYPE and the payload should be same as the API response when the response is 40*", () => {
    const responseofAPI = [{}, {}, {}];
    moxios.stubRequest("http://localhost:5000/api/user/allplayer", {
      status: 400,
      response: { data: responseofAPI }
    });

    const store = mockStore({});
    const expectedActions = [{}];
    return store.dispatch(actions.getUsers()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
