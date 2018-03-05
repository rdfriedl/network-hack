import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";

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

const httpLink = createHttpLink({
	uri: process.env.API_URL
});
const logErrors = onError(({ graphQLErrors }) => {
	if (graphQLErrors) {
		graphQLErrors.map(({ message, path }) => {
			console.error(`[GraphQL error]: Message: ${message}, Path: ${path}`);
		});
	}
});
const client = new ApolloClient({
	link: ApolloLink.from([authLink, logErrors, httpLink]),
	cache: new InMemoryCache()
});

export default client;
