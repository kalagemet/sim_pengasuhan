import { useState } from "react";
import {
	Segment,
	Table,
	Popup,
	Button,
	Checkbox,
	Label,
	Message,
} from "semantic-ui-react";
import LinesEllipsis from "react-lines-ellipsis";

export default function DaftarPristiwa(props) {
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
													basedOn="letters"
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
