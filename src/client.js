import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { setContext } from "apollo-link-context";
import { ReduxCache } from "apollo-cache-redux";

import store from "./store";
import { logout } from "./store/auth/actions";

const setAuthorizationLink = setContext((request, previousContext) => {
	const token = store.getState().auth.token;

	return {
		headers: {
			Authorization: token ? `Bearer ${token}` : ""
		}
	};
});
const resetToken = onError(({ networkError }) => {
	if (networkError && networkError.statusCode === 401) {
		// remove cached token on 401 from the server
		store.dispatch(logout());
	}
});
const authLink = setAuthorizationLink.concat(resetToken);

const logErrors = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		graphQLErrors.map(({ message, path }) => {
			console.error(`[GraphQL error]: Message: ${message}, Path: ${path}`);
		});
	}

	if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = createHttpLink({
	uri: process.env.API_URL
});

const cache = new ReduxCache({ store });

const client = new ApolloClient({
	link: ApolloLink.from([authLink, httpLink]),
	cache
});

export default client;
