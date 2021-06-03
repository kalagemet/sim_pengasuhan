import { useEffect, useState } from "react";
import {
	Button,
	Checkbox,
	Grid,
	Header,
	Input,
	Message,
	Modal,
	Select,
} from "semantic-ui-react";
const data = require("../../../Dummy/pelanggaran.json");

export default function TambahPeristiwa(props) {
	const [open, setOpen] = useState(false);
	const [state, setState] = useState({
		poin_tambahan: true,
		nama_peristiwa: "",
		kategori: 0,
		poin: 0,
		subPeristiwa: null,
	});

	useEffect(() => {
		function edited() {
			if (props.edit) {
				setState({
					poin_tambahan: props.data.poin_tambahan,
					nama_peristiwa: props.data.nama,
					kategori: props.data.kategori,
					poin: props.data.poin,
					subPeristiwa: props.data.sub_id,
				});
			}
		}
		edited();
	}, [props.data, props.edit]);

	return (
		<Modal
			trigger={props.children}
			open={open}
			size="small"
			// dimmer="blurring"
			onOpen={() => setOpen(true)}
		>
			<Modal.Header as={Header} dividing textAlign="center">
				{props.header}
			</Modal.Header>
			<Modal.Content>
				<Grid>
					<Grid.Row>
						<Grid.Column>
							<label>Nama Pristiwa</label>
							<Input
								fluid
								value={state.nama_peristiwa}
								onChange={(e, d) =>
									setState({ ...state, nama_peristiwa: d.value })
								}
								placeholder="ex: tidak mengikuti apel pagi"
							/>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row columns={2}>
						<Grid.Column>
							<label>Kategori Pristiwa</label>
							<Select
								onChange={(e, d) => setState({ ...state, kategori: d.value })}
								fluid
								placeholder="Pilih kategori"
								value={state.kategori}
								options={[
									{
										label: { color: "green" },
										key: 1,
										value: 1,
										text: "Penghargaan",
									},
									{
										label: { color: "red" },
										key: 2,
										value: 2,
										text: "Pelanggaran",
									},
								]}
							/>
						</Grid.Column>
						<Grid.Column>
							<label>Jumlah Poin</label>
							<Input
								type="number"
								disabled={state.poin_tambahan}
								value={state.poin}
								onChange={(e, d) => setState({ ...state, poin: d.value })}
								fluid
								placeholder="ex: 5"
							/>
							<br />
							<Checkbox
								checked={state.poin_tambahan}
								onChange={(e, d) =>
									setState({ ...state, poin_tambahan: d.checked, poin: 0 })
								}
								label="Poin Tambahan"
							/>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column>
							<label>Sub Pristiwa</label>
							<Select
								fluid
								value={state.subPeristiwa}
								options={
									state.kategori === 1
										? data[0].SubPenghargaan
										: state.kategori === 2
										? data[1].SubPelanggaran
										: [{ value: 0, text: "Pilih kategori", disabled: true }]
								}
								onChange={(e, d) =>
									setState({ ...state, subPeristiwa: d.value })
								}
							/>
						</Grid.Column>
					</Grid.Row>
				</Grid>
				<br />
				<Message
					icon="tasks"
					content="Mohon pastikan item yang anda inputkan benar benar sesuai"
					info
				/>
			</Modal.Content>
			<Modal.Actions>
				<Button content="Batal" onClick={() => setOpen(false)} />
				<Button.Group>
					{props.edit ? (
						<Button
							color="yellow"
							onClick={() =>
								setState({
									poin_tambahan: props.data.poin_tambahan,
									nama_peristiwa: props.data.nama,
									kategori: props.data.kategori,
									poin: props.data.poin,
									subPeristiwa: props.data.sub_id,
								})
							}
							content="Reset"
						/>
					) : (
						""
					)}
					<Button
						content="Simpan"
						icon="right chevron"
						labelPosition="right"
						primary
					/>
				</Button.Group>
			</Modal.Actions>
		</Modal>
	);
}
