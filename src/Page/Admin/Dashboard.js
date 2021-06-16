import React, { Component } from "react";
import Chart from "react-google-charts";
import {
	Button,
	Card,
	Divider,
	Grid,
	Icon,
	Segment,
	Statistic,
	Placeholder,
} from "semantic-ui-react";
import TableView from "./TableView";

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
								onClick={() => props.setTableView(0)}
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
								onClick={() => props.setTableView(1)}
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
								onClick={() => props.setTableView(2)}
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
								onClick={() => props.setTableView(3)}
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
	constructor(props) {
		super(props);
		this.state = {
			loadingChart: true,
			loadingCard: true,
			activeCard: 1,
		};
		this.setTableView = this.setTableView.bind(this);
	}

	componentDidMount() {
		setTimeout(
			() =>
				this.setState({
					loadingCard: false,
					loadingChart: false,
				}),
			1000
		);
	}

	setTableView = (index) => {
		this.setState({ activeCard: index });
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
							<TableView index={this.state.activeCard} />
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
