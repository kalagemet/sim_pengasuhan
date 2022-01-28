import { useEffect, useState } from "react";
import LinesEllipsis from "react-lines-ellipsis";
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
import { insertPeristiwa, updatePeristiwa } from "../../../Apis/Apis";

export default function TambahPeristiwa(props) {
	const [open, setOpen] = useState(false);
	const [state, setState] = useState({
		id: "",
		poin_tambahan: 1,
		nama_peristiwa: "",
		kategori: 0,
		poin: 0,
		subPeristiwa: null,
	});
	const [data, setData] = useState([]);
	const [tmp, setTmp] = useState([]);

	const simpan = async () => {
		props.context.setLoad(true);
		await insertPeristiwa(props.context, state, (response) => {
			if (response.status === 200) {
				if (response.data.error_code === 0) {
					props.context.setNotify(
						"check circle outline",
						"Berhasil",
						<LinesEllipsis
							text={"Menambah " + response.data.data.nama_peristiwa}
							maxLine={2}
							ellipsis={" ..."}
							trimRight
							basedOn="words"
						/>,
						"green"
					);
					props.onFinish();
					setState({
						id: "",
						poin_tambahan: 1,
						nama_peristiwa: "",
						kategori: 0,
						poin: 0,
						subPeristiwa: null,
					});
					setOpen(false);
				} else {
					console.log(response.data.error_msg);
					props.context.setNotify(
						"warning",
						"Error saat mengirim data",
						response.data.error_msg,
						"orange"
					);
				}
			} else {
				console.error("insert_peristiwa", response.status, response.msg);
				props.context.setNotify(
					"warning",
					"Error saat mengirim data",
					response.msg,
					"red"
				);
			}
		});
		props.context.setLoad(false);
	};

	const update = async () => {
		props.context.setLoad(true);
		await updatePeristiwa(props.context, state, (response) => {
			if (response.status === 200) {
				if (response.data.error_code === 0) {
					props.context.setNotify(
						"check circle outline",
						"Berhasil",
						<LinesEllipsis
							text={"Menyimpan " + response.data.data.nama_peristiwa}
							maxLine={2}
							ellipsis={" ..."}
							trimRight
							basedOn="words"
						/>,
						"green"
					);
					setOpen(false);
					props.onFinish();
				} else {
					console.log(response.data.error_msg);
					props.context.setNotify(
						"warning",
						"Error saat mengirim data",
						response.data.error_msg,
						"orange"
					);
				}
			} else {
				console.error("update_peristiwa", response.status, response.msg);
				props.context.setNotify(
					"warning",
					"Error saat mengirim data",
					response.msg,
					"red"
				);
			}
		});
		props.context.setLoad(false);
	};

	useEffect(() => {
		function edited() {
			if (props.edit) {
				let tmp = {
					id: props.record.id,
					poin_tambahan: props.record.poin_tambahan,
					nama_peristiwa: props.record.nama_peristiwa,
					kategori: props.record.pelanggaran === 1 ? 2 : 1,
					poin: props.record.poin,
					subPeristiwa: props.record.id_kategori,
				};
				setTmp(tmp);
				setState(tmp);
			}
		}
		function getData() {
			if (props.data.length > 0) {
				let tmp = props.data.map((d, i) => {
					return {
						key: i,
						value: d.id,
						text: d.nama_kategori,
						pelanggaran: d.pelanggaran,
					};
				});
				setData(tmp);
			}
		}
		getData();
		edited();
	}, [props.data, props.edit, props.record]);

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
							<label>Nama peristiwa</label>
							<Input
								fluid
								value={state.nama_peristiwa}
								onChange={(e, d) =>
									setState({ ...state, nama_peristiwa: d.value.toUpperCase() })
								}
								placeholder="ex: tidak mengikuti apel pagi"
							/>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row columns={2}>
						<Grid.Column>
							<label>Kategori peristiwa</label>
							<Select
								onChange={(e, d) =>
									setState({
										...state,
										kategori: d.value,
										poin_tambahan: d.value === 2 ? 0 : state.poin_tambahan,
									})
								}
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
								disabled={state.poin_tambahan === 1}
								value={state.poin}
								onChange={(e, d) => setState({ ...state, poin: d.value })}
								fluid
								placeholder="ex: 5"
							/>
							<br />
							<Checkbox
								checked={state.poin_tambahan === 1}
								onChange={(e, d) =>
									setState({
										...state,
										poin_tambahan: d.checked ? 1 : 0,
										poin: 0,
									})
								}
								disabled={state.kategori === 2}
								label="Poin Tambahan"
							/>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column>
							<label>Sub peristiwa</label>
							<Select
								fluid
								value={state.subPeristiwa}
								options={
									state.kategori === 1
										? data.filter((d) => d.pelanggaran === 0)
										: state.kategori === 2
										? data.filter((d) => d.pelanggaran === 1)
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
				<Button
					content="Batal"
					onClick={
						props.edit
							? () => {
									setState(tmp);
									setOpen(false);
							  }
							: () => setOpen(false)
					}
				/>
				<Button.Group>
					{props.edit ? (
						<Button
							color="yellow"
							onClick={() => setState(tmp)}
							content="Reset"
						/>
					) : (
						""
					)}
					<Button
						content="Simpan"
						onClick={props.edit ? () => update() : () => simpan()}
						icon="right chevron"
						labelPosition="right"
						primary
					/>
				</Button.Group>
			</Modal.Actions>
		</Modal>
	);
}
