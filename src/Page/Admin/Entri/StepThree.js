import {
	Grid,
	Header,
	Icon,
	Message,
	Button,
	Segment,
	Table,
	Label,
	Confirm,
	Divider,
} from "semantic-ui-react";
import LinesEllipsis from "react-lines-ellipsis";
import { useEffect, useState } from "react";
import { entriPoin } from "../../../Apis/Apis";
export default function StepThree(props) {
	const [loading, setLoading] = useState(false);
	const [berhasil, setBerhasil] = useState(false);
	const [konfirmasi, setKonfirmasi] = useState(false);

	useEffect(() => {
		if (props.data.peristiwa.length === 0 || props.data.taruna.length === 0) {
			props.prefState(0);
		}
	});

	const submitData = async () => {
		setKonfirmasi(false);
		setLoading(true);
		setBerhasil(false);
		let record = [];
		props.data.peristiwa.forEach((d, i) => {
			props.data.taruna.forEach((dat, index) => {
				let tmp = {
					id_taruna: dat.nimhsmsmhs,
					id_peristiwa: d.id,
					poin_tambahan:
						d.poin_tambahan === 1 ? props.data.poin_tambahan[i] : 0,
					tgl: new Date(props.data.tanggal[i]),
					keterangan: props.data.keterangan[i],
				};
				record.push(tmp);
			});
		});
		await entriPoin(props.context, record, (response) => {
			if (response.status === 200) {
				if (response.data.error_code === 0) {
					// console.log(response.data.data);
					setBerhasil(true);
					setLoading(false);
					props.success();
				} else {
					console.log(response.data.error_msg);
					props.context.setNotify(
						"warning",
						"Error saat menyimpan data",
						response.data.error_msg,
						"orange"
					);
					setLoading(false);
				}
			} else {
				console.error("get_kategori_peristiwa", response.status, response.msg);
				props.context.setNotify(
					"warning",
					"Error saat mengirim data",
					response.msg,
					"red"
				);
				setLoading(false);
			}
		});
	};
	return (
		<Segment vertical>
			{loading ? (
				<Message info icon>
					<Icon name="circle notched" loading />
					<Message.Content>
						<Message.Header>Mohon Tunggu</Message.Header>
						Mengirim data ke server.
					</Message.Content>
				</Message>
			) : berhasil ? (
				<Segment vertical textAlign="center">
					<Header color="green" as="h1" icon>
						<Icon name="check" />
						Berhasil
						<Header.Subheader>
							Entri poin anda berhasil disimpan
						</Header.Subheader>
					</Header>
					<br />
					<br />
					<br />
					<Button onClick={() => props.endState()} primary>
						Daftar Entri
					</Button>
				</Segment>
			) : (
				<Segment vertical>
					<Confirm
						size="tiny"
						content={
							<Header style={{ margin: 40 }} as="h1" icon>
								<Icon name="help" color="green" />
								Anda yakin ?
								<Header.Subheader>
									Penerapan poin akan berdampak pada status pengasuhan taruna/i
								</Header.Subheader>
							</Header>
						}
						confirmButton="Ya, Terapkan Poin !"
						cancelButton="Batal"
						open={konfirmasi}
						onCancel={() => setKonfirmasi(false)}
						onConfirm={() => submitData()}
					/>
					<Grid>
						<Grid.Column textAlign="right" computer={8} tablet={16} mobile={16}>
							<Table unstackable>
								<Table.Header>
									<Table.Row>
										<Table.HeaderCell>No.</Table.HeaderCell>
										<Table.HeaderCell>Nama peristiwa</Table.HeaderCell>
										<Table.HeaderCell>Poin</Table.HeaderCell>
									</Table.Row>
								</Table.Header>
								<Table.Body>
									{props.data.peristiwa.map((d, i) => (
										<Table.Row key={i}>
											<Table.Cell>{i + 1}</Table.Cell>
											<Table.Cell>
												<LinesEllipsis
													text={d.nama_peristiwa}
													maxLine={1}
													ellipsis={" ... "}
													trimRight
													basedOn="letters"
												/>
												<i style={{ color: "grey" }}>
													{props.data.tanggal[i].getDate() +
														"/" +
														(props.data.tanggal[i].getMonth() + 1) +
														"/" +
														props.data.tanggal[i].getFullYear() +
														" Ket: " +
														props.data.keterangan[i]}
												</i>
											</Table.Cell>
											<Table.Cell>
												<Label
													color={
														d.poin_tambahan === 1
															? "orange"
															: d.pelanggaran === 0
															? "green"
															: "red"
													}
													horizontal
												>
													{d.poin_tambahan === 1
														? props.data.poin_tambahan[i]
														: d.poin}
												</Label>
											</Table.Cell>
										</Table.Row>
									))}
								</Table.Body>
							</Table>
						</Grid.Column>
						<Grid.Column computer={8} tablet={16} mobile={16}>
							<Table unstackable>
								<Table.Header>
									<Table.Row>
										<Table.HeaderCell>No.</Table.HeaderCell>
										<Table.HeaderCell>Nama Taruna</Table.HeaderCell>
										<Table.HeaderCell>Ket.</Table.HeaderCell>
									</Table.Row>
								</Table.Header>
								<Table.Body>
									{props.data.taruna.map((d, i) => (
										<Table.Row key={i}>
											<Table.Cell>{i + 1}</Table.Cell>
											<Table.Cell>
												{d.nimhsmsmhs} - {d.nmmhsmsmhs}
											</Table.Cell>
											<Table.Cell>
												{(d.prodi === "01" ? "D-I" : "D-IV") +
													"/" +
													d.angkatan +
													"/" +
													d.kelas}
											</Table.Cell>
										</Table.Row>
									))}
								</Table.Body>
							</Table>
						</Grid.Column>
					</Grid>
					<Divider />
					<Label color="red">Poin Pelanggaran</Label>
					<Label color="green">Poin Penghargaan </Label>
					<Label color="orange">Poin Tambahan</Label>
					<Message
						warning
						icon="info circle"
						content="Priksa kembali item peristiwa dan taruna sebelum di inputkan kedalam sistem"
						style={{ textAlign: "center", fontStyle: "italic" }}
					/>
					<Segment vertical textAlign="right">
						<Button.Group>
							<Button
								basic
								negative
								icon="left arrow"
								labelPosition="left"
								content="Kembali"
								onClick={() => props.prefState(1)}
							/>
							<Button
								primary
								icon="save"
								labelPosition="right"
								content="Simpan"
								onClick={() => setKonfirmasi(true)}
							/>
						</Button.Group>
					</Segment>
				</Segment>
			)}
		</Segment>
	);
}
