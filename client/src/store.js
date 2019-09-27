import { createStore, applyMiddleware, compose } from "redux";

import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};
//think will give all redducer actions to the middleware object
const middleware = [thunk];
// will give access to the extension
//   //We do this to check if chrome has the redux extension or not if not then it installs the devtoolextension in chrome
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;
const enhancer = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(rootReducer, initialState, enhancer);
export default store;
