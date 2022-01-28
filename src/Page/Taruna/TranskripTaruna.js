import React, { useEffect, useRef, useState } from "react";
import { Grid, Header, Segment, Image, Table, Button } from "semantic-ui-react";
import "../../Styles/Pdf.scss";
import QRCode from "react-qr-code";
import logo_stpn from "../../Assets/logo_stpn.png";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import { getDetailTaruna, getRekapPoin } from "../../Apis/ApisTaruna";
import { Consumer } from "../../Context";

const TranskripTarunaDOM = React.forwardRef((props, ref) => {
	const [data, setData] = useState([]);
	const [rekap, setRekap] = useState([]);
	const date = new Date();

	useEffect(() => {
		//get Detail
		function getDetail() {
			getDetailTaruna(props.context, (response) => {
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
			getRekapPoin(props.context, props.id_semester, (response) => {
				if (response.status === 200) {
					if (response.data.error_code === 0) {
						setRekap(response.data.data);
					} else {
						console.log(response.data.error_msg);
					}
				} else {
					console.error("get_rekap_poin", response.status, response.msg);
				}
			});
		}
		getRekap();
		getDetail();
	}, [props.loading]);

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
						<Grid.Row>Poin Pengasuhan</Grid.Row>
						<Grid.Row>Predikat Pengasuhan</Grid.Row>
						{props.id_semester === 0 ? null : <Grid.Row>Semester</Grid.Row>}
					</Grid.Column>
					<Grid.Column width="7">
						<Grid.Row>: {data.nama_taruna}</Grid.Row>
						<Grid.Row>: {data.id_taruna}</Grid.Row>
						<Grid.Row>: {data.prodi}</Grid.Row>
						<Grid.Row>
							: {props.id_semester === 0 ? data.ipk : data.ips}
						</Grid.Row>
						<Grid.Row>
							:{" "}
							{props.id_semester === 0 ? data.predikat_ipk : data.predikat_ips}
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
							<Table.HeaderCell>Poin Penghargaan</Table.HeaderCell>
							<Table.HeaderCell textAlign="right">Total Poin</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{rekap.map((d, i) => {
							return d.is_pelanggaran === 1 ? null : (
								<Table.Row key={i}>
									<Table.Cell>
										{i + 1}. {d.nama_kategori}
									</Table.Cell>
									<Table.Cell textAlign="right">
										{d.poin + d.poin_tambahan}
									</Table.Cell>
								</Table.Row>
							);
						})}
					</Table.Body>
				</Table>
				<br />
				<Table basic="very">
					<Table.Header style={{ fontWight: "bold" }}>
						<Table.Row>
							<Table.HeaderCell>Poin Pelanggaran</Table.HeaderCell>
							<Table.HeaderCell textAlign="right">Total Poin</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{rekap.map((d, i) => {
							return d.is_pelanggaran === 0 ? null : (
								<Table.Row key={i}>
									<Table.Cell>
										{i + 1}. {d.nama_kategori}
									</Table.Cell>
									<Table.Cell textAlign="right">{d.poin}</Table.Cell>
								</Table.Row>
							);
						})}
					</Table.Body>
				</Table>
				<Grid columns={2}>
					<Grid.Column></Grid.Column>
					<Grid.Column textAlign="center">
						<p>
							MENGESAHKAN
							<br />
							KASUBAG KEMAHASISWAAN DAN ALUMNI
							<br />
							SEKOLAH TINGGI PETANAHAN YOGYAKARTA
						</p>
						<b>
							<p style={{ marginTop: 70 }}>
								<u>Gad Momole, S.SiT., MPA.</u>
							</p>
						</b>
						<p>NIP. 197610101997031003</p>
					</Grid.Column>
				</Grid>
				<i>Di cetak pada : {date.toLocaleString()}</i>
			</Segment>
			<i>halaman 1 dari 1 halaman</i>
		</div>
	);
});

export default function TranskripTaruna(props) {
	const ref = useRef();

	const print = (func) => {
		func();
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
						<TranskripTarunaDOM
							loading={props.loading}
							context={props.context}
							id_semester={props.id_semester}
							nama_semester={props.nama_semester}
							id_taruna={props.id_taruna}
						/>
					</div>
				</div>
			)}
		</Consumer>
	);
}
