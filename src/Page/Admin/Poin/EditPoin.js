import React, { Component, useState } from "react";
import {
	Segment,
	Header,
	Grid,
	Table,
	Tab,
	Popup,
	Button,
	Checkbox,
	Label,
	Message,
	Divider,
	Icon,
} from "semantic-ui-react";
import LinesEllipsis from "react-lines-ellipsis";

function DaftarPristiwa(props) {
	const [checkBox, setCheckBox] = useState(false);
	const [pilihanPristiwa, setPilihanPristiwa] = useState([]);

	const setPilihan = () => {
		if (checkBox) {
			setCheckBox(false);
			setPilihanPristiwa([]);
		} else {
			setCheckBox(true);
		}
	};

	const pilihSemua = () => {
		setPilihanPristiwa([...props.data.pristiwa]);
	};

	const addPilihan = (bool, data) => {
		let tmp = pilihanPristiwa;
		if (bool) {
			setPilihanPristiwa([...pilihanPristiwa, data]);
		} else {
			let index = tmp.indexOf(data);
			if (index >= 0) {
				tmp.splice(index, 1);
				setPilihanPristiwa([...tmp]);
			}
		}
	};

	const hapusPilihan = () => {
		if (pilihanPristiwa.length > 0) {
			let tmp = props.data.pristiwa;
			pilihanPristiwa.map((d) => props.delete(tmp.indexOf(d)));
		}
	};

	return (
		<Segment vertical textAlign="center">
			{props.data.pristiwa.length === 0 ? (
				<Message
					style={{ margin: "50px 0 100px 0" }}
					warning
					icon="warning"
					header="Tidak ada data yang bisa ditampilkan"
					content="silahkan reload halaman"
				/>
			) : (
				<Segment vertical textAlign="right">
					<Table unstackable basic="very">
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell>No.</Table.HeaderCell>
								<Table.HeaderCell>Nama Pristiwa</Table.HeaderCell>
								<Table.HeaderCell>Poin</Table.HeaderCell>
								<Table.HeaderCell>Kategori</Table.HeaderCell>
								<Table.HeaderCell textAlign="right">
									{checkBox ? (
										<Button.Group size="small">
											{pilihanPristiwa.length === 0 ? (
												<Button onClick={() => pilihSemua()} secondary>
													Pilih semua
												</Button>
											) : (
												<Button onClick={() => hapusPilihan()} negative>
													Hapus
												</Button>
											)}
											<Button
												color="red"
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
							{props.data.pristiwa.map((d, i) => (
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
													basedOn="words"
												/>
											}
										/>
									</Table.Cell>
									<Table.Cell>{d.poin}</Table.Cell>
									<Table.Cell>
										<Label
											color={d.kategori === 1 ? "green" : "red"}
											horizontal
										>
											{d.kategori === 1 ? "Penghargaan" : "Pelanggaran"}
										</Label>
									</Table.Cell>
									<Table.Cell textAlign="right">
										{checkBox ? (
											<Checkbox
												fitted
												onClick={(e, data) => {
													addPilihan(data.checked, d);
												}}
												checked={pilihanPristiwa.includes(d)}
											/>
										) : (
											<Button
												onClick={() => props.delete(i)}
												floated="right"
												negative
												labelPosition="right"
												size="tiny"
												content="Hapus"
												icon="trash"
											/>
										)}
									</Table.Cell>
								</Table.Row>
							))}
						</Table.Body>
					</Table>
				</Segment>
			)}
		</Segment>
	);
}

const taruna = require("../../../Dummy/taruna.json");
const pristiwa = require("../../../Dummy/peristiwa.json");

function DaftarTaruna(props) {
	const [checkBox, setCheckBox] = useState(false);
	const [pilihanTaruna, setPilihanTaruna] = useState([]);

	const setPilihan = () => {
		if (checkBox) {
			setCheckBox(false);
			setPilihanTaruna([]);
		} else {
			setCheckBox(true);
		}
	};

	const pilihSemua = () => {
		setPilihanTaruna([...props.data.taruna]);
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

	const hapusPilihan = () => {
		if (pilihanTaruna.length > 0) {
			let tmp = props.data.taruna;
			pilihanTaruna.map((d) => props.delete(tmp.indexOf(d)));
		}
	};

	return (
		<Segment vertical textAlign="center">
			{props.data.taruna.length === 0 ? (
				<Message
					style={{ margin: "50px 0 100px 0" }}
					warning
					icon="warning"
					header="Tidak ada data yang bisa ditampilkan"
					content="silahkan reload halaman"
				/>
			) : (
				<Segment vertical textAlign="right">
					<Table unstackable basic="very">
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
												<Button onClick={() => pilihSemua()} secondary>
													Pilih semua
												</Button>
											) : (
												<Button onClick={() => hapusPilihan()} negative>
													Hapus
												</Button>
											)}
											<Button
												color="red"
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
							{props.data.taruna.map((d, i) => (
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
												onClick={() => props.delete(i)}
												floated="right"
												negative
												labelPosition="right"
												size="tiny"
												content="Hapus"
												icon="trash"
											/>
										)}
									</Table.Cell>
								</Table.Row>
							))}
						</Table.Body>
					</Table>
				</Segment>
			)}
		</Segment>
	);
}

