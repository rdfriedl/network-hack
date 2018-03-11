import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";

import { Container, Header, Segment, Menu } from "semantic-ui-react";
import ProfileSettingsView from "./ProfileSettings";
import GameSettingsView from "./GameSettings";

const SettingsView = ({ match, location, history }) => (
	<Container>
		<Header as="h2">
			Settings
			<Header.Subheader>Manage your settings and set email preferences</Header.Subheader>
		</Header>
		<Menu pointing secondary>
			<Menu.Item
				name="Profile"
				active={location.pathname === match.url + "/profile" || location.pathname === match.url}
				onClick={() => history.push(match.url + "/profile")}
			/>
			<Menu.Item
				name="Game"
				active={location.pathname === match.url + "/game"}
				onClick={() => history.push(match.url + "/game")}
			/>
		</Menu>

		<Switch>
			<Route exact path={match.url} component={ProfileSettingsView} />
			<Route path={match.url + "/profile"} component={ProfileSettingsView} />
			<Route path={match.url + "/game"} component={GameSettingsView} />
		</Switch>
	</Container>
);

export default SettingsView;
