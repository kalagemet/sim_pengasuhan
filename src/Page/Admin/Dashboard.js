import React, { Component } from "react";
import Chart from "react-google-charts";
import LinesEllipsis from "react-lines-ellipsis";
import {
	Button,
	Card,
	Divider,
	Grid,
	Icon,
	Segment,
	Statistic,
	Placeholder,
	Select,
} from "semantic-ui-react";
import {
	getAngkatan,
	getDashboardCount,
	getKelas,
	getProdi,
} from "../../Apis/Apis";
import { ContextType } from "../../Context";
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
	function color(param) {
		if (param === "Sangat Baik") return "#1da6f0";
		else if (param === "Baik") return "green";
		if (param === "Cukup") return "orange";
		else if (param === "Kurang") return "red";
		else return "grey";
	}

	return (
		<div className="card-dashboard">
			{props.data.map((d, i) => (
				<Card key={i} raised style={{ background: color(d.predikat) }}>
					<Card.Header className="title">
						Taruna dengan kategori {d.predikat}
					</Card.Header>
					<Card.Content>
						<Statistic className="value">
							<Statistic.Value>{d.jml || 0}</Statistic.Value>
							<Statistic.Label>
								<Button
									onClick={() => props.setTableView(d.predikat)}
									className="action"
									animated
								>
									<Button.Content visible>Taruna</Button.Content>
									<Button.Content hidden>
										Tampilkan
										<Icon name="arrow right" />
									</Button.Content>
								</Button>
							</Statistic.Label>
						</Statistic>
					</Card.Content>
				</Card>
			))}
		</div>
	);
};

const ChartView = (props) => {
	let arr = [["Jenis", "Jumlah Poin"]];
	props.data.map((d) => arr.push([d.predikat, 8]));
	return (
		<Segment vertical className="chart">
			<Chart
				// width={"100%"}
				height={"400px"}
				chartType="PieChart"
				loader={<div>Loading Chart</div>}
				data={arr}
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
	static contextType = ContextType;
	constructor(props) {
		super(props);
		this.state = {
			loadingCard: false,
			activeCard: "",

			prodi: [],
			selected_prodi: 0,
			angkatan: [],
			selected_angkatan: 0,
			kelas: [],
			selected_kelas: 0,

			card: [],
		};
		this.setTableView = this.setTableView.bind(this);
	}

	componentDidMount() {
		this.prodi();
		this.loadDashboard();
	}

	loadDashboard = async () => {
		this.setState({ loadingCard: true });
		await getDashboardCount(
			this.context,
			this.state.selected_prodi,
			this.state.selected_angkatan,
			this.state.selected_kelas,
			(response) => {
				if (response.status === 200) {
					if (response.data.error_code === 0) {
						this.setState({ loadingCard: false, card: response.data.data });
					} else {
						console.log(response.data.error_msg);
					}
				} else {
					console.error("get_dashboard", response.status, response.msg);
				}
			}
		);
	};

	prodi = async () => {
		this.setState({ loadFilter: true });
		await getProdi(this.context, (response) => {
			if (response.status === 200) {
				if (response.data.error_code === 0) {
					response.data.data.length > 0
						? this.setState({
								prodi: response.data.data,
								selected_prodi: 0,
								selected_angkatan: 0,
								selected_kelas: 0,
								activeCard: "",
								taruna: [],
								pilihanTaruna: [],
						  })
						: this.setState({ prodi: response.data.data });
				} else {
					console.log(response.data.error_msg);
				}
			} else {
				console.error("get_prodi", response.status, response.msg);
			}
		});
		this.setState({ loadFilter: false });
	};

	angkatan = async () => {
		await getAngkatan(this.context, this.state.selected_prodi, (response) => {
			if (response.status === 200) {
				if (response.data.error_code === 0) {
					response.data.data.length > 0
						? this.setState({
								angkatan: response.data.data,
								selected_angkatan: 0,
								selected_kelas: 0,
								activeCard: "",
								taruna: [],
								pilihanTaruna: [],
						  })
						: this.setState({ angkatan: response.data.data });
				} else {
					console.log(response.data.error_msg);
				}
			} else {
				console.error("get_angkatan", response.status, response.msg);
			}
		});
	};

	kelas = async () => {
		await getKelas(
			this.context,
			this.state.selected_prodi,
			this.state.selected_angkatan,
			(response) => {
				if (response.status === 200) {
					if (response.data.error_code === 0) {
						response.data.data.length > 0
							? this.setState({
									kelas: response.data.data,
									selected_kelas: 0,
									activeCard: "",
									taruna: [],
									pilihanTaruna: [],
							  })
							: this.setState({ kelas: response.data.data });
					} else {
						console.log(response.data.error_msg);
					}
				} else {
					console.error("get_kelas", response.status, response.msg);
				}
			}
		);
	};

	setTableView = (predikat) => {
		this.setState({ activeCard: predikat });
	};

	render() {
		return (
			<Segment vertical className="page-content-segment">
				<Divider />
				<div>
					<Select
						style={{ width: "100px" }}
						placeholder="Program Studi"
						value={this.state.selected_prodi}
						onChange={(e, d) =>
							this.setState({ selected_prodi: d.value }, () => this.angkatan())
						}
						options={this.state.prodi.map((d, i) => {
							return {
								key: i,
								value: d.kode,
								text: (
									<LinesEllipsis
										text={d.nama}
										maxLine={1}
										ellipsis={"..."}
										trimRight
										basedOn="letters"
									/>
								),
							};
						})}
					/>{" "}
					<Select
						placeholder="Pilih Angkatan"
						value={this.state.selected_angkatan}
						onChange={(e, d) =>
							this.setState(
								{
									selected_angkatan: d.value,
									limit_page: 25,
									active_page: 1,
								},
								() => this.kelas()
							)
						}
						options={this.state.angkatan.map((d, i) => {
							return {
								key: i,
								value: d,
								text: d,
							};
						})}
					/>{" "}
					<Select
						placeholder="Pilih Kelas"
						value={this.state.selected_kelas}
						onChange={(e, d) =>
							this.setState({ selected_kelas: d.value }, () =>
								this.loadDashboard()
							)
						}
						options={this.state.kelas.map((d, i) => {
							return {
								key: i,
								value: d,
								text: d,
							};
						})}
					/>
				</div>
				<Divider />
				{this.state.loadingCard ? (
					<LoadingCardView />
				) : (
					<CardView data={this.state.card} setTableView={this.setTableView} />
				)}
				<Divider />
				<Grid>
					<Grid.Row>
						<Grid.Column mobile={16} tablet={16} computer={8}>
							<TableView
								prodi={this.state.selected_prodi}
								angkatan={this.state.selected_angkatan}
								kelas={this.state.selected_kelas}
								context={this.context}
								predikat={this.state.activeCard}
							/>
						</Grid.Column>
						<Grid.Column mobile={16} tablet={16} computer={8}>
							{this.state.loadingCard ? (
								<LoadingChartView />
							) : (
								<ChartView data={this.state.card} />
							)}
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>
		);
	}
}

export default Dashboard;
