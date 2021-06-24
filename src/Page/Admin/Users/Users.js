import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
	Button,
	Checkbox,
	Grid,
	Header,
	Icon,
	Input,
	Message,
	Pagination,
	Segment,
	Select,
	Table,
} from "semantic-ui-react";
import CetakTranskrip from "../Pdf/TranskripKomulatif";

const data = require("../../../Dummy/taruna.json");

class Users extends Component {
	state = {
		loading: true,
		taruna: [],
	};

	componentDidMount() {
		setTimeout(
			() => this.setState({ loading: false, taruna: [...data] }),
			2000
		);
	}

	render() {
		return (
			<Segment
				loading={this.state.loading}
				textAlign="right"
				vertical
				className="page-content-segment"
			>
				<Header textAlign="center" as="h4" dividing color="blue">
					Manajemen Penguna
					<Header.Subheader>Manajement penguna pada Sistem</Header.Subheader>
				</Header>
				<Grid>
					<Grid.Row>
						<Grid.Column textAlign="left" computer={11} mobile={16} tablet={11}>
							<Select
								placeholder="Program Studi"
								options={[
									{
										key: 1,
										value: "1",
										text: "D1 Pengukuran Kadstra;",
									},
									{
										key: 2,
										value: "2",
										text: "D4 Petanahan",
									},
								]}
							/>{" "}
							<Select
								placeholder="Kelas"
								options={[
									{
										key: 1,
										value: "taruna",
										text: "2019 A",
									},
									{
										key: 2,
										value: "admin",
										text: "2019 B",
									},
								]}
							/>{" "}
							<Input placeholder="Cari " iconPosition="left" icon="search" />
						</Grid.Column>
						<Grid.Column textAlign="right" computer={5} mobile={16} tablet={5}>
							<Button.Group>
								<CetakTranskrip
									icon="print"
									labelPosition="left"
									content="Cetak"
									basic
									color="blue"
								/>
								<Button
									icon="add"
									labelPosition="left"
									content="Tambah"
									as={Link}
									to={"/users/tambah_taruna"}
									basic
									positive
								/>
							</Button.Group>
						</Grid.Column>
					</Grid.Row>
				</Grid>
				{this.state.taruna.length === 0 ? (
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
									<Table.HeaderCell>Nama User</Table.HeaderCell>
									<Table.HeaderCell>Status</Table.HeaderCell>
									<Table.HeaderCell>Level</Table.HeaderCell>
									<Table.HeaderCell>Detail</Table.HeaderCell>
									<Table.HeaderCell>Aksi</Table.HeaderCell>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{this.state.taruna.map((d, i) => {
									return (
										<Table.Row key={i}>
											<Table.Cell>{i + 1}</Table.Cell>
											<Table.Cell>
												{d.id} - {d.nama}
											</Table.Cell>
											<Table.Cell>
												<Checkbox checked toggle label="Aktif" />
											</Table.Cell>
											<Table.Cell>{d.prodi}</Table.Cell>
											<Table.Cell>Kelas {d.kelas}</Table.Cell>
											<Table.Cell>
												<Button.Group icon size="tiny" fluid>
													<Button
														color="blue"
														animated="vertical"
														as={Link}
														to="/users/detail"
													>
														<Button.Content visible>
															<Icon fitted name="info" />
														</Button.Content>
														<Button.Content hidden>Detail</Button.Content>
													</Button>
													<Button animated="vertical" color="orange">
														<Button.Content visible>
															<Icon fitted name="pencil alternate" />
														</Button.Content>
														<Button.Content hidden>Edit</Button.Content>
													</Button>
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
				)}
			</Segment>
		);
	}
}

export default Users;
