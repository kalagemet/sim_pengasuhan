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
	Table,
} from "semantic-ui-react";
import TambahPeristiwa from "./Tambah";
import LinesEllipsis from "react-lines-ellipsis";
const data = require("../../../Dummy/pelanggaran.json");
const dataTable = require("../../../Dummy/pristiwa.json");

class Pristiwa extends Component {
	state = {
		loading: true,
	};

	componentDidMount() {
		setTimeout(() => this.setState({ loading: false }), 2000);
	}

	render() {
		return (
			<Segment vertical textAlign="right">
				<Header textAlign="center" as="h5" dividing color="blue">
					PERISTIWA PENGASUHAN
					<Header.Subheader>Manajement pristiwa</Header.Subheader>
				</Header>
				<Grid columns={2}>
					<Grid.Column textAlign="left">
						<Dropdown
							text="Filter"
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
										key="semua"
										value="Semua"
										text="Semua"
										label={{
											color: "blue",
											empty: true,
											circular: false,
										}}
									/>
									<Dropdown.Item
										key="Penghargaan"
										value="Penghargaan"
										text="Penghargaan"
										label={{
											color: "green",
											empty: true,
											circular: false,
										}}
									/>
									<Dropdown.Item
										key="Pelanggaran"
										value="Pelanggaran"
										text="Pelanggaran"
										label={{
											color: "red",
											empty: true,
											circular: false,
										}}
									/>
									<Dropdown.Header>Sub Pristiwa</Dropdown.Header>
									{data[0].SubPenghargaan.map((d, i) => {
										return (
											<Dropdown.Item
												key={i}
												value={d.value}
												text={d.text}
												label={{ color: "green", empty: true, circular: true }}
											/>
										);
									})}
									{data[1].SubPelanggaran.map((d, i) => {
										return (
											<Dropdown.Item
												key={i}
												value={d.value}
												text={d.text}
												label={{ color: "red", empty: true, circular: true }}
											/>
										);
									})}
								</Dropdown.Menu>
							</Dropdown.Menu>
						</Dropdown>{" "}
						<Search placeholder="Cari " icon="search" />
					</Grid.Column>
					<Grid.Column>
						<TambahPeristiwa header="Tambah Pristiwa">
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
								<Table.HeaderCell>Nama Pristiwa</Table.HeaderCell>
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
											<Table.Cell singleLine>
												<Label
													color={
														d.kategori === 1
															? "green"
															: d.kategori === 2
															? "red"
															: "grey"
													}
												>
													{d.sub}
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
												<Button.Group icon size="tiny" fluid>
													<Button
														color="blue"
														animated="vertical"
														as={Link}
														to="/pristiwa/detail"
													>
														<Button.Content visible>
															<Icon fitted name="info" />
														</Button.Content>
														<Button.Content hidden>Detail</Button.Content>
													</Button>
													<Button
														as={Link}
														to="/pristiwa/riwayat"
														color="teal"
														animated="vertical"
													>
														<Button.Content visible>
															<Icon fitted name="history" />
														</Button.Content>
														<Button.Content hidden>Riwayat</Button.Content>
													</Button>
													<TambahPeristiwa header="Edit Pristiwa" edit data={d}>
														<Button animated="vertical" color="orange">
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

export default Pristiwa;
