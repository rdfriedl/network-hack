import React from "react";
import { Grid } from "semantic-ui-react";

import LeftNav from "./LeftNav";
import ErrorBoundary from "../../components/ErrorBoundary";

const GameLayout = ({ children }) => (
	<ErrorBoundary>
		<Grid columns="equal" stretched celled="internally">
			<Grid.Column style={{ flexGrow: 0, flexShrink: 0, width: "150px" }}>
				<LeftNav />
			</Grid.Column>
			<Grid.Column stretched>{children}</Grid.Column>
		</Grid>
	</ErrorBoundary>
);

export default GameLayout;
