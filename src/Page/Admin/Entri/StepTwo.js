import { useState } from "react";
import {
	Button,
	Checkbox,
	Grid,
	Header,
	Icon,
	Message,
	Pagination,
	Search,
	Segment,
	Select,
	Table,
} from "semantic-ui-react";

export default function StepTwo(props) {
	const [checkBox, setCheckBox] = useState(false);
	return (
		<Segment textAlign="center" vertical>
			<Header dividing color="blue" as="h5" icon>
				<Icon name="users" />
				Pilih Taruna
				<Header.Subheader>Cari Taruna pada field di bawah ini</Header.Subheader>
			</Header>
			<Grid>
				<Grid.Column textAlign="right" computer={10} tablet={16} mobile={16}>
					<Segment vertical textAlign="left">
						<Search placeholder="Cari Taruna" icon="search" />{" "}
						<Select
							placeholder="Pilih Prodi"
							options={[
								{
									key: 1,
									value: "D4",
									text: "D4 - Petanahan",
								},
							]}
						/>{" "}
						<Select
							placeholder="Pilih Kelas"
							options={[
								{
									key: 1,
									value: "D",
									text: "Kelas D",
								},
							]}
						/>
					</Segment>
					<Table unstackable>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell>No.</Table.HeaderCell>
								<Table.HeaderCell>Nama Taruna</Table.HeaderCell>
								<Table.HeaderCell>Program Studi</Table.HeaderCell>
								<Table.HeaderCell>Status</Table.HeaderCell>
								<Table.HeaderCell textAlign="right">
									{checkBox ? (
										<Button.Group size="small">
											<Button positive>Tambahkan</Button>
											<Button
												color="orange"
												icon="x"
												basic
												onClick={() => setCheckBox(false)}
											/>
										</Button.Group>
									) : (
										<Button
											onClick={() => setCheckBox(true)}
											primary
											size="small"
											content="Pilih"
											icon="check"
											labelPosition="right"
										/>
									)}
								</Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{[1, 2, 3, 4, 5].map((i) => (
								<Table.Row key={i}>
									<Table.Cell>{i}</Table.Cell>
									<Table.Cell>156599023 - Hamid Musafa</Table.Cell>
									<Table.Cell>D4 - Kelas A</Table.Cell>
									<Table.Cell>Aktif</Table.Cell>
									<Table.Cell textAlign="right">
										{checkBox ? (
											<Checkbox fitted />
										) : (
											<Button
												floated="right"
												positive
												labelPosition="right"
												size="tiny"
												content="Tambah"
												icon="add"
											/>
										)}
									</Table.Cell>
								</Table.Row>
							))}
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
				</Grid.Column>
				<Grid.Column computer={6} tablet={16} mobile={16}>
					<Table unstackable>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell> </Table.HeaderCell>
								<Table.HeaderCell>No.</Table.HeaderCell>
								<Table.HeaderCell>Nama Taruna</Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							<Table.Row>
								<Table.Cell>
									<Button negative size="tiny" icon="trash alternate" />
								</Table.Cell>
								<Table.Cell>1</Table.Cell>
								<Table.Cell>156599023 - Hamid Musafa</Table.Cell>
							</Table.Row>
						</Table.Body>
					</Table>
				</Grid.Column>
			</Grid>
			<Segment vertical textAlign="right">
				<Button.Group>
					<Button
						basic
						negative
						icon="left arrow"
						labelPosition="left"
						onClick={() => props.prefState(0)}
						content="Kembali"
					/>
					<Button
						onClick={() => props.nextState()}
						basic
						primary
						icon="right arrow"
						labelPosition="right"
						content="Selanjutnya"
					/>
				</Button.Group>
			</Segment>
		</Segment>
	);
}
