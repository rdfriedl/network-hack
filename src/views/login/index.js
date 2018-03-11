import React, { PureComponent } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { Button, Form, Grid, Header, Message, Segment } from "semantic-ui-react";

import ForgotPasswordView from "./forgot";

import { login } from "../../store/auth/actions";
import { ErrorMessage } from "../../components/ErrorBoundary";

export class LoginView extends PureComponent {
	state = {
		email: "",
		password: ""
	};

	handleSubmit = event => {
		event.preventDefault();
		const { login, history } = this.props;
		const { email, password } = this.state;

		login(email, password)
			.then(({ data: { login: { token } } }) => {
				this.props.dispatchLogin(token);

				history.push("/");
			})
			.catch(error => this.setState({ error }));
	};

	render() {
		const { email, password, error } = this.state;

		return (
			<Grid textAlign="center" style={{ height: "100%" }} verticalAlign="middle">
				<Grid.Column style={{ maxWidth: 450 }}>
					<Header as="h2" color="teal" textAlign="center">
						Log-in to your account
					</Header>
					<Form size="large" onSubmit={this.handleSubmit}>
						<Segment stacked>
							<Form.Input
								fluid
								icon="user"
								iconPosition="left"
								placeholder="E-mail address"
								type="email"
								onChange={e => this.setState({ email: e.target.value })}
								value={email}
							/>
							<Form.Input
								fluid
								icon="lock"
								iconPosition="left"
								placeholder="Password"
								type="password"
								onChange={e => this.setState({ password: e.target.value })}
								value={password}
							/>
							<Link className="btn btn-link" to="/login/forgot">
								Forgot your password?
							</Link>

							<Button color="teal" fluid size="large">
								Login
							</Button>
						</Segment>
					</Form>
					<Message>
						New? <Link to="/signup">Sign Up</Link>
					</Message>

					{error && <ErrorMessage errors={[error]} />}
				</Grid.Column>
			</Grid>
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
				fetchPolicy: "no-cache"
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
