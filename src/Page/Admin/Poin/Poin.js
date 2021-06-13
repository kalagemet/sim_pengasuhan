import md5 from "md5";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
	Segment,
	Grid,
	Header,
	Input,
	Button,
	Dropdown,
	Message,
	Icon,
	Pagination,
	Table,
	Label,
} from "semantic-ui-react";
import { ContextType } from "../../../Context";

export default class Poin extends Component {
	static contextType = ContextType;
	state = {
		loading: false,
		kategori: [],
		loadingKategori: true,
		cariKategori: "",
		loadingCariKategori: false,
		kategoriActive: "",
		riwayat: [],
	};

	componentDidMount() {
		this.context.setLoad(true);
		this.getFilterKategori();
		this.getDataTable();
	}

	getDataTable = async () => {
		this.context.setLoad(false);
	};

	getFilterKategori = async () => {
		let ts = new Date().toString();
		var formData = new FormData();
		formData.append(
			"post_data",
			JSON.stringify({
				isAuth: "logged",
				verb: "get_kategori",
				id: "admin",
				tSign: ts,
				token: md5(this.context.user.token + ts),
				special: 0,
				operation: "read",
				payload: {
					is_direct: 1,
					is_filtered: 0,
					filter: { key1: "nama_kategori" },
					term: this.state.cariKategori,
					count: "10",
					page: "1",
				},
			})
		);
		await fetch(`${process.env.REACT_APP_API_SERVER}`, {
			method: "POST",
			body: formData,
		})
			.then((response) => response.json())
			.then((response) => {
				if (this.state.cariKategori === "") {
					this.setState({ kategoriActive: "semua" });
				}
				this.setState({
					kategori: response.data,
					loadingKategori: false,
					loadingCariKategori: false,
				});
			})
			.catch((e) => console.error(e));
	};

	pilihFilter = async (value) => {
		this.setState({ kategoriActive: value, loading: true });
	};

	render() {
		return (
			<Segment textAlign="right" vertical>
				<Header textAlign="center" as="h4" dividing color="blue">
					Riwayat Poin Pengasuhan
				</Header>
				<Grid>
					<Grid.Row>
						<Grid.Column textAlign="left" computer={12} mobile={16} tablet={12}>
							<Dropdown
								disabled={this.state.loading || this.state.loadingKategori}
								loading={this.state.loadingKategori}
								text={this.state.kategoriActive}
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
											active={this.state.kategoriActive === "semua"}
											value="semua"
											text="semua"
											onClick={(e, d) => this.pilihFilter(d.value)}
											label={{
												color: "blue",
												empty: true,
												circular: false,
											}}
										/>
										<Dropdown.Item
											key="penghargaan"
											active={this.state.kategoriActive === "penghargaan"}
											value="penghargaan"
											text="penghargaan"
											onClick={(e, d) => this.pilihFilter(d.value)}
											label={{
												color: "green",
												empty: true,
												circular: false,
											}}
										/>
										<Dropdown.Item
											key="pelanggaran"
											active={this.state.kategoriActive === "pelanggaran"}
											value="pelanggaran"
											text="pelanggaran"
											onClick={(e, d) => this.pilihFilter(d.value)}
											label={{
												color: "red",
												empty: true,
												circular: false,
											}}
										/>
										<Dropdown.Header>Sub Pristiwa</Dropdown.Header>
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
														active={this.state.kategoriActive === d.id_kategori}
														value={d.id_kategori}
														text={d.nama_kategori}
														onClick={(e, d) => this.pilihFilter(d.value)}
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
							</Dropdown>{" "}
							<Input
								disabled={this.state.loading}
								placeholder="Cari "
								iconPosition="left"
								icon="search"
							/>
						</Grid.Column>
						<Grid.Column textAlign="right" computer={4} mobile={16} tablet={4}>
							<Button
								icon="add"
								labelPosition="left"
								content="Entri Poin"
								as={Link}
								to={"/entri-poin"}
								basic
								positive
							/>
						</Grid.Column>
					</Grid.Row>
				</Grid>
				{/* {this.state.riwayat.length === 0 ? (
					<Message
						warning
						style={{ textAlign: "center", margin: "50px 0 50px 0" }}
						icon="box"
						content="Tidak ada data yang ditampilkan"
					/>
				) : ( */}
				<Segment vertical loading={this.state.loading}>
					<Table unstackable>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell>No.</Table.HeaderCell>
								<Table.HeaderCell>Tanggal</Table.HeaderCell>
								<Table.HeaderCell>Pristiwa</Table.HeaderCell>
								<Table.HeaderCell>Poin</Table.HeaderCell>
								<Table.HeaderCell>Taruna</Table.HeaderCell>
								<Table.HeaderCell>Aksi</Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{/* {this.state.riwayat.map((d, i) => {
								return ( */}
							<Table.Row>
								<Table.Cell>1</Table.Cell>
								<Table.Cell>12/02/2021</Table.Cell>
								<Table.Cell>msmdndndndndnn</Table.Cell>
								<Table.Cell>
									<Label color="red">@20</Label>
								</Table.Cell>
								<Table.Cell>
									20 <Icon name="user" />
								</Table.Cell>
								<Table.Cell>
									<Button fluid animated="vertical" color="orange">
										<Button.Content visible>
											<Icon fitted name="pencil alternate" />
										</Button.Content>
										<Button.Content hidden>Edit</Button.Content>
									</Button>
								</Table.Cell>
							</Table.Row>
							{/* );
							})} */}
						</Table.Body>
					</Table>
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
				{/* )} */}
			</Segment>
		);
	}
}