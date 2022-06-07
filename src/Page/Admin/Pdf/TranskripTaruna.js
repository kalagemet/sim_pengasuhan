import React, { useEffect, useRef, useState } from "react";
import { Grid, Header, Segment, Image, Table, Button } from "semantic-ui-react";
import "../../../Styles/Pdf.scss";
import QRCode from "react-qr-code";
import logo_stpn from "../../../Assets/logo_stpn.png";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import { Consumer } from "../../../Context";
import { getDetailTaruna, getRekapPoin } from "../../../Apis/Apis";

const TranskripTarunaDOM = React.forwardRef((props, ref) => {
	const [data, setData] = useState([]);
	const [ips, setIps] = useState([]);
	const [rekap, setRekap] = useState([]);
	const [NAMA_PENANDATANGAN, setNama] = useState();
	const [NAMA_MENGETAHUI, setNamaMENGETAHUI] = useState();
	const [JABATAN_PENANDATANGAN, setJabatan] = useState();
	const [JABATAN_MENGETAHUI, setJabatanMENGETAHUI] = useState();
	const [NIP_PENANDATANGAN, setNIP] = useState();
	const [NIP_MENGETAHUI, setNIP_MENGETAHUI] = useState();
	const date = new Date();

	useEffect(() => {
		//get Detail
		function getDetail() {
			getDetailTaruna(props.context, props.id_taruna, (response) => {
				if (response.status === 200) {
					if (response.data.error_code === 0) {
						setData(response.data.data);
					} else {
						console.log(response.data.error_msg);
					}
				} else {
					console.error("get_detail_taruna", response.status, response.msg);
				}
			});
		}
		//get rekapitulasi
		function getRekap() {
			getRekapPoin(
				props.context,
				props.id_taruna,
				props.id_semester,
				(response) => {
					if (response.status === 200) {
						if (response.data.error_code === 0) {
							setRekap(response.data.data.data);
							setIps(response.data.data.ips);
						} else {
							console.log(response.data.error_msg);
						}
					} else {
						console.error("get_rekap_poin", response.status, response.msg);
					}
				}
			);
		}
		fetch("/envi.json")
			.then((res) => res.json())
			.then((data) => {
				setNama(data.TRANSKRIPT_NAME);
				setNIP(data.TRANSKRIPT_NIP);
				setJabatan(data.TRANSKRIPT_TITLE);
				setNamaMENGETAHUI(data.TRANSKRIPT_NAME_MENGETAHUI);
				setNIP_MENGETAHUI(data.TRANSKRIPT_NIP_MENGETAHUI);
				setJabatanMENGETAHUI(data.TRANSKRIPT_TITLE_MENGETAHUI);
				getRekap();
				getDetail();
			});
	}, [props.id_semester]);

	return (
		<div
			ref={ref}
			className="page-pdf"
			ukuran="A4"
			style={{ padding: "0 50px 0 50px" }}
		>
			<Segment vertical style={{ minHeight: "95%" }}>
				<br />
				<Grid style={{ borderBottom: "solid 2px" }} columns="3">
					<Grid.Column width="3" textAlign="center">
						<Image size="tiny" src={logo_stpn} />
					</Grid.Column>
					<Grid.Column width="13" textAlign="left">
						<Header as="h4">
							KEMENTRIAN AGRARIA DAN TATA RUANG/
							<br />
							BADAN PETANAHAN NASIONAL
							<br />
							SEKOLAH TINGGI PETANAHAN NASIONAL
							<br />
							<Header.Subheader>
								Alamat : Jl. Tata Bhumi No.5 Banyuraden Gamping Sleman
								Yogyakarta 55293 Telp : (0274) 587239 Fax : 0274 587138
							</Header.Subheader>
						</Header>
					</Grid.Column>
				</Grid>
				<Header textAlign="center" as="h4">
					<u>
						TRANSKRIP NILAI{" "}
						{props.id_semester === 0 ? "KOMULATIF " : "SEMESTER "}
						PENGASUHAN
					</u>
				</Header>
				<Grid columns="3">
					<Grid.Column width="5">
						<Grid.Row>Nama Taruna</Grid.Row>
						<Grid.Row>Nomor Induk Taruna</Grid.Row>
						<Grid.Row>Program Studi</Grid.Row>
						<Grid.Row>
							Poin Pengasuhan{" "}
							{props.id_semester === 0 ? "Komulatif" : "Semester"}
						</Grid.Row>
						<Grid.Row>
							Predikat Pengasuhan{" "}
							{props.id_semester === 0 ? "Komulatif" : "Semester"}
						</Grid.Row>
						{props.id_semester === 0 ? null : <Grid.Row>Semester</Grid.Row>}
					</Grid.Column>
					<Grid.Column width="7">
						<Grid.Row>: {data.nama_taruna}</Grid.Row>
						<Grid.Row>: {data.id_taruna}</Grid.Row>
						<Grid.Row>: {data.prodi}</Grid.Row>
						<Grid.Row>
							: {props.id_semester === 0 ? data.ipk : ips.nilai}
						</Grid.Row>
						<Grid.Row>
							: {props.id_semester === 0 ? data.predikat_ipk : ips.predikat}
						</Grid.Row>
						{props.id_semester === 0 ? null : (
							<Grid.Row>
								: {props.nama_semester + " (" + props.id_semester + ")"}
							</Grid.Row>
						)}
					</Grid.Column>
					<Grid.Column textAlign="center" width="4">
						<QRCode
							level="H"
							size={80}
							value={
								"http://localhost:3000/users/detail?id_taruna=" +
								props.id_taruna
							}
						/>
					</Grid.Column>
				</Grid>
				<br />
				<Table basic="very">
					<Table.Header style={{ fontWight: "bold" }}>
						<Table.Row>
							<Table.HeaderCell>Nilai Sapta Karakter</Table.HeaderCell>
							<Table.HeaderCell textAlign="right">Poin</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{rekap.map((d, i) => {
							return d.is_pelanggaran === 1 ? null : (
								<Table.Row key={i}>
									<Table.Cell style={{ padding: "5px" }}>
										{d.nama_kategori}
									</Table.Cell>
									<Table.Cell style={{ padding: "5px" }} textAlign="right">
										{d.poin + d.poin_tambahan}
									</Table.Cell>
								</Table.Row>
							);
						})}
					</Table.Body>
				</Table>
				<Table basic="very">
					<Table.Header style={{ fontWight: "bold" }}>
						<Table.Row>
							<Table.HeaderCell>Poin Pelanggaran</Table.HeaderCell>
							<Table.HeaderCell textAlign="right">Poin</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{rekap.map((d, i) => {
							return d.is_pelanggaran === 0 ? null : (
								<Table.Row key={i}>
									<Table.Cell style={{ padding: "5px" }}>
										{d.nama_kategori}
									</Table.Cell>
									<Table.Cell style={{ padding: "5px" }} textAlign="right">
										{d.poin}
									</Table.Cell>
								</Table.Row>
							);
						})}
					</Table.Body>
				</Table>
				<br />
				<Grid columns={2}>
					<Grid.Column textAlign="center">
						<p>
							MENGETAHUI
							<br />
							a/n KETUA SEKOLAH TINGGI PETANAHAN NASIONAL <br />
							{JABATAN_MENGETAHUI}
							<br />
							{/* SEKOLAH TINGGI PETANAHAN YOGYAKARTA */}
						</p>
						<b>
							<p style={{ marginTop: 50 }}>
								<u>{NAMA_MENGETAHUI}</u>
							</p>
						</b>
						<p>{NIP_MENGETAHUI}</p>
					</Grid.Column>
					<Grid.Column textAlign="center">
						<p>
							MENGESAHKAN
							<br />
							{JABATAN_PENANDATANGAN}
							<br />
							{/* SEKOLAH TINGGI PETANAHAN YOGYAKARTA */}
						</p>
						<b>
							<p style={{ marginTop: 65 }}>
								<u>{NAMA_PENANDATANGAN}</u>
							</p>
						</b>
						<p>{NIP_PENANDATANGAN}</p>
					</Grid.Column>
				</Grid>
			</Segment>
			<Grid columns={2}>
				<Grid.Column textAlign="left">
					<i>halaman 1 dari 1 halaman</i>
				</Grid.Column>
				<Grid.Column textAlign="right">
					<i>Di cetak pada : {date.toLocaleString()}</i>
				</Grid.Column>
			</Grid>
		</div>
	);
});

