import React, { Component } from "react";
import {
	Grid,
	Header,
	Icon,
	Input,
	Label,
	Message,
	Pagination,
	Placeholder,
	Segment,
	Select,
	Table,
} from "semantic-ui-react";
import {
	getDetailTaruna,
	getLogTaruna,
	getRekapPoin,
	getTahunAjar,
} from "../../Apis/ApisTaruna";
import { ContextType } from "../../Context";
import TranskripTaruna from "./TranskripTaruna";

const DetailTaruna = (props) => {
	return (
		<Segment>
			<Table unstackable basic="very" compact="very" celled>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Detail Penguna</Table.HeaderCell>
						<Table.HeaderCell>
							<TranskripTaruna
								disabled={props.loading || !props.transkrip}
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

const LoadingTable = () => {
	return (
		<Segment vertical>
			<Placeholder fluid>
				<Placeholder.Header>
					<Placeholder.Line length="full" />
					<Placeholder.Line />
				</Placeholder.Header>
				<Placeholder.Paragraph>
					<Placeholder.Image />
					<Placeholder.Image />
					<Placeholder.Image />
				</Placeholder.Paragraph>
				<Placeholder.Image />
			</Placeholder>
		</Segment>
	);
};

const LoadingDetail = () => {
	return (
		<Segment>
			<Placeholder fluid>
				<Placeholder.Header>
					<Placeholder.Line />
				</Placeholder.Header>
				<Placeholder.Paragraph>
					<Placeholder.Image />
					<Placeholder.Line length="full" />
					<Placeholder.Line length="full" />
					<Placeholder.Line length="full" />
					<Placeholder.Line length="full" />
					<Placeholder.Line length="full" />
					<Placeholder.Line length="full" />
					<Placeholder.Line length="full" />
					<Placeholder.Line length="full" />
					<Placeholder.Line length="full" />
					<Placeholder.Line length="full" />
					<Placeholder.Line length="full" />
					<Placeholder.Line length="full" />
					<Placeholder.Line length="full" />
					<Placeholder.Line length="full" />
					<Placeholder.Line length="full" />
				</Placeholder.Paragraph>
			</Placeholder>
		</Segment>
	);
};

class Transkrip extends Component {
	static contextType = ContextType;
	constructor(props) {
		super(props);
		this.state = {
			loadingTable: false,
			loadingDetail: false,

			detail: {},

			semester: [],
			semesterSelected: "",
			nama_semester: "",
			ips: [],
			filter: "",

			data: [],
			rekap: [],

			active_page: 1,
			total_page: 1,
			limit_page: 25,
			total_data: 0,
		};
	}

	componentDidMount() {
		this.getDetail();
	}

	getDetail = async () => {
		this.setState({ loadingDetail: true });
		await getDetailTaruna(this.context, (response) => {
			if (response.status === 200) {
				if (response.data.error_code === 0) {
					this.setState({ detail: response.data.data }, () => {
						this.getTahunAjar();
					});
				} else {
					console.log(response.data.error_msg);
					this.context.setNotify(
						"warning",
						"Error saat mengambil detail taruna",
						response.data.error_msg,
						"red"
					);
				}
			} else {
				console.error("get_detail_taruna", response.status, response.msg);
			}
			this.setState({ loadingDetail: false });
		});
	};

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
						() => {
							this.getData();
							this.getRekap();
						}
					);
				} else {
					console.log(response.data.error_msg);
				}
			} else {
				console.error("get_tahun_ajar", response.status, response.msg);
			}
		});
	};

	getData = async () => {
		this.setState({ loading: true });
		getLogTaruna(
			this.context,
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

	getRekap = async () => {
		this.context.setLoad(true);
		getRekapPoin(this.context, this.state.semesterSelected, (response) => {
			if (response.status === 200) {
				if (response.data.error_code === 0) {
					this.setState({
						rekap: response.data.data.data,
						ips: response.data.data.ips,
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
		});
	};

	render() {
		return (
			<Segment vertical>
				<Header textAlign="center" color="blue" dividing>
					TRANSKRIP POIN PENGASUHAN
					<Header.Subheader>Detail Poin Pengasuhan</Header.Subheader>
				</Header>
				<Grid>
					<Grid.Row>
						<Grid.Column computer={10} tablet={16} mobile={16}>
							{this.state.loadingTable ? (
								<LoadingTable />
							) : (
								<Segment vertical textAlign="right">
									<Header textAlign="center" dividing>
										Riwayat Taruna
									</Header>
									<Grid>
										<Grid.Row>
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
																nama_semester: e.nativeEvent.target.outerText,
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
														this.setState({ filter: d.value }, () =>
															this.getData()
														)
													}
													placeholder="Cari peristiwa"
													icon="search"
												/>
											</Grid.Column>
										</Grid.Row>
									</Grid>
									<Table unstackable>
										{this.state.data.length > 0 ? (
											<Table.Header>
												<Table.Row>
													<Table.HeaderCell>No.</Table.HeaderCell>
													<Table.HeaderCell>Nama peristiwa</Table.HeaderCell>
													<Table.HeaderCell>Semester</Table.HeaderCell>
													<Table.HeaderCell>Tanggal</Table.HeaderCell>
													<Table.HeaderCell>Kategori</Table.HeaderCell>
													<Table.HeaderCell>Jumlah Poin</Table.HeaderCell>
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
													<Table.Cell>{d.smt}</Table.Cell>
													<Table.Cell>{d.tanggal}</Table.Cell>
													<Table.Cell>
														{d.pelanggaran === 0
															? "Penghargaan"
															: "Pelanggaran"}{" "}
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
												: "Menampilkan " +
												  this.state.total_data +
												  " total data"}
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
							)}
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
							{this.state.loadingDetail ? (
								<LoadingDetail />
							) : (
								<DetailTaruna
									loading={this.state.loadingDetail}
									context={this.context}
									nama_semester={this.state.nama_semester}
									id_semester={this.state.semesterSelected}
									id_taruna={this.context.user.identity}
									data={this.state.detail}
									setLoad={this.context.setLoad}
									transkrip={this.state.data.length > 0}
								/>
							)}
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>
		);
	}
}

export default Transkrip;
