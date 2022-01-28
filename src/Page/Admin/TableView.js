import React, { useEffect, useState } from "react";
import {
	Segment,
	Table,
	Header,
	Button,
	Message,
	Pagination,
	Placeholder,
} from "semantic-ui-react";
import { getDashboardDaftarTaruna } from "../../Apis/Apis";

const LoadingTableView = () => {
	return (
		<Segment vertical>
			<Placeholder fluid>
				<Placeholder.Header>
					<Placeholder.Line length="full" />
					<Placeholder.Line />
				</Placeholder.Header>
				<Placeholder.Paragraph>
					<Placeholder.Image />
					<Placeholder.Image />
					<Placeholder.Line length="full" />
					<Placeholder.Line length="very long" />
					<Placeholder.Line length="short" />
				</Placeholder.Paragraph>
			</Placeholder>
		</Segment>
	);
};

function TableView(props) {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [page, setPage] = useState({
		active_page: 1,
		total_page: 1,
		limit_page: 10,
		total_data: 0,
	});

	useEffect(async () => {
		if (props.predikat !== undefined) {
			setLoading(true);
			await getDashboardDaftarTaruna(
				props.context,
				props.prodi,
				props.angkatan,
				props.kelas,
				props.predikat,
				page.limit_page,
				page.active_page,
				(response) => {
					if (response.status === 200) {
						if (response.data.error_code === 0) {
							setData(response.data.data.data);
							setPage({
								...page,
								active_page: response.data.data.current_page,
								total_page: response.data.data.last_page,
								total_data: response.data.data.total,
							});
						} else {
							console.log(response.data.error_msg);
						}
					} else {
						console.error(
							"get_dashboard_taruna",
							response.status,
							response.msg
						);
					}
				}
			);
			setLoading(false);
		}
	}, [props.predikat, props.kelas, page.active_page]);

	return loading ? (
		<LoadingTableView />
	) : (
		<Segment vertical style={{ textAlign: "right" }}>
			<Header as="h4" textAlign="center">
				{props.predikat === ""
					? ""
					: "TARUNA DENGAN POIN " + props.predikat.toUpperCase()}
				<Header.Subheader>
					Pilih salah satu Infografis untuk menganti isi Tabel
				</Header.Subheader>
			</Header>
			<Button
				disabled
				size="mini"
				icon="share square"
				labelPosition="left"
				content="Export Data"
				positive
				basic
			/>
			<Table unstackable>
				{data.length > 0 ? (
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>No.</Table.HeaderCell>
							<Table.HeaderCell>Taruna</Table.HeaderCell>
							<Table.HeaderCell>Poin</Table.HeaderCell>
							<Table.HeaderCell>Detail</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
				) : null}
				<Table.Body>
					{data.map((d, i) => (
						<Table.Row key={i}>
							<Table.Cell>
								{(page.active_page - 1) * page.limit_page + i + 1}
							</Table.Cell>
							<Table.Cell>
								{d.nimhsmsmhs} - {d.nmmhsmsmhs}
							</Table.Cell>
							<Table.Cell>
								{d.ips}/ {d.ipk}
							</Table.Cell>
							<Table.Cell>
								{d.prodi === "01" ? "D-I" : "D-IV"}/{d.angkatan}-{d.kelas}
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
			<Message
				info
				icon="info circle"
				content={
					data.length === 0
						? "Tidak ada data yang dapat ditampilkan"
						: "Menampilkan " + page.total_data + " total data"
				}
				style={{ textAlign: "center", fontStyle: "italic" }}
			/>
			{data.length !== 0 ? (
				<Pagination
					activePage={page.active_page}
					onPageChange={(e, d) =>
						setPage({ ...page, active_page: d.activePage })
					}
					firstItem={null}
					lastItem={null}
					pointing
					secondary
					totalPages={page.total_page}
				/>
			) : (
				""
			)}
		</Segment>
	);
}

export default TableView;
