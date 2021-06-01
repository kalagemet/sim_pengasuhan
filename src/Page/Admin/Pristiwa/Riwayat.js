import React, { Component } from "react";
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

class RiwayatPristiwa extends Component {
	constructor(props) {
		super(props);
		this.goBack = this.goBack.bind(this);
	}

	goBack() {
		this.props.history.goBack();
	}

	render() {
		return (
			<Segment vertical>
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
								options={[
									{ key: 1, value: "2020202101", text: "2020/2021 Ganjil" },
								]}
							/>{" "}
							<Input iconPosition="left" icon="search" placeholder="Cari " />
						</Grid.Column>
					</Grid>
					<Table unstackable>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell>No.</Table.HeaderCell>
								<Table.HeaderCell>Tanggal</Table.HeaderCell>
								<Table.HeaderCell>Jumlah</Table.HeaderCell>
								<Table.HeaderCell>Poin</Table.HeaderCell>
								<Table.HeaderCell>Detail</Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							<Table.Row>
								<Table.Cell>1</Table.Cell>
								<Table.Cell>20/20/2021 - 13.00</Table.Cell>
								<Table.Cell>20 Taruna</Table.Cell>
								<Table.Cell>
									<Label color="red">-50 / Taruna</Label>
								</Table.Cell>
								<Table.Cell>
									<Button size="mini" basic primary animated>
										<Button.Content hidden>
											<Icon name="arrow right" />
										</Button.Content>
										<Button.Content visible>Lihat</Button.Content>
									</Button>
								</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell>2</Table.Cell>
								<Table.Cell>20/20/2021 - 13.00</Table.Cell>
								<Table.Cell>20 Taruna</Table.Cell>
								<Table.Cell>
									<Label color="red">-50 / Taruna</Label>
								</Table.Cell>
								<Table.Cell>
									<Button size="mini" basic primary animated>
										<Button.Content hidden>
											<Icon name="arrow right" />
										</Button.Content>
										<Button.Content visible>Lihat</Button.Content>
									</Button>
								</Table.Cell>
							</Table.Row>
						</Table.Body>
					</Table>
					<Message
						info
						icon="info circle"
						content="Menampilkan 21-30 dari 40 data"
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
			</Segment>
		);
	}
}

export default RiwayatPristiwa;
