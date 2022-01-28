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
import { getKategori, getPeristiwa } from "../../../Apis/Apis";

export default function StepOne(props) {
	const [showModal, setShowModal] = useState(false);
	const [tanggalPeristiwa, setTanggalPeristiwa] = useState(
		props.data.tanggal || []
	);
	const [poinTambahan, setPoinTambahan] = useState(
		props.data.poin_tambahan || []
	);
	const [keteranganPeristiwa, setKeteranganPeristiwa] = useState(
		props.data.keterangan || []
	);
	const [peristiwa, setperistiwa] = useState([...props.data.peristiwa]);
	const [dataperistiwa, setDataperistiwa] = useState([]);
	const [cari, setCari] = useState("");
	const [loading, setLoading] = useState({
		modal: true,
		search: true,
	});
	const [page, setPage] = useState({
		active_page: 1,
		total_page: 1,
		limit: 10,
		total_data: 0,
	});
	const [filter, setFilter] = useState({
		kategori: [],
		loadingKategori: true,
		cariKategori: "",
		loadingCariKategori: false,
		kategoriActive: {
			key: "",
			text: "semua",
		},
		failKategori: false,
	});

	const tambahperistiwa = (index) => {
		if (!peristiwa.some((dat) => dataperistiwa[index].id === dat.id)) {
			let tmp = peristiwa;
			tmp.push(dataperistiwa[index]);
			setperistiwa(tmp);
			let i = peristiwa.findIndex((e) => e.id === dataperistiwa[index].id);
			tmp = poinTambahan;
			tmp[i] = 10;
			setPoinTambahan(tmp);
			tmp = tanggalPeristiwa;
			tmp[i] = new Date();
			setTanggalPeristiwa(tmp);
			tmp = keteranganPeristiwa;
			tmp[i] = "-";
			setKeteranganPeristiwa(tmp);
			setCari("");
		} else {
			props.context.setNotify(
				"warning",
				"Peristiwa Sudah ada",
				dataperistiwa[index].nama_peristiwa + " sudah ditambahkan",
				"orange"
			);
		}
	};

	const hapusperistiwa = (d) => {
		let tmp = peristiwa;
		let index = peristiwa.findIndex((e) => e.id === d.id);
		if (index > -1) {
			tmp.splice(index, 1);
			setperistiwa(tmp);
			tmp = poinTambahan;
			tmp.splice(index, 1);
			setPoinTambahan(tmp);
			tmp = keteranganPeristiwa;
			tmp.splice(index, 1);
			setKeteranganPeristiwa(tmp);
			props.context.setNotify(
				"trash alternate",
				"peristiwa dihapus",
				<LinesEllipsis
					text={d.nama_peristiwa}
					maxLine={1}
					ellipsis={" ... "}
					trimRight
					basedOn="letters"
				/>,
				"red"
			);
		}
	};

	const getFilterKategori = async () => {
		setFilter({
			...filter,
			failKategori: false,
			loadingKategori: true,
			loadingCariKategori: true,
		});
		await getKategori(props.context, filter.cariKategori, (response) => {
			if (response.status === 200) {
				if (response.data.error_code === 0) {
					if (filter.cariKategori === "") {
						setFilter({
							...filter,
							kategoriActive: { text: "semua", key: "" },
						});
					}
					setFilter({
						...filter,
						kategori: response.data.data,
						loadingKategori: false,
						loadingCariKategori: false,
					});
				} else {
					console.log(response.data.error_msg);
					props.context.setNotify(
						"warning",
						"Error saat mengambil data",
						response.data.error_msg,
						"orange"
					);
				}
			} else {
				console.error("get_kategori_peristiwa", response.status, response.msg);
				setFilter({ ...filter, failKategori: true });
			}
		});
	};

	const pilihFilter = async (value) => {
		setFilter({
			...filter,
			kategoriActive: { key: value.value, text: value.text },
			loading: true,
		});
		setPage({ ...page, active_page: 1 });
	};

	useEffect(() => {
		async function GetPeristiwa() {
			setLoading({ ...loading, modal: true });
			await getPeristiwa(
				props.context,
				filter.kategoriActive.key,
				cari,
				page.active_page,
				page.limit,
				(response) => {
					if (response.status === 200) {
						if (response.data.error_code === 0) {
							setDataperistiwa(response.data.data.data);
							setPage({
								...page,
								active_page: response.data.data.current_page,
								total_page: response.data.data.last_page,
								total_data: response.data.data.total,
							});
						} else {
							console.log(response.data.error_msg);
							props.context.setNotify(
								"warning",
								"Error saat mengambil data",
								response.data.error_msg,
								"orange"
							);
						}
					} else {
						console.error("get_tahun_ajar", response.status, response.msg);
					}
					setLoading({ ...loading, modal: false });
				}
			);
		}
		GetPeristiwa();
	}, [page.active_page, cari, filter.kategoriActive]);

	const ShowTableModal = (props) => {
		return (
			<Modal
				trigger={props.children}
				open={props.showModal}
				onOpen={() => {
					props.setShowModal(true);
					props.setCari("");
					getFilterKategori();
				}}
			>
				<Modal.Header>Daftar peristiwa Pengasuhan</Modal.Header>
				<Modal.Content scrolling>
					<Segment vertical>
						<Grid>
							<Grid.Row columns={2}>
								<Grid.Column key={0}>
									{filter.failKategori ? (
										<Button
											onClick={() => getFilterKategori()}
											icon="redo"
											content="Gagal..."
										/>
									) : (
										<Dropdown
											disabled={filter.loadingKategori}
											loading={filter.loadingKategori}
											text={filter.kategoriActive.text}
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
														key=""
														active={filter.kategoriActive.key === "semua"}
														value=""
														text="semua"
														onClick={(e, d) => pilihFilter(d)}
														label={{
															color: "blue",
															empty: true,
															circular: false,
														}}
													/>
													<Dropdown.Item
														key="penghargaan"
														active={filter.kategoriActive.key === "penghargaan"}
														value="penghargaan"
														text="penghargaan"
														onClick={(e, d) => pilihFilter(d)}
														label={{
															color: "green",
															empty: true,
															circular: false,
														}}
													/>
													<Dropdown.Item
														key="pelanggaran"
														active={filter.kategoriActive.key === "pelanggaran"}
														value="pelanggaran"
														text="pelanggaran"
														onClick={(e, d) => pilihFilter(d)}
														label={{
															color: "red",
															empty: true,
															circular: false,
														}}
													/>
													<Dropdown.Header>Sub peristiwa</Dropdown.Header>
													{/* <Input
														focus
														onClick={(e) => e.stopPropagation()}
														loading={filter.loadingCariKategori}
														onChange={(e, d) => {
															setFilter({
																...filter,
																cariKategori: d.value,
																loadingCariKategori: true,
															});
															getFilterKategori();
														}}
														icon="search"
														iconPosition="left"
														className="search"
													/> */}
													{filter.kategori.length === 0 ? (
														<Dropdown.Item
															key={0}
															text="Tidak ada data"
															disabled
														/>
													) : (
														filter.kategori.map((d, i) => {
															return (
																<Dropdown.Item
																	key={i}
																	active={filter.kategoriActive.key === d.id}
																	value={d.id}
																	text={d.nama_kategori}
																	onClick={(e, d) => pilihFilter(d)}
																	label={{
																		color:
																			d.pelanggaran === 1 ? "red" : "green",
																		empty: true,
																		circular: true,
																	}}
																/>
															);
														})
													)}
												</Dropdown.Menu>
											</Dropdown.Menu>
										</Dropdown>
									)}
								</Grid.Column>
								<Grid.Column textAlign="right" key={1}>
									{/* <Input
										placeholder="Cari perisitwa"
										icon="search"
										value={cari}
										onChange={(e, d) => setCari(d.value)}
										// labelPosition="right"
									/> */}
								</Grid.Column>
							</Grid.Row>
						</Grid>
						{dataperistiwa.length > 0 ? (
							<Consumer>
								{({ setNotify }) => (
									<Segment
										stacked
										vertical
										textAlign="right"
										loading={loading.modal}
									>
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
															<Table.Cell>
																{(page.active_page - 1) * page.limit + i + 1}
															</Table.Cell>
															<Table.Cell>
																<Popup
																	hoverable
																	content={d.nama_peristiwa}
																	trigger={
																		<LinesEllipsis
																			text={d.nama_peristiwa}
																			maxLine={1}
																			ellipsis={" ... "}
																			trimRight
																			basedOn="letters"
																		/>
																	}
																/>
															</Table.Cell>
															<Table.Cell>
																{d.poin_tambahan === 1
																	? "Poin Tambahan"
																	: d.poin}
															</Table.Cell>
															<Table.Cell>
																<Label
																	color={d.pelanggaran === 1 ? "red" : "green"}
																>
																	<Popup
																		hoverable
																		content={d.nama_kategori}
																		trigger={
																			<LinesEllipsis
																				text={d.nama_kategori}
																				maxLine={2}
																				ellipsis={" ... "}
																				trimRight
																				basedOn="letters"
																			/>
																		}
																	/>
																</Label>
															</Table.Cell>
															<Table.Cell>
																<Button.Group fluid size="mini" floated="right">
																	{peristiwa.some((dat) => d.id === dat.id) ? (
																		<Button
																			onClick={() => hapusperistiwa(d)}
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
																					"Ditambahkan",
																					<LinesEllipsis
																						text={d.nama_peristiwa}
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
																	{/* <Button animated color="orange" size="tiny">
																		<Button.Content hidden content="Edit" />
																		<Button.Content visible>
																			<Icon name="pencil alternate" />
																		</Button.Content>
																	</Button> */}
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
											content={"Menampilkan total " + page.total_data + " Data"}
											style={{ textAlign: "center", fontStyle: "italic" }}
										/>
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
							results={dataperistiwa.map((d, i) => {
								return {
									key: i,
									title: d.nama_peristiwa,
									description: d.nama_kategori,
									...d,
								};
							})}
							onResultSelect={(e, d) => tambahperistiwa(d.result.key)}
							value={cari}
							onSearchChange={(e, d) => setCari(d.value)}
							placeholder="Cari peristiwa"
							icon="search"
							noResultsMessage="Tidak Ditemukan"
							noResultsDescription="Tidak ada peristiwa yang anda maksud"
						/>
					</Grid.Column>
					<Grid.Column mobile={16} tablet={8} computer={8}>
						<ShowTableModal
							setCari={setCari}
							showModal={showModal}
							setShowModal={setShowModal}
						>
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
														onClick={() => hapusperistiwa(d)}
														negative
														size="tiny"
														icon="trash alternate"
													/>
												</Table.Cell>
												<Table.Cell>{i + 1}</Table.Cell>
												<Table.Cell>
													<Popup
														hoverable
														content={d.nama_peristiwa}
														trigger={
															<LinesEllipsis
																text={d.nama_peristiwa}
																maxLine={2}
																ellipsis={" ... "}
																trimRight
																basedOn="letters"
															/>
														}
													/>
												</Table.Cell>
												<Table.Cell>
													{d.poin_tambahan === 1 ? (
														<Input
															type="number"
															value={poinTambahan[i]}
															onChange={(e, dat) => {
																let tmp = [...poinTambahan];
																tmp[i] = dat.value;
																setPoinTambahan(tmp);
															}}
															placeholder="Poin Tambahan"
														/>
													) : (
														d.poin
													)}
												</Table.Cell>
												<Table.Cell>
													<Label
														color={d.pelanggaran === 1 ? "red" : "green"}
														horizontal
													>
														{d.pelanggaran === 1
															? "Pelanggaran"
															: "Penghargaan"}
													</Label>
												</Table.Cell>
												<Table.Cell singleLine>
													<DatePicker
														maxDate={new Date()}
														selected={tanggalPeristiwa[i]}
														onChange={(date) => {
															let tmp = [...tanggalPeristiwa];
															tmp[i] = date;
															setTanggalPeristiwa(tmp);
														}}
														showTimeInput
														customInput={<ButtonCalendar />}
														dateFormat="dd/MM/yyyy p"
													/>
												</Table.Cell>
												<Table.Cell>
													<Input
														value={keteranganPeristiwa[i]}
														onChange={(e, dat) => {
															let tmp = [...keteranganPeristiwa];
															tmp[i] = dat.value;
															setKeteranganPeristiwa(tmp);
														}}
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
							onClick={() =>
								props.nextState(
									peristiwa,
									poinTambahan,
									keteranganPeristiwa,
									tanggalPeristiwa
								)
							}
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
