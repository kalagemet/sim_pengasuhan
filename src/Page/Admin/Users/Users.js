import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
	Button,
	Checkbox,
	Grid,
	Header,
	Icon,
	Input,
	Message,
	Pagination,
	Segment,
	Select,
	Table,
} from "semantic-ui-react";
import CetakTranskrip from "../Pdf/TranskripKomulatif";
import CetakPilihan from "../Pdf/TranskripTaruna";
import Ppt from "./PowerPoin";

const data = require("../../../Dummy/taruna.json");
// const data = require("../../../Dummy/yudisium.json");
// const data = require("../../../Dummy/yudisium_d4.json");
// const data = require("../../../Dummy/wisuda.json");

class Users extends Component {
	state = {
		loading: true,
		taruna: [],
		pilihanTaruna: [],
		checkBox: false,
	};

	componentDidMount() {
		setTimeout(
			() => this.setState({ loading: false, taruna: [...data] }),
			2000
		);
	}

	setPilihan() {
		if (this.state.checkBox) {
			this.setState({ checkBox: false });
		} else {
			this.setState({ checkBox: true });
		}
	}

	addPilihan(bool, data) {
		let tmp = this.state.pilihanTaruna;
		if (bool) {
			this.setState({ pilihanTaruna: [...tmp, data] });
		} else {
			let index = tmp.indexOf(data);
			if (index >= 0) {
				tmp.splice(index, 1);
				this.setState({ pilihanTaruna: tmp });
			}
		}
	}

	pilihSemua() {
		if (this.state.pilihanTaruna.length === this.state.taruna.length) {
			this.setState({ pilihanTaruna: [] });
		} else {
			this.setState({ pilihanTaruna: [...this.state.taruna] });
		}
	}

	render() {
		return (
			<Segment
				loading={this.state.loading}
				textAlign="right"
				vertical
				className="page-content-segment"
			>
				<Header textAlign="center" as="h4" dividing color="blue">
					Manajemen Penguna
					<Header.Subheader>Manajement penguna pada Sistem</Header.Subheader>
				</Header>
				<Grid>
					<Grid.Row>
						<Grid.Column textAlign="left" computer={11} mobile={16} tablet={11}>
							<Select
								placeholder="Program Studi"
								options={[
									{
										key: 1,
										value: "1",
										text: "D1 Pengukuran Kadstra;",
									},
									{
										key: 2,
										value: "2",
										text: "D4 Petanahan",
									},
								]}
							/>{" "}
							<Select
								placeholder="Kelas"
								options={[
									{
										key: 1,
										value: "taruna",
										text: "2019 A",
									},
									{
										key: 2,
										value: "admin",
										text: "2019 B",
									},
								]}
							/>{" "}
							<Input placeholder="Cari " iconPosition="left" icon="search" />
						</Grid.Column>
						<Grid.Column textAlign="right" computer={5} mobile={16} tablet={5}>
							{this.state.checkBox ? (
								<Button.Group>
									<CetakPilihan
										data={this.state.pilihanTaruna}
										disabled={this.state.pilihanTaruna.length === 0}
										icon="print"
										labelPosition="left"
										content="Transkrip"
										color="blue"
									/>
									<Ppt
										labelPosition="left"
										data={this.state.pilihanTaruna}
										disabled={this.state.pilihanTaruna.length === 0}
										content="PPTx"
										icon="file powerpoint"
										color="orange"
									/>
								</Button.Group>
							) : (
								<Button.Group>
									<CetakTranskrip
										data={this.state.taruna}
										disabled={!this.state.taruna.length === 0}
										icon="print"
										labelPosition="left"
										content="Cetak"
										basic
										color="blue"
									/>

									<Button
										icon="add"
										labelPosition="left"
										content="Tambah"
										as={Link}
										to={"/users/tambah_taruna"}
										basic
										positive
									/>
								</Button.Group>
							)}
						</Grid.Column>
					</Grid.Row>
				</Grid>
				{this.state.taruna.length === 0 ? (
					<Message
						warning
						style={{ textAlign: "center", margin: "50px 0 50px 0" }}
						icon="box"
						content="Tidak ada data yang ditampilkan"
					/>
				) : (
					<Segment vertical loading={this.state.loading}>
						<Table unstackable>
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell>
										<Button onClick={() => this.setPilihan()}>No.</Button>
										{this.state.checkBox ? (
											<Button
												onClick={() => this.pilihSemua()}
												icon="check square outline"
											/>
										) : (
											""
										)}
									</Table.HeaderCell>
									<Table.HeaderCell>Nama User</Table.HeaderCell>
									<Table.HeaderCell>Status</Table.HeaderCell>
									<Table.HeaderCell>Level</Table.HeaderCell>
									<Table.HeaderCell>Detail</Table.HeaderCell>
									<Table.HeaderCell>Aksi</Table.HeaderCell>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{this.state.taruna.map((d, i) => {
									return (
										<Table.Row key={i}>
											<Table.Cell>
												{this.state.checkBox ? (
													<Checkbox
														fitted
														onClick={(e, data) => {
															this.addPilihan(data.checked, d);
														}}
														checked={this.state.pilihanTaruna.includes(d)}
													/>
												) : (
													i + 1
												)}
											</Table.Cell>
											<Table.Cell>
												{d.id} - {d.nama}
											</Table.Cell>
											<Table.Cell>
												<Checkbox checked toggle label="Aktif" />
											</Table.Cell>
											<Table.Cell>{d.prodi}</Table.Cell>
											<Table.Cell>Kelas {d.kelas}</Table.Cell>
											<Table.Cell>
												<Button.Group icon size="tiny" fluid>
													<Button
														color="blue"
														animated="vertical"
														as={Link}
														to="/users/detail"
													>
														<Button.Content visible>
															<Icon fitted name="info" />
														</Button.Content>
														<Button.Content hidden>Detail</Button.Content>
													</Button>
													<Button animated="vertical" color="orange">
														<Button.Content visible>
															<Icon fitted name="pencil alternate" />
														</Button.Content>
														<Button.Content hidden>Edit</Button.Content>
													</Button>
													<Button animated="vertical" color="red">
														<Button.Content visible>
															<Icon fitted name="trash alternate" />
														</Button.Content>
														<Button.Content hidden>Hapus</Button.Content>
													</Button>
												</Button.Group>
											</Table.Cell>
										</Table.Row>
									);
								})}
							</Table.Body>
						</Table>
						<Select
							placeholder="Menampilkan 25 data"
							value={1}
							options={[
								{
									key: 1,
									value: "25",
									text: "Menampilkan 25 data",
								},
								{
									key: 2,
									value: "50",
									text: "Menampilkan 50 data",
								},
								{
									key: 3,
									value: "100",
									text: "Menampilkan 100 data",
								},
							]}
						/>
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
				)}
			</Segment>
		);
	}
}

export default Users;
