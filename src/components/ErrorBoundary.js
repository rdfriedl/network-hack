import React, { Component } from "react";
import PropTypes from "prop-types";

import { Message, Accordion, Icon } from "semantic-ui-react";

const stackStyles = {
	fontSize: 10,
	lineHeight: "1em",
	margin: 0
};

export class ErrorMessage extends Component {
	state = {
		activeIndex: null,
		errors: []
	};

	componentWillMount() {
		this.updateErrors(this.props.errors);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors !== this.props.errors) {
			this.updateErrors(nextProps.errors);
		}
	}

	updateErrors(nextErrors) {
		let errors = [];

		Array.isArray(nextErrors) &&
			nextErrors.forEach(error => {
				// GraphQL Error
				if (error.graphQLErrors) {
					errors.push(...error.graphQLErrors);
				}
				// Server Error
				if (error.networkError) {
					errors.push(error.networkError);
				}

				// normal error message
				if (!error.graphQLErrors && !error.networkError) {
					errors.push(error);
				}
			});

		this.setState({ errors });
	}

	handleClick = (e, titleProps) => {
		const { index } = titleProps;
		const { activeIndex } = this.state;
		const newIndex = activeIndex === index ? -1 : index;

		this.setState({ activeIndex: newIndex });
	};

	render() {
		const { showStack } = this.props;
		const { activeIndex, errors } = this.state;

		return (
			<Message compact color="red">
				{showStack ? (
					errors.map((err, i) => (
						<Accordion key={i}>
							<Accordion.Title style={{ padding: 0 }} active={activeIndex === i} index={i} onClick={this.handleClick}>
								<Icon name="dropdown" />
								{err.bodyText || err.message}
							</Accordion.Title>
							<Accordion.Content active={activeIndex === i}>
								<pre style={stackStyles}>{err.componentStack || err.stack}</pre>
							</Accordion.Content>
						</Accordion>
					))
				) : (
					<Message.List>
						{errors.map((err, i) => <Message.Item key={i}>{error.bodyText || error.message}</Message.Item>)}
					</Message.List>
				)}
			</Message>
		);
	}
}

ErrorMessage.propTypes = {
	errors: PropTypes.arrayOf(PropTypes.instanceOf(Error)),
	showStack: PropTypes.bool
};
ErrorMessage.defaultProps = {
	errors: [],
	showStack: IS_DEV
};

export default class ErrorBoundary extends Component {
	state = {
		error: null
	};

	componentDidCatch(error, info) {
		if (info && info.componentStack) error.componentStack = info.componentStack;

		this.setState({ error });
	}

	render() {
		const { showStack, children } = this.props;
		const { error } = this.state;

		if (error) {
			return <ErrorMessage errors={[error]} showStack={showStack} />;
		}

		return children;
	}
}

ErrorBoundary.propTypes = {
	showStack: PropTypes.bool
};
ErrorBoundary.defaultProps = {
	showStack: IS_DEV
};
