import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { compose, withApollo } from "react-apollo";
import { connect } from "react-redux";
import { Menu } from "semantic-ui-react";

import { version } from "../../../package";
import UserDropdown from "./UserDropdown";
import ErrorBoundary from "../ErrorBoundary";

const Header = ({ location, history, isLoggedIn }) => (
	<Menu>
		<Menu.Item header onClick={() => history.push("/")}>
			Network Hack v{version}
		</Menu.Item>

		<Menu.Menu position="right">
			{!isLoggedIn ? (
				<Fragment>
					<Menu.Item name="signup" active={location.pathname === "/signup"} onClick={() => history.push("/signup")}>
						Sign Up
					</Menu.Item>
					<Menu.Item name="login" active={location.pathname === "/login"} onClick={() => history.push("/login")}>
						Login
					</Menu.Item>
				</Fragment>
			) : (
				<ErrorBoundary>
					<UserDropdown />
				</ErrorBoundary>
			)}
		</Menu.Menu>
	</Menu>
);

export function mapStateToProps({ auth }) {
	return {
		isLoggedIn: !!auth.token
	};
}

export default compose(withRouter, withApollo, connect(mapStateToProps))(Header);
