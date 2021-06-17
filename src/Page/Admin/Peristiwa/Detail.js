import React, { Component } from "react";
import {
	Button,
	Grid,
	Header,
	Input,
	Label,
	Message,
	Pagination,
	Segment,
	Select,
	Table,
} from "semantic-ui-react";

const Detail = () => {
	return (
		<Segment>
			<Table unstackable basic="very" compact="very" celled>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Detail peristiwa</Table.HeaderCell>
						<Table.HeaderCell>
							<Button
								size="mini"
								floated="right"
								positive
								labelPosition="left"
								icon="print"
								content="Print"
							/>
						</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					<Table.Row>
						<Table.Cell>Nama peristiwa</Table.Cell>
						<Table.Cell>Meninggalkan Asrama</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Jenis Poin</Table.Cell>
						<Table.Cell>
							<Label color="red">Pelanggaran</Label>
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Jumlah Poin</Table.Cell>
						<Table.Cell>
							<Label color="red">-50</Label>
						</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table>
		</Segment>
	);
};

class Detailperistiwa extends Component {
	constructor(props) {
		super(props);
		this.goBack = this.goBack.bind(this);
	}

	goBack() {
		this.props.history.goBack();
	}

	render() {
		return (
			<Segment vertical className="page-content-segment">
				<Grid>
					<Grid.Row>
						<Grid.Column computer={10} tablet={16} mobile={16}>
							<Header as="h4" textAlign="center" color="blue" dividing>
								Detail Peristiwa
							</Header>
						</Grid.Column>
						<Grid.Column computer={6} tablet={16} mobile={16} textAlign="right">
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
									labelPosition="left"
									color="orange"
									content="Edit"
									icon="pencil"
								/>
								<Button
									labelPosition="left"
									negative
									content="Hapus"
									icon="trash alternate"
								/>
							</Button.Group>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column computer={10} tablet={16} mobile={16}>
							<Segment textAlign="right">
								<Grid columns={1}>
									<Grid.Column textAlign="left">
										<Select
											placeholder="Pilih semester"
											options={[
												{
													key: 1,
													value: "2020202101",
													text: "2020/2021 Ganjil",
												},
											]}
										/>{" "}
										<Input placeholder="Cari Taruna" icon="search" />
									</Grid.Column>
								</Grid>
								<Table unstackable>
									<Table.Header>
										<Table.Row>
											<Table.HeaderCell>No.</Table.HeaderCell>
											<Table.HeaderCell>Taruna Penerima</Table.HeaderCell>
											<Table.HeaderCell>Tanggal</Table.HeaderCell>
										</Table.Row>
									</Table.Header>
									<Table.Body>
										<Table.Row>
											<Table.Cell>1</Table.Cell>
											<Table.Cell>15650026 - Hamid Musafa</Table.Cell>
											<Table.Cell>20/20/2021 - 13.00</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell>2</Table.Cell>
											<Table.Cell>15650026 - Hamid Musafa</Table.Cell>
											<Table.Cell>20/20/2021 - 13.00</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell>3</Table.Cell>
											<Table.Cell>15650026 - Hamid Musafa</Table.Cell>
											<Table.Cell>20/20/2021 - 13.00</Table.Cell>
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
						</Grid.Column>
						<Grid.Column computer={6} tablet={16} mobile={16}>
							<Detail />
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>
		);
	}
}

export default Detailperistiwa;
