import React, { Component } from "react";
import { Segment, Header, Grid, Table } from "semantic-ui-react";

export default class EditPoin extends Component {
	render() {
		return (
			<Segment vertical className="page-content-segment">
				<Header textAlign="center" as="h4" dividing color="blue">
					Edit Entri Poin Pengasuhan
				</Header>
				<Grid>
					<Grid.Column mobile={16} tablet={8} computer={8}>
						<Table basic="very" definition>
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
					<Grid.Column mobile={16} tablet={8} computer={8}></Grid.Column>
				</Grid>
			</Segment>
		);
	}
}
