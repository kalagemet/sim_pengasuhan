import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
	Button,
	Grid,
	Header,
	Input,
	Message,
	Pagination,
	Segment,
	Select,
	Table,
	Label,
	Icon,
	Divider,
} from "semantic-ui-react";
import {
	getDetailTaruna,
	getLogTaruna,
	getRekapPoin,
	getTahunAjar,
} from "../../../Apis/Apis";
import { ContextType } from "../../../Context";
import TranskripTaruna from "../Pdf/TranskripTaruna";

const Detail = (props) => {
	return (
		<Segment>
			<Table unstackable basic="very" compact="very" celled>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Detail Penguna</Table.HeaderCell>
						<Table.HeaderCell>
							<TranskripTaruna
								disabled={props.loading}
								singlepage={1}
								context={props.context}
								floated="right"
								id_semester={props.id_semester}
								nama_semester={props.nama_semester}
								id_taruna={props.id_taruna}
								basic
								positive
								labelPosition="left"
								icon="file"
								content="Transkrip"
							/>
						</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					<Table.Row>
						<Table.Cell>Nama Penguna</Table.Cell>
						<Table.Cell>{props.data.nama_taruna}</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>NIT</Table.Cell>
						<Table.Cell>{props.data.id_taruna}</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Program Studi</Table.Cell>
						<Table.Cell>{props.data.prodi}</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Poin Semester Aktif</Table.Cell>
						<Table.Cell>{props.data.ips} Poin</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Predikat Semester Aktif</Table.Cell>
						<Table.Cell>{props.data.predikat_ips}</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Poin Komulatif</Table.Cell>
						<Table.Cell>{props.data.ipk} Poin</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Predikat</Table.Cell>
						<Table.Cell>{props.data.predikat_ipk}</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table>
		</Segment>
	);
};

class DetailUsers extends Component {
	static contextType = ContextType;
	constructor(props) {
		super(props);
		this.goBack = this.goBack.bind(this);
		this.state = {
			id_taruna: "",
			detail: {},

			semester: [],
			semesterSelected: "",
			nama_semester: "",
			filter: "",

			data: [],
			rekap: [],
			loading: false,

			active_page: 1,
			total_page: 1,
			limit_page: 25,
			total_data: 0,
		};
	}

	componentDidMount() {
		this.getDetail();
	}

	getTahunAjar = async () => {
		await getTahunAjar(this.context, "", (response) => {
			if (response.status === 200) {
				if (response.data.error_code === 0) {
					let all = response.data.data;
					let active = all.pop();
					all.unshift({
						id: 0,
						nama_semester: "SEMUA_SEMESTER",
					});
					this.setState(
						{
							semesterSelected: active.id,
							nama_semester: active.nama_semester,
							semester: all,
						},
						() => this.getData()
					);
				} else {
					console.log(response.data.error_msg);
				}
			} else {
				console.error("get_tahun_ajar", response.status, response.msg);
			}
		});
	};

	getDetail = async () => {
		this.context.setLoad(true);
		let id = new URLSearchParams(this.props.location.search);
		this.setState({ id_taruna: id.get("id_taruna") });
		await getDetailTaruna(this.context, id.get("id_taruna"), (response) => {
			if (response.status === 200) {
				if (response.data.error_code === 0) {
					this.setState({ detail: response.data.data }, () => {
						this.getTahunAjar();
						this.getRekap();
					});
				} else {
					console.log(response.data.error_msg);
					this.context.setNotify(
						"warning",
						"Error saat mengambil detail taruna",
						response.data.error_msg,
						"red"
					);
					this.goBack();
				}
			} else {
				console.error("get_detail_taruna", response.status, response.msg);
			}
			this.context.setLoad(false);
		});
	};

