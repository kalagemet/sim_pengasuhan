import React, { Component } from "react";
import { Segment, Header, Grid, Table, Tab, Button } from "semantic-ui-react";
import DaftarPristiwa from "./DaftarPristiwa";
import DaftarTaruna from "./DaftarTaruna";
import Perubahan from "./Perubahan";

const taruna = require("../../../Dummy/taruna.json");
const pristiwa = require("../../../Dummy/peristiwa.json");

export default class EditPoin extends Component {
	state = {
		activeIndex: 0,
		data: {
			taruna: [...taruna],
			pristiwa: [...pristiwa],
		},
		dataReload: {
			taruna: [...taruna],
			pristiwa: [...pristiwa],
		},
	};

	reload = () => {
		this.setState({
			data: {
				taruna: this.state.dataReload.taruna,
				pristiwa: this.state.dataReload.pristiwa,
			},
		});
	};

	deleteTaruna = (index) => {
		var tmp = this.state.data.taruna;
		if (index < tmp.length && index > -1) {
			tmp.splice(index, 1);
			this.setState({
				data: {
					taruna: tmp,
					pristiwa: this.state.data.pristiwa,
				},
			});
		}
	};

	deletePristiwa = (index) => {
		var tmp = this.state.data.pristiwa;
		if (index < tmp.length && index > -1) {
			tmp.splice(index, 1);
			this.setState({
				data: {
					pristiwa: tmp,
					taruna: this.state.data.taruna,
				},
			});
		}
	};

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
					<Grid.Column mobile={16} tablet={16} computer={8}>
						<Button.Group size="large" fluid>
							<Button
								color="green"
								onClick={() => this.reload()}
								basic
								icon="redo"
								labelPosition="left"
								content="Reload"
							/>
							<Button
								disabled={this.state.activeIndex === 2}
								positive
								onClick={() => this.setState({ activeIndex: 2 })}
								icon="save"
								labelPosition="right"
								content="Simpan"
							/>
						</Button.Group>
					</Grid.Column>
				</Grid>
				<br />
				<Tab
					menuPosition="right"
					activeIndex={this.state.activeIndex}
					onTabChange={(e, d) => this.setState({ activeIndex: d.activeIndex })}
					menu={{ secondary: true, pointing: true }}
					panes={[
						{
							menuItem: "Daftar Taruna",
							render: () => (
								<Tab.Pane attached={false}>
									<DaftarTaruna
										delete={(e) => this.deleteTaruna(e)}
										data={this.state.data}
									/>
								</Tab.Pane>
							),
						},
						{
							menuItem: "Daftar Pristiwa",
							render: () => (
								<Tab.Pane attached={false}>
									<DaftarPristiwa
										delete={(e) => this.deletePristiwa(e)}
										data={this.state.data}
									/>
								</Tab.Pane>
							),
						},
						{
							menuItem: "Perubahan",
							render: () => (
								<Tab.Pane attached={false}>
									<Perubahan
										delete={(e) => this.deletePristiwa(e)}
										data={this.state.data}
										dataAwal={this.state.dataReload}
									/>
								</Tab.Pane>
							),
						},
					]}
				/>
			</Segment>
		);
	}
}
