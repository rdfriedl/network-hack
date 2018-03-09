import { combineReducers } from "redux";
import { apolloReducer } from "apollo-cache-redux";
import auth from "./auth";

export const injectReducer = (store, { key, reducer }) => {
	if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

	store.asyncReducers[key] = reducer;
	store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export const makeRootReducer = asyncReducers => {
	return combineReducers({
		...asyncReducers,
		auth,
		apollo: apolloReducer
	});
};

export default makeRootReducer;
