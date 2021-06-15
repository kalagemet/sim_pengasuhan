import React, { Component } from "react";
import {
	Segment,
	Table,
	Header,
	Button,
	Message,
	Pagination,
	Placeholder,
} from "semantic-ui-react";

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

class SangatBaik extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
		};
	}

	componentDidMount() {
		setTimeout(() => this.setState({ loading: false }), 2000);
	}

	render() {
		return this.state.loading ? (
			<LoadingTableView />
		) : (
			<Segment vertical style={{ textAlign: "right" }}>
				<Header as="h4" textAlign="center">
					Daftar Taruna dengan Poin Kurang
					<Header.Subheader>
						Pilih salah satu Infografis untuk menganti isi Tabel
					</Header.Subheader>
				</Header>
				<Button
					size="mini"
					icon="share square"
					labelPosition="left"
					content="Export Data"
					positive
					basic
				/>
				<Table unstackable>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>No.</Table.HeaderCell>
							<Table.HeaderCell>Taruna</Table.HeaderCell>
							<Table.HeaderCell>Poin</Table.HeaderCell>
							<Table.HeaderCell>Status</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						<Table.Row>
							<Table.Cell>1</Table.Cell>
							<Table.Cell>15650028 - Hamid Musafa</Table.Cell>
							<Table.Cell>55</Table.Cell>
							<Table.Cell>Aktif</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>1</Table.Cell>
							<Table.Cell>15650028 - Hamid Musafa</Table.Cell>
							<Table.Cell>55</Table.Cell>
							<Table.Cell>Aktif</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>1</Table.Cell>
							<Table.Cell>15650028 - Hamid Musafa</Table.Cell>
							<Table.Cell>55</Table.Cell>
							<Table.Cell>Aktif</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table>
				<Message
					info
					icon="info circle"
					content="Menampilkan 1-20 dari 200 Data"
					style={{ textAlign: "center", fontStyle: "italic" }}
				/>
				<Pagination
					defaultActivePage={1}
					firstItem={null}
					lastItem={null}
					pointing
					secondary
					totalPages={3}
				/>
			</Segment>
		);
	}
}

function TableView(props) {
	switch (props.index) {
		case 0:
			return <SangatBaik {...props} />;
		default:
			return <SangatBaik {...props} />;
	}
}

export default TableView;
