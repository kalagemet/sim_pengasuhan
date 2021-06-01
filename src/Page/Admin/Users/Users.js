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

class Users extends Component {
	render() {
		return (
			<Segment textAlign="right" vertical>
				<Header textAlign="center" as="h4" dividing color="blue">
					Manajemen Penguna
					<Header.Subheader>Manajement penguna pada Sistem</Header.Subheader>
				</Header>
				<Grid>
					<Grid.Row>
						<Grid.Column textAlign="left" computer={12} mobile={16} tablet={12}>
							<Select
								placeholder="Kategori"
								options={[
									{
										key: 1,
										value: "taruna",
										text: "Taruna",
									},
									{
										key: 2,
										value: "admin",
										text: "Administrator",
									},
								]}
							/>{" "}
							<Input placeholder="Cari " iconPosition="left" icon="search" />
						</Grid.Column>
						<Grid.Column textAlign="right" computer={4} mobile={16} tablet={4}>
							<Button
								icon="add"
								labelPosition="left"
								content="Tambah"
								as={Link}
								to={"/users/tambah_taruna"}
								basic
								positive
							/>
						</Grid.Column>
					</Grid.Row>
				</Grid>
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
						<Table.Row>
							<Table.Cell>1</Table.Cell>
							<Table.Cell>15650026 - Hamid Musafa</Table.Cell>
							<Table.Cell>
								<Checkbox toggle label="Aktif" />
							</Table.Cell>
							<Table.Cell>Taruna</Table.Cell>
							<Table.Cell>D4 - 2019A</Table.Cell>
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
		);
	}
}

export default Users;
