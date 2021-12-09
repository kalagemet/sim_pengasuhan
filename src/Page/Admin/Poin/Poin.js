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
import { getFilterKategori } from "../../../Apis/Apis";
import { ContextType } from "../../../Context";

export default class Poin extends Component {
	static contextType = ContextType;
	state = {
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
		riwayat: [1, 2, 3, 4, 5, 6],
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
				console.error("get_kategori", response.status, response.msg);
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
			<Segment textAlign="right" vertical className="page-content-segment">
				<Header textAlign="center" as="h4" dividing color="blue">
					Riwayat Poin Pengasuhan
				</Header>
				<Grid>
					<Grid.Row>
						<Grid.Column textAlign="left" computer={12} mobile={16} tablet={12}>
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
											active={this.state.kategoriActive.key === ""}
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
								to={"/poin/entri-poin"}
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
								<Table.HeaderCell>Jml peristiwa</Table.HeaderCell>
								<Table.HeaderCell>Poin</Table.HeaderCell>
								<Table.HeaderCell>Taruna</Table.HeaderCell>
								<Table.HeaderCell>Aksi</Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{this.state.riwayat.map((i) => {
								return (
									<Table.Row key={i}>
										<Table.Cell>{i + 1}</Table.Cell>
										<Table.Cell>12/02/2021</Table.Cell>
										<Table.Cell>40 Menjadi Komandan... </Table.Cell>
										<Table.Cell>
											<Label color="red">@20</Label>
										</Table.Cell>
										<Table.Cell>
											20 <Icon name="user" />
										</Table.Cell>
										<Table.Cell>
											<Button
												as={Link}
												to="/poin/edit"
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