	getRekap = async () => {
		this.context.setLoad(true);
		await getRekapPoin(
			this.context,
			this.state.id_taruna,
			this.state.semesterSelected,
			(response) => {
				if (response.status === 200) {
					if (response.data.error_code === 0) {
						this.setState({
							rekap: response.data.data,
						});
					} else {
						console.log(response.data.error_msg);
						this.context.setNotify(
							"warning",
							"Error saat mengambil detail poin",
							response.data.error_msg,
							"red"
						);
					}
				} else {
					console.error("get_rekap_poin", response.status, response.msg);
				}
				this.context.setLoad(false);
			}
		);
	};

	goBack() {
		this.props.history.goBack();
	}

	getData = async () => {
		this.setState({ loading: true });
		await getLogTaruna(
			this.context,
			this.state.id_taruna,
			this.state.semesterSelected,
			this.state.filter,
			this.state.active_page,
			this.state.limit_page,
			(response) => {
				if (response.status === 200) {
					if (response.data.error_code === 0) {
						this.setState({
							active_page: response.data.data.current_page,
							data: response.data.data.data,
							total_page: response.data.data.last_page,
							total_data: response.data.data.total,
						});
					} else {
						console.log(response.data.error_msg);
						this.context.setNotify(
							"warning",
							"Error saat mengambil detail log taruna",
							response.data.error_msg,
							"red"
						);
					}
				} else {
					console.error("get_riwayat_entri", response.status, response.msg);
				}
				this.setState({ loading: false });
			}
		);
	};

