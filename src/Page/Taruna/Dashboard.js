import React, { Component, useEffect, useState } from "react";
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
	Select,
	Message,
	Pagination,
} from "semantic-ui-react";
import {
	getDashboardCount,
	getDashboardData,
	getTahunAjar,
} from "../../Apis/ApisTaruna";
import { ContextType } from "../../Context";

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

const ChartView = (props) => {
	return (
		<Segment vertical className="chart">
			<Chart
				// width={"100%"}
				height={"400px"}
				chartType="PieChart"
				loader={<div>Loading Chart</div>}
				data={[
					["Jenis", "Jumlah Poin"],
					["Penghargaan", props.data.penghargaan],
					["Pelanggaran", props.data.pelanggaran],
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

function TableView(props) {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [page, setPage] = useState({
		active_page: 1,
		total_page: 1,
		limit_page: 10,
		total_data: 0,
	});

	useEffect(async () => {
		setLoading(true);
		if (props.active === 0 || props.active === 1) {
			await getDashboardData(
				props.context,
				props.semester,
				props.active,
				page.limit_page,
				(response) => {
					if (response.status === 200) {
						if (response.data.error_code === 0) {
							setData(response.data.data.data);
							setPage({
								...page,
								active_page: response.data.data.current_page,
								total_page: response.data.data.last_page,
								total_data: response.data.data.total,
							});
						} else {
							console.log(response.data.error_msg);
						}
					} else {
						console.error(
							"get_dashboard_taruna",
							response.status,
							response.msg
						);
					}
				}
			);
			setLoading(false);
		}
	}, [props.active]);

	return loading ? (
		<LoadingTableView />
	) : (
		<Segment vertical style={{ textAlign: "right" }}>
			<Header as="h4" textAlign="center">
				{props.active === 1
					? "DAFTAR PELANGGARAN YANG DILAKUKAN"
					: "DAFTAR PENGHARGAAN YANG DIDAPATKAN "}
				{props.semester === 0 ? "" : props.context.semesterActive.nama_semester}
				<Header.Subheader>
					Pilih salah satu infografis untuk menganti isi tabel
				</Header.Subheader>
			</Header>
			<Button
				disabled
				size="mini"
				icon="share square"
				labelPosition="left"
				content="Export Data"
				positive
				basic
			/>
			<Table unstackable>
				{data.length > 0 ? (
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>No.</Table.HeaderCell>
							<Table.HeaderCell>Nama peristiwa</Table.HeaderCell>
							<Table.HeaderCell>Tanggal</Table.HeaderCell>
							<Table.HeaderCell>Kategori</Table.HeaderCell>
							<Table.HeaderCell>Jumlah Poin</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
				) : null}
				<Table.Body>
					{data.map((d, i) => (
						<Table.Row key={i}>
							<Table.Cell>
								{(page.active_page - 1) * page.limit_page + i + 1}
							</Table.Cell>
							<Table.Cell>{d.nama_peristiwa}</Table.Cell>
							<Table.Cell>{d.tgl}</Table.Cell>
							<Table.Cell>
								{d.is_pelanggaran === 0 ? "Penghargaan" : "Pelanggaran"} -{" "}
								{d.nama_kategori}
							</Table.Cell>
							<Table.Cell>
								{d.is_pelanggaran === 0 ? (
									d.is_pt === 0 ? (
										<Label color="green">+{d.poin}</Label>
									) : (
										<Label color="orange">+{d.poin_ex}</Label>
									)
								) : (
									<Label color="red">-{d.poin}</Label>
								)}
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
			<Message
				info
				icon="info circle"
				content={
					data.length === 0
						? "Tidak ada data yang dapat ditampilkan"
						: "Menampilkan " + page.total_data + " total data"
				}
				style={{ textAlign: "center", fontStyle: "italic" }}
			/>
			{data.length !== 0 ? (
				<Pagination
					activePage={page.active_page}
					onPageChange={(e, d) =>
						setPage({ ...page, active_page: d.activePage })
					}
					firstItem={null}
					lastItem={null}
					pointing
					secondary
					totalPages={page.total_page}
				/>
			) : (
				""
			)}
		</Segment>
	);
}

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
			<Card raised style={{ background: color(props.data.predikat) }}>
				<Card.Header className="title">Status Pengasuhan</Card.Header>
				<Card.Content>
					<Statistic className="value">
						<Statistic.Value>{props.data.predikat}</Statistic.Value>
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
						<Statistic.Value>{props.data.nilai}</Statistic.Value>
						<Statistic.Label>
							<Button as={Link} to="/transkrip" className="action" animated>
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
						<Statistic.Value>{props.data.penghargaan}</Statistic.Value>
						<Statistic.Label>
							<Button
								onClick={() => props.setTableView(0)}
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
						<Statistic.Value>{props.data.pelanggaran}</Statistic.Value>
						<Statistic.Label>
							<Button
								onClick={() => props.setTableView(1)}
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
	static contextType = ContextType;
	state = {
		loadingCard: false,

		semester: [],
		semesterSelected: "",

		pelanggaran: 0,
		penghargaan: 0,
		nilai: 0,
		predikat: "N/a",

		activeTable: 1,
	};

	componentDidMount() {
		this.getTahunAjar();
	}

	loadDashboard = async () => {
		this.setState({
			loadingCard: true,
			pelanggaran: 0,
			penghargaan: 0,
			nilai: 0,
			predikat: "N/a",
		});
		await getDashboardCount(
			this.context,
			this.state.semesterSelected,
			(response) => {
				if (response.status === 200) {
					if (response.data.error_code === 0) {
						let data = [...response.data.data.record];
						data.map((d, i) => {
							if (d.param === 0) {
								this.setState({ penghargaan: d.jml });
							}
							if (d.param === 1) {
								this.setState({ pelanggaran: d.jml });
							}
						});
						if (response.data.data.poin) {
							this.setState({
								loadingCard: false,
								nilai: response.data.data.poin.nilai,
								predikat: response.data.data.poin.predikat,
							});
						}
					} else {
						console.log(response.data.error_msg);
					}
				} else {
					console.error("get_dashboard", response.status, response.msg);
				}
				this.setState({
					loadingCard: false,
				});
			}
		);
	};

	getTahunAjar = async () => {
		await getTahunAjar(this.context, "", (response) => {
			if (response.status === 200) {
				if (response.data.error_code === 0) {
					let all = response.data.data;
					let active = all.pop();
					all.unshift({
						id: 0,
						nama_semester: "SEMUA_SEMESTER",
					});
					this.setState(
						{
							semesterSelected: active.id,
							semester: all,
						},
						() => this.loadDashboard()
					);
				} else {
					console.log(response.data.error_msg);
				}
			} else {
				console.error("get_tahun_ajar", response.status, response.msg);
			}
		});
	};

	setTableView = (i) => {
		this.setState({ activeTable: i });
	};

	render() {
		return (
			<Segment vertical>
				<Select
					placeholder="Pilih semester"
					value={this.state.semesterSelected}
					options={this.state.semester.map((d, i) => {
						return {
							key: i,
							value: d.id,
							text: d.nama_semester,
							selected: d.value === this.state.semesterSelected,
						};
					})}
					onChange={(e, d) =>
						this.setState(
							{
								semesterSelected: d.value,
								active_page: 1,
								data: [],
								rekap: [],
							},
							() => {
								this.loadDashboard();
							}
						)
					}
				/>
				<Divider />
				{this.state.loadingCard ? (
					<LoadingCardView />
				) : (
					<CardView
						data={this.state}
						setTableView={(i) => this.setTableView(i)}
					/>
				)}
				<Divider />
				<Grid>
					<Grid.Row>
						<Grid.Column mobile={16} tablet={16} computer={8}>
							<TableView
								active={this.state.activeTable}
								context={this.context}
								semester={this.state.semesterSelected}
							/>
						</Grid.Column>
						<Grid.Column mobile={16} tablet={16} computer={8}>
							{this.state.loadingCard ? (
								<LoadingChartView />
							) : (
								<ChartView data={this.state} />
							)}
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>
		);
	}
}

export default DashboardTaruna;
