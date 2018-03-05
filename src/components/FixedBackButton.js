import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const FixedBackButton = ({ to }) => (
	<div className="row w-100" style={{ position: "fixed" }}>
		<div className="col-sm-4 col-md-3 col-lg-2 col-xl-1">
			<Link className="btn btn-secondary btn-block m-3" to={to}>
				<i className="fa fa-chevron-left mr-2" />
				<span>Back</span>
			</Link>
		</div>
	</div>
);

FixedBackButton.propTypes = {
	to: PropTypes.string.isRequired
};

export default FixedBackButton;
