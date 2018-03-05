import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import FixedBackButton from "../../components/FixedBackButton";

const ForgotPasswordView = () => (
	<Fragment>
		<FixedBackButton to="/" />
		<div className="align-items-center d-flex h-100 justify-content-center w-100">
			<div className="col-sm-9 col-md-8 col-lg-6 col-xl-5">
				<div className="card border-primary">
					<div className="card-body">
						<h2 className="text-center">Forgot Password</h2>
						<hr />
						<form>
							<div className="form-group">
								<input type="email" name="email" className="form-control" id="inputEmail" placeholder="Email" />
							</div>
							<div className="d-flex justify-content-between">
								<button className="btn btn-primary px-4" type="submit">
									Reset Password
								</button>
								<Link className="btn btn-secondary px-4" to="/login">
									Cancel
								</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</Fragment>
);

ForgotPasswordView.propTypes = {};
ForgotPasswordView.defaultProps = {};

export default ForgotPasswordView;
