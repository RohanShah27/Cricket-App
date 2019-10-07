import * as actions from "../players";
import { ADD_PLAYERS_TYPE } from "../Types";
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
        moxios.stubRequest("http://localhost:5000/api/playertype/all", {
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
        console.log(responseofAPI)
        return store.dispatch(actions.getPlayertype()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });


    it("should go into catch with type GET_PLAYERS and the payload should be same as the API response when the response is 40*", () => {
        const responseofAPI = [];
        moxios.stubRequest("http://localhost:5000/api/playertype/all", {
            status: 400,
            response: { data: responseofAPI }
        });

        const store = mockStore({});
        const expectedActions = [];
        return store.dispatch(actions.getPlayertype()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});


