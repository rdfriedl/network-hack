import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import FixedBackButton from "../../components/FixedBackButton";

const SignupView = () => (
	<Fragment>
		<FixedBackButton to="/" />
		<div className="align-items-center d-flex h-100 justify-content-center w-100">
			<div className="col-sm-9 col-md-8 col-lg-6 col-xl-4">
				<div className="card border-primary">
					<div className="card-body">
						<h2 className="text-center">Create Account</h2>
						<hr />
						<form>
							<div className="form-group">
								<input type="email" name="email" className="form-control" placeholder="Email" />
							</div>
							<div className="form-group">
								<input type="password" name="password" className="form-control" placeholder="Password" />
							</div>
							<div className="form-group">
								<input type="password" name="confirmPassword" className="form-control" placeholder="Confirm Password" />
							</div>
							<div className="d-flex justify-content-between">
								<button className="btn btn-primary px-4" type="submit">
									Create Account
								</button>
								<Link className="btn btn-secondary px-4" to="/">
									Cancel
								</Link>
							</div>

							<h4 className="text-center my-4">OR</h4>

							<button className="btn btn-block btn-outline-primary" disabled>
								Login with Github
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</Fragment>
);

SignupView.propTypes = {};
SignupView.defaultProps = {};

export default SignupView;
