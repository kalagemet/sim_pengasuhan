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
} from "semantic-ui-react";
import LinesEllipsis from "react-lines-ellipsis";
import { useEffect, useState } from "react";

export default function StepThree(props) {
	const [loading, setLoading] = useState(false);
	const [berhasil, setBerhasil] = useState(false);
	const [konfirmasi, setKonfirmasi] = useState(false);

	useEffect(() => {
		if (props.data.pristiwa.length === 0 || props.data.taruna.length === 0) {
			props.prefState(0);
		}
	});

	const submitData = () => {
		setLoading(true);
		setBerhasil(true);
		setTimeout(() => {
			setLoading(false);
			props.success();
		}, 3000);
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
					<Button onClick={() => props.endState()} positive>
						Entri Baru
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
										<Table.HeaderCell>Nama Pristiwa</Table.HeaderCell>
										<Table.HeaderCell>Poin</Table.HeaderCell>
									</Table.Row>
								</Table.Header>
								<Table.Body>
									{props.data.pristiwa.map((d, i) => (
										<Table.Row key={i}>
											<Table.Cell>{i + 1}</Table.Cell>
											<Table.Cell>
												<LinesEllipsis
													text={d.nama}
													maxLine={1}
													ellipsis={" ... "}
													trimRight
													basedOn="words"
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
									</Table.Row>
								</Table.Header>
								<Table.Body>
									{props.data.taruna.map((d, i) => (
										<Table.Row key={i}>
											<Table.Cell>{i + 1}</Table.Cell>
											<Table.Cell>
												{d.id} - {d.nama}
											</Table.Cell>
										</Table.Row>
									))}
								</Table.Body>
							</Table>
						</Grid.Column>
					</Grid>
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
