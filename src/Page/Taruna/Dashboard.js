import React, { Component } from "react";
import Chart from "react-google-charts";
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
					["Pelanggaran", 32],
				]}
				options={{
					title: "Presentase Poin",
					// Just add this option
					pieHole: 0.6,
				}}
				rootProps={{ "data-testid": "3" }}
			/>
		</Segment>
	);
};

const TableView = () => {
	return (
		<Segment vertical style={{ textAlign: "right" }}>
			<Header as="h4" textAlign="center">
				Daftar Poin Pelangaran
				<Header.Subheader>
					Pilih salah satu Infografis untuk menganti isi Tabel
				</Header.Subheader>
			</Header>
			<Button
				labelPosition="right"
				size="mini"
				content="Selengkapnya"
				icon="angle double right"
				primary
				basic
			/>
			<Table unstackable>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>No.</Table.HeaderCell>
						<Table.HeaderCell>Pristiwa</Table.HeaderCell>
						<Table.HeaderCell>Poin</Table.HeaderCell>
						<Table.HeaderCell>Tanggal</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					<Table.Row>
						<Table.Cell>1</Table.Cell>
						<Table.Cell>Meninggalkan Asrama</Table.Cell>
						<Table.Cell>
							<Label color="red" horizontal>
								-10
							</Label>
						</Table.Cell>
						<Table.Cell>10/10/2021</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>2</Table.Cell>
						<Table.Cell>Meninggalkan Asrama</Table.Cell>
						<Table.Cell>
							<Label color="red" horizontal>
								-10
							</Label>
						</Table.Cell>
						<Table.Cell>10/10/2021</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table>
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
							<Button
								onClick={() => props.setTableView()}
								className="action"
								animated
							>
								<Button.Content visible>Detail</Button.Content>
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
				<Card.Header className="title">Poin Pengasuhan</Card.Header>
				<Card.Content>
					<Statistic className="value">
						<Statistic.Value>50</Statistic.Value>
						<Statistic.Label>
							<Button
								onClick={() => props.setTableView()}
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
						<Statistic.Value>50</Statistic.Value>
						<Statistic.Label>
							<Button
								onClick={() => props.setTableView()}
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
						<Statistic.Value>-32</Statistic.Value>
						<Statistic.Label>
							<Button
								onClick={() => props.setTableView()}
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

export default DashboardTaruna;
