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
			<Table unstackable basic="very" compact="very" celled>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Detail Taruna</Table.HeaderCell>
						<Table.HeaderCell>
							<CetakTranskrip
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
						<Table.Cell>Hamid Musafa</Table.Cell>
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
						<Table.Cell>Status</Table.Cell>
						<Table.Cell>Aktif</Table.Cell>
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
					<Table.Row>
						<Table.Cell>Poin Menuju Baik</Table.Cell>
						<Table.Cell>
							<Label color="yellow">+5</Label>
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
			<Grid>
				<Grid.Row>
					<Grid.Column textAlign="left" width={8}>
						<Select
							placeholder="Pilih semester"
							options={[
								{ key: 1, value: "2020202101", text: "2020/2021 Ganjil" },
							]}
						/>
					</Grid.Column>
					<Grid.Column textAlign="right" width={8}>
						<Select
							placeholder="Pilih jenis peristiwa"
							options={[{ key: 1, value: "1", text: "Penghargaan" }]}
						/>
					</Grid.Column>
				</Grid.Row>
			</Grid>
			<Table unstackable>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>No.</Table.HeaderCell>
						<Table.HeaderCell>Tanggal</Table.HeaderCell>
						<Table.HeaderCell>peristiwa</Table.HeaderCell>
						<Table.HeaderCell>Jumlah Poin</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					<Table.Row>
						<Table.Cell>1.</Table.Cell>
						<Table.Cell>20/02/2021</Table.Cell>
						<Table.Cell>Keluar dari Asrama</Table.Cell>
						<Table.Cell>
							<Label color="red">-10</Label>
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>1.</Table.Cell>
						<Table.Cell>20/02/2021</Table.Cell>
						<Table.Cell>Keluar dari Asrama</Table.Cell>
						<Table.Cell>
							<Label color="blue">+10</Label>
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>1.</Table.Cell>
						<Table.Cell>20/02/2021</Table.Cell>
						<Table.Cell>Keluar dari Asrama</Table.Cell>
						<Table.Cell>
							<Label color="red">-10</Label>
						</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table>
			<Message
				style={{ textAlign: "center", fontStyle: "italic" }}
				content="Menampilkan 1-10 dari 100"
				icon="info circle"
				info
			/>
			<Pagination
				defaultActivePage={1}
				firstItem={null}
				lastItem={null}
				pointing
				secondary
				totalPages={10}
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
