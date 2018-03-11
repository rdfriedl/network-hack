import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { compose, withApollo } from "react-apollo";
import { connect } from "react-redux";
import { Menu, Icon, Header } from "semantic-ui-react";

import { version } from "../../../package";
import { logout } from "../../store/auth/actions";

const LeftNav = ({ location, history, isLoggedIn, dispatchLogout }) => (
	<Menu secondary vertical fluid style={{ height: "100vh" }}>
		<Menu.Header>
			<Header>
				Network Hack
				<Header.Subheader>{version}</Header.Subheader>
			</Header>
		</Menu.Header>
		{isLoggedIn ? (
			<Fragment>
				<Menu.Item
					name="settings"
					onClick={() => history.push("/settings")}
					active={/^\/settings/.test(location.pathname)}
				>
					<Icon name="cogs" />
					Settings
				</Menu.Item>
				<Menu.Item
					name="profile"
					onClick={() => history.push("/profile")}
					active={/^\/profile/.test(location.pathname)}
				>
					<Icon name="user" />
					Profile
				</Menu.Item>
				<Menu.Item name="logout" onClick={dispatchLogout}>
					<Icon name="sign out" />
					Logout
				</Menu.Item>
			</Fragment>
		) : (
			<Fragment>
				<Menu.Item name="signup" onClick={() => history.push("/signup")} active={/^\/signup/.test(location.pathname)}>
					<Icon name="user plus" />
					Signup
				</Menu.Item>
				<Menu.Item name="logout" onClick={() => history.push("/login")} active={/^\/login/.test(location.pathname)}>
					<Icon name="sign in" />
					Login
				</Menu.Item>
			</Fragment>
		)}
	</Menu>
);

export function mapStateToProps({ auth }) {
	return {
		isLoggedIn: !!auth.token
	};
}
export function mapDispatchToProps(dispatch) {
	return {
		dispatchLogout: () => dispatch(logout())
	};
}

export default compose(withRouter, withApollo, connect(mapStateToProps, mapDispatchToProps))(LeftNav);
