import React, { Component, forwardRef } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import {
	Segment,
	Grid,
	Header,
	Input,
	Button,
	Dropdown,
	Message,
	Pagination,
	Table,
	Label,
} from "semantic-ui-react";
import { getEntri, getKategori } from "../../../Apis/Apis";
import { ContextType } from "../../../Context";

export default class Poin extends Component {
	static contextType = ContextType;
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			kategori: [],
			loadingKategori: true,
			cariKategori: "",
			loadingCariKategori: false,
			kategoriActive: [
				{
					key: "",
					text: "semua",
				},
			],
			riwayat: [],

			dateRange: [null, null],

			active_page: 1,
			total_page: 1,
			limit_page: 25,
			total_data: 0,

			failKategori: true,
		};
	}

	formatDate(date) {
		let a = new Date(date);
		return `${("0" + a.getDate()).slice(-2)}/${("0" + (a.getMonth() + 1)).slice(
			-2
		)}/${a.getFullYear()}`;
	}

	componentDidMount() {
		this.getFilterKategori();
		this.getDataTable();
	}

	getDataTable = async () => {
		this.setState({ loading: true });
		await getEntri(
			this.context,
			this.state.kategoriActive.key,
			this.state.dateRange[0],
			this.state.dateRange[1],
			this.state.active_page,
			this.state.limit_page,
			(response) => {
				if (response.status === 200) {
					if (response.data.error_code === 0) {
						this.setState({
							active_page: response.data.data.current_page,
							riwayat: response.data.data.data,
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
					console.error("get_riwayat_entri", response.status, response.msg);
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
			() => this.getDataTable()
		);
	};

	render() {
		const [startDate, endDate] = this.state.dateRange;
		const ButtonCalendar = forwardRef(
			({ value, onClick, placeholder }, ref) => {
				return (
					<Button.Group>
						<Button
							basic
							positive
							content={
								value === ""
									? placeholder
									: this.formatDate(startDate) + " - " + value
							}
							ref={ref}
							onClick={onClick}
							icon="calendar"
							labelPosition="left"
						/>
						<Button positive icon="search" />
					</Button.Group>
				);
			}
		);
		return (
			<Segment textAlign="right" vertical className="page-content-segment">
				<Header textAlign="center" as="h4" dividing color="blue">
					Riwayat Poin Pengasuhan
				</Header>
				<Grid>
					<Grid.Row>
						<Grid.Column textAlign="left" computer={12} mobile={16} tablet={12}>
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
							<DatePicker
								disabled={this.state.loading}
								dateFormat="dd/MM/yyyy"
								selected={endDate}
								placeholderText="Pilih Rentang"
								shouldCloseOnSelect={false}
								selectsRange
								data={startDate}
								startDate={startDate}
								endDate={endDate}
								customInput={<ButtonCalendar />}
								onChange={(update) =>
									this.setState({ dateRange: update }, () =>
										this.getDataTable()
									)
								}
							/>
						</Grid.Column>
						<Grid.Column textAlign="right" computer={4} mobile={16} tablet={4}>
							<Button
								disabled={this.state.loading}
								icon="add"
								labelPosition="left"
								content="Entri Poin"
								as={Link}
								to={"/poin/entri-poin"}
								basic
								positive
							/>
						</Grid.Column>
					</Grid.Row>
				</Grid>
				{this.state.riwayat.length === 0 ? (
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
									<Table.HeaderCell>No.</Table.HeaderCell>
									<Table.HeaderCell>Tanggal</Table.HeaderCell>
									<Table.HeaderCell>Tanggal Perubahan</Table.HeaderCell>
									<Table.HeaderCell>User</Table.HeaderCell>
									<Table.HeaderCell>Detail</Table.HeaderCell>
									<Table.HeaderCell>Aksi</Table.HeaderCell>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{this.state.riwayat.map((d, i) => {
									return (
										<Table.Row key={i}>
											<Table.Cell>
												{(this.state.active_page - 1) * this.state.limit_page +
													i +
													1}
											</Table.Cell>
											<Table.Cell>{d.tanggal}</Table.Cell>
											<Table.Cell>
												{d.tanggal === d.update ? " - " : d.update}
											</Table.Cell>
											<Table.Cell>
												<Label color="orange">{d.oleh}</Label>
											</Table.Cell>
											<Table.Cell>
												{d.jml_peristiwa +
													" Peristiwa  " +
													d.jml_taruna +
													" Taruna"}
											</Table.Cell>
											<Table.Cell>
												<Button
													as={Link}
													to={"/poin/edit?id_entri=" + d.id_entri}
													fluid
													icon="edit"
													labelPosition="left"
													basic
													content="Edit"
													color="red"
												/>
											</Table.Cell>
										</Table.Row>
									);
								})}
							</Table.Body>
						</Table>
						<Message
							info
							icon="info circle"
							content={"Menampilkan total " + this.state.total_data + " Data"}
							style={{ textAlign: "center", fontStyle: "italic" }}
						/>
						<Pagination
							defaultActivePage={1}
							onPageChange={(e, d) =>
								this.setState({ active_page: d.activePage }, () =>
									this.getDataTable()
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
