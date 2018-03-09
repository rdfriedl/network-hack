import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { Button, Form, Grid, Header, Message, Segment } from "semantic-ui-react";

import { login } from "../../store/auth/actions";
import { ErrorMessage } from "../../components/ErrorBoundary";

class SignupView extends PureComponent {
	state = {
		email: "",
		password: ""
	};

	handleSubmit = event => {
		event.preventDefault();
		const { signup, history } = this.props;
		const { email, password } = this.state;

		signup(email, password)
			.then(({ data: { signup: { token } } }) => {
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
						Signup
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
							<Link className="btn btn-link" to="/login">
								Have an account? login
							</Link>

							<Button color="teal" fluid size="large">
								Signup
							</Button>
						</Segment>
					</Form>

					{error && <ErrorMessage errors={[error]} />}
				</Grid.Column>
			</Grid>
		);
	}
}

SignupView.propTypes = {};
SignupView.defaultProps = {};

function mapDispatchToProps(dispatch) {
	return {
		dispatchLogin: token => dispatch(login(token))
	};
}

export default compose(
	graphql(
		gql`
			mutation signup($email: String!, $password: String!) {
				signup(email: $email, password: $password) {
					token
				}
			}
		`,
		{
			props: ({ mutate }) => ({
				signup: (email, password) => mutate({ variables: { email, password } })
			})
		}
	),
	connect(null, mapDispatchToProps)
)(SignupView);