	render() {
		return (
			<Segment vertical className="page-content-segment">
				<Grid>
					<Grid.Row>
						<Grid.Column computer={10} tablet={16} mobile={16}>
							<Header as="h4" textAlign="center" color="blue" dividing>
								Detail Pengguna
							</Header>
						</Grid.Column>
						<Grid.Column computer={6} tablet={16} mobile={16} textAlign="right">
							<Button.Group size="mini" fluid>
								<Button
									onClick={this.goBack}
									basic
									color="yellow"
									icon="left arrow"
									content="Kembali"
									labelPosition="left"
								/>
								<Button
									disabled
									labelPosition="left"
									color="orange"
									content="Edit"
									icon="pencil"
								/>
								<Button
									disabled
									labelPosition="left"
									negative
									content="Hapus"
									icon="trash alternate"
								/>
							</Button.Group>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column computer={10} tablet={16} mobile={16}>
							<Segment textAlign="right">
								<Header textAlign="center" as="h4">
									Daftar Entri peristiwa
								</Header>
								<Grid columns={1}>
									<Grid.Column textAlign="left">
										<Select
											placeholder="Pilih semester"
											value={this.state.semesterSelected}
											options={this.state.semester.map((d, i) => {
												return {
													key: i,
													value: d.id,
													text: d.nama_semester,
													selected: d.value === this.state.semesterSelected,
												};
											})}
											onChange={(e, d) =>
												this.setState(
													{
														semesterSelected: d.value,
														nama_semester: d.text,
														active_page: 1,
														data: [],
														rekap: [],
													},
													() => {
														this.getData();
														this.getRekap();
													}
												)
											}
										/>{" "}
										<Input
											value={this.state.filter}
											onChange={(e, d) =>
												this.setState({ filter: d.value }, () => this.getData())
											}
											placeholder="Cari peristiwa"
											icon="search"
										/>
									</Grid.Column>
								</Grid>
								<Table unstackable>
									{this.state.data.length > 0 ? (
										<Table.Header>
											<Table.Row>
												<Table.HeaderCell>No.</Table.HeaderCell>
												<Table.HeaderCell>Nama peristiwa</Table.HeaderCell>
												<Table.HeaderCell>Tanggal</Table.HeaderCell>
												<Table.HeaderCell>Kategori</Table.HeaderCell>
												<Table.HeaderCell>Jumlah Poin</Table.HeaderCell>
												<Table.HeaderCell>Aksi</Table.HeaderCell>
											</Table.Row>
										</Table.Header>
									) : null}
									<Table.Body>
										{this.state.data.map((d, i) => (
											<Table.Row key={i}>
												<Table.Cell>
													{(this.state.active_page - 1) *
														this.state.limit_page +
														i +
														1}
												</Table.Cell>
												<Table.Cell>{d.nama_peristiwa}</Table.Cell>
												<Table.Cell>{d.tanggal}</Table.Cell>
												<Table.Cell>
													{d.pelanggaran === 0 ? "Penghargaan" : "Pelanggaran"}{" "}
													- {d.nama_kategori}
												</Table.Cell>
												<Table.Cell>
													{d.pelanggaran === 0 ? (
														d.is_poin_tambahan === 0 ? (
															<Label color="green">+{d.poin}</Label>
														) : (
															<Label color="orange">+{d.poin_tambahan}</Label>
														)
													) : (
														<Label color="red">-{d.poin}</Label>
													)}
												</Table.Cell>
												<Table.Cell>
													<Button
														as={Link}
														to={"/poin/edit?id_entri=" + d.id_entri}
														size="mini"
														basic
														negative
														animated
													>
														<Button.Content hidden>
															<Icon name="arrow right" />
														</Button.Content>
														<Button.Content visible>Entri Poin</Button.Content>
													</Button>
												</Table.Cell>
											</Table.Row>
										))}
									</Table.Body>
								</Table>
								<Message
									info
									icon
									style={{ textAlign: "center", fontStyle: "italic" }}
								>
									<Icon
										name={this.state.loading ? "spinner" : "info circle"}
										loading={this.state.loading}
									/>
									<Message.Content>
										{this.state.data.length === 0
											? "Tidak ada data yang dapat ditampilkan"
											: "Menampilkan " + this.state.total_data + " total data"}
									</Message.Content>
								</Message>
								{this.state.data.length !== 0 ? (
									<Pagination
										defaultActivePage={1}
										onPageChange={(e, d) =>
											this.setState({ active_page: d.activePage }, () =>
												this.getData()
											)
										}
										firstItem={null}
										lastItem={null}
										pointing
										secondary
										totalPages={this.state.total_page}
									/>
								) : (
									""
								)}
							</Segment>
							<Divider />
							{this.state.rekap.length > 0 ? (
								<Segment textAlign="right">
									<Header textAlign="center" as="h4">
										Rekapitulasi Poin Taruna {this.state.nama_semester}
									</Header>
									<Table unstackable>
										<Table.Header>
											<Table.Row>
												<Table.HeaderCell>No.</Table.HeaderCell>
												<Table.HeaderCell>Nama Kategori</Table.HeaderCell>
												<Table.HeaderCell>Poin</Table.HeaderCell>
												<Table.HeaderCell></Table.HeaderCell>
											</Table.Row>
										</Table.Header>
										<Table.Body>
											{this.state.rekap.map((d, i) => (
												<Table.Row key={i}>
													<Table.Cell>{i + 1}</Table.Cell>
													<Table.Cell>{d.nama_kategori}</Table.Cell>
													<Table.Cell>{d.poin + d.poin_tambahan}</Table.Cell>
													<Table.Cell>
														{d.is_pelanggaran === 0 ? (
															<Label
																color={
																	d.minimal_poin > d.poin + d.poin_tambahan
																		? "red"
																		: "green"
																}
															/>
														) : (
															"-"
														)}
													</Table.Cell>
												</Table.Row>
											))}
										</Table.Body>
									</Table>
								</Segment>
							) : null}
						</Grid.Column>
						<Grid.Column computer={6} tablet={16} mobile={16}>
							<Detail
								loading={this.state.loading}
								context={this.context}
								nama_semester={this.state.nama_semester}
								id_semester={this.state.semesterSelected}
								id_taruna={this.state.id_taruna}
								data={this.state.detail}
								setLoad={this.context.setLoad}
							/>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>
		);
	}
}

export default DetailUsers;
