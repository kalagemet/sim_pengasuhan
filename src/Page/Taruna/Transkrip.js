import React, { Component } from "react";
import {
	Grid,
	Header,
	Label,
	Message,
	Pagination,
	Placeholder,
	Segment,
	Select,
	Table,
} from "semantic-ui-react";
import CetakTranskrip from "../Admin/Pdf/TranskripTaruna";

const DetailTaruna = () => {
	return (
		<Segment>
			<Table
				className="responsive_table"
				unstackable
				basic="very"
				compact="very"
				celled
			>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Detail Taruna</Table.HeaderCell>
						<Table.HeaderCell>
							<CetakTranskrip
								singlepage="true"
								size="mini"
								floated="right"
								positive
								labelPosition="left"
								icon="external share"
								content="Transkrip"
							/>
						</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					<Table.Row>
						<Table.Cell>Nama Lengkap</Table.Cell>
						<Table.Cell>Dhea Emeralda Annisa</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>NIT</Table.Cell>
						<Table.Cell>20293393</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Program Studi</Table.Cell>
						<Table.Cell>D4 Pertanahan</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Status</Table.Cell>
						<Table.Cell>Aktif</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>IPS Pengasuhan</Table.Cell>
						<Table.Cell>-</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>IPK Pengasuhan</Table.Cell>
						<Table.Cell>50</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Predikat IPK</Table.Cell>
						<Table.Cell>Cukup</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Jumlah Poin</Table.Cell>
						<Table.Cell>50 Poin</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Poin Menuju Baik</Table.Cell>
						<Table.Cell>
							<Label color="yellow">+20</Label>
						</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table>
		</Segment>
	);
};

const TableView = () => {
	return (
		<Segment vertical textAlign="right">
			<Header textAlign="center" dividing>
				Riwayat Taruna
			</Header>
			<Grid className="responsive_table">
				<Grid.Row>
					<Grid.Column textAlign="left" width={8}>
						<Select
							value="2020202101"
							placeholder="Pilih semester"
							options={[
								{ key: 1, value: "2020202101", text: "2020/2021 Ganjil" },
							]}
						/>
					</Grid.Column>
					<Grid.Column textAlign="right" width={8}>
						<Select
							value="0"
							placeholder="Pilih jenis peristiwa"
							options={[
								{ key: 0, value: "0", text: "Semua" },
								{ key: 1, value: "1", text: "Penghargaan" },
								{ key: 2, value: "2", text: "Pelanggaran" },
							]}
						/>
					</Grid.Column>
				</Grid.Row>
			</Grid>
			<Table className="responsive_table" unstackable>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>No.</Table.HeaderCell>
						<Table.HeaderCell>Tanggal</Table.HeaderCell>
						<Table.HeaderCell>Kategori</Table.HeaderCell>
						<Table.HeaderCell>Peristiwa</Table.HeaderCell>
						<Table.HeaderCell>Jumlah Poin</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					<Table.Row>
						<Table.Cell>1.</Table.Cell>
						<Table.Cell>15/10/2021</Table.Cell>
						<Table.Cell>-</Table.Cell>
						<Table.Cell>Poin awal taruna</Table.Cell>
						<Table.Cell>
							<Label color="green">50</Label>
						</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table>
			<Message
				style={{ textAlign: "center", fontStyle: "italic" }}
				content="Menampilkan 1-1 dari 1"
				icon="info circle"
				info
			/>
			<Pagination
				defaultActivePage={1}
				firstItem={null}
				lastItem={null}
				pointing
				secondary
				totalPages={1}
			/>
		</Segment>
	);
};

const LoadingTable = () => {
	return (
		<Segment vertical>
			<Placeholder fluid>
				<Placeholder.Header>
					<Placeholder.Line length="full" />
					<Placeholder.Line />
				</Placeholder.Header>
				<Placeholder.Paragraph>
					<Placeholder.Image />
					<Placeholder.Image />
					<Placeholder.Image />
				</Placeholder.Paragraph>
				<Placeholder.Image />
			</Placeholder>
		</Segment>
	);
};

const LoadingDetail = () => {
	return (
		<Segment>
			<Placeholder fluid>
				<Placeholder.Header>
					<Placeholder.Line />
				</Placeholder.Header>
				<Placeholder.Paragraph>
					<Placeholder.Image />
					<Placeholder.Line length="full" />
					<Placeholder.Line length="full" />
					<Placeholder.Line length="full" />
					<Placeholder.Line length="full" />
					<Placeholder.Line length="full" />
					<Placeholder.Line length="full" />
					<Placeholder.Line length="full" />
					<Placeholder.Line length="full" />
					<Placeholder.Line length="full" />
					<Placeholder.Line length="full" />
					<Placeholder.Line length="full" />
					<Placeholder.Line length="full" />
					<Placeholder.Line length="full" />
					<Placeholder.Line length="full" />
					<Placeholder.Line length="full" />
				</Placeholder.Paragraph>
			</Placeholder>
		</Segment>
	);
};

class TranskripTaruna extends Component {
	state = {
		loadingTable: true,
		loadingDetail: true,
	};

	componentDidMount() {
		setTimeout(
			() => this.setState({ loadingDetail: false, loadingTable: false }),
			3000
		);
	}
	render() {
		return (
			<Segment vertical>
				<Header textAlign="center" color="blue" dividing>
					TRANSKRIP POIN PENGASUHAN
					<Header.Subheader>Detail Poin Pengasuhan</Header.Subheader>
				</Header>
				<Grid>
					<Grid.Row>
						<Grid.Column computer={10} tablet={16} mobile={16}>
							{this.state.loadingTable ? <LoadingTable /> : <TableView />}
						</Grid.Column>
						<Grid.Column computer={6} tablet={16} mobile={16}>
							{this.state.loadingDetail ? <LoadingDetail /> : <DetailTaruna />}
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>
		);
	}
}

export default TranskripTaruna;
