import React, { Component } from "react";
import {
	Header,
	Segment,
	Tab,
	Placeholder,
	Table,
	Message,
	Pagination,
	Select,
	Popup,
} from "semantic-ui-react";
import LinesEllipsis from "react-lines-ellipsis";

const KAT_PENGHARGAAN = require("../../Dummy/JSON/KAT_PENGHARGAAN.json");
const PENGHARGAAN = require("../../Dummy/JSON/PENGHARGAAN.json");
const KAT_PELANGGARAN = require("../../Dummy/JSON/KAT_PELANGGARAN.json");
const PELANGGARAN = require("../../Dummy/JSON/PELANGGARAN.json");

const TableView = (props) => {
	if (props.loading) {
		return <LoadingTable />;
	} else {
		return (
			<Segment vertical textAlign="right">
				<Select
					value="2020202101"
					placeholder="Kategori"
					options={props.kategori || []}
				/>
				<Table className="responsive_table" unstackable>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>No.</Table.HeaderCell>
							<Table.HeaderCell>Kategori</Table.HeaderCell>
							<Table.HeaderCell>{props.header}</Table.HeaderCell>
							<Table.HeaderCell singleLine>Jumlah Poin</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{props.data.length > 0 && props.header === "Penghargaan" ? (
							props.data.map((d, i) => {
								return (
									<Table.Row key={i}>
										<Table.Cell>{i + 1}.</Table.Cell>
										<Table.Cell>
											<Popup
												hoverable
												content={d.nama}
												trigger={
													<LinesEllipsis
														text={d.kat}
														maxLine={1}
														ellipsis={" ... "}
														trimRight
														basedOn="letters"
													/>
												}
											/>
										</Table.Cell>
										<Table.Cell>
											<Popup
												hoverable
												content={d.nama}
												trigger={
													<LinesEllipsis
														text={d.nama}
														maxLine={1}
														ellipsis={" ... "}
														trimRight
														basedOn="letters"
													/>
												}
											/>
										</Table.Cell>
										<Table.Cell>{d.poin}</Table.Cell>
									</Table.Row>
								);
							})
						) : props.data.length > 0 && props.header === "Pelanggaran" ? (
							props.data.map((d, i) => {
								return (
									<Table.Row key={i}>
										<Table.Cell>{i + 1}.</Table.Cell>
										<Table.Cell>
											<Popup
												hoverable
												content={d.kat}
												trigger={
													<LinesEllipsis
														text={d.jenis + " - " + d.kat}
														maxLine={1}
														ellipsis={" ... "}
														trimRight
														basedOn="letters"
													/>
												}
											/>
										</Table.Cell>
										<Table.Cell>
											<Popup
												hoverable
												content={d.nama}
												trigger={
													<LinesEllipsis
														text={d.nama}
														maxLine={1}
														ellipsis={" ... "}
														trimRight
														basedOn="letters"
													/>
												}
											/>
										</Table.Cell>
										<Table.Cell>{d.poin}</Table.Cell>
									</Table.Row>
								);
							})
						) : (
							<Table.Row>
								<Table.Cell colSpan={4} textAlign="center">
									<i>Tidak ada yang dapat ditampilkan</i>
								</Table.Cell>
							</Table.Row>
						)}
					</Table.Body>
				</Table>
				<Message
					style={{ textAlign: "center", fontStyle: "italic" }}
					content="Menampilkan 1-10 dari 50"
					icon="info circle"
					info
				/>
				<Pagination
					activePage={1}
					firstItem={null}
					lastItem={null}
					pointing
					secondary
					totalPages={5}
				/>
			</Segment>
		);
	}
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

export default class DaftarPoin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			activeIndex: 0,
			penghargaan: [],
			kategori_penghargaan: [],
			pelanggaran: [],
			kategori_pelanggaran: [],
		};
	}

	loadData() {
		if (!this.state.activeIndex) {
			this.setState({
				loading: true,
				kategori_penghargaan: KAT_PENGHARGAAN.map((d, i) => {
					return { key: i, value: d.id, text: d.nama };
				}),
				penghargaan: PENGHARGAAN.slice(0, 10),
			});
		} else if (this.state.activeIndex) {
			this.setState({
				loading: true,
				kategori_pelanggaran: KAT_PELANGGARAN.map((d, i) => {
					return { key: i, value: d.id, text: d.nama };
				}),
				pelanggaran: PELANGGARAN.slice(0, 10),
			});
		}
		setTimeout(() => this.setState({ loading: false }), 2000);
	}

	componentDidMount() {
		this.loadData();
	}

	render() {
		return (
			<Segment vertical>
				<Header textAlign="center" color="blue" dividing>
					Daftar Peristiwa Pengasuhan
				</Header>
				<Tab
					activeIndex={this.state.activeIndex}
					onTabChange={(e, d) =>
						this.setState({ activeIndex: d.activeIndex }, () => this.loadData())
					}
					menu={{
						color: "blue",
						inverted: true,
						attached: false,
						tabular: false,
					}}
					panes={[
						{
							menuItem: "Poin Penghargaan",
							render: () => (
								<TableView
									data={this.state.penghargaan}
									kategori={this.state.kategori_penghargaan}
									loading={this.state.loading}
									header="Penghargaan"
								/>
							),
						},
						{
							menuItem: "Poin Pelanggaran",
							render: () => (
								<TableView
									data={this.state.pelanggaran}
									kategori={this.state.kategori_pelanggaran}
									loading={this.state.loading}
									header="Pelanggaran"
								/>
							),
						},
					]}
				/>
			</Segment>
		);
	}
}
