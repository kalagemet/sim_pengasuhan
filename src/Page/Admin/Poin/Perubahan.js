import {
	Segment,
	Grid,
	Table,
	Popup,
	Button,
	Message,
	Divider,
	Header,
	Icon,
} from "semantic-ui-react";
import LinesEllipsis from "react-lines-ellipsis";

export default function Perubahan(props) {
	return (
		<Segment vertical textAlign="center">
			{JSON.stringify(props.data) === JSON.stringify(props.dataAwal) ? (
				<Message
					style={{ margin: "50px 0 100px 0" }}
					warning
					icon="warning"
					header="Tidak ada data perubahan ditampilkan"
					content="silahkan lakukan perubahan terlebih dahula pada tab Daftar Taruna dan atau Daftar Pristiwa"
				/>
			) : (
				<Segment vertical textAlign="right">
					<Header textAlign="center" dividing>
						Perubahan Entri yang akan disimpan
						<Header.Subheader>
							Mohon periksa sebelum menyimpan perubahan
						</Header.Subheader>
					</Header>
					<br />
					<Segment vertical>
						<Grid relaxed="very" columns={2}>
							<Grid.Column>
								<Table unstackable basic="very">
									<Table.Header>
										<Table.Row>
											<Table.HeaderCell>
												Jumlah Taruna Entri Awal
											</Table.HeaderCell>
										</Table.Row>
									</Table.Header>
									<Table.Body>
										<Table.Row>
											<Table.Cell textAlign="right">
												<Popup
													on="click"
													style={{ maxWidth: 400 }}
													pinned
													trigger={
														<Button
															basic
															content={props.dataAwal.taruna.length}
															icon="users"
															labelPosition="right"
														/>
													}
													content={
														<Table unstackable basic="very">
															<Table.Body>
																{props.dataAwal.taruna.map((d, i) => {
																	return (
																		<Table.Row key={i}>
																			<Table.Cell>{i + 1}</Table.Cell>
																			<Table.Cell>{d.nama}</Table.Cell>
																		</Table.Row>
																	);
																})}
															</Table.Body>
														</Table>
													}
												/>
											</Table.Cell>
										</Table.Row>
									</Table.Body>
									<Table.Header>
										<Table.Row>
											<Table.HeaderCell>
												Jumlah Pristiwa Entri Awal
											</Table.HeaderCell>
										</Table.Row>
									</Table.Header>
									<Table.Body>
										<Table.Row>
											<Table.Cell textAlign="right">
												<Popup
													on="click"
													style={{ maxWidth: 400 }}
													pinned
													trigger={
														<Button
															basic
															content={props.dataAwal.pristiwa.length}
															icon="users"
															labelPosition="right"
														/>
													}
													content={
														<Table unstackable basic="very">
															<Table.Body>
																{props.dataAwal.pristiwa.map((d, i) => {
																	return (
																		<Table.Row key={i}>
																			<Table.Cell>{i + 1}</Table.Cell>
																			<Table.Cell>
																				<LinesEllipsis
																					text={d.nama}
																					maxLine={1}
																					ellipsis={" ... "}
																					trimRight
																					basedOn="words"
																				/>
																			</Table.Cell>
																		</Table.Row>
																	);
																})}
															</Table.Body>
														</Table>
													}
												/>
											</Table.Cell>
										</Table.Row>
									</Table.Body>
								</Table>
							</Grid.Column>
							<Grid.Column>
								<Table unstackable basic="very">
									<Table.Header>
										<Table.Row>
											<Table.HeaderCell>Jumlah Taruna Akhir</Table.HeaderCell>
										</Table.Row>
									</Table.Header>
									<Table.Body>
										<Table.Row>
											<Table.Cell textAlign="right">
												<Popup
													on="click"
													flowing
													trigger={
														<Button
															basic
															content={props.data.taruna.length}
															icon="users"
															labelPosition="right"
														/>
													}
													content={
														<Table unstackable basic="very">
															<Table.Body>
																{props.data.taruna.map((d, i) => {
																	return (
																		<Table.Row key={i}>
																			<Table.Cell>{i + 1}</Table.Cell>
																			<Table.Cell>{d.nama}</Table.Cell>
																		</Table.Row>
																	);
																})}
															</Table.Body>
														</Table>
													}
												/>
											</Table.Cell>
										</Table.Row>
									</Table.Body>
									<Table.Header>
										<Table.Row>
											<Table.HeaderCell>Jumlah Pristiwa Akhir</Table.HeaderCell>
										</Table.Row>
									</Table.Header>
									<Table.Body>
										<Table.Row>
											<Table.Cell textAlign="right">
												<Popup
													on="click"
													style={{ maxWidth: 400 }}
													flowing
													trigger={
														<Button
															basic
															content={props.data.pristiwa.length}
															icon="users"
															labelPosition="right"
														/>
													}
													content={
														<Table unstackable basic="very">
															<Table.Body>
																{props.data.pristiwa.map((d, i) => {
																	return (
																		<Table.Row key={i}>
																			<Table.Cell>{i + 1}</Table.Cell>
																			<Table.Cell>
																				<LinesEllipsis
																					text={d.nama}
																					maxLine={1}
																					ellipsis={" ... "}
																					trimRight
																					basedOn="words"
																				/>
																			</Table.Cell>
																		</Table.Row>
																	);
																})}
															</Table.Body>
														</Table>
													}
												/>
											</Table.Cell>
										</Table.Row>
									</Table.Body>
								</Table>
							</Grid.Column>
						</Grid>
						<Divider vertical>
							<Icon name="arrow right" />
						</Divider>
					</Segment>
					{/* <Grid>
						<Grid.Column tablet={8} computer={8} mobile={16} textAlign="left">
							<Grid relaxed="very" columns={2}>
								<Grid.Column>
									<Table unstackable basic="very">
										<Table.Header>
											<Table.Row>
												<Table.HeaderCell>No.</Table.HeaderCell>
												<Table.HeaderCell>Nama Taruna</Table.HeaderCell>
											</Table.Row>
										</Table.Header>
										<Table.Body>
											{props.dataAwal.taruna.map((d, i) => (
												<Table.Row key={i}>
													<Table.Cell>{i + 1}</Table.Cell>
													<Table.Cell>{d.nama}</Table.Cell>
												</Table.Row>
											))}
										</Table.Body>
									</Table>
								</Grid.Column>
								<Grid.Column>
									<Table unstackable basic="very">
										<Table.Header>
											<Table.Row>
												<Table.HeaderCell>No.</Table.HeaderCell>
												<Table.HeaderCell>Nama Taruna</Table.HeaderCell>
											</Table.Row>
										</Table.Header>
										<Table.Body>
											{props.data.taruna.map((d, i) => (
												<Table.Row key={i}>
													<Table.Cell>{i + 1}</Table.Cell>
													<Table.Cell>{d.nama}</Table.Cell>
												</Table.Row>
											))}
										</Table.Body>
									</Table>
								</Grid.Column>
							</Grid>
							<Divider vertical>
								<Icon name="arrow right" />
							</Divider>
						</Grid.Column>
						<Grid.Column tablet={8} computer={8} mobile={16} textAlign="left">
							<Grid relaxed="very" columns={2}>
								<Grid.Column>
									<Table unstackable basic="very">
										<Table.Header>
											<Table.Row>
												<Table.HeaderCell>No.</Table.HeaderCell>
												<Table.HeaderCell>Nama Pristiwa</Table.HeaderCell>
											</Table.Row>
										</Table.Header>
										<Table.Body>
											{props.dataAwal.pristiwa.map((d, i) => (
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
																	basedOn="words"
																/>
															}
														/>
													</Table.Cell>
												</Table.Row>
											))}
										</Table.Body>
									</Table>
								</Grid.Column>
								<Grid.Column>
									<Table unstackable basic="very">
										<Table.Header>
											<Table.Row>
												<Table.HeaderCell>No.</Table.HeaderCell>
												<Table.HeaderCell>Nama Pristiwa</Table.HeaderCell>
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
																	basedOn="words"
																/>
															}
														/>
													</Table.Cell>
												</Table.Row>
											))}
										</Table.Body>
									</Table>
								</Grid.Column>
							</Grid>
							<Divider vertical>
								<Icon name="arrow right" />
							</Divider>
						</Grid.Column>
					</Grid>
					<br /> */}
					<br />
					<Button
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
