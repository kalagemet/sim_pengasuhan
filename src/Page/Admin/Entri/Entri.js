import React, { Component } from "react";
import { Header, Segment, Step, Tab } from "semantic-ui-react";
import { ContextType } from "../../../Context";
import StepOne from "./StepOne";
import StepThree from "./StepThree";
import StepTwo from "./StepTwo";

class Entri extends Component {
	static contextType = ContextType;
	constructor(props) {
		super(props);
		this.state = {
			activeIndex: 0,
			berhasil: false,
			data: {
				peristiwa: [],
				taruna: [],
				poin_tambahan: [],
				keterangan: [],
				tanggal: [],
			},
		};
	}

	setperistiwa = (data, poin_tambahan, ket, tgl) => {
		this.setState({
			data: {
				...this.state.data,
				peristiwa: data,
				poin_tambahan: poin_tambahan,
				keterangan: ket,
				tanggal: tgl,
			},
			activeIndex: 1,
		});
	};

	setTaruna = (data) => {
		this.setState({ data: { ...this.state.data, taruna: data } });
		this.setState({ activeIndex: 2 });
	};

	handleTab = (i) => {
		this.setState({ activeIndex: i });
	};

	entriBaru = () => {
		this.setState({
			activeIndex: 0,
			berhasil: false,
			data: {
				peristiwa: [],
				taruna: [],
			},
		});
	};

	berhasil = () => {
		this.setState({ berhasil: true });
	};

	render() {
		return (
			<Segment vertical className="page-content-segment">
				<Header textAlign="center" as="h3" dividing color="blue">
					Entri Poin
					<Header.Subheader>
						Tambahkan Poin pelanggaran dan atau penghargaan
					</Header.Subheader>
				</Header>
				<Step.Group fluid ordered>
					<Step
						active={this.state.activeIndex === 0 ? true : false}
						completed={this.state.activeIndex > 0 ? true : false}
					>
						<Step.Content>
							<Step.Title>Pilih Peristiwa</Step.Title>
							<Step.Description>Pilih poin yang akan di entri</Step.Description>
						</Step.Content>
					</Step>
					<Step
						active={this.state.activeIndex === 1 ? true : false}
						completed={this.state.activeIndex > 1 ? true : false}
					>
						<Step.Content>
							<Step.Title>Pilih Taruna</Step.Title>
							<Step.Description>
								Pilih taruna yang akan di entri
							</Step.Description>
						</Step.Content>
					</Step>
					<Step
						active={this.state.activeIndex === 2 ? true : false}
						completed={this.state.berhasil ? true : false}
					>
						<Step.Content>
							<Step.Title>Selesai</Step.Title>
							<Step.Description>Status entri</Step.Description>
						</Step.Content>
					</Step>
				</Step.Group>
				<Tab
					activeIndex={this.state.activeIndex}
					panes={[
						{
							render: () => (
								<Tab.Pane>
									<StepOne
										context={this.context}
										data={this.state.data}
										nextState={this.setperistiwa}
									/>
								</Tab.Pane>
							),
						},
						{
							render: () => (
								<Tab.Pane>
									<StepTwo
										context={this.context}
										data={this.state.data}
										nextState={this.setTaruna}
										prefState={this.handleTab}
									/>
								</Tab.Pane>
							),
						},
						{
							render: () => (
								<Tab.Pane>
									<StepThree
										context={this.context}
										success={this.berhasil}
										data={this.state.data}
										prefState={this.handleTab}
										endState={this.entriBaru}
									/>
								</Tab.Pane>
							),
						},
					]}
				/>
			</Segment>
		);
	}
}

export default Entri;
