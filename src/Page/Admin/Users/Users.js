import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
	Button,
	Checkbox,
	Divider,
	Grid,
	Header,
	Icon,
	Input,
	Label,
	Message,
	Pagination,
	Segment,
	Select,
	Table,
} from "semantic-ui-react";
import CetakTranskrip from "../Pdf/TranskripKomulatif";
import CetakPilihan from "../Pdf/TranskripTaruna";
import { getAngkatan, getKelas, getProdi, getTaruna } from "../../../Apis/Apis";
import Ppt from "./PowerPoin";
import { ContextType } from "../../../Context";
import LinesEllipsis from "react-lines-ellipsis";

class Users extends Component {
	static contextType = ContextType;
	state = {
		loading: false,
		taruna: [],
		pilihanTaruna: [],
		checkBox: false,

		active_page: 1,
		total_page: 1,
		limit_page: 25,
		total_data: 0,

		prodi: [],
		selected_prodi: 0,
		angkatan: [],
		selected_angkatan: 0,
		kelas: [],
		selected_kelas: 0,
		string_cari_taruna: "",
	};

	componentDidMount() {
		this.prodi();
	}

	prodi = async () => {
		this.setState({ loadFilter: true });
		await getProdi(this.context, (response) => {
			if (response.status === 200) {
				if (response.data.error_code === 0) {
					response.data.data.length > 0
						? this.setState({
								prodi: response.data.data,
								selected_prodi: 0,
								selected_angkatan: 0,
								selected_kelas: 0,
								taruna: [],
								pilihanTaruna: [],
						  })
						: this.setState({ prodi: response.data.data });
				} else {
					console.log(response.data.error_msg);
				}
			} else {
				console.error("get_prodi", response.status, response.msg);
			}
		});
		this.setState({ loadFilter: false });
	};

	angkatan = async () => {
		await getAngkatan(this.context, this.state.selected_prodi, (response) => {
			if (response.status === 200) {
				if (response.data.error_code === 0) {
					response.data.data.length > 0
						? this.setState({
								angkatan: response.data.data,
								selected_angkatan: 0,
								selected_kelas: 0,
								taruna: [],
								pilihanTaruna: [],
						  })
						: this.setState({ angkatan: response.data.data });
				} else {
					console.log(response.data.error_msg);
				}
			} else {
				console.error("get_angkatan", response.status, response.msg);
			}
		});
	};

	kelas = async () => {
		await getKelas(
			this.context,
			this.state.selected_prodi,
			this.state.selected_angkatan,
			(response) => {
				if (response.status === 200) {
					if (response.data.error_code === 0) {
						response.data.data.length > 0
							? this.setState({
									kelas: response.data.data,
									selected_kelas: 0,
									taruna: [],
									pilihanTaruna: [],
							  })
							: this.setState({ kelas: response.data.data });
					} else {
						console.log(response.data.error_msg);
					}
				} else {
					console.error("get_kelas", response.status, response.msg);
				}
			}
		);
	};