function Perubahan(props) {
	return (
		<Segment vertical textAlign="center">
			{JSON.stringify(props.data) === JSON.stringify(props.dataAwal) ? (
				<Message
					style={{ margin: "50px 0 100px 0" }}
					warning
					icon="warning"
					header="Tidak ada data perubahan ditampilkan"
					content="silahkan lakukan perubahan terlebih dahula pada tab Daftar Taruna dan atau Daftar Pristiwa"
				/>
			) : (
				<Segment vertical textAlign="right">
					<Grid>
						<Grid.Column tablet={8} computer={8} mobile={16} textAlign="left">
							<Grid relaxed="very" columns={2}>
								<Grid.Column>
									<Table unstackable basic="very">
										<Table.Header>
											<Table.Row>
												<Table.HeaderCell>No.</Table.HeaderCell>
												<Table.HeaderCell>Nama Taruna</Table.HeaderCell>
											</Table.Row>
										</Table.Header>
										<Table.Body>
											{props.dataAwal.taruna.map((d, i) => (
												<Table.Row key={i}>
													<Table.Cell>{i + 1}</Table.Cell>
													<Table.Cell>{d.nama}</Table.Cell>
												</Table.Row>
											))}
										</Table.Body>
									</Table>
								</Grid.Column>
								<Grid.Column>
									<Table unstackable basic="very">
										<Table.Header>
											<Table.Row>
												<Table.HeaderCell>No.</Table.HeaderCell>
												<Table.HeaderCell>Nama Taruna</Table.HeaderCell>
											</Table.Row>
										</Table.Header>
										<Table.Body>
											{props.data.taruna.map((d, i) => (
												<Table.Row key={i}>
													<Table.Cell>{i + 1}</Table.Cell>
													<Table.Cell>{d.nama}</Table.Cell>
												</Table.Row>
											))}
										</Table.Body>
									</Table>
								</Grid.Column>
							</Grid>
							<Divider vertical>
								<Icon name="arrow right" />
							</Divider>
						</Grid.Column>
						<Grid.Column tablet={8} computer={8} mobile={16} textAlign="left">
							<Grid relaxed="very" columns={2}>
								<Grid.Column>
									<Table unstackable basic="very">
										<Table.Header>
											<Table.Row>
												<Table.HeaderCell>No.</Table.HeaderCell>
												<Table.HeaderCell>Nama Pristiwa</Table.HeaderCell>
											</Table.Row>
										</Table.Header>
										<Table.Body>
											{props.dataAwal.pristiwa.map((d, i) => (
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
																	basedOn="words"
																/>
															}
														/>
													</Table.Cell>
												</Table.Row>
											))}
										</Table.Body>
									</Table>
								</Grid.Column>
								<Grid.Column>
									<Table unstackable basic="very">
										<Table.Header>
											<Table.Row>
												<Table.HeaderCell>No.</Table.HeaderCell>
												<Table.HeaderCell>Nama Pristiwa</Table.HeaderCell>
											</Table.Row>
										</Table.Header>
										<Table.Body>
											{props.data.pristiwa.map((d, i) => (
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
																	basedOn="words"
																/>
															}
														/>
													</Table.Cell>
												</Table.Row>
											))}
										</Table.Body>
									</Table>
								</Grid.Column>
							</Grid>
							<Divider vertical>
								<Icon name="arrow right" />
							</Divider>
						</Grid.Column>
					</Grid>
					<br />
					<br />
					<Button
						size="large"
						primary
						content="Simpan Perubahan"
						icon="send"
						labelPosition="right"
					/>
				</Segment>
			)}
		</Segment>
	);
}

