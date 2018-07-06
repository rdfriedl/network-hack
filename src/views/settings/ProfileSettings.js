import React, { Component } from "react";
import gql from "graphql-tag";
import _ from "lodash";
import { graphql, compose } from "react-apollo";

import { Form, Input } from "semantic-ui-react";

class ProfileSettingsView extends Component {
	state = {
		saving: false,
		savingFields: [],
		changedFields: []
	};

	handleChange = (e, { name, value }) => {
		let changedFields = this.state.changedFields;
		if (!this.state.changedFields.includes(name)) {
			changedFields = [...changedFields, name];
		}

		this.setState({
			[name]: value,
			changedFields
		});

		if (!this.state.saving) {
			this.saveChanges();
		}
	};

	saveChanges = _.debounce(() => {
		let data = _.pick(this.state, this.state.changedFields);
		this.props.updateProfile(data).then(() => {
			this.setState({
				saving: false
			});
		});

		// update state
		this.setState({
			saving: true,
			savingFields: Array.from(this.state.changedFields),
			changedFields: []
		});
	}, 1000);

	componentWillReceiveProps(nextProps) {
		if (!nextProps.data.loading) {
			this.setState(nextProps.data.me.profile);
		}
	}

	render() {
		const {
			data: { loading }
		} = this.props;
		const { name, website, bio, saving, savingFields } = this.state;

		return (
			<Form loading={loading}>
				<Form.Group widths="equal">
					<Form.Field>
						<label>Name</label>
						<Input
							name="name"
							type="text"
							value={name || ""}
							onChange={this.handleChange}
							autoComplete="off"
							required
							loading={saving && savingFields.includes("name")}
							icon={!saving && savingFields.includes("name") ? "check" : null}
						/>
					</Form.Field>
					<Form.Field>
						<label>Website</label>
						<Input
							name="website"
							type="url"
							value={website || ""}
							onChange={this.handleChange}
							autoComplete="off"
							loading={saving && savingFields.includes("website")}
							icon={!saving && savingFields.includes("website") ? "check" : null}
						/>
					</Form.Field>
				</Form.Group>

				<Form.TextArea label="Bio" name="bio" value={bio} onChange={this.handleChange} />
			</Form>
		);
	}
}

const fetchUserProfile = gql`
	{
		me {
			id
			profile {
				name
				website
			}
		}
	}
`;

export default compose(
	graphql(
		gql`
			mutation updateProfile($data: UpdateProfileInput!) {
				updateProfile(data: $data) {
					id
					profile {
						name
						website
					}
				}
			}
		`,
		{
			options: {
				cachePolicy: "no-cache",
				update: (cache, { data: { updateProfile } }) => {
					let data = { me: updateProfile };
					cache.writeQuery({ query: fetchUserProfile, data });
				}
			},
			props: ({ mutate }) => ({
				updateProfile: data => mutate({ variables: { data } })
			})
		}
	),
	graphql(fetchUserProfile)
)(ProfileSettingsView);