	taruna = async (d) => {
		this.setState({ loading: true });
		await getTaruna(
			this.context,
			this.state.selected_prodi,
			this.state.selected_angkatan,
			this.state.selected_kelas,
			this.state.string_cari_taruna,
			this.state.limit_page,
			this.state.active_page,
			(response) => {
				if (response.status === 200) {
					if (response.data.error_code === 0) {
						this.setState({
							active_page: response.data.data.current_page,
							taruna: response.data.data.data,
							total_page: response.data.data.last_page,
							total_data: response.data.data.total,
						});
					} else {
						console.log(response.data.error_msg);
						this.context.setNotify(
							"warning",
							"Error saat mengambil data",
							response.data.error_msg,
							"orange"
						);
					}
				} else {
					console.error("get_taruna", response.status, response.msg);
				}
				this.setState({ loading: false });
			}
		);
	};

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
				// loading={this.state.loading}
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
							<Grid.Row>
								<Select
									style={{ width: "100px" }}
									placeholder="Program Studi"
									value={this.state.selected_prodi}
									onChange={(e, d) =>
										this.setState({ selected_prodi: d.value }, () =>
											this.angkatan()
										)
									}
									options={this.state.prodi.map((d, i) => {
										return {
											key: i,
											value: d.kode,
											text: (
												<LinesEllipsis
													text={d.nama}
													maxLine={1}
													ellipsis={"..."}
													trimRight
													basedOn="letters"
												/>
											),
										};
									})}
								/>{" "}
								<Select
									placeholder="Pilih Angkatan"
									value={this.state.selected_angkatan}
									onChange={(e, d) =>
										this.setState(
											{
												selected_angkatan: d.value,
												limit_page: 25,
												active_page: 1,
											},
											() => this.kelas()
										)
									}
									options={this.state.angkatan.map((d, i) => {
										return {
											key: i,
											value: d,
											text: d,
										};
									})}
								/>{" "}
								<Select
									placeholder="Pilih Kelas"
									value={this.state.selected_kelas}
									onChange={(e, d) =>
										this.setState({ selected_kelas: d.value }, () =>
											this.taruna()
										)
									}
									options={this.state.kelas.map((d, i) => {
										return {
											key: i,
											value: d,
											text: d,
										};
									})}
								/>
							</Grid.Row>
							<Grid.Row>
								<Divider />
								<Input
									fluid
									onChange={(e, d) =>
										this.setState({ string_cari_taruna: d.value }, () =>
											this.taruna()
										)
									}
									value={this.state.string_cari_taruna}
									placeholder="Cari "
									iconPosition="left"
									icon="search"
								/>
							</Grid.Row>
						</Grid.Column>
						<Grid.Column textAlign="right" computer={5} mobile={16} tablet={5}>
							{this.state.checkBox ? (
								<Button.Group>
									<CetakPilihan
										singlepage={0}
										context={this.context}
										// floated="right"
										id_semester={this.context.semesterActive.id}
										nama_semester={this.context.semesterActive.nama_semester}
										// id_taruna={props.id_taruna}
										data={this.state.pilihanTaruna}
										disabled={this.state.pilihanTaruna.length === 0}
										icon="print"
										labelPosition="left"
										content="Transkrip"
										color="blue"
									/>
									<Ppt
										disabled
										labelPosition="left"
										data={this.state.pilihanTaruna}
										// disabled={this.state.pilihanTaruna.length === 0}
										content="PPTx"
										icon="file powerpoint"
										color="orange"
									/>
								</Button.Group>
							) : (
								<Button.Group>
									<CetakTranskrip
										data={this.state.taruna}
										disabled={
											this.state.taruna.length === 0 ||
											this.state.limit_page < this.state.total_data
										}
										prodi={this.state.selected_prodi}
										kelas={this.state.selected_kelas}
										angkatan={this.state.selected_angkatan}
										semester={this.context.semesterActive.nama_semester}
										icon="print"
										labelPosition="left"
										content="Cetak"
										basic
										color="blue"
									/>

									<Button
										icon="add"
										disabled
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
						icon
						style={{ textAlign: "center", margin: "50px 0 50px 0" }}
					>
						<Icon
							name={this.state.loading ? "spinner" : "box"}
							loading={this.state.loading}
						/>
						<Message.Content>Tidak ada data yang ditampilkan</Message.Content>
					</Message>
				) : (
					<Segment vertical loading={this.state.loading}>
						<Label color="red">
							Diploma I Pengukuran dan Pemetaan Kadastral
						</Label>
						<Label color="orange">Diploma IV Manajemen Perpetaan</Label>
						<Table fixed unstackable>
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
									<Table.HeaderCell>NIT</Table.HeaderCell>
									<Table.HeaderCell>Nama User</Table.HeaderCell>
									<Table.HeaderCell>Poin Semester</Table.HeaderCell>
									<Table.HeaderCell>Poin Komulatif</Table.HeaderCell>
									<Table.HeaderCell>Kelas</Table.HeaderCell>
									<Table.HeaderCell>Status</Table.HeaderCell>
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
													(this.state.active_page - 1) * this.state.limit_page +
													i +
													1
												)}
											</Table.Cell>
											<Table.Cell>{d.nimhsmsmhs}</Table.Cell>
											<Table.Cell>{d.nmmhsmsmhs}</Table.Cell>
											<Table.Cell>{d.ips} Poin</Table.Cell>
											<Table.Cell>{d.ipk} Poin</Table.Cell>
											<Table.Cell>
												<Label
													size="tiny"
													color={d.prodi === "01" ? "red" : "orange"}
												>
													{d.angkatan + " / " + d.kelas}
												</Label>
											</Table.Cell>
											<Table.Cell>{d.status}</Table.Cell>
											<Table.Cell singleLine>
												<Button.Group widths={3} icon size="tiny" fluid>
													<Button
														size="tiny"
														color="blue"
														animated="vertical"
														as={Link}
														to={"/users/detail?id_taruna=" + d.nimhsmsmhs}
													>
														<Button.Content visible>
															<Icon fitted name="info" />
														</Button.Content>
														<Button.Content hidden>Detail</Button.Content>
													</Button>
													<Button
														disabled
														size="tiny"
														animated="vertical"
														color="orange"
													>
														<Button.Content visible>
															<Icon fitted name="pencil alternate" />
														</Button.Content>
														<Button.Content hidden>Edit</Button.Content>
													</Button>
													<Button
														disabled
														size="tiny"
														animated="vertical"
														color="red"
													>
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
							value={this.state.limit_page}
							onChange={(e, d) =>
								this.setState({ limit_page: d.value }, () => this.taruna())
							}
							options={[
								{
									key: 25,
									value: "25",
									text: "Menampilkan 25 data",
								},
								{
									key: 50,
									value: "50",
									text: "Menampilkan 50 data",
								},
								{
									key: 100,
									value: "100",
									text: "Menampilkan 100 data",
								},
							]}
						/>
						<Message
							info
							icon="info circle"
							content={"Menampilkan " + this.state.total_data + " total data"}
							style={{ textAlign: "center", fontStyle: "italic" }}
						/>
						<Message style={{ textAlign: "left" }}>
							<Message.Header>
								Keterangan Status Taruna berdasarkan database Akademik
							</Message.Header>
							<Message.List
								items={[
									"A = Aktif",
									"C = Cuti",
									"D = Drop Out",
									"N = Tidak Aktif",
									"M = Meninggal",
								]}
							/>
						</Message>
						<Pagination
							defaultActivePage={1}
							onPageChange={(e, d) =>
								this.setState({ active_page: d.activePage }, () =>
									this.taruna()
								)
							}
							firstItem={null}
							lastItem={null}
							pointing
							secondary
							totalPages={this.state.total_page}
						/>
					</Segment>
				)}
			</Segment>
		);
	}
}

export default Users;
