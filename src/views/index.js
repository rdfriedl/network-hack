import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";

import PageLayout from "../layouts/PageLayout/PageLayout";
import LoginView from "./login";
import SignupView from "./signup";

const RootView = () => <h1>home</h1>;

RootView.propTypes = {};
RootView.defaultProps = {};

export default () => (
	<PageLayout>
		<Switch>
			<Route exact path="/" component={RootView} />
			<Route path="/login" component={LoginView} />
			<Route path="/signup" component={SignupView} />
			<Redirect to="/" />
		</Switch>
	</PageLayout>
);
