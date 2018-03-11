import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import LoginView from "./login";
import SignupView from "./signup";
import GameLayout from "../layouts/GameLayout";
import SettingsView from "./settings";

const RootView = () => <h1>home</h1>;

export default () => (
	<GameLayout>
		<Switch>
			<Route exact path="/" component={RootView} />
			<Route path="/login" component={LoginView} />
			<Route path="/signup" component={SignupView} />
			<Route path="/settings" component={SettingsView} />
			<Redirect to="/" />
		</Switch>
	</GameLayout>
);
