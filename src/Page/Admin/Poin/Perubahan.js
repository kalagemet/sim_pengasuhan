import { Segment, Button, Message, Header, List } from "semantic-ui-react";

export default function Perubahan(props) {
	return (
		<Segment vertical textAlign="center">
			{props.data.taruna.length === 0 && props.data.peristiwa.length === 0 ? (
				<Message
					style={{ margin: "50px 0 100px 0" }}
					warning
					icon="warning"
					header="Tidak ada data perubahan ditampilkan"
					content="silahkan lakukan perubahan terlebih dahula pada tab Daftar Taruna dan atau Daftar Peristiwa"
				/>
			) : (
				<Segment vertical textAlign="right">
					<Header textAlign="center" dividing>
						Perubahan Entri yang akan dihapus dari record
						<Header.Subheader>
							Mohon periksa sebelum menyimpan perubahan
						</Header.Subheader>
					</Header>
					<br />
					<Segment textAlign="left">
						<List divided relaxed>
							{props.data.peristiwa.map((d, i) => (
								<List.Item key={i}>
									<List.Icon
										name="file text"
										color="red"
										size="large"
										verticalAlign="middle"
									/>
									<List.Content>
										<List.Header>{d.nama_peristiwa}</List.Header>
										<List.Description as="a">
											{(d.pelanggaran === 1 ? "Pelanggaran" : "Penghargaan") +
												" - " +
												d.nama_kategori}
										</List.Description>
									</List.Content>
								</List.Item>
							))}
						</List>
					</Segment>
					<Segment textAlign="left">
						<List divided relaxed>
							{props.data.taruna.map((d, i) => (
								<List.Item key={i}>
									<List.Icon
										name="user times"
										color="red"
										size="large"
										verticalAlign="middle"
									/>
									<List.Content>
										<List.Header>
											{d.nimhsmsmhs + " - " + d.nmmhsmsmhs}
										</List.Header>
										<List.Description as="a">
											{(d.prodi === "01" ? "D-I" : "D-IV") +
												" / " +
												d.angkatan +
												" / " +
												d.kelas}
										</List.Description>
									</List.Content>
								</List.Item>
							))}
						</List>
					</Segment>
					<Message
						style={{ textAlign: "center" }}
						content="Mohon perhatikan perubahan sebelum anda menyimpannya"
						icon="info"
						warning
					/>
					<br />
					<Button
						disabled={
							props.data.taruna.length === 0 &&
							props.data.peristiwa.length === 0
						}
						onClick={() => props.submit()}
						size="large"
						primary
						content="Simpan Perubahan"
						icon="send"
						labelPosition="right"
					/>
				</Segment>
			)}
		</Segment>
	);
}
