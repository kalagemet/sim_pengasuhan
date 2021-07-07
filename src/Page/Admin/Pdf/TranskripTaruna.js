import React, { useRef } from "react";
import { Grid, Header, Segment, Image, Table, Button } from "semantic-ui-react";
import "../../../Styles/Pdf.scss";
import QRCode from "react-qr-code";
import logo_stpn from "../../../Assets/logo_stpn.png";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import { Consumer } from "../../../Context";

const TranskripTarunaDOM = React.forwardRef((props, ref) => (
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
							Alamat : Jl. Tata Bhumi No.5 Banyuraden Gamping Sleman Yogyakarta
							55293 Telp : (0274) 587239 Fax : 0274 587138
						</Header.Subheader>
					</Header>
				</Grid.Column>
			</Grid>
			<Header textAlign="center" as="h4">
				<u>TRANSKRIP NILAI PENGASUHAN</u>
			</Header>
			<Grid columns="3">
				<Grid.Column width="5">
					<Grid.Row>Nama Taruna</Grid.Row>
					<Grid.Row>Nomor Induk Taruna</Grid.Row>
					<Grid.Row>Program Studi</Grid.Row>
					<Grid.Row>Poin Pengasuhan</Grid.Row>
					<Grid.Row>Predikat Pengasuhan</Grid.Row>
				</Grid.Column>
				<Grid.Column width="7">
					<Grid.Row>: Nama Taruna</Grid.Row>
					<Grid.Row>: D124566</Grid.Row>
					<Grid.Row>: D-IV Pengukuran</Grid.Row>
					<Grid.Row>: 300</Grid.Row>
					<Grid.Row>: Sangat Baik</Grid.Row>
				</Grid.Column>
				<Grid.Column textAlign="center" width="4">
					<QRCode level="H" size={80} value="dkdkdkdkd" />
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
					{[1, 2, 3, 4, 5, 6, 7].map((i) => {
						return (
							<Table.Row key={i}>
								<Table.Cell>{i}. Saptakarakter</Table.Cell>
								<Table.Cell textAlign="right">50 Poin</Table.Cell>
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
					<Table.Row>
						<Table.Cell>1. Pelanggaran ringan</Table.Cell>
						<Table.Cell textAlign="right">0 Poin</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>2. Pelanggaran sedang</Table.Cell>
						<Table.Cell textAlign="right">0 Poin</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>3. Pelanggaran berat</Table.Cell>
						<Table.Cell textAlign="right">0 Poin</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table>
			<br />
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
						<p style={{ marginTop: 80 }}>
							<u>Gad Momole, S.SiT., MPA.</u>
						</p>
					</b>
					<p>NIP. 197610101997031003</p>
				</Grid.Column>
			</Grid>
		</Segment>
		<i>halaman 1 dari 1 halaman</i>
	</div>
));

export default function TranskripTaruna(props) {
	const ref = useRef();

	const print = (func) => {
		func();
	};

	const DocumentDom = () => {
		if (props.singlePage) {
			return <TranskripTarunaDOM />;
		} else {
			var hal = [];
			for (let i = 0; i < props.data.length; i++) {
				hal.push(<TranskripTarunaDOM key={i} />);
			}
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
