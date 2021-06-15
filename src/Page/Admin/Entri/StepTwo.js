import { useEffect, useState } from "react";
import {
	Button,
	Checkbox,
	Divider,
	Grid,
	Header,
	Icon,
	Message,
	Pagination,
	Search,
	Segment,
	Select,
	Table,
} from "semantic-ui-react";
import { Consumer } from "../../../Context";
const data = require("../../../Dummy/taruna.json");

export default function StepTwo(props) {
	const [checkBox, setCheckBox] = useState(false);
	const [pilihanTaruna, setPilihanTaruna] = useState([]);
	const [taruna, setTaruna] = useState([...props.data.taruna]);
	const [daftarTaruna, setDaftarTaruna] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setDaftarTaruna(
			data.filter((el) => {
				return !taruna.includes(el);
			})
		);
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}, [taruna]);

	const tambahTaruna = (index) => {
		setTaruna([...taruna, daftarTaruna[index]]);
		// let tmp = daftarTaruna;
		// tmp.splice(index, 1);
		// setDaftarTaruna(tmp);
	};

	const hapusTaruna = (index) => {
		setDaftarTaruna([...daftarTaruna, taruna[index]]);
		let tmp = taruna;
		tmp.splice(index, 1);
		setTaruna(tmp);
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
		setPilihanTaruna([...daftarTaruna]);
	};

	const tambahPilihan = () => {
		setTaruna([...taruna, ...pilihanTaruna]);
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
								<Search placeholder="Cari Taruna" icon="search" />{" "}
								<Select
									placeholder="Pilih Prodi"
									options={[
										{
											key: 1,
											value: "D4",
											text: "D4 - Petanahan",
										},
									]}
								/>{" "}
								<Select
									placeholder="Pilih Kelas"
									options={[
										{
											key: 1,
											value: "D",
											text: "Kelas D",
										},
									]}
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
										<Table unstackable>
											<Table.Header>
												<Table.Row>
													<Table.HeaderCell>No.</Table.HeaderCell>
													<Table.HeaderCell>Nama Taruna</Table.HeaderCell>
													<Table.HeaderCell>Program Studi</Table.HeaderCell>
													<Table.HeaderCell>Kelas</Table.HeaderCell>
													<Table.HeaderCell textAlign="right">
														{checkBox ? (
															<Button.Group size="small">
																{pilihanTaruna.length === 0 ? (
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
														<Table.Cell>{i + 1}</Table.Cell>
														<Table.Cell>
															{d.id} - {d.nama}
														</Table.Cell>
														<Table.Cell>{d.prodi}</Table.Cell>
														<Table.Cell>{d.kelas}</Table.Cell>
														<Table.Cell textAlign="right">
															{checkBox ? (
																<Checkbox
																	fitted
																	onClick={(e, data) => {
																		addPilihan(data.checked, d);
																	}}
																	checked={pilihanTaruna.includes(d)}
																/>
															) : (
																<Button
																	onClick={() => {
																		tambahTaruna(i);
																		setNotify(
																			"check circle",
																			"Berhasil  ",
																			d.nama + " ditambahkan"
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
															hapusTaruna(i);
															setNotify("trash alternate", "Dihapus", d.nama);
														}}
														negative
														size="tiny"
														icon="trash alternate"
													/>
												</Table.Cell>
												<Table.Cell>{i + 1}</Table.Cell>
												<Table.Cell>
													{d.id} - {d.nama}
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
