import React, { Component } from "react";
import { Button, Grid, Header, Search, Segment, Tab } from "semantic-ui-react";

function TambahAdmin() {
	return <Segment vertical></Segment>;
}

function Tambah() {
	return (
		<Segment vertical>
			<Search placeholder="Cari dari Siakad" icon="search" />
		</Segment>
	);
}

function Import() {
	return <Segment vertical></Segment>;
}

class TambahUser extends Component {
	constructor(props) {
		super(props);
		this.goBack = this.goBack.bind(this);
	}

	goBack() {
		this.props.history.goBack();
	}

	render() {
		return (
			<Segment vertical className="page-content-segment">
				<Grid>
					<Grid.Row>
						<Grid.Column computer={14} tablet={13} mobile={16}>
							<Header as="h4" textAlign="center" color="blue" dividing>
								Tambah Pengguna
							</Header>
						</Grid.Column>
						<Grid.Column computer={2} tablet={3} mobile={16} textAlign="left">
							<Button
								onClick={this.goBack}
								basic
								fluid
								color="blue"
								size="medium"
								icon="x"
								content="Batal"
								labelPosition="left"
								floated="right"
							/>
						</Grid.Column>
					</Grid.Row>
				</Grid>
				<Tab
					menu={{ secondary: true }}
					menuPosition="right"
					panes={[
						{
							menuItem: "Tambah Administrator",
							render: () => (
								<Tab.Pane attached={false}>
									<TambahAdmin />
								</Tab.Pane>
							),
						},
						{
							menuItem: "Tambah Taruna",
							render: () => (
								<Tab.Pane attached={false}>
									<Tambah />
								</Tab.Pane>
							),
						},
						{
							menuItem: "Import Taruna",
							render: () => (
								<Tab.Pane attached={false}>
									<Import />
								</Tab.Pane>
							),
						},
					]}
				/>
			</Segment>
		);
	}
}

export default TambahUser;
