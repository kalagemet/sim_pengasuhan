import React, { Component } from "react";
import Chart from "react-google-charts";
import {
	Button,
	Card,
	Divider,
	Grid,
	Header,
	Icon,
	Message,
	Pagination,
	Segment,
	Statistic,
	Table,
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
						<Placeholder style={{ borderRadius: 10 }}>
							<Placeholder.Image />
						</Placeholder>
					</Grid.Column>
				);
			})}
		</Grid>
	);
};

const TableView = () => {
	return (
		<Segment vertical style={{ textAlign: "right" }}>
			<Header as="h4" textAlign="center">
				Daftar Taruna dengan Poin Kurang
				<Header.Subheader>
					Pilih salah satu Infografis untuk menganti isi Tabel
				</Header.Subheader>
			</Header>
			<Button
				size="mini"
				icon="share square"
				labelPosition="left"
				content="Export Data"
				positive
				basic
			/>
			<Table unstackable>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>No.</Table.HeaderCell>
						<Table.HeaderCell>Taruna</Table.HeaderCell>
						<Table.HeaderCell>Poin</Table.HeaderCell>
						<Table.HeaderCell>Status</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					<Table.Row>
						<Table.Cell>1</Table.Cell>
						<Table.Cell>15650028 - Hamid Musafa</Table.Cell>
						<Table.Cell>55</Table.Cell>
						<Table.Cell>Aktif</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>1</Table.Cell>
						<Table.Cell>15650028 - Hamid Musafa</Table.Cell>
						<Table.Cell>55</Table.Cell>
						<Table.Cell>Aktif</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>1</Table.Cell>
						<Table.Cell>15650028 - Hamid Musafa</Table.Cell>
						<Table.Cell>55</Table.Cell>
						<Table.Cell>Aktif</Table.Cell>
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
};

const CardView = (props) => {
	return (
		<div className="card-dashboard">
			<Card raised style={{ background: "#1da6f0" }}>
				<Card.Header className="title">
					Taruna dengan kategori sangat baik
				</Card.Header>
				<Card.Content>
					<Statistic className="value">
						<Statistic.Value>800</Statistic.Value>
						<Statistic.Label>
							<Button
								onClick={() => props.setTableView()}
								className="action"
								animated
							>
								<Button.Content visible>Taruna Aktif</Button.Content>
								<Button.Content hidden>
									Tampilkan
									<Icon name="arrow right" />
								</Button.Content>
							</Button>
						</Statistic.Label>
					</Statistic>
				</Card.Content>
			</Card>
			<Card raised style={{ background: "red" }}>
				<Card.Header className="title">
					Taruna belum berkategori baik
				</Card.Header>
				<Card.Content>
					<Statistic className="value">
						<Statistic.Value>32</Statistic.Value>
						<Statistic.Label>
							<Button
								onClick={() => props.setTableView()}
								className="action"
								animated
							>
								<Button.Content visible>Taruna Aktif</Button.Content>
								<Button.Content hidden>
									Tampilkan
									<Icon name="arrow right" />
								</Button.Content>
							</Button>
						</Statistic.Label>
					</Statistic>
				</Card.Content>
			</Card>
			<Card raised style={{ background: "orange" }}>
				<Card.Header className="title">Jenis Pelanggaran Terbanyak</Card.Header>
				<Card.Content>
					<Statistic className="value">
						<Statistic.Value>2 </Statistic.Value>
						<Statistic.Label>
							<Button
								onClick={() => props.setTableView()}
								className="action"
								animated
							>
								<Button.Content visible>Pelanggaran</Button.Content>
								<Button.Content hidden>
									Tampilkan
									<Icon name="arrow right" />
								</Button.Content>
							</Button>
						</Statistic.Label>
					</Statistic>
				</Card.Content>
			</Card>
			<Card raised style={{ background: "#1da6f0" }}>
				<Card.Header className="title">Jenis Penghargaan Terbanyak</Card.Header>
				<Card.Content>
					<Statistic className="value">
						<Statistic.Value>30</Statistic.Value>
						<Statistic.Label>
							<Button
								onClick={() => props.setTableView()}
								className="action"
								animated
							>
								<Button.Content visible>Penghargaan</Button.Content>
								<Button.Content hidden>
									Tampilkan
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
					["Baik", 200],
					["Tidak Memenuhi", 20],
					["Cukup", 40],
				]}
				options={{
					title: "Presentase Poin",
					colors: ["green", "red", "orange"],
					// Just add this option
					pieHole: 0.6,
				}}
				rootProps={{ "data-testid": "3" }}
			/>
		</Segment>
	);
};

class Dashboard extends Component {
	state = {
		loadingTable: true,
		loadingChart: true,
		loadingCard: true,
	};

	componentDidMount() {
		setTimeout(
			() =>
				this.setState({
					loadingTable: false,
					loadingCard: false,
					loadingChart: false,
				}),
			4000
		);
	}

	setTableView = () => {
		this.setState({ loadingTable: true });
		setTimeout(() => this.setState({ loadingTable: false }), 1000);
	};

	render() {
		return (
			<Segment vertical>
				<Divider />
				{this.state.loadingCard ? (
					<LoadingCardView />
				) : (
					<CardView setTableView={() => this.setTableView()} />
				)}
				<Divider />
				<Grid>
					<Grid.Row>
						<Grid.Column mobile={16} tablet={16} computer={8}>
							{this.state.loadingTable ? <LoadingTableView /> : <TableView />}
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

export default Dashboard;
