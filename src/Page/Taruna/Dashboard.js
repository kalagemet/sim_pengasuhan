import React, { Component } from "react";
import Chart from "react-google-charts";
import { Link } from "react-router-dom";
import {
	Button,
	Card,
	Divider,
	Segment,
	Statistic,
	Icon,
	Grid,
	Table,
	Header,
	Label,
	Placeholder,
} from "semantic-ui-react";

const LoadingTableView = () => {
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
					<Placeholder.Line length="full" />
					<Placeholder.Line length="very long" />
					<Placeholder.Line length="short" />
				</Placeholder.Paragraph>
			</Placeholder>
		</Segment>
	);
};

const LoadingChartView = () => {
	return (
		<Segment vertical>
			<Placeholder fluid>
				<Placeholder.Header>
					<Placeholder.Line />
				</Placeholder.Header>
			</Placeholder>
			<br />
			<Grid columns={2}>
				<Grid.Column>
					<Placeholder style={{ height: "100%", borderRadius: 200 }}>
						<Placeholder.Image square />
					</Placeholder>
				</Grid.Column>
				<Grid.Column>
					<Placeholder>
						<Placeholder.Line />
						<Placeholder.Line />
						<Placeholder.Line />
						<Placeholder.Line />
						<Placeholder.Line />
						<Placeholder.Line />
						<Placeholder.Line />
					</Placeholder>
				</Grid.Column>
			</Grid>
		</Segment>
	);
};

const LoadingCardView = () => {
	return (
		<Grid columns={3}>
			{[1, 2, 3].map((i) => {
				return (
					<Grid.Column key={i}>
						<Placeholder style={{ borderRadius: 15 }}>
							<Placeholder.Image />
						</Placeholder>
					</Grid.Column>
				);
			})}
		</Grid>
	);
};

const ChartView = () => {
	return (
		<Segment vertical className="chart">
			<Chart
				// width={"100%"}
				height={"400px"}
				chartType="PieChart"
				loader={<div>Loading Chart</div>}
				data={[
					["Jenis", "Jumlah Poin"],
					["Penghargaan", 50],
					["Pelanggaran", 50],
				]}
				options={{
					title: "Presentase Poin",
					// Just add this option
					pieHole: 0.5,
				}}
				rootProps={{ "data-testid": "3" }}
			/>
		</Segment>
	);
};

const TableView = (props) => {
	return (
		<Segment vertical style={{ textAlign: "right" }}>
			<Header as="h4" textAlign="center">
				{props.header}
				<Header.Subheader>
					Pilih salah satu Infografis untuk menganti isi Tabel
				</Header.Subheader>
			</Header>
			{props.data ? (
				props.data.length > 0 ? (
					<Table className="responsive_table" unstackable>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell>No.</Table.HeaderCell>
								<Table.HeaderCell>peristiwa</Table.HeaderCell>
								<Table.HeaderCell>Poin</Table.HeaderCell>
								<Table.HeaderCell>Tanggal</Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{props.data.map((d, i) => {
								return (
									<Table.Row key={i}>
										<Table.Cell>{i + 1}</Table.Cell>
										<Table.Cell>{d.peristiwa}</Table.Cell>
										<Table.Cell>
											<Label color="green" horizontal>
												{d.poin}
											</Label>
										</Table.Cell>
										<Table.Cell>{d.tgl}</Table.Cell>
									</Table.Row>
								);
							})}
						</Table.Body>
					</Table>
				) : (
					<Segment>
						<Header as="h5" color="grey" textAlign="center" icon>
							<Icon name="box" />
							<i>Tidak ada data yang ditampilkan</i>
						</Header>
					</Segment>
				)
			) : (
				<Segment>
					<Header as="h5" color="grey" textAlign="center" icon>
						<Icon name="box" />
						<i>Tidak ada data yang ditampilkan</i>
					</Header>
				</Segment>
			)}
			<Button
				as={Link}
				to="/transkrip"
				labelPosition="right"
				size="mini"
				content="Selengkapnya"
				icon="angle double right"
				primary
				basic
			/>
		</Segment>
	);
};

