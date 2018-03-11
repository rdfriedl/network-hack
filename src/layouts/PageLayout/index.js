import React from "react";

import Header from "./Header/index";
import ErrorBoundary from "../../components/ErrorBoundary";

const PageLayout = ({ children }) => (
	<ErrorBoundary>
		<Header />
		{children}
	</ErrorBoundary>
);

export default PageLayout;
