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
	Search,
	Segment,
	Input,
	Table,
} from "semantic-ui-react";
import TambahPeristiwa from "./Tambah";
import LinesEllipsis from "react-lines-ellipsis";
import { ContextType } from "../../../Context";
import { getFilterKategori } from "../../../Apis/Apis";
const data = require("../../../Dummy/pelanggaran.json");
const dataTable = require("../../../Dummy/peristiwa.json");

class peristiwa extends Component {
	static contextType = ContextType;
	state = {
		loading: true,
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
		failKategori: true,
	};

	componentDidMount() {
		setTimeout(() => this.setState({ loading: false }), 2000);
		this.getFilterKategori();
	}

	getFilterKategori = async () => {
		this.setState({
			failKategori: false,
			loadingKategori: true,
			loadingCariKategori: true,
		});
		getFilterKategori(this.context, this.state.cariKategori, (response) => {
			if (response.status === 200) {
				if (this.state.cariKategori === "") {
					this.setState({ kategoriActive: { text: "semua", key: "" } });
				}
				this.setState({
					kategori: response.data.data,
					loadingKategori: false,
					loadingCariKategori: false,
				});
			} else {
				this.setState({ failKategori: true });
			}
		});
	};

	pilihFilter = async (value) => {
		this.setState({
			kategoriActive: { key: value.value, text: value.text },
			loading: true,
		});
	};

	render() {
		return (
			<Segment vertical textAlign="right" className="page-content-segment">
				<Header textAlign="center" as="h5" dividing color="blue">
					PERISTIWA PENGASUHAN
					<Header.Subheader>Manajement peristiwa</Header.Subheader>
				</Header>
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
											this.state.kategori.map((d) => {
												return (
													<Dropdown.Item
														key={d.id_kategori}
														active={
															this.state.kategoriActive.key === d.id_kategori
														}
														value={d.id_kategori}
														text={d.nama_kategori}
														onClick={(e, d) => this.pilihFilter(d)}
														label={{
															color: d.is_penghargaan === "1" ? "green" : "red",
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
						<Search placeholder="Cari " icon="search" />
					</Grid.Column>
					<Grid.Column>
						<TambahPeristiwa header="Tambah peristiwa">
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
				<Segment loading={this.state.loading} vertical>
					<Table striped celled unstackable>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell>No.</Table.HeaderCell>
								<Table.HeaderCell>Tanggal</Table.HeaderCell>
								<Table.HeaderCell>Kategori</Table.HeaderCell>
								<Table.HeaderCell>Nama peristiwa</Table.HeaderCell>
								<Table.HeaderCell>Aksi</Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{this.state.loading ? (
								<Table.Row></Table.Row>
							) : (
								dataTable.map((d, i) => {
									return (
										<Table.Row key={i}>
											<Table.Cell>{i + 1}</Table.Cell>
											<Table.Cell>12/12/2021</Table.Cell>
											<Table.Cell>
												<Label
													color={
														d.kategori === 1
															? "green"
															: d.kategori === 2
															? "red"
															: "grey"
													}
												>
													<Popup
														hoverable
														content={d.sub}
														trigger={
															<LinesEllipsis
																text={d.sub}
																maxLine={1}
																ellipsis={" ... "}
																trimRight
																basedOn="letters"
															/>
														}
													/>
												</Label>
											</Table.Cell>
											<Table.Cell>
												<Popup
													hoverable
													content={d.nama}
													trigger={
														<LinesEllipsis
															text={d.nama}
															maxLine={2}
															ellipsis={" ... "}
															trimRight
															basedOn="letters"
														/>
													}
												/>
											</Table.Cell>
											<Table.Cell>
												{/* <Button.Group icon size="tiny" fluid> */}
												<Button
													size="tiny"
													color="blue"
													animated="vertical"
													as={Link}
													to="/peristiwa/detail"
												>
													<Button.Content visible>
														<Icon fitted name="info" />
													</Button.Content>
													<Button.Content hidden>Detail</Button.Content>
												</Button>
												<Button
													size="tiny"
													as={Link}
													to="/peristiwa/riwayat"
													color="teal"
													animated="vertical"
												>
													<Button.Content visible>
														<Icon fitted name="history" />
													</Button.Content>
													<Button.Content hidden>Riwayat</Button.Content>
												</Button>
												<TambahPeristiwa header="Edit peristiwa" edit data={d}>
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
												<Button animated="vertical" color="red">
													<Button.Content visible>
														<Icon fitted name="trash alternate" />
													</Button.Content>
													<Button.Content hidden>Hapus</Button.Content>
												</Button>
												{/* </Button.Group> */}
											</Table.Cell>
										</Table.Row>
									);
								})
							)}
						</Table.Body>
					</Table>

					<Message
						info
						icon="info circle"
						content={
							data.length === 0
								? "Tidak ada data yang dapat ditampilkan"
								: "Menampilkan 1-20 dari 200 Data"
						}
						style={{ textAlign: "center", fontStyle: "italic" }}
					/>
					{data.length !== 0 ? (
						<Pagination
							onPageChange={() =>
								this.setState({ loading: true }, () =>
									setTimeout(() => this.setState({ loading: false }), 2000)
								)
							}
							defaultActivePage={1}
							firstItem={null}
							lastItem={null}
							pointing
							secondary
							totalPages={3}
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
