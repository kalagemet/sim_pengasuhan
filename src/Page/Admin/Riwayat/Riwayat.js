import React, { Component, forwardRef } from "react";
import DatePicker from "react-datepicker";
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

class Riwayat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dateRange: [null, null],
		};
	}

	formatDate(date) {
		let a = new Date(date);
		return `${("0" + a.getDate()).slice(-2)}/${("0" + (a.getMonth() + 1)).slice(
			-2
		)}/${a.getFullYear()}`;
	}

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
			<Segment vertical textAlign="right">
				<Header textAlign="center" as="h5" dividing color="blue">
					RIWAYAT SISTEM
					<Header.Subheader>Riwayat Manajement Pengasuhan</Header.Subheader>
				</Header>
				<Segment vertical textAlign="left">
					<Select
						placeholder="Pilih semester"
						options={[
							{
								key: 1,
								value: "2020202101",
								text: "2020/2021 Ganjil",
							},
						]}
					/>{" "}
					<Input placeholder="Cari " iconPosition="left" icon="search" />{" "}
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
						onChange={(update) => this.setState({ dateRange: update })}
					/>
				</Segment>
				<Table unstackable>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>No.</Table.HeaderCell>
							<Table.HeaderCell>Tanggal</Table.HeaderCell>
							<Table.HeaderCell>Nama peristiwa</Table.HeaderCell>
							<Table.HeaderCell>User</Table.HeaderCell>
							<Table.HeaderCell>Aksi</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						<Table.Row>
							<Table.Cell>1</Table.Cell>
							<Table.Cell>12/12/2021</Table.Cell>
							<Table.Cell>Pelanggaran - Keluar Asrama</Table.Cell>
							<Table.Cell>
								<Label color="blue"> Admin 1</Label>
							</Table.Cell>
							<Table.Cell>
								<Button size="mini" basic primary animated>
									<Button.Content hidden>
										<Icon name="arrow right" />
									</Button.Content>
									<Button.Content visible>Lihat</Button.Content>
								</Button>
							</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>2</Table.Cell>
							<Table.Cell>12/12/2021</Table.Cell>
							<Table.Cell>Pelanggaran - Keluar Asrama</Table.Cell>
							<Table.Cell>
								<Label color="red"> Super User</Label>
							</Table.Cell>
							<Table.Cell>
								<Button size="mini" basic primary animated>
									<Button.Content hidden>
										<Icon name="arrow right" />
									</Button.Content>
									<Button.Content visible>Lihat</Button.Content>
								</Button>
							</Table.Cell>
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
	}
}

export default Riwayat;
