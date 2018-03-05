import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Redbox from "redbox-react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { AppContainer } from "react-hot-loader";
import { ApolloProvider } from "react-apollo";

import App from "./views/index";
import "./styles/main.scss";

import client from "./client";
import store from "./store";
import { loadToken } from "./store/auth/actions";

store.dispatch(loadToken());

// Render Setup
const MOUNT_NODE = document.getElementById("root");

const CustomErrorReporter = ({ error }) => <Redbox error={error} />;
CustomErrorReporter.propTypes = {
	error: PropTypes.instanceOf(Error).isRequired
};

let render = Component => {
	ReactDOM.render(
		<AppContainer errorReporter={CustomErrorReporter}>
			<ApolloProvider client={client}>
				<Provider store={store}>
					<BrowserRouter>
						<Component />
					</BrowserRouter>
				</Provider>
			</ApolloProvider>
		</AppContainer>,
		MOUNT_NODE
	);
};

// Development Tools
if (__DEV__) {
	if (module.hot) {
		// Setup hot module replacement
		module.hot.accept("./views/index", () => {
			render(App);
		});
	}
}

// Let's Go!
if (!__TEST__) render(App);
