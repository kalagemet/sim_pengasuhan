import { forwardRef, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import {
	Button,
	Grid,
	Header,
	Icon,
	Search,
	Label,
	Input,
	Segment,
	Table,
	Modal,
	Dropdown,
	Message,
	Pagination,
	Popup,
	Container,
} from "semantic-ui-react";
import LinesEllipsis from "react-lines-ellipsis";
import { Consumer } from "../../../Context";
const data = require("../../../Dummy/pelanggaran.json");
const data_peristiwa = require("../../../Dummy/peristiwa.json");

export default function StepOne(props) {
	const [showModal, setShowModal] = useState(false);
	const [startDate, setStartDate] = useState(new Date());
	const [peristiwa, setperistiwa] = useState([...props.data.peristiwa]);
	const [dataperistiwa, setDataperistiwa] = useState([]);
	const [kategori] = [data];
	const [loading, setLoading] = useState({
		modal: true,
		search: true,
	});

	useEffect(() => {
		// setDataperistiwa(
		// 	data_peristiwa.filter((el) => {
		// 		return !peristiwa.includes(el);
		// 	})
		// );
		setDataperistiwa(data_peristiwa);
	}, [peristiwa]);

	const tambahperistiwa = (index) => {
		if (!peristiwa.includes(dataperistiwa[index])) {
			setperistiwa([...peristiwa, dataperistiwa[index]]);
		}
	};

	const hapusperistiwa = (index) => {
		// setDataperistiwa([...dataperistiwa, peristiwa[index]]);
		let tmp = peristiwa;
		tmp.splice(index, 1);
		setperistiwa(tmp);
	};

	const ShowTableModal = (props) => {
		return (
			<Modal
				trigger={props.children}
				open={props.showModal}
				onOpen={() => {
					props.setShowModal(true);
					setTimeout(() => setLoading([{ ...loading, modal: false }]), 1000);
				}}
			>
				<Modal.Header>Daftar peristiwa Pengasuhan</Modal.Header>
				<Modal.Content scrolling>
					<Segment vertical loading={loading.modal}>
						<Grid>
							<Grid.Row columns={2}>
								<Grid.Column key={0}>
									<Dropdown
										text="Filter"
										icon="filter"
										floating
										labeled
										button
										className="icon"
									>
										<Dropdown.Menu>
											<Dropdown.Menu scrolling>
												<Dropdown.Header>Kategori</Dropdown.Header>
												<Dropdown.Item
													key="semua"
													value="Semua"
													text="Semua"
													label={{
														color: "blue",
														empty: true,
														circular: false,
													}}
												/>
												<Dropdown.Item
													key="Penghargaan"
													value="Penghargaan"
													text="Penghargaan"
													label={{
														color: "green",
														empty: true,
														circular: false,
													}}
												/>
												<Dropdown.Item
													key="Pelanggaran"
													value="Pelanggaran"
													text="Pelanggaran"
													label={{
														color: "red",
														empty: true,
														circular: false,
													}}
												/>
												<Dropdown.Header>Sub peristiwa</Dropdown.Header>
												{kategori[0].SubPenghargaan.map((d, i) => {
													return (
														<Dropdown.Item
															key={i}
															value={d.value}
															text={d.text}
															label={{
																color: "green",
																empty: true,
																circular: true,
															}}
														/>
													);
												})}
												{kategori[1].SubPelanggaran.map((d, i) => {
													return (
														<Dropdown.Item
															key={i}
															value={d.value}
															text={d.text}
															label={{
																color: "red",
																empty: true,
																circular: true,
															}}
														/>
													);
												})}
											</Dropdown.Menu>
										</Dropdown.Menu>
									</Dropdown>
								</Grid.Column>
								<Grid.Column textAlign="right" key={1}>
									<Input
										placeholder="Cari perisitwa"
										icon="search"
										// labelPosition="right"
									/>
								</Grid.Column>
							</Grid.Row>
						</Grid>
						{dataperistiwa.length > 0 ? (
							<Consumer>
								{({ setNotify }) => (
									<Segment vertical textAlign="right">
										<Table celled unstackable>
											<Table.Header>
												<Table.Row>
													<Table.HeaderCell>No.</Table.HeaderCell>
													<Table.HeaderCell>Nama Peristiwa</Table.HeaderCell>
													<Table.HeaderCell>Poin</Table.HeaderCell>
													<Table.HeaderCell>Status</Table.HeaderCell>
													<Table.HeaderCell> </Table.HeaderCell>
												</Table.Row>
											</Table.Header>
											<Table.Body duration={200}>
												{dataperistiwa.map((d, i) => {
													return (
														<Table.Row key={i}>
															<Table.Cell>{i + 1}</Table.Cell>
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
															<Table.Cell>
																<Label
																	color={d.kategori === 1 ? "green" : "red"}
																	horizontal
																>
																	{d.poin}
																</Label>
															</Table.Cell>
															<Table.Cell>
																{d.kategori === 1
																	? "Penghargaan"
																	: "Pelanggaran"}
															</Table.Cell>
															<Table.Cell>
																<Button.Group fluid size="mini" floated="right">
																	{peristiwa.includes(d) === true ? (
																		<Button
																			onClick={() => {
																				hapusperistiwa(i);
																				setNotify(
																					"trash alternate",
																					"peristiwa dihapus",
																					<LinesEllipsis
																						text={d.nama}
																						maxLine={1}
																						ellipsis={" ... "}
																						trimRight
																						basedOn="letters"
																					/>,
																					"red"
																				);
																			}}
																			color="red"
																			content="Hapus"
																			labelPosition="left"
																			icon="trash"
																		/>
																	) : (
																		<Button
																			onClick={() => {
																				tambahperistiwa(i);
																				setNotify(
																					"check circle",
																					"Berhasil menambahkan",
																					<LinesEllipsis
																						text={d.nama}
																						maxLine={1}
																						ellipsis={" ... "}
																						trimRight
																						basedOn="letters"
																					/>
																				);
																			}}
																			primary
																			content="Tambah"
																			labelPosition="left"
																			icon="add"
																		/>
																	)}
																	<Button animated color="orange" size="tiny">
																		<Button.Content hidden content="Edit" />
																		<Button.Content visible>
																			<Icon name="pencil alternate" />
																		</Button.Content>
																	</Button>
																</Button.Group>
															</Table.Cell>
														</Table.Row>
													);
												})}
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
											totalPages={1}
										/>
									</Segment>
								)}
							</Consumer>
						) : (
							<Message
								warning
								style={{ margin: "50px 0 50px 0" }}
								icon="box"
								content="Tidak ada data yang ditampilkan"
							/>
						)}
					</Segment>
				</Modal.Content>
				<Modal.Actions>
					<Button
						onClick={() => props.setShowModal(false)}
						content="Tutup"
						labelPosition="right"
						icon="x"
					/>
				</Modal.Actions>
			</Modal>
		);
	};

	const ButtonCalendar = forwardRef(({ value, onClick }, ref) => {
		return (
			<Button
				size="mini"
				primary
				basic
				content={value}
				ref={ref}
				onClick={onClick}
				icon="calendar"
				labelPosition="left"
			/>
		);
	});

	return (
		<Segment textAlign="center" vertical>
			<Header dividing color="blue" as="h5" icon>
				<Icon name="edit" />
				Pilih Peristiwa
				<Header.Subheader>
					Cari peristiwa pada field di bawah ini
				</Header.Subheader>
			</Header>
			<Grid>
				<Grid.Row>
					<Grid.Column textAlign="left" mobile={16} tablet={8} computer={8}>
						<Search
							input="sdsds"
							placeholder="Cari peristiwa"
							icon="search"
							noResultsMessage="Tidak Ditemukan"
							noResultsDescription="Tidak ada peristiwa yang anda maksud"
						/>
					</Grid.Column>
					<Grid.Column mobile={16} tablet={8} computer={8}>
						<ShowTableModal showModal={showModal} setShowModal={setShowModal}>
							<Button
								size="small"
								floated="right"
								color="orange"
								icon="list"
								content="List peristiwa"
								labelPosition="right"
							/>
						</ShowTableModal>
					</Grid.Column>
				</Grid.Row>
			</Grid>

			<Consumer>
				{({ setNotify }) => (
					<Segment vertical textAlign="right">
						{peristiwa.length === 0 ? (
							<Container textAlign="center">
								<Message
									style={{ margin: "50px 0 100px 0" }}
									warning
									icon="box"
									header="Belum ada peristiwa yang dipilih"
									content="pilih item peristiwa melalui kolom pencarian atau melalui list peristiwa pada bagian atas pesan ini"
								/>
							</Container>
						) : (
							<Table unstackable>
								<Table.Header>
									<Table.Row>
										<Table.HeaderCell> </Table.HeaderCell>
										<Table.HeaderCell>No.</Table.HeaderCell>
										<Table.HeaderCell>Nama peristiwa</Table.HeaderCell>
										<Table.HeaderCell>Poin</Table.HeaderCell>
										<Table.HeaderCell>Status</Table.HeaderCell>
										<Table.HeaderCell>Waktu</Table.HeaderCell>
										<Table.HeaderCell>Keterangan</Table.HeaderCell>
									</Table.Row>
								</Table.Header>
								<Table.Body>
									{peristiwa.map((d, i) => {
										return (
											<Table.Row key={i}>
												<Table.Cell>
													<Button
														onClick={() => {
															hapusperistiwa(i);
															setNotify(
																"trash alternate",
																"peristiwa dihapus",
																<LinesEllipsis
																	text={d.nama}
																	maxLine={1}
																	ellipsis={" ... "}
																	trimRight
																	basedOn="letters"
																/>
															);
														}}
														negative
														size="tiny"
														icon="trash alternate"
													/>
												</Table.Cell>
												<Table.Cell>{i + 1}</Table.Cell>
												<Table.Cell>
													<Popup
														hoverable
														content={d.nama}
														trigger={
															<LinesEllipsis
																text={d.nama}
																maxLine={2}
																ellipsis={" ... "}
																trimRight
																basedOn="letters"
															/>
														}
													/>
												</Table.Cell>
												<Table.Cell>
													<Label
														color={d.kategori === 1 ? "green" : "orange"}
														horizontal
													>
														{d.poin}
													</Label>
												</Table.Cell>
												<Table.Cell>
													{d.kategori === 1 ? "Penghargaan" : "Pelangaran"}
												</Table.Cell>
												<Table.Cell singleLine>
													<DatePicker
														maxDate={new Date()}
														selected={startDate}
														onChange={(date) => setStartDate(date)}
														showTimeInput
														customInput={<ButtonCalendar />}
														dateFormat="dd/MM/yyyy p"
													/>
												</Table.Cell>
												<Table.Cell>
													<Input
														value={d.keterangan}
														onChange={(e, d) => console.log(d.value)}
														placeholder="Tambah keterangan"
													/>
												</Table.Cell>
											</Table.Row>
										);
									})}
								</Table.Body>
							</Table>
						)}
						<Button
							onClick={() => props.nextState(peristiwa)}
							basic
							disabled={peristiwa.length === 0}
							primary
							icon="right arrow"
							labelPosition="right"
							content="Selanjutnya"
						/>
					</Segment>
				)}
			</Consumer>
		</Segment>
	);
}
