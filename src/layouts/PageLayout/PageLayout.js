import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Header from "../../components/Header/index";

const PageLayout = ({ children }) => (
	<Fragment>
		<Header />
		{children}
	</Fragment>
);

PageLayout.propTypes = {};
PageLayout.defaultProps = {};

export default PageLayout;
