import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Header from "../../components/Header/index";
import ErrorBoundary from "../../components/ErrorBoundary";

const PageLayout = ({ children }) => (
	<ErrorBoundary>
		<Header />
		{children}
	</ErrorBoundary>
);

PageLayout.propTypes = {};
PageLayout.defaultProps = {};

export default PageLayout;
