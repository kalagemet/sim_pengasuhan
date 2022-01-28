import React, { Component } from "react";
import { Segment, Header, Grid, Table, Tab, Button } from "semantic-ui-react";
import { getRecord, updateEntri } from "../../../Apis/Apis";
import { ContextType } from "../../../Context";
import DaftarPeristiwa from "./DaftarPeristiwa";
import DaftarTaruna from "./DaftarTaruna";
import Perubahan from "./Perubahan";

export default class EditPoin extends Component {
	static contextType = ContextType;
	constructor(props) {
		super(props);
		this.state = {
			activeIndex: 0,
			data: {
				taruna: [],
				peristiwa: [],
			},
			dataDeleted: {
				taruna: [],
				peristiwa: [],
			},
			id_user: "",
			id_entri: 0,
			tanggal_entri: "",
			tanggal_update: "",
			jml_taruna: 0,
			jml_peristiwa: 0,
		};
		this.goBack = this.goBack.bind(this);
	}

	goBack() {
		this.props.history.goBack();
	}

	componentDidMount() {
		this.getData();
	}

	componentWillUnmount() {
		this.context.setLoad(false);
	}

	getData = async () => {
		this.context.setLoad(true);
		let id_entri = new URLSearchParams(this.props.location.search);
		id_entri = id_entri.get("id_entri");
		await getRecord(this.context, id_entri, (response) => {
			if (response.status === 200) {
				if (response.data.error_code === 0) {
					this.setState({
						id_entri: response.data.data.id,
						id_user: response.data.data.id_user,
						tanggal_entri: new Intl.DateTimeFormat("id-ID", {
							year: "numeric",
							month: "2-digit",
							day: "2-digit",
							hour: "2-digit",
							minute: "2-digit",
							second: "2-digit",
						}).format(new Date(response.data.data.created_at)),
						tanggal_update: new Intl.DateTimeFormat("id-ID", {
							year: "numeric",
							month: "2-digit",
							day: "2-digit",
							hour: "2-digit",
							minute: "2-digit",
							second: "2-digit",
						}).format(new Date(response.data.data.updated_at)),
						jml_peristiwa: response.data.data.peristiwa.length,
						jml_taruna: response.data.data.taruna.length,
						data: {
							taruna: response.data.data.taruna,
							peristiwa: response.data.data.peristiwa,
						},
						dataDeleted: {
							taruna: [],
							peristiwa: [],
						},
					});
				} else {
					console.log(response.data.error_msg);
					this.context.setNotify(
						"warning",
						"Error saat mengambil detail entri peristiwa",
						response.data.error_msg,
						"red"
					);
					this.goBack();
				}
			} else {
				console.error("get_riwayat_entri", response.status, response.msg);
			}
			this.context.setLoad(false);
		});
	};

	reload = () => {
		this.getData();
	};

	deleteTaruna = (index) => {
		var tmp = this.state.dataDeleted.taruna;
		tmp.push(this.state.data.taruna[index]);
		this.setState({
			dataDeleted: {
				taruna: tmp,
				peristiwa: this.state.dataDeleted.peristiwa,
			},
		});
		tmp = this.state.data.taruna;
		if (index < tmp.length && index > -1) {
			tmp.splice(index, 1);
			this.setState({
				data: {
					taruna: tmp,
					peristiwa: this.state.data.peristiwa,
				},
			});
		}
	};

	deletePeristiwa = (index) => {
		var tmp = this.state.dataDeleted.peristiwa;
		tmp.push(this.state.data.peristiwa[index]);
		this.setState({
			dataDeleted: {
				peristiwa: tmp,
				taruna: this.state.dataDeleted.taruna,
			},
		});
		tmp = this.state.data.peristiwa;
		if (index < tmp.length && index > -1) {
			tmp.splice(index, 1);
			this.setState({
				data: {
					peristiwa: tmp,
					taruna: this.state.data.taruna,
				},
			});
		}
	};

	submitUpdate = async () => {
		this.context.setLoad(true);
		updateEntri(
			this.context,
			this.state.id_entri,
			this.state.dataDeleted,
			(response) => {
				if (response.status === 200) {
					if (response.data.error_code === 0) {
						this.context.setNotify(
							"check circle outline",
							"Berhasil",
							"Merubah record entri poin " + this.state.id_entri,
							"green"
						);
						this.goBack();
					} else {
						console.log(response.data.error_msg);
						this.context.setNotify(
							"warning",
							"Error saat mengirim data perubahan entri peristiwa",
							response.data.error_msg,
							"red"
						);
						this.getData();
					}
				} else {
					console.error("get_riwayat_entri", response.status, response.msg);
				}
				this.context.setLoad(false);
			}
		);
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
									<Table.Cell>: {this.state.id_entri}</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>Tanggal Entri</Table.Cell>
									<Table.Cell>: {this.state.tanggal_entri}</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>Tanggal Perubahan</Table.Cell>
									<Table.Cell>
										:{" "}
										{this.state.tanggal_entri === this.state.tanggal_update
											? " - "
											: this.state.tanggal_update}
									</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>Jumlah Taruna</Table.Cell>
									<Table.Cell>
										:{" "}
										{this.state.jml_taruna +
											" Taruna / " +
											this.state.jml_peristiwa +
											" Peristiwa"}
									</Table.Cell>
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
							menuItem: "Daftar Peristiwa",
							render: () => (
								<Tab.Pane attached={false}>
									<DaftarPeristiwa
										delete={(e) => this.deletePeristiwa(e)}
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
										data={this.state.dataDeleted}
										submit={this.submitUpdate}
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
