import {compose, applyMiddleware, createStore} from "redux";
import {createLogger} from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import reducers from "./reducers";
import persistState from "redux-localstorage";

const middleware = applyMiddleware(promise(), thunk,  createLogger());

const enchancer = compose(
    middleware,
    persistState(undefined, {key: 'football-manager'})
);

export default createStore(reducers, enchancer);