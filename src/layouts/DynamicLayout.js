import React from "react";
import { connect } from "react-redux";

import PageLayout from "./PageLayout";
import GameLayout from "./GameLayout";

const DynamicLayout = ({ isLoggedIn, children, ...props }) =>
	isLoggedIn ? <GameLayout {...props}>{children}</GameLayout> : <PageLayout {...props}>{children}</PageLayout>;

export function mapStateToProps({ auth }) {
	return {
		isLoggedIn: !!auth.userId
	};
}

export default connect(mapStateToProps)(DynamicLayout);
