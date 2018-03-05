import React from "react";
import { Link } from "react-router-dom";
import { compose, withApollo } from "react-apollo";
import { connect } from "react-redux";
import { version } from "../../../package";

import UserDropdown from "./UserDropdown";

const Header = ({ isLoggedIn }) => (
	<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
		<div className="container-fluid">
			<Link className="navbar-brand" to="/">
				<i className="fa fa-cube" />
				Network Hack v{version}
			</Link>
			<button
				className="navbar-toggler"
				data-toggle="collapse"
				data-target="#navbarNav"
				aria-controls="navbarNav"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon" />
			</button>
			<div className="collapse navbar-collapse" id="navbarNav">
				<div className="navbar-nav mr-auto" />
				{isLoggedIn ? (
					<UserDropdown />
				) : (
					<ul className="nav navbar-nav navbar-right">
						<li className="nav-item">
							<Link className="nav-link" to="/login">
								Login
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/signup">
								Create Account
							</Link>
						</li>
					</ul>
				)}
			</div>
		</div>
	</nav>
);

export function mapStateToProps({ auth }) {
	return {
		isLoggedIn: !!auth.token,
		currentUser: auth.user
	};
}

export default compose(withApollo, connect(mapStateToProps))(Header);
