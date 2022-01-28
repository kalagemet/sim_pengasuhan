import React, { Component } from "react";
import {
	Button,
	Grid,
	Header,
	Icon,
	Label,
	Message,
	Pagination,
	Segment,
	Select,
	Table,
} from "semantic-ui-react";
import {
	getDetailPeristiwa,
	getLogPeristiwa,
	getTahunAjar,
} from "../../../Apis/Apis";
import { ContextType } from "../../../Context";

const Detail = (props) => {
	return (
		<Segment>
			<Table unstackable basic="very" compact="very" celled>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Detail peristiwa</Table.HeaderCell>
						<Table.HeaderCell>
							<Button
								disabled
								size="mini"
								floated="right"
								positive
								labelPosition="left"
								icon="print"
								content="Print"
							/>
						</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					<Table.Row>
						<Table.Cell>Nama peristiwa</Table.Cell>
						<Table.Cell>{props.data.nama_peristiwa}</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Jenis Poin</Table.Cell>
						<Table.Cell>
							<Label color={props.data.pelanggaran === 0 ? "green" : "red"}>
								{props.data.pelanggaran === 0 ? "Penghargaan" : "Pelanggaran"}
							</Label>
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Jumlah Poin</Table.Cell>
						<Table.Cell>
							<Label
								color={
									props.data.poin_tambahan === 1
										? "orange"
										: props.data.pelanggaran === 0
										? "green"
										: "red"
								}
							>
								{props.data.poin_tambahan === 1
									? "Poin Tambahan"
									: props.data.poin + " Poin"}
							</Label>
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>kategori</Table.Cell>
						<Table.Cell>{props.data.nama_kategori}</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table>
		</Segment>
	);
};

class Detailperistiwa extends Component {
	static contextType = ContextType;
	constructor(props) {
		super(props);
		this.state = {
			id_peristiwa: "",
			detail: {},

			semester: [],
			semesterSelected: "",

			data: [],
			loading: false,

			active_page: 1,
			total_page: 1,
			limit_page: 25,
			total_data: 0,
		};
		this.goBack = this.goBack.bind(this);
	}

	goBack() {
		this.props.history.goBack();
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
					this.setState(
						{
							semesterSelected: active.id,
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

	getData = async () => {
		this.setState({ loading: true });
		await getLogPeristiwa(
			this.context,
			this.state.id_peristiwa,
			this.state.semesterSelected,
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
							"Error saat mengambil detail entri peristiwa",
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

	getDetail = async () => {
		this.context.setLoad(true);
		let id = new URLSearchParams(this.props.location.search);
		this.setState({ id_peristiwa: id.get("id_peristiwa") });
		await getDetailPeristiwa(
			this.context,
			id.get("id_peristiwa"),
			(response) => {
				if (response.status === 200) {
					if (response.data.error_code === 0) {
						this.setState({ detail: response.data.data }, () =>
							this.getTahunAjar()
						);
					} else {
						console.log(response.data.error_msg);
						this.context.setNotify(
							"warning",
							"Error saat mengambil detail peristiwa",
							response.data.error_msg,
							"red"
						);
						this.goBack();
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
				<Grid>
					<Grid.Row>
						<Grid.Column computer={10} tablet={16} mobile={16}>
							<Header as="h4" textAlign="center" color="blue" dividing>
								Detail Peristiwa
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
													{ semesterSelected: d.value, active_page: 1 },
													() => this.getData()
												)
											}
										/>{" "}
										{/* <Input placeholder="Cari Taruna" icon="search" /> */}
									</Grid.Column>
								</Grid>
								<Table unstackable>
									{this.state.data.length > 0 ? (
										<Table.Header>
											<Table.Row>
												<Table.HeaderCell>No.</Table.HeaderCell>
												<Table.HeaderCell>Taruna Penerima</Table.HeaderCell>
												<Table.HeaderCell>Tanggal</Table.HeaderCell>
												<Table.HeaderCell>Detail</Table.HeaderCell>
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
												<Table.Cell>
													{d.jml_taruna +
														" / " +
														d.jml_peristiwa +
														" Peristiwa"}
												</Table.Cell>
												<Table.Cell>{d.tanggal}</Table.Cell>
												<Table.Cell>{d.detail}</Table.Cell>
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
						</Grid.Column>
						<Grid.Column computer={6} tablet={16} mobile={16}>
							<Detail data={this.state.detail} />
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>
		);
	}
}

export default Detailperistiwa;