export default function TranskripTaruna(props) {
	const ref = useRef();

	const print = (func) => {
		func();
	};

	const DocumentDom = () => {
		if (props.singlepage || props.singlepage === undefined) {
			return (
				<TranskripTarunaDOM
					loading={props.loading}
					context={props.context}
					id_semester={props.id_semester}
					nama_semester={props.nama_semester}
					id_taruna={props.id_taruna}
				/>
			);
		} else {
			var hal = [];
			let data = [...props.data];
			data.map((d, i) => {
				hal.push(
					<TranskripTarunaDOM
						key={i}
						loading={props.loading}
						context={props.context}
						id_semester={props.id_semester}
						nama_semester={props.nama_semester}
						id_taruna={d.nimhsmsmhs}
					/>
				);
			});
			return hal;
		}
	};

	return (
		<Consumer>
			{({ setLoad }) => (
				<div>
					<ReactToPrint
						onBeforeGetContent={() => setLoad(true)}
						content={() => ref.current}
						onAfterPrint={() => setLoad(false)}
					>
						<PrintContextConsumer>
							{({ handlePrint }) => (
								<Button onClick={() => print(handlePrint)} {...props} />
							)}
						</PrintContextConsumer>
					</ReactToPrint>
					<div ref={ref}>
						<DocumentDom />
					</div>
				</div>
			)}
		</Consumer>
	);
}
