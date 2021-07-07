import React, { Component } from "react";
import {
	Button,
	Grid,
	Header,
	Table,
	Search,
	Segment,
	Tab,
	Message,
	Pagination,
	Label,
} from "semantic-ui-react";

function TambahAdmin() {
	return (
		<Segment vertical textAlign="right">
			<Table basic="very" textAlign="center">
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>No.</Table.HeaderCell>
						<Table.HeaderCell textAlign="left">Administrator</Table.HeaderCell>
						<Table.HeaderCell>Dibuat</Table.HeaderCell>
						<Table.HeaderCell>Status</Table.HeaderCell>
						<Table.HeaderCell>Password</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{[1, 2, 3, 4, 5].map((i) => {
						return (
							<Table.Row key={i}>
								<Table.Cell>1.</Table.Cell>
								<Table.Cell textAlign="left">Admin 1</Table.Cell>
								<Table.Cell>12/01/2021-20.30</Table.Cell>
								<Table.Cell>Administrator</Table.Cell>
								<Table.Cell>
									<Label>s*******</Label>
								</Table.Cell>
							</Table.Row>
						);
					})}
				</Table.Body>
			</Table>
			<Message
				info
				icon="info circle"
				content="Menampilkan 1-20 dari 200 Data"
				style={{ textAlign: "center", fontStyle: "italic" }}
			/>
			<Pagination
				defaultActivePage={1}
				firstItem={null}
				lastItem={null}
				pointing
				secondary
				totalPages={3}
			/>
		</Segment>
	);
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
							menuItem: "Administrator",
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
