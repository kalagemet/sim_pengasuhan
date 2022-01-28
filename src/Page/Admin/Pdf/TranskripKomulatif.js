import React, { useEffect, useRef, useState } from "react";
import {
	Grid,
	Header,
	Segment,
	Image,
	Divider,
	Table,
	Button,
} from "semantic-ui-react";
import "../../../Styles/Pdf.scss";
import logo_stpn from "../../../Assets/logo_stpn.png";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import { Consumer } from "../../../Context";

const TranskripDOM = React.forwardRef((props, ref) => (
	<div
		ref={ref}
		className="page-pdf"
		ukuran="A4"
		style={{ padding: "0 50px 0 50px" }}
	>
		<Segment vertical style={{ minHeight: "95%" }}>
			<br />
			{props.header ? (
				<Segment vertical>
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
						<u>DAFTAR NILAI PENGASUHAN</u>
					</Header>
					<Grid columns="3">
						<Grid.Column width="5">
							<Grid.Row>Kelas</Grid.Row>
							<Grid.Row>Angkatan</Grid.Row>
							<Grid.Row>Program Studi</Grid.Row>
							<Grid.Row>Tahun Ajar</Grid.Row>
						</Grid.Column>
						<Grid.Column width="7">
							<Grid.Row>: {props.kelas}</Grid.Row>
							<Grid.Row>: {props.angkatan}</Grid.Row>
							<Grid.Row>
								:{" "}
								{props.prodi === "01"
									? "D-I Pengukuran dan Pemetaan Kadastral"
									: "D-IV Manajemen Perpetaan"}
							</Grid.Row>
							<Grid.Row>: {props.semester}</Grid.Row>
						</Grid.Column>
						<Grid.Column textAlign="center" width="4"></Grid.Column>
					</Grid>
				</Segment>
			) : (
				<i>
					<b>
						Transkrip Nilai Pengasuhan
						<Divider />
					</b>
				</i>
			)}
			<Table size="small" compact="very" celled>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>No.</Table.HeaderCell>
						<Table.HeaderCell>NIT</Table.HeaderCell>
						<Table.HeaderCell>Nama Taruna</Table.HeaderCell>
						<Table.HeaderCell textAlign="center">
							Poin Pengasuhan
						</Table.HeaderCell>
						<Table.HeaderCell textAlign="center">
							Poin Komulatif
						</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{props.content.map((d, i) => {
						return (
							<Table.Row key={i}>
								<Table.Cell>
									{props.page === 1 ? 1 + i : 28 + 35 * (props.page - 2) + i}
								</Table.Cell>
								<Table.Cell>{d.nimhsmsmhs}</Table.Cell>
								<Table.Cell singleLine>{d.nmmhsmsmhs}</Table.Cell>
								<Table.Cell textAlign="center">{d.ips}</Table.Cell>
								<Table.Cell textAlign="center">{d.ipk}</Table.Cell>
							</Table.Row>
						);
					})}
				</Table.Body>
			</Table>
		</Segment>
		<i>
			halaman {props.page} dari {props.totalPage} halaman
		</i>
	</div>
));

export default function Transkrip(props) {
	const ref = useRef();
	const [page, setPage] = useState(0);
	const PAGE_RANGE_HEADER = 28;
	const PAGE_RANGE = 35;

	const data = [...props.data];

	useEffect(() => {
		if (data.length < PAGE_RANGE_HEADER) {
			setPage(1);
		} else {
			setPage(Math.ceil((data.length - PAGE_RANGE_HEADER) / PAGE_RANGE) + 1);
		}
	}, [data.length]);

	const print = (func) => {
		func();
	};

	const pagination = (index) => {
		var table = [];
		var inset = 1;
		var offset = PAGE_RANGE_HEADER;
		if (index !== 0) {
			inset = PAGE_RANGE * (index - 1) + PAGE_RANGE_HEADER;
			offset = PAGE_RANGE * index + PAGE_RANGE_HEADER;
		}
		if (offset > data.length) {
			offset = data.length + 1;
		}
		for (let i = inset; i < offset; i++) {
			table.push(data[i - 1]);
		}
		return table;
	};

	const PageDom = () => {
		var hal = [];
		for (let i = 0; i < page; i++) {
			hal.push(
				<TranskripDOM
					{...props}
					content={pagination(i)}
					page={i + 1}
					totalPage={page}
					header={i === 0}
					key={i}
				/>
			);
		}
		return hal;
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
						<PageDom />
					</div>
				</div>
			)}
		</Consumer>
	);
}
