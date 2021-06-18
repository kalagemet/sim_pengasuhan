import React, { Component } from "react";
import { Segment, Header, Grid, Table, Tab } from "semantic-ui-react";

class DaftarTaruna extends Component {
	render() {
		return (
			<Segment vertical>
				<Header textAlign="center" as="h4">
					Daftar Taruna pada Etri
				</Header>
			</Segment>
		);
	}
}

class DaftarPristiwa extends Component {
	render() {
		return (
			<Segment vertical>
				<Header textAlign="center" as="h4">
					Daftar Pristiwa pada Etri
				</Header>
			</Segment>
		);
	}
}

export default class EditPoin extends Component {
	render() {
		return (
			<Segment vertical className="page-content-segment">
				<Header textAlign="center" as="h4" dividing color="blue">
					Edit Entri Poin Pengasuhan
				</Header>
				<Grid>
					<Grid.Column mobile={16} tablet={16} computer={8}>
						<Table definition>
							<Table.Body>
								<Table.Row>
									<Table.Cell>ID Peristiwa</Table.Cell>
									<Table.Cell>: Approved</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>Tanggal Entri</Table.Cell>
									<Table.Cell>: Approved</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>Jumlah Pristiwa</Table.Cell>
									<Table.Cell>: Approved</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>Jumlah Taruna</Table.Cell>
									<Table.Cell>: Approved</Table.Cell>
								</Table.Row>
							</Table.Body>
						</Table>
					</Grid.Column>
					<Grid.Column mobile={16} tablet={16} computer={8}></Grid.Column>
				</Grid>
				<br />
				<Tab
					menu={{ secondary: true, pointing: true }}
					panes={[
						{
							menuItem: "Daftar Taruna",
							render: () => (
								<Tab.Pane attached={false}>
									<DaftarTaruna />
								</Tab.Pane>
							),
						},
						{
							menuItem: "Daftar Pristiwa",
							render: () => (
								<Tab.Pane attached={false}>
									<DaftarPristiwa />
								</Tab.Pane>
							),
						},
					]}
				/>
			</Segment>
		);
	}
}