const CardView = (props) => {
	return (
		<div className="card-dashboard">
			<Card raised style={{ background: "orange" }}>
				<Card.Header className="title">Status Pengasuhan</Card.Header>
				<Card.Content>
					<Statistic className="value">
						<Statistic.Value>Cukup</Statistic.Value>
						<Statistic.Label>
							<Button as={Link} to="/transkrip" className="action" animated>
								<Button.Content visible>Detail</Button.Content>
								<Button.Content hidden>
									Transkrip
									<Icon name="arrow right" />
								</Button.Content>
							</Button>
						</Statistic.Label>
					</Statistic>
				</Card.Content>
			</Card>
			<Card raised style={{ background: "#1da6f0" }}>
				<Card.Header className="title">Poin Pengasuhan</Card.Header>
				<Card.Content>
					<Statistic className="value">
						<Statistic.Value>50</Statistic.Value>
						<Statistic.Label>
							<Button
								onClick={() => props.setTableView("Daftar Poin Pengasuhan", 1)}
								className="action"
								animated
							>
								<Button.Content visible>Poin</Button.Content>
								<Button.Content hidden>
									Lihat
									<Icon name="arrow right" />
								</Button.Content>
							</Button>
						</Statistic.Label>
					</Statistic>
				</Card.Content>
			</Card>
			<Card raised style={{ background: "#1da6f0" }}>
				<Card.Header className="title">Jumlah Penghargaan</Card.Header>
				<Card.Content>
					<Statistic className="value">
						<Statistic.Value>0</Statistic.Value>
						<Statistic.Label>
							<Button
								onClick={() => props.setTableView("Daftar Penghargaan", 2)}
								className="action"
								animated
							>
								<Button.Content visible>Poin</Button.Content>
								<Button.Content hidden>
									Lihat
									<Icon name="arrow right" />
								</Button.Content>
							</Button>
						</Statistic.Label>
					</Statistic>
				</Card.Content>
			</Card>
			<Card raised style={{ background: "red" }}>
				<Card.Header className="title">Jumlah Pelanggaran</Card.Header>
				<Card.Content>
					<Statistic className="value">
						<Statistic.Value>0</Statistic.Value>
						<Statistic.Label>
							<Button
								onClick={() => props.setTableView("Daftar Pelanggaran", 3)}
								className="action"
								animated
							>
								<Button.Content visible>Poin</Button.Content>
								<Button.Content hidden>
									Lihat
									<Icon name="arrow right" />
								</Button.Content>
							</Button>
						</Statistic.Label>
					</Statistic>
				</Card.Content>
			</Card>
		</div>
	);
};

class DashboardTaruna extends Component {
	state = {
		loadingTable: true,
		loadingChart: true,
		loadingCard: true,
		activetable: {
			header: "Daftar Poin Pengasuhan",
			data: [{ peristiwa: "Poin awal taruna", poin: "50", tgl: "15/10/2021" }],
		},
	};

	componentDidMount() {
		setTimeout(
			() =>
				this.setState({
					loadingTable: false,
					loadingCard: false,
					loadingChart: false,
				}),
			2000
		);
	}

	setTableView = (header, data) => {
		if (data === 2) {
			data = [];
		} else if (data === 3) {
			data = [];
		} else {
			data = [{ peristiwa: "Poin awal taruna", poin: "50", tgl: "15/10/2021" }];
		}
		this.setState({
			loadingTable: true,
			activetable: { header: header, data: data },
		});
		setTimeout(() => this.setState({ loadingTable: false }), 1000);
	};

	render() {
		return (
			<Segment vertical>
				<Divider />
				{this.state.loadingCard ? (
					<LoadingCardView />
				) : (
					<CardView setTableView={(e, i) => this.setTableView(e, i)} />
				)}
				<Divider />
				<Grid>
					<Grid.Row>
						<Grid.Column mobile={16} tablet={16} computer={8}>
							{this.state.loadingTable ? (
								<LoadingTableView />
							) : (
								<TableView
									header={this.state.activetable.header}
									data={this.state.activetable.data}
								/>
							)}
						</Grid.Column>
						<Grid.Column mobile={16} tablet={16} computer={8}>
							{this.state.loadingChart ? <LoadingChartView /> : <ChartView />}
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>
		);
	}
}

export default DashboardTaruna;
