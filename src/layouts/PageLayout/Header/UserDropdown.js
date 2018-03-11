import React from "react";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";
import { Dropdown } from "semantic-ui-react";
import { logout } from "../../../store/auth/actions";

const UserDropdown = ({ data: { user, loading, error }, dispatchLogout }) => {
	if (error) throw error;
	if (loading) return null;

	return (
		<Dropdown item text={user.email}>
			<Dropdown.Menu>
				<Dropdown.Item>Profile</Dropdown.Item>
				<Dropdown.Item>Settings</Dropdown.Item>
				<Dropdown.Item onClick={dispatchLogout}>Logout</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
};

export function mapStateToProps({ auth }) {
	return {
		userId: auth.userId
	};
}

export function mapDispatchToProps(dispatch) {
	return {
		dispatchLogout: () => dispatch(logout())
	};
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	graphql(
		gql`
			query getUser($currentUserId: ID!) {
				user(id: $currentUserId) {
					email
				}
			}
		`,
		{
			options: props => ({
				variables: { currentUserId: props.userId }
			})
		}
	)
)(UserDropdown);
