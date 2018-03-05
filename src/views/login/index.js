import React, { Fragment, PureComponent } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";

import ForgotPasswordView from "./forgot";
import FixedBackButton from "../../components/FixedBackButton";

import { login } from "../../store/auth/actions";

export class LoginView extends PureComponent {
	constructor(...args) {
		super(...args);

		this.state = {
			email: "",
			password: "",
			loading: false
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		const { login, history } = this.props;
		const { email, password } = this.state;

		this.setState({ loading: true });
		let logInPromise = login(email, password);
		logInPromise.then(({ data: { login: { token } } }) => {
			this.props.dispatchLogin(token);

			history.goBack();
		});
		logInPromise.catch(err => {
			console.error(err);
		});
		logInPromise.finally(() => {
			this.setState({ loading: false });
		});
	}

	render() {
		return (
			<Fragment>
				<FixedBackButton to="/" />
				<div className="align-items-center d-flex h-100 justify-content-center w-100">
					<div className="col-sm-9 col-md-8 col-lg-6 col-xl-4">
						<div className="card border-primary bg-dark">
							<div className="card-body">
								<h2 className="text-center">Login</h2>
								<hr />
								<form onSubmit={this.handleSubmit}>
									<div className="form-group">
										<input
											id="inputEmail"
											name="email"
											className="form-control"
											placeholder="Email"
											type="email"
											onChange={e => this.setState({ email: e.target.value })}
											value={this.state.email}
										/>
									</div>
									<div className="form-group">
										<input
											type="password"
											name="password"
											className="form-control"
											id="inputPassword"
											placeholder="Password"
											onChange={e => this.setState({ password: e.target.value })}
											value={this.state.password}
										/>
									</div>
									<button className="btn btn-primary px-4" type="submit">
										Login
									</button>
									<Link className="btn btn-link" to="/login/forgot">
										Forgot your password?
									</Link>
								</form>

								<h4 className="text-center my-4">OR</h4>

								<button className="btn btn-block btn-outline-primary" disabled>
									Login with Github
								</button>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		dispatchLogin: token => dispatch(login(token))
	};
}

LoginView = compose(
	graphql(
		gql`
			mutation login($email: String!, $password: String!) {
				login(email: $email, password: $password) {
					token
				}
			}
		`,
		{
			options: {
				errorPolicy: "all"
			},
			props: ({ mutate }) => ({
				login: (email, password) => mutate({ variables: { email, password } })
			})
		}
	),
	connect(null, mapDispatchToProps)
)(LoginView);

export default ({ match }) => (
	<Switch>
		<Route exact path={match.url} component={LoginView} />
		<Route path={`${match.url}/forgot`} component={ForgotPasswordView} />
	</Switch>
);
