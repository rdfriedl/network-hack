import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const UserDropdown = ({ data: { me, loading } }) => (loading ? <span>...Loading</span> : <span>{me.email}</span>);

export default graphql(gql`
	{
		me {
			email
		}
	}
`)(UserDropdown);
