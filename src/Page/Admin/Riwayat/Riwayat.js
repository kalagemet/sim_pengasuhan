import React, { Component, forwardRef } from "react";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import {
	Button,
	Header,
	Icon,
	Input,
	Label,
	Message,
	Pagination,
	Segment,
	Select,
	Table,
} from "semantic-ui-react";
import { getLog, getTahunAjar } from "../../../Apis/Apis";
import { ContextType } from "../../../Context";

class Riwayat extends Component {
	static contextType = ContextType;
	constructor(props) {
		super(props);
		this.state = {
			dateRange: [null, null],
			semester: [],
			semesterSelected: "",
			filter: "",

			data: [],
			loading: false,

			active_page: 1,
			total_page: 1,
			limit_page: 25,
			total_data: 0,
		};
	}

	formatDate(date) {
		let a = new Date(date);
		return `${("0" + a.getDate()).slice(-2)}/${("0" + (a.getMonth() + 1)).slice(
			-2
		)}/${a.getFullYear()}`;
	}

	componentDidMount() {
		this.getTahunAjar();
	}

	getTahunAjar = async () => {
		this.setState({ error: false });
		await getTahunAjar(this.context, "", (response) => {
			if (response.status === 200) {
				if (response.data.error_code === 0) {
					let all = response.data.data;
					let active = all.pop();
					this.setState(
						{
							semesterSelected: active.id,
							semester: all,
						},
						() => this.getData()
					);
				} else {
					console.log(response.data.error_msg);
				}
			} else {
				console.error("get_tahun_ajar", response.status, response.msg);
				this.setState({ error: true });
			}
		});
	};

	getData = async () => {
		this.setState({ loading: true });
		getLog(
			this.context,
			this.state.semesterSelected,
			this.state.filter,
			this.state.dateRange[0],
			this.state.dateRange[1],
			this.state.active_page,
			this.state.limit_page,
			(response) => {
				if (response.status === 200) {
					if (response.data.error_code === 0) {
						this.setState({
							active_page: response.data.data.current_page,
							data: response.data.data.data,
							total_page: response.data.data.last_page,
							total_data: response.data.data.total,
						});
					} else {
						console.log(response.data.error_msg);
						this.context.setNotify(
							"warning",
							"Error saat mengambil data",
							response.data.error_msg,
							"orange"
						);
					}
				} else {
					console.error("get_riwayat_sistem", response.status, response.msg);
				}
				this.setState({ loading: false });
			}
		);
	};

	render() {
		const [startDate, endDate] = this.state.dateRange;
		const ButtonCalendar = forwardRef(
			({ value, onClick, placeholder }, ref) => {
				return (
					<Button.Group>
						<Button
							basic
							positive
							content={
								value === ""
									? placeholder
									: this.formatDate(startDate) + " - " + value
							}
							ref={ref}
							onClick={onClick}
							icon="calendar"
							labelPosition="left"
						/>
						<Button positive icon="search" />
					</Button.Group>
				);
			}
		);
		return (
			<Segment vertical textAlign="right" className="page-content-segment">
				<Header textAlign="center" as="h5" dividing color="blue">
					RIWAYAT SISTEM
					<Header.Subheader>Riwayat Manajement Pengasuhan</Header.Subheader>
				</Header>
				<Segment vertical textAlign="left">
					<Select
						placeholder="Pilih semester"
						value={this.state.semesterSelected}
						onChange={(e, d) =>
							this.setState({ semesterSelected: d.value, active_page: 1 }, () =>
								this.getData()
							)
						}
						options={this.state.semester.map((d, i) => {
							return {
								key: i,
								value: d.id,
								text: d.nama_semester,
								selected: d.value === this.state.semesterSelected,
							};
						})}
					/>{" "}
					<Input
						placeholder="Cari kode riwayat"
						value={this.state.filter}
						onChange={(e, d) =>
							this.setState({ filter: d.value }, () => this.getData())
						}
						iconPosition="left"
						icon="search"
					/>{" "}
					<DatePicker
						dateFormat="dd/MM/yyyy"
						selected={endDate}
						placeholderText="Pilih Rentang"
						shouldCloseOnSelect={false}
						selectsRange
						data={startDate}
						startDate={startDate}
						endDate={endDate}
						customInput={<ButtonCalendar />}
						onChange={(update) =>
							this.setState({ dateRange: update }, () => this.getData())
						}
					/>
				</Segment>
				<Table unstackable>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>No.</Table.HeaderCell>
							<Table.HeaderCell>Tanggal</Table.HeaderCell>
							<Table.HeaderCell>Riwayat</Table.HeaderCell>
							<Table.HeaderCell>Semester</Table.HeaderCell>
							<Table.HeaderCell>User</Table.HeaderCell>
							<Table.HeaderCell>Detail</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{this.state.data.map((d, i) => (
							<Table.Row key={i}>
								<Table.Cell>
									{(this.state.active_page - 1) * this.state.limit_page + i + 1}
								</Table.Cell>
								<Table.Cell>{d.tanggal}</Table.Cell>
								<Table.Cell>{d.kode_log + " - " + d.detail}</Table.Cell>
								<Table.Cell>{d.nama_semester || "-"}</Table.Cell>
								<Table.Cell>
									<Label color="red">{d.oleh}</Label>
								</Table.Cell>
								<Table.Cell>
									{d.id_entri === 0 ? (
										"id peristiwa : " + d.id_peristiwa
									) : (
										<Button
											as={Link}
											to={"/poin/edit?id_entri=" + d.id_entri}
											size="mini"
											basic
											primary
											animated
										>
											<Button.Content hidden>
												<Icon name="arrow right" />
											</Button.Content>
											<Button.Content visible>Lihat</Button.Content>
										</Button>
									)}
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
				<Message info icon style={{ textAlign: "center", fontStyle: "italic" }}>
					<Icon
						name={this.state.loading ? "spinner" : "info circle"}
						loading={this.state.loading}
					/>
					<Message.Content>
						{this.state.data.length === 0
							? "Tidak ada data yang dapat ditampilkan"
							: "Menampilkan " + this.state.total_data + " total data"}
					</Message.Content>
				</Message>
				{this.state.data.length !== 0 ? (
					<Pagination
						defaultActivePage={1}
						onPageChange={(e, d) =>
							this.setState({ active_page: d.activePage }, () => this.getData())
						}
						firstItem={null}
						lastItem={null}
						pointing
						secondary
						totalPages={this.state.total_page}
					/>
				) : (
					""
				)}
			</Segment>
		);
	}
}

export default Riwayat;
