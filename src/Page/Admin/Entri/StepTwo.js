import { useEffect, useState } from "react";
import LinesEllipsis from "react-lines-ellipsis";
import {
	Button,
	Checkbox,
	Divider,
	Grid,
	Header,
	Icon,
	Input,
	Message,
	Pagination,
	Segment,
	Select,
	Table,
} from "semantic-ui-react";
import { getAngkatan, getKelas, getProdi, getTaruna } from "../../../Apis/Apis";
import { Consumer } from "../../../Context";

export default function StepTwo(props) {
	const [checkBox, setCheckBox] = useState(false);
	const [pilihanTaruna, setPilihanTaruna] = useState([]);
	const [taruna, setTaruna] = useState(props.data.taruna);
	const [daftarTaruna, setDaftarTaruna] = useState([]);
	const [loading, setLoading] = useState(false);
	const [filter, setFilter] = useState({
		prodi: [],
		selected_prodi: 0,
		angkatan: [],
		selected_angkatan: 0,
		kelas: [],
		selected_kelas: 0,
		string_cari_taruna: "",
	});
	const [page, setPage] = useState({
		active_page: 1,
		total_page: 1,
		limit_page: 25,
		total_data: 0,
	});

	//get filter
	//prodi
	useEffect(() => {
		async function prodi() {
			await getProdi(props.context, (response) => {
				if (response.status === 200) {
					if (response.data.error_code === 0) {
						response.data.data.length > 0
							? setFilter({
									...filter,
									prodi: response.data.data,
									selected_prodi: response.data.data[0].value,
							  })
							: setFilter({ ...filter, prodi: response.data.data });
					} else {
						console.log(response.data.error_msg);
					}
				} else {
					console.error("get_tahun_ajar", response.status, response.msg);
				}
			});
		}
		prodi();
	}, []);
	//angkatan
	useEffect(() => {
		async function angkatan() {
			if (filter.selected_prodi !== 0) {
				await getAngkatan(props.context, filter.selected_prodi, (response) => {
					if (response.status === 200) {
						if (response.data.error_code === 0) {
							response.data.data.length > 0
								? setFilter({
										...filter,
										angkatan: response.data.data,
										selected_angkatan: response.data.data[0],
								  })
								: setFilter({ ...filter, angkatan: response.data.data });
						} else {
							console.log(response.data.error_msg);
						}
					} else {
						console.error("get_tahun_ajar", response.status, response.msg);
					}
				});
			}
		}
		angkatan();
	}, [filter.selected_prodi]);

	useEffect(() => {
		async function kelas() {
			if (filter.selected_angkatan !== 0 && filter.selected_prodi !== 0) {
				setPage({
					...page,
					limit_page: 25,
					active_page: 1,
				});
				await getKelas(
					props.context,
					filter.selected_prodi,
					filter.selected_angkatan,
					(response) => {
						if (response.status === 200) {
							if (response.data.error_code === 0) {
								response.data.data.length > 0
									? setFilter({
											...filter,
											kelas: response.data.data,
											selected_kelas: response.data.data[0],
									  })
									: setFilter({ ...filter, kelas: response.data.data });
							} else {
								console.log(response.data.error_msg);
							}
						} else {
							console.error("get_tahun_ajar", response.status, response.msg);
						}
					}
				);
			}
		}
		kelas();
	}, [filter.selected_angkatan]);

	useEffect(() => {
		async function GetTaruna() {
			if (
				filter.selected_angkatan !== 0 &&
				filter.selected_prodi !== 0 &&
				filter.selected_kelas !== 0
			) {
				setLoading(true);
				await getTaruna(
					props.context,
					filter.selected_prodi,
					filter.selected_angkatan,
					filter.selected_kelas,
					filter.string_cari_taruna,
					page.limit_page,
					page.active_page,
					(response) => {
						if (response.status === 200) {
							if (response.data.error_code === 0) {
								setPage({
									...page,
									active_page: response.data.data.current_page,
									total_page: response.data.data.last_page,
									total_data: response.data.data.total,
								});
								setDaftarTaruna([...response.data.data.data]);
								setCheckBox(false);
								setPilihanTaruna([]);
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
						setLoading(false);
					}
				);
			}
		}
		GetTaruna();
	}, [filter.selected_kelas, filter.string_cari_taruna, page.active_page]);

	const tambahTaruna = (val) => {
		let tmp = daftarTaruna.findIndex((e) => {
			return e.nimhsmsmhs === val;
		});
		if (tmp >= 0) {
			setTaruna([...taruna, daftarTaruna[tmp]]);
		}
	};

	const hapusTaruna = (val) => {
		let tmp = taruna.findIndex((e) => {
			return e.nimhsmsmhs === val;
		});
		if (tmp >= 0) {
			let tmp2 = taruna;
			tmp2.splice(tmp, 1);
			setTaruna(tmp2);
		}
	};

	const setPilihan = () => {
		if (checkBox) {
			setCheckBox(false);
			setPilihanTaruna([]);
		} else {
			setCheckBox(true);
		}
	};

	const addPilihan = (bool, data) => {
		let tmp = pilihanTaruna;
		if (bool) {
			setPilihanTaruna([...pilihanTaruna, data]);
		} else {
			let index = tmp.indexOf(data);
			if (index >= 0) {
				tmp.splice(index, 1);
				setPilihanTaruna([...tmp]);
			}
		}
	};

	const pilihSemua = () => {
		let tmp = [];
		daftarTaruna.forEach((d, i) => {
			if (!taruna.some((e) => e.nimhsmsmhs === d.nimhsmsmhs)) {
				tmp.push(d);
			}
		});
		setPilihanTaruna(tmp);
	};

	const tambahPilihan = () => {
		let tmp = [];
		pilihanTaruna.forEach((d, i) => {
			if (!taruna.some((e) => e.nimhsmsmhs === d.nimhsmsmhs)) {
				tmp.push(d);
			}
		});
		setTaruna([...taruna, ...tmp]);
		setCheckBox(false);
		setPilihanTaruna([]);
	};

	return (
		<Segment textAlign="center" vertical>
			<Header dividing color="blue" as="h5" icon>
				<Icon name="users" />
				Pilih Taruna
				<Header.Subheader>Cari Taruna pada field di bawah ini</Header.Subheader>
			</Header>
			<Consumer>
				{({ setNotify }) => (
					<Grid>
						<Grid.Column
							textAlign="right"
							computer={10}
							tablet={16}
							mobile={16}
						>
							<Segment loading={loading} vertical textAlign="left">
								<Select
									style={{ width: "100px" }}
									placeholder="Program Studi"
									value={filter.selected_prodi}
									onChange={(e, d) =>
										setFilter({
											...filter,
											selected_prodi: d.value,
											selected_angkatan: 0,
											selected_kelas: 0,
										})
									}
									options={filter.prodi.map((d, i) => {
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
									value={filter.selected_angkatan}
									onChange={(e, d) =>
										setFilter({
											...filter,
											selected_angkatan: d.value,
											selected_kelas: 0,
										})
									}
									options={filter.angkatan.map((d, i) => {
										return {
											key: i,
											value: d,
											text: d,
										};
									})}
								/>{" "}
								<Select
									placeholder="Pilih Kelas"
									value={filter.selected_kelas}
									onChange={(e, d) =>
										setFilter({ ...filter, selected_kelas: d.value })
									}
									options={filter.kelas.map((d, i) => {
										return {
											key: i,
											value: d,
											text: d,
										};
									})}
								/>
								<Divider />
								<Input
									fluid
									onChange={(e, d) =>
										setFilter({ ...filter, string_cari_taruna: d.value })
									}
									value={filter.string_cari_taruna}
									placeholder="Cari "
									iconPosition="left"
									icon="search"
								/>
								{daftarTaruna.length === 0 ? (
									<Message
										style={{ margin: "50px 0 100px 0" }}
										warning
										icon="box"
										header="Tidak ada data yang bisa ditampilkan"
										content="Priksa filter data"
									/>
								) : (
									<Segment vertical textAlign="right">
										<Table className="table" unstackable>
											<Table.Header>
												<Table.Row>
													<Table.HeaderCell>No.</Table.HeaderCell>
													<Table.HeaderCell>Nama Taruna</Table.HeaderCell>
													<Table.HeaderCell>Poin Sementara</Table.HeaderCell>
													<Table.HeaderCell>Poin Komulatif</Table.HeaderCell>
													<Table.HeaderCell textAlign="right">
														{checkBox ? (
															<Button.Group size="small">
																{pilihanTaruna.length < 1 ? (
																	<Button
																		onClick={() => pilihSemua()}
																		secondary
																	>
																		Pilih semua
																	</Button>
																) : (
																	<Button
																		onClick={() => tambahPilihan()}
																		primary
																	>
																		Tambahkan
																	</Button>
																)}
																<Button
																	color="orange"
																	icon="x"
																	basic
																	onClick={() => setPilihan()}
																/>
															</Button.Group>
														) : (
															<Button
																onClick={() => setPilihan()}
																size="small"
																content="Pilih"
																icon="check"
																labelPosition="right"
															/>
														)}
													</Table.HeaderCell>
												</Table.Row>
											</Table.Header>
											<Table.Body>
												{daftarTaruna.map((d, i) => (
													<Table.Row key={i}>
														<Table.Cell>
															{(page.active_page - 1) * page.limit_page + i + 1}
														</Table.Cell>
														<Table.Cell>
															{d.nimhsmsmhs} - {d.nmmhsmsmhs}
														</Table.Cell>
														<Table.Cell>{d.ips} Poin</Table.Cell>
														<Table.Cell>{d.ipk} Poin</Table.Cell>
														<Table.Cell textAlign="right">
															{checkBox ? (
																<Checkbox
																	fitted
																	disabled={taruna.some(
																		(dat) => d.nimhsmsmhs === dat.nimhsmsmhs
																	)}
																	onChange={(e, data) =>
																		addPilihan(data.checked, d)
																	}
																	checked={
																		pilihanTaruna.includes(d) &&
																		!taruna.some(
																			(dat) => d.nimhsmsmhs === dat.nimhsmsmhs
																		)
																	}
																/>
															) : taruna.some(
																	(del) => del.nimhsmsmhs === d.nimhsmsmhs
															  ) ? (
																<Button
																	onClick={() => {
																		hapusTaruna(d.nimhsmsmhs);
																		setNotify(
																			"trash",
																			"Dihapus  ",
																			d.nmmhsmsmhs + " dihapus",
																			"orange"
																		);
																	}}
																	floated="right"
																	negative
																	labelPosition="right"
																	size="tiny"
																	content="Hapus"
																	icon="trash alternate"
																/>
															) : (
																<Button
																	onClick={() => {
																		tambahTaruna(d.nimhsmsmhs);
																		setNotify(
																			"check circle",
																			"Berhasil  ",
																			d.nmmhsmsmhs + " ditambahkan"
																		);
																	}}
																	floated="right"
																	positive
																	labelPosition="right"
																	size="tiny"
																	content="Tambah"
																	icon="add"
																/>
															)}
														</Table.Cell>
													</Table.Row>
												))}
											</Table.Body>
										</Table>
										<Message
											info
											icon="info circle"
											content={"Menampilkan " + page.total_data + " Data"}
											style={{ textAlign: "center", fontStyle: "italic" }}
										/>
										<Pagination
											defaultActivePage={1}
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
							</Segment>
							<Divider />
						</Grid.Column>
						<Grid.Column computer={6} tablet={16} mobile={16}>
							{taruna.length === 0 ? (
								<Message
									style={{ marginTop: 70 }}
									warning
									icon="box"
									header="Belum ada Taruna/i yang dipilih"
									content="pilih item  melalui kolom pencarian atau melalui list peristiwa pada bagian atas/samping kiri"
								/>
							) : (
								<Table unstackable>
									<Table.Header>
										<Table.Row>
											<Table.HeaderCell> </Table.HeaderCell>
											<Table.HeaderCell>No.</Table.HeaderCell>
											<Table.HeaderCell>Nama Taruna</Table.HeaderCell>
										</Table.Row>
									</Table.Header>
									<Table.Body>
										{taruna.map((d, i) => (
											<Table.Row key={i}>
												<Table.Cell>
													<Button
														onClick={() => {
															hapusTaruna(d.nimhsmsmhs);
															setNotify(
																"trash alternate",
																"Dihapus",
																d.nmmhsmsmhs + " dihapus",
																"orange"
															);
														}}
														negative
														size="tiny"
														icon="trash alternate"
													/>
												</Table.Cell>
												<Table.Cell>{i + 1}</Table.Cell>
												<Table.Cell>
													{d.nimhsmsmhs} - {d.nmmhsmsmhs}
												</Table.Cell>
											</Table.Row>
										))}
									</Table.Body>
								</Table>
							)}
						</Grid.Column>
					</Grid>
				)}
			</Consumer>
			<Segment vertical textAlign="right">
				<Button.Group>
					<Button
						basic
						negative
						icon="left arrow"
						labelPosition="left"
						onClick={() => props.prefState(0)}
						content="Kembali"
					/>
					<Button
						disabled={taruna.length === 0}
						onClick={() => props.nextState(taruna)}
						basic
						primary
						icon="right arrow"
						labelPosition="right"
						content="Selanjutnya"
					/>
				</Button.Group>
			</Segment>
		</Segment>
	);
}
