import { useState } from "react";
import { Segment, Table, Button, Checkbox, Message } from "semantic-ui-react";

export default function DaftarTaruna(props) {
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