export default class EditPoin extends Component {
	state = {
		activeIndex: 0,
		data: {
			taruna: [...taruna],
			pristiwa: [...pristiwa],
		},
		dataReload: {
			taruna: [...taruna],
			pristiwa: [...pristiwa],
		},
	};

	reload = async () => {
		this.setState({
			data: {
				taruna: this.state.dataReload.taruna,
				pristiwa: this.state.dataReload.pristiwa,
			},
		});
	};

	deleteTaruna = async (index) => {
		var tmp = this.state.data.taruna;
		if (index < tmp.length && index > -1) {
			tmp.splice(index, 1);
			this.setState({
				data: {
					taruna: tmp,
					pristiwa: this.state.data.pristiwa,
				},
			});
		}
	};

	deletePristiwa = async (index) => {
		var tmp = this.state.data.pristiwa;
		if (index < tmp.length && index > -1) {
			tmp.splice(index, 1);
			this.setState({
				data: {
					pristiwa: tmp,
					taruna: this.state.data.taruna,
				},
			});
		}
	};

	render() {
		return (
			<Segment vertical className="page-content-segment">
				<Header textAlign="center" as="h4" dividing color="blue">
					Edit Entri Poin Pengasuhan
				</Header>
				<Grid>
					<Grid.Column mobile={16} tablet={16} computer={8}>
						<Table definition>
							<Table.Body>
								<Table.Row>
									<Table.Cell>ID Peristiwa</Table.Cell>
									<Table.Cell>: Approved</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>Tanggal Entri</Table.Cell>
									<Table.Cell>: Approved</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>Jumlah Pristiwa</Table.Cell>
									<Table.Cell>: Approved</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>Jumlah Taruna</Table.Cell>
									<Table.Cell>: Approved</Table.Cell>
								</Table.Row>
							</Table.Body>
						</Table>
					</Grid.Column>
					<Grid.Column mobile={16} tablet={16} computer={8}>
						<Button.Group size="large" fluid>
							<Button
								color="green"
								onClick={() => this.reload()}
								basic
								icon="redo"
								labelPosition="left"
								content="Reload"
							/>
							<Button
								disabled={this.state.activeIndex === 2}
								positive
								onClick={() => this.setState({ activeIndex: 2 })}
								icon="save"
								labelPosition="right"
								content="Simpan"
							/>
						</Button.Group>
					</Grid.Column>
				</Grid>
				<br />
				<Tab
					menuPosition="right"
					activeIndex={this.state.activeIndex}
					onTabChange={(e, d) => this.setState({ activeIndex: d.activeIndex })}
					menu={{ secondary: true, pointing: true }}
					panes={[
						{
							menuItem: "Daftar Taruna",
							render: () => (
								<Tab.Pane attached={false}>
									<DaftarTaruna
										delete={(e) => this.deleteTaruna(e)}
										data={this.state.data}
									/>
								</Tab.Pane>
							),
						},
						{
							menuItem: "Daftar Pristiwa",
							render: () => (
								<Tab.Pane attached={false}>
									<DaftarPristiwa
										delete={(e) => this.deletePristiwa(e)}
										data={this.state.data}
									/>
								</Tab.Pane>
							),
						},
						{
							menuItem: "Perubahan",
							render: () => (
								<Tab.Pane attached={false}>
									<Perubahan
										delete={(e) => this.deletePristiwa(e)}
										data={this.state.data}
										dataAwal={this.state.dataReload}
									/>
								</Tab.Pane>
							),
						},
					]}
				/>
			</Segment>
		);
	}
}
