import { applyMiddleware, compose, createStore as createReduxStore } from "redux";
import thunk from "redux-thunk";
import makeRootReducer from "./reducers";

// Middleware Configuration
const middleware = [thunk];

// Store Enhancers
const enhancers = [];
let composeEnhancers = compose;

if (IS_DEV) {
	if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === "function") {
		composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
	}
}

// Store Instantiation and HMR Setup
const store = createReduxStore(
	makeRootReducer(),
	window.__INITIAL_STATE__ || {},
	composeEnhancers(applyMiddleware(...middleware), ...enhancers)
);
store.asyncReducers = {};

if (module.hot) {
	module.hot.accept("./reducers", () => {
		const reducers = require("./reducers").default;
		store.replaceReducer(reducers(store.asyncReducers));
	});
}

export default store;
