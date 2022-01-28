import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
	Button,
	Dropdown,
	Grid,
	Header,
	Icon,
	Label,
	Message,
	Pagination,
	Popup,
	Segment,
	Input,
	Table,
	Confirm,
} from "semantic-ui-react";
import TambahPeristiwa from "./Tambah";
import LinesEllipsis from "react-lines-ellipsis";
import { ContextType } from "../../../Context";
import {
	getKategori,
	getPeristiwa as GetPeristiwa,
	hapusPeristiwa,
} from "../../../Apis/Apis";

class peristiwa extends Component {
	static contextType = ContextType;
	constructor(props) {
		super(props);
		this.getPeristiwa = this.getPeristiwa.bind(this);
		this.state = {
			loading: true,
			kategori: [],
			loadingKategori: true,
			cariKategori: "",
			cariPeristiwa: "",
			loadingCariKategori: false,
			kategoriActive: [
				{
					key: "semua",
					text: "semua",
				},
			],
			failKategori: true,

			data: [],

			active_page: 1,
			total_page: 1,
			limit_page: 25,
			total_data: 0,

			konfirmasi_hapus: false,
			hapus_pristiwa: "",
		};
	}

	componentDidMount() {
		this.getFilterKategori();
		this.getPeristiwa();
	}

	getPeristiwa = async () => {
		this.setState({ loading: true });
		await GetPeristiwa(
			this.context,
			this.state.kategoriActive.key,
			this.state.cariPeristiwa,
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
							"Error saat mengambil data",
							response.data.error_msg,
							"orange"
						);
					}
				} else {
					console.error("get_tahun_ajar", response.status, response.msg);
				}
				this.setState({ loading: false });
			}
		);
	};

	getFilterKategori = async () => {
		this.setState({
			failKategori: false,
			loadingKategori: true,
			loadingCariKategori: true,
		});
		await getKategori(this.context, this.state.cariKategori, (response) => {
			if (response.status === 200) {
				if (response.data.error_code === 0) {
					if (this.state.cariKategori === "") {
						this.setState({ kategoriActive: { text: "semua", key: "" } });
					}
					this.setState({
						kategori: response.data.data,
						loadingKategori: false,
						loadingCariKategori: false,
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
				console.error("get_kategori_peristiwa", response.status, response.msg);
				this.setState({ failKategori: true });
			}
		});
	};

	pilihFilter = async (value) => {
		this.setState(
			{
				kategoriActive: { key: value.value, text: value.text },
				loading: true,
			},
			() => this.getPeristiwa()
		);
	};

	deletePeristiwa = async () => {
		this.setState({ konfirmasi_hapus: false });
		this.context.setLoad(true);
		if (this.state.hapus_pristiwa !== "") {
			await hapusPeristiwa(
				this.context,
				this.state.hapus_pristiwa,
				(response) => {
					if (response.status === 200) {
						if (response.data.error_code === 0) {
							this.context.setNotify(
								"check circle outline",
								"Menghapus Peristiwa",
								response.data.data,
								"green"
							);
							this.getPeristiwa();
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
						console.error(
							"get_kategori_peristiwa",
							response.status,
							response.msg
						);
						this.context.setNotify(
							"warning",
							response.status,
							response.msg,
							"red"
						);
					}
				}
			);
			this.context.setLoad(false);
		}
	};

	render() {
		return (
			<Segment vertical textAlign="right" className="page-content-segment">
				<Header textAlign="center" as="h5" dividing color="blue">
					PERISTIWA PENGASUHAN
					<Header.Subheader>Manajement peristiwa</Header.Subheader>
				</Header>
				<Confirm
					size="tiny"
					content={
						<Header style={{ margin: 40 }} as="h1" icon>
							<Icon name="help" color="green" />
							Anda yakin ?
							<Header.Subheader>
								Peristiwa tidak akan bisa ditambahkan lagi pada taruna, tapi
								masih berdampak pada taruna yang pernah mendapatkannya
							</Header.Subheader>
						</Header>
					}
					confirmButton="Ya, Hapus Peristiwa !"
					cancelButton="Batal"
					open={this.state.konfirmasi_hapus}
					onCancel={() =>
						this.setState({ konfirmasi_hapus: false, hapus_pristiwa: "" })
					}
					onConfirm={() => this.deletePeristiwa()}
				/>
				<Grid columns={2}>
					<Grid.Column textAlign="left">
						{this.state.failKategori ? (
							<Button
								onClick={() => this.getFilterKategori()}
								icon="redo"
								content="Gagal..."
							/>
						) : (
							<Dropdown
								disabled={this.state.loading || this.state.loadingKategori}
								loading={this.state.loadingKategori}
								text={this.state.kategoriActive.text}
								icon="filter"
								floating
								labeled
								button
								className="icon"
							>
								<Dropdown.Menu>
									<Dropdown.Menu scrolling>
										<Dropdown.Header>Kategori</Dropdown.Header>
										<Dropdown.Item
											key=""
											active={this.state.kategoriActive.key === "semua"}
											value=""
											text="semua"
											onClick={(e, d) => this.pilihFilter(d)}
											label={{
												color: "blue",
												empty: true,
												circular: false,
											}}
										/>
										<Dropdown.Item
											key="penghargaan"
											active={this.state.kategoriActive.key === "penghargaan"}
											value="penghargaan"
											text="penghargaan"
											onClick={(e, d) => this.pilihFilter(d)}
											label={{
												color: "green",
												empty: true,
												circular: false,
											}}
										/>
										<Dropdown.Item
											key="pelanggaran"
											active={this.state.kategoriActive.key === "pelanggaran"}
											value="pelanggaran"
											text="pelanggaran"
											onClick={(e, d) => this.pilihFilter(d)}
											label={{
												color: "red",
												empty: true,
												circular: false,
											}}
										/>
										<Dropdown.Header>Sub peristiwa</Dropdown.Header>
										<Input
											focus
											onClick={(e) => e.stopPropagation()}
											loading={this.state.loadingCariKategori}
											onChange={(e, d) =>
												this.setState(
													{
														cariKategori: d.value,
														loadingCariKategori: true,
													},
													this.getFilterKategori
												)
											}
											icon="search"
											iconPosition="left"
											className="search"
										/>
										{this.state.kategori.length === 0 ? (
											<Dropdown.Item key={0} text="Tidak ada data" disabled />
										) : (
											this.state.kategori.map((d, i) => {
												return (
													<Dropdown.Item
														key={i}
														active={this.state.kategoriActive.key === d.id}
														value={d.id}
														text={d.nama_kategori}
														onClick={(e, d) => this.pilihFilter(d)}
														label={{
															color: d.pelanggaran === 1 ? "red" : "green",
															empty: true,
															circular: true,
														}}
													/>
												);
											})
										)}
									</Dropdown.Menu>
								</Dropdown.Menu>
							</Dropdown>
						)}{" "}
						<Input
							placeholder="Cari "
							value={this.state.cariPeristiwa}
							onChange={(e, d) =>
								this.setState({ cariPeristiwa: d.value }, () =>
									this.getPeristiwa()
								)
							}
							icon="search"
						/>
					</Grid.Column>
					<Grid.Column>
						<TambahPeristiwa
							context={this.context}
							data={this.state.kategori}
							header="Tambah peristiwa"
							onFinish={this.getPeristiwa}
						>
							<Button
								content="Tambah"
								icon="plus"
								labelPosition="left"
								basic
								positive
							/>
						</TambahPeristiwa>
					</Grid.Column>
				</Grid>
				<Segment vertical>
					<Table striped unstackable>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell>No.</Table.HeaderCell>
								<Table.HeaderCell>Nama Peristiwa</Table.HeaderCell>
								<Table.HeaderCell>Kategori</Table.HeaderCell>
								<Table.HeaderCell>Poin</Table.HeaderCell>
								<Table.HeaderCell>Aksi</Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{this.state.loading || this.state.data.length === 0 ? (
								<Table.Row></Table.Row>
							) : (
								this.state.data.map((d, i) => {
									return (
										<Table.Row key={i}>
											<Table.Cell>
												{(this.state.active_page - 1) * this.state.limit_page +
													i +
													1}
											</Table.Cell>
											<Table.Cell>{d.nama_peristiwa}</Table.Cell>
											<Table.Cell>
												<Label color={d.pelanggaran === 1 ? "red" : "green"}>
													<Popup
														hoverable
														content={d.nama_kategori}
														trigger={
															<LinesEllipsis
																text={d.nama_kategori}
																maxLine={2}
																ellipsis={" ... "}
																trimRight
																basedOn="letters"
															/>
														}
													/>
												</Label>
											</Table.Cell>
											<Table.Cell>
												{d.poin_tambahan === 1 ? (
													<Label color="orange">Poin Tambahan</Label>
												) : (
													d.poin + " Poin"
												)}
											</Table.Cell>
											<Table.Cell>
												<Button.Group icon size="tiny" fluid>
													<Button
														size="tiny"
														color="blue"
														animated="vertical"
														as={Link}
														to={"/peristiwa/detail?id_peristiwa=" + d.id}
													>
														<Button.Content visible>
															<Icon fitted name="info" />
														</Button.Content>
														<Button.Content hidden>Detail</Button.Content>
													</Button>
													<Button
														size="tiny"
														as={Link}
														to={"/peristiwa/riwayat?id_peristiwa=" + d.id}
														color="teal"
														animated="vertical"
													>
														<Button.Content visible>
															<Icon fitted name="history" />
														</Button.Content>
														<Button.Content hidden>Riwayat</Button.Content>
													</Button>
													<TambahPeristiwa
														header="Edit peristiwa"
														edit
														context={this.context}
														data={this.state.kategori}
														onFinish={this.getPeristiwa}
														record={d}
													>
														<Button
															size="tiny"
															animated="vertical"
															color="orange"
														>
															<Button.Content visible>
																<Icon fitted name="pencil alternate" />
															</Button.Content>
															<Button.Content hidden>Edit</Button.Content>
														</Button>
													</TambahPeristiwa>
													<Button
														onClick={() =>
															this.setState({
																konfirmasi_hapus: true,
																hapus_pristiwa: d.id,
															})
														}
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
								})
							)}
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
									this.getPeristiwa()
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

export default peristiwa;
