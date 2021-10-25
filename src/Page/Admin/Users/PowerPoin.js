import * as ReactPPTX from "react-pptx";
import { Presentation, Shape, Slide, Text, Image } from "react-pptx";
import { Button } from "semantic-ui-react";
import { Consumer } from "../../../Context";

const IDENTITAS_TARUNA = [
	"Nama",
	"NIT",
	"Tempat, Tgl Lahir",
	// "Jenis Kelamin",
	// "Kelas",
	// "NIK",
	"Asal",
	"IPK Akademik",
	"Predikat",
	"Nilai Pengasuhan",
	"Konsentrasi",
	// "Judul Tugas Akhir",
];

const HOST = "http://" + window.location.host;
const ACARA =
	"Wisuda Program Studi Diploma IV Pertanahan dan Diploma I Pengukuran dan Pemetaan Kadastral Sekolah Tinggi Pertanahan Nasional Tahun Akademik 2020/2021";
const TANGGAL_ACARA = "Yogyakarta, 10 Oktober 2021";

const Ppt = (props) => {
	const daftar = Object.keys(props.data).map((i) => [
		props.data[i].nama, //nama
		props.data[i].id, //NIT
		props.data[i].ttl, //"Bandung, 15 Juli 2002", //TTL
		//props.data[i].pengasuhan, //"karinyulia1507@stpn.ac.id", //email
		// props.data[i].jk, //JK
		// props.data[i].nik,
		props.data[i].asal, //"Ridwan Santoso", //Orang tua
		props.data[i].ipk, //"Banten", //Asal
		props.data[i].predikat, //"3.00", //IPK
		props.data[i].pengasuhan, //"X", //Nilai
		props.data[i].konsentrasi, //"X", //Nilai
		//Judul Skripsi
		//"Pengukuran dan pemetaan bidang-bidang tanah di dusun ngemplak desa pagerharjo kec. Samigaluh",
	]);
	return (
		<Consumer>
			{({ setLoad }) => (
				<Button
					{...props}
					onClick={() => {
						setLoad(true);
						ReactPPTX.render(
							<Presentation layout="16x10">
								{daftar.map((d, i) => {
									return (
										<Slide
											key={i}
											style={{
												backgroundImage: {
													kind: "path",
													path: HOST + "/bg.png",
												},
											}}
										>
											<Image
												src={{
													kind: "path",
													path: HOST + "/logo192.png",
												}}
												style={{
													x: 0.4,
													y: 0.2,
													w: 0.6,
													h: 0.6,
												}}
											/>
											<Image
												src={{
													kind: "path",
													path: HOST + "/logoAtr.png",
												}}
												style={{
													x: 9,
													y: 0.2,
													w: 0.6,
													h: 0.6,
												}}
											/>
											<Text
												style={{
													x: 0,
													y: 0.2,
													w: "100%",
													h: 0.5,
													bold: true,
													fontSize: 24,
													align: "center",
												}}
											>
												Sekolah Tinggi Pertanahan Nasional
											</Text>
											<Shape
												type="rect"
												style={{
													borderColor: "#b08e0a",
													x: 3.5,
													y: 0.7,
													w: 3,
													h: 0.1,
													backgroundColor: "#b08e0a",
												}}
											/>

											{/* foto taruna */}
											<Image
												src={{
													kind: "path",
													path: HOST + "/img/" + d[1] + ".jpg",
												}}
												style={{
													sizing: {
														fit: "cover",
														// imageHeight: 3,
														// imageWidth: 2,
													},
													x: 0.9,
													y: 1.2,
													w: 2,
													h: 3,
												}}
											/>
											<Shape
												type="rect"
												style={{
													borderColor: "#b08e0a",
													x: 1.1,
													y: 4.5,
													w: 1.5,
													h: 0.1,
													backgroundColor: "#b08e0a",
													//1628b6
													// FF0000
												}}
											/>

											{/* identitas taruna */}
											{/* {IDENTITAS_TARUNA.map((data, i) => {
												return (
													<Text
														key={i}
														style={{
															verticalAlign: "top",
															bold: true,
															x: 3.4,
															y: 1.1 + 0.29 * i,
															w: 3,
															h: 0.5,
															fontSize: 16,
															align: "left",
														}}
													>
														{data}
													</Text>
												);
											})}
											{IDENTITAS_TARUNA.map((data, i) => {
												return (
													<Text
														key={i}
														style={{
															verticalAlign: "top",
															bold: true,
															x: 5.3,
															y: 1.1 + 0.29 * i,
															w: 3,
															h: 0.5,
															fontSize: 16,
															align: "left",
														}}
													>
														:
													</Text>
												);
											})} */}
											{d.map((data, i) => {
												let row = data.length > 27 ? (data.length - 27) / 3 : 0;
												if (i === d.length - 1) {
													row = data.length > 90 ? (data.length - 90) / 25 : 0;
													if (data.length < 2) {
														return null;
													}
												}
												return (
													<div key={i}>
														<Text
															style={{
																verticalAlign: "top",
																bold: true,
																x: 3.4,
																y: 1.1 + 0.29 * i,
																w: 3,
																h: 0.5,
																fontSize: 16,
																align: "left",
															}}
														>
															{IDENTITAS_TARUNA[i]}
														</Text>
														<Text
															style={{
																verticalAlign: "top",
																bold: true,
																x: 5.3,
																y: 1.1 + 0.29 * i,
																w: 3,
																h: 0.5,
																fontSize: 16,
																align: "left",
															}}
														>
															:
														</Text>
														<Text
															style={{
																verticalAlign: "top",
																// bold: i === 0,
																bold: true,
																underline: i === 0,
																x: 5.4,
																y: 1.1 + 0.29 * i,
																w: 5,
																h: 0.5,
																fontSize: 16 - row,
																align: "left",
															}}
														>
															{i === 0 ? data.toUpperCase() : data}
														</Text>
													</div>
												);
											})}

											{/* footer */}
											<Shape
												type="round2SameRect"
												style={{
													borderColor: "#b08e0a",
													backgroundColor: "#b08e0a",
													w: 8.4,
													h: 1.05,
													y: 5.2,
													x: 0.8,
												}}
											/>
											<Text
												style={{
													color: "white",
													fontSize: 14,
													bold: true,
													w: "84%",
													h: 0.3,
													y: 5.4,
													x: 0.8,
													align: "center",
												}}
											>
												{ACARA}
											</Text>
											<Text
												style={{
													color: "white",
													fontSize: 14,
													bold: true,
													w: "100%",
													h: 0.3,
													y: 5.87,
													verticalAlign: "bottom",
													align: "center",
												}}
											>
												{TANGGAL_ACARA}
											</Text>
										</Slide>
									);
								})}
							</Presentation>,
							{ outputType: "blob" }
						)
							.then(
								(blob) => {
									const a = document.createElement("a");
									const url = URL.createObjectURL(blob);
									a.href = url;
									a.download = "PesertaWisuda.pptx";
									a.click();
									URL.revokeObjectURL(url);
								},
								(e) => {
									alert("Error " + e);
								}
							)
							.finally(() => setLoad(false));
					}}
				/>
			)}
		</Consumer>
	);
};

export default Ppt;
