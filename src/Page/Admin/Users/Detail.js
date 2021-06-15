import React, { Component } from "react";
import {
	Button,
	Grid,
	Header,
	Input,
	Message,
	Pagination,
	Segment,
	Select,
	Table,
	Label,
} from "semantic-ui-react";
import { ContextType } from "../../../Context";

const Detail = (props) => {
	return (
		<Segment>
			<Table unstackable basic="very" compact="very" celled>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Detail Penguna</Table.HeaderCell>
						<Table.HeaderCell>
							<Button
								onClick={() => {
									props.setLoad(true);
									setTimeout(() => {
										props.setLoad(false);
										window.open("/transkrip.html", "_blank");
									}, 2000);
								}}
								floated="right"
								basic
								positive
								labelPosition="left"
								icon="file"
								content="Transkrip"
							/>
						</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					<Table.Row>
						<Table.Cell>Nama Penguna</Table.Cell>
						<Table.Cell>15650026 - Hamid Musafa</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Status</Table.Cell>
						<Table.Cell>
							<Label color="green">Aktif</Label>
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>NIT</Table.Cell>
						<Table.Cell>15650026</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Program Studi</Table.Cell>
						<Table.Cell>D4 Petanahan</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>IPS Pengasuhan</Table.Cell>
						<Table.Cell>55</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Predikat IPS</Table.Cell>
						<Table.Cell>Cukup</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>IPK Pengasuhan</Table.Cell>
						<Table.Cell>55</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Predikat IPK</Table.Cell>
						<Table.Cell>Cukup</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Jumlah Poin</Table.Cell>
						<Table.Cell>70 Poin</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table>
		</Segment>
	);
};

class DetailUsers extends Component {
	static contextType = ContextType;

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
						<Grid.Column computer={10} tablet={16} mobile={16}>
							<Header as="h4" textAlign="center" color="blue" dividing>
								Detail Pengguna
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
								<Header textAlign="center" as="h4">
									Daftar Entri peristiwa
								</Header>
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
										<Input placeholder="Cari peristiwa" icon="search" />
									</Grid.Column>
								</Grid>
								<Table unstackable>
									<Table.Header>
										<Table.Row>
											<Table.HeaderCell>No.</Table.HeaderCell>
											<Table.HeaderCell>Nama peristiwa</Table.HeaderCell>
											<Table.HeaderCell>Tanggal</Table.HeaderCell>
											<Table.HeaderCell>Jumlah Poin</Table.HeaderCell>
											<Table.HeaderCell>Aksi</Table.HeaderCell>
										</Table.Row>
									</Table.Header>
									<Table.Body>
										<Table.Row>
											<Table.Cell>1</Table.Cell>
											<Table.Cell>15650026 - Meningalakan Asrama</Table.Cell>
											<Table.Cell>20/20/2021 - 13.00</Table.Cell>
											<Table.Cell>
												<Label color="red">-20</Label>
											</Table.Cell>
											<Table.Cell>
												<Button
													primary
													basic
													size="tiny"
													content="Detail"
													icon="info circle"
													labelPosition="right"
												/>
											</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell>2</Table.Cell>
											<Table.Cell>
												15650026 - Menjadi Komandan
												<Label size="tiny" color="yellow">
													Poin Tambahan
												</Label>
											</Table.Cell>
											<Table.Cell>20/20/2021 - 13.00</Table.Cell>
											<Table.Cell>
												<Label color="blue">+20</Label>
											</Table.Cell>
											<Table.Cell>
												<Button
													primary
													basic
													size="tiny"
													content="Detail"
													icon="info circle"
													labelPosition="right"
												/>
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
						</Grid.Column>
						<Grid.Column computer={6} tablet={16} mobile={16}>
							<Detail setLoad={this.context.setLoad} />
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>
		);
	}
}

export default DetailUsers;
