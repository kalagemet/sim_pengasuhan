import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
	Button,
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
import { getRiwayatPeristiwa, getTahunAjar } from "../../../Apis/Apis";
import { ContextType } from "../../../Context";

class Riwayatperistiwa extends Component {
	static contextType = ContextType;
	constructor(props) {
		super(props);
		this.goBack = this.goBack.bind(this);
		this.state = {
			semester: [],
			semesterSelected: "",

			id_peristiwa: "",
			data: [],
			filter: "",
			loading: false,

			active_page: 1,
			total_page: 1,
			limit_page: 25,
			total_data: 0,
		};
	}

	componentDidMount() {
		this.getTahunAjar();
	}

	getTahunAjar = async () => {
		this.context.setLoad(true);
		let id = new URLSearchParams(this.props.location.search);
		this.setState({ id_peristiwa: id.get("id_peristiwa") });
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
			this.context.setLoad(false);
		});
	};

	goBack() {
		this.props.history.goBack();
	}

	getData = async () => {
		this.setState({ loading: true });
		await getRiwayatPeristiwa(
			this.context,
			this.state.id_peristiwa,
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
							"Error saat mengambil detail peristiwa",
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
						<Grid.Column computer={11} tablet={16} mobile={16}>
							<Header as="h4" textAlign="center" color="blue" dividing>
								Riwayat Peristiwa
								<Header.Subheader>156440 - Meningalkan Asrama</Header.Subheader>
							</Header>
						</Grid.Column>
						<Grid.Column computer={5} tablet={16} mobile={16} textAlign="right">
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
									color="yellow"
									content="Export"
									labelPosition="left"
									icon="share"
								/>
							</Button.Group>
						</Grid.Column>
					</Grid.Row>
				</Grid>
				<Segment textAlign="right">
					<Grid>
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
							<Input
								value={this.state.filter}
								onChange={(e, d) =>
									this.setState({ filter: d.value }, () => this.getData())
								}
								iconPosition="left"
								icon="search"
								placeholder="Cari "
							/>
						</Grid.Column>
					</Grid>
					<Table unstackable>
						{this.state.data.length > 0 ? (
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell>No.</Table.HeaderCell>
									<Table.HeaderCell>Tanggal</Table.HeaderCell>
									<Table.HeaderCell>Taruna</Table.HeaderCell>
									<Table.HeaderCell>Kelas</Table.HeaderCell>
									<Table.HeaderCell>Poin</Table.HeaderCell>
									<Table.HeaderCell>Edit Entri</Table.HeaderCell>
								</Table.Row>
							</Table.Header>
						) : null}
						<Table.Body>
							{this.state.data.map((d, i) => (
								<Table.Row key={i}>
									<Table.Cell>
										{(this.state.active_page - 1) * this.state.limit_page +
											i +
											1}
									</Table.Cell>
									<Table.Cell>{d.tanggal}</Table.Cell>
									<Table.Cell>{d.id_taruna + " - " + d.nama_taruna}</Table.Cell>
									<Table.Cell>
										{(d.prodi === "01" ? "D-I" : "D-IV") +
											" - " +
											d.angkatan +
											" " +
											d.kelas}
									</Table.Cell>
									<Table.Cell>
										{d.poin === 0 ? (
											<Label color="orange">
												{d.poin_tambahan + " Poin Tambahan"}
											</Label>
										) : (
											d.poin + " Poin"
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
			</Segment>
		);
	}
}

export default Riwayatperistiwa;
