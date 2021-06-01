import {
	Grid,
	Header,
	Icon,
	Message,
	Button,
	Segment,
	Table,
	Label,
} from "semantic-ui-react";
import LinesEllipsis from "react-lines-ellipsis";
import { useState } from "react";

export default function StepThree(props) {
	const pristiwa = props.data.pristiwa;
	const [loading, setLoading] = useState(false);
	const [berhasil, setBerhasil] = useState(false);

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
									{pristiwa.length > 0
										? pristiwa.map((d, i) => (
												<Table.Row key={i}>
													<Table.Cell>{i + 1}</Table.Cell>
													<Table.Cell>
														<LinesEllipsis
															text={d.nama}
															maxLine={1}
															ellipsis={" ... "}
															trimRight
															basedOn="letters"
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
										  ))
										: ""}
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
									<Table.Row>
										<Table.Cell>1</Table.Cell>
										<Table.Cell>156599023 - Hamid Musafa</Table.Cell>
									</Table.Row>
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
								onClick={() => submitData()}
							/>
						</Button.Group>
					</Segment>
				</Segment>
			)}
		</Segment>
	);
}
