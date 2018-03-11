import React, { Fragment, PureComponent } from "react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { Button, Form, Grid, Header, Segment, Message } from "semantic-ui-react";
import { ErrorMessage } from "../../components/ErrorBoundary";

class ForgotPasswordView extends PureComponent {
	state = {
		email: "",
		completed: false,
		error: null
	};

	handleSubmit = event => {
		event.preventDefault();
		const { resetPassword } = this.props;
		const { email } = this.state;

		resetPassword(email)
			.then(() => this.setState({ completed: true }))
			.catch(error => this.setState({ error }));
	};

	render() {
		const { email, error, completed } = this.state;

		return (
			<Grid textAlign="center" style={{ height: "100%" }} verticalAlign="middle">
				<Grid.Column style={{ maxWidth: 450 }}>
					{!completed && (
						<Fragment>
							<Header as="h2" color="teal" textAlign="center">
								Reset Password
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

									<Button color="teal" fluid size="large">
										Reset Password
									</Button>
								</Segment>
							</Form>
						</Fragment>
					)}

					{completed && <Message color="positive" icon="check" content="Password reset email sent!" />}
					{error && <ErrorMessage errors={[error]} />}
				</Grid.Column>
			</Grid>
		);
	}
}

ForgotPasswordView.propTypes = {};
ForgotPasswordView.defaultProps = {};

export default compose(
	graphql(
		gql`
			mutation resetPassword($email: String!) {
				sendResetPasswordToken(email: $email)
			}
		`,
		{
			options: {
				fetchPolicy: "no-cache"
			},
			props: ({ mutate }) => ({
				resetPassword: email => mutate({ variables: { email } })
			})
		}
	)
)(ForgotPasswordView);
