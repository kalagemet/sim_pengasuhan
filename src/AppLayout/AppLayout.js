import React, { Component, useEffect, useState } from "react";
import {
	Button,
	Divider,
	Dropdown,
	Grid,
	Header,
	Icon,
	Image,
	Input,
	Label,
	Message,
	Modal,
	Placeholder,
	Segment,
	TransitionablePortal,
} from "semantic-ui-react";
import logo_stpn from "../Assets/logo_stpn.png";
import {
	ProSidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
} from "react-pro-sidebar";
import MenuBar from "./MenuBar";
import { Consumer, ContextType } from "../Context";
import Login from "../Page/Login";
import md5 from "md5";
import { getTahunAjar as getTahunAjar_api } from "../Apis/Apis";
import { setTahunAjar as setTahunAjar_api } from "../Apis/Apis";
import LinesEllipsis from "react-lines-ellipsis";

const LogoHeader = (sidebarExpand) => (
	<Header inverted as="h3" className="header-logo">
		<Image avatar src={logo_stpn} />
		{sidebarExpand ? (
			<Header.Content>
				<Header.Subheader>SIM Pengasuhan</Header.Subheader>
				STPN
			</Header.Content>
		) : (
			""
		)}
	</Header>
);

const Footer = () => {
	return (
		<Segment textAlign="center" className="footer" vertical>
			<Message
				color="blue"
				// icon="hand point down outline"
				header="End of Page"
				content="Anda telah mencapai akhir dari halaman ini"
			/>
		</Segment>
	);
};

export function AppLayout(props) {
	const [sidebarExpand, setSidebarExpand] = useState(true);
	const [sidebarMobileExpand, setSidebarMobileExpand] = useState(false);
	const [mobileView, setMobileView] = useState(false);

	useEffect(() => {
		function collapsed() {
			var width = window.innerWidth;
			if (width < 870 && width > 480 && !mobileView) {
				setSidebarExpand(false);
			}
			if (width < 481) {
				setMobileView(true);
				setSidebarExpand(true);
			} else {
				setMobileView(false);
			}
		}
		collapsed();
		window.addEventListener("resize", collapsed);
		window.addEventListener("load", () => {
			props.setLoad(false);
		});
	});

	return (
		<Consumer>
			{({
				authenticated,
				loginAs,
				message,
				logout,
				loadingApp,
				notification,
				popNotify,
				user,
			}) =>
				authenticated ? (
					<div className="app-layout">
						{notification.length !== 0
							? notification.map((d, i) => {
									return (
										<TransitionablePortal
											key={i}
											onClose={() => popNotify(i)}
											open
											transition={{ animation: "fade up", duration: 800 }}
										>
											<Segment
												vertical
												style={{
													margin: 20,
													position: "fixed",
													top: i * 80,
													zIndex: 1001,
												}}
											>
												<Message
													color={d.color}
													onDismiss={() => popNotify(d.msg)}
													info
													icon={d.icon}
													header={d.header}
													content={d.msg}
												/>
											</Segment>
										</TransitionablePortal>
									);
							  })
							: ""}
						<Modal
							as={Segment}
							style={{ width: "fit-content" }}
							textAlign="center"
							open={loadingApp}
							// dimmer="blurring"
						>
							<Image size="mini" centered src={logo_stpn} />
							<Divider />
							<Icon size="huge" color="blue" name="circle notched" loading />
							<Divider />
							<Label color="blue">Sedang memuat, mohon tunggu . . . </Label>
						</Modal>
						<ProSidebar
							collapsed={!sidebarExpand}
							breakPoint={!sidebarMobileExpand ? "xs" : ""}
							color="#1da6f0"
							width={250}
							className="sidebar-navigation"
						>
							<SidebarHeader>
								{/* {mobileView ? (
									<Button
										primary
										fluid
										color="blue"
										icon="x"
										labelPosition="right"
										floated="right"
										content="Tutup"
										onClick={() => setSidebarExpand(!sidebarExpand)}
									/>
								) : (
									""
								)} */}
								{LogoHeader(sidebarExpand)}
							</SidebarHeader>
							<SidebarContent>
								<MenuBar data={user} panel={loginAs} />
							</SidebarContent>
							<SidebarFooter
								className={
									sidebarExpand ? "sidebar-footer" : "sidebar-footer close"
								}
							>
								<Button animated color="red" onClick={logout}>
									<Button.Content visible>
										<Icon name="sign out alternate" />
									</Button.Content>
									<Button.Content hidden>Keluar</Button.Content>
								</Button>
							</SidebarFooter>
						</ProSidebar>
						<Segment
							as={"div"}
							onTouchStart={() => {
								if (sidebarMobileExpand) {
									setSidebarMobileExpand(false);
								}
							}}
							className="content-segment"
						>
							<Segment vertical className="header-segment">
								<Grid>
									<Grid.Row>
										<Grid.Column tablet={8} computer={8} mobile={2}>
											{mobileView ? (
												<Button
													onClick={() => {
														setSidebarMobileExpand(!sidebarMobileExpand);
													}}
													floated="left"
													icon="bars"
												/>
											) : (
												""
											)}
											{sidebarExpand ? (
												<Button
													onClick={() => setSidebarExpand(!sidebarExpand)}
													size="small"
													className="sidebar-btn"
													icon
													labelPosition="left"
												>
													<Icon name="angle double left" />
													Close
												</Button>
											) : (
												<Button
													onClick={() => setSidebarExpand(!sidebarExpand)}
													size="small"
													className="sidebar-btn"
													icon
													labelPosition="left"
												>
													<Icon name="angle double right" />
													Expand
												</Button>
											)}
										</Grid.Column>
										<Grid.Column
											tablet={8}
											computer={8}
											mobile={14}
											textAlign="right"
										>
											{loginAs === md5("admin") ? (
												<GetTahunAjar mobileView={mobileView} />
											) : (
												<Header as="h4" textAlign="right">
													<LinesEllipsis
														text={user.username}
														maxLine={1}
														ellipsis={"..."}
														trimRight
														basedOn="words"
													/>
												</Header>
											)}
										</Grid.Column>
									</Grid.Row>
								</Grid>
							</Segment>
							{message.map((d, i) => {
								if (d.user === "all" || d.user === loginAs) {
									return (
										<Message
											key={i}
											icon="warning"
											header={d.header}
											content={d.msg}
											success={d.error === 0}
											warning={d.error === 2}
											error={d.error === 1}
											onDismiss={() => {}}
										/>
									);
								} else {
									return null;
								}
							})}
							{props.children}
							<Footer />
						</Segment>
					</div>
				) : (
					<Login />
				)
			}
		</Consumer>
	);
}

class GetTahunAjar extends Component {
	static contextType = ContextType;

	state = {
		error: false,
		loading: true,
		semester: [],
		semesterActive: "Loading...",
		cari: "",
		loadingCari: false,
	};

	componentDidMount() {
		this.context.setLoad(false);
		this.getTahunAjar();
	}

	getTahunAjar = async () => {
		this.setState({ error: false });
		getTahunAjar_api(this.context, this.state.cari, (response) => {
			if (response.status === 200) {
				if (response.data.error_code === 0) {
					let all = response.data.data;
					let active = all.pop();
					this.setState({
						semester: all,
						semesterActive: active.nama_semester,
						loading: false,
						loadingCari: false,
					});
					this.context.setSemesterActive(active);
				} else {
					this.setState({ semesterActive: response.data.error_msg });
				}
			} else {
				console.error("get_tahun_ajar", response.status, response.msg);
				this.setState({ error: true });
			}
		});
	};

	setTahunAjar = async (id) => {
		this.setState({ error: false });
		this.context.setLoad(true);
		setTahunAjar_api(this.context, id, (response) => {
			// this.getTahunAjar();
			window.location.reload();
		});
		this.context.setLoad(false);
	};

	render() {
		return this.state.error ? (
			<span>
				Gagal Mengambil data tahun ajar{" "}
				<Button
					onClick={() => this.getTahunAjar()}
					size="mini"
					circular
					icon="redo"
				/>
			</span>
		) : this.state.loading ? (
			<Placeholder fluid>
				<Placeholder.Line />
				<Placeholder.Line />
			</Placeholder>
		) : (
			<span>
				{this.props.mobileView ? "" : "Menampilkan Tahun Ajar :"}
				<Dropdown direction="left" text={this.state.semesterActive} multiple>
					<Dropdown.Menu>
						<Input
							focus
							onClick={(e) => e.stopPropagation()}
							loading={this.state.loadingCari}
							onChange={(e, d) =>
								this.setState(
									{ cari: d.value, loadingCari: true },
									this.getTahunAjar
								)
							}
							type="number"
							icon="search"
							iconPosition="left"
							className="search"
						/>
						<Dropdown.Menu scrolling>
							{this.state.semester.length === 0 ? (
								<Dropdown.Item disabled key={0} text="Tidak ada data" />
							) : (
								this.state.semester.map((d, i) => (
									<Dropdown.Item
										key={i}
										disabled={this.state.loadingCari}
										value={d.id}
										text={d.nama_semester}
										selected={d.aktif === 1}
										onClick={(e, d) => this.setTahunAjar(d.value)}
									/>
								))
							)}
						</Dropdown.Menu>
					</Dropdown.Menu>
				</Dropdown>
			</span>
		);
	}
}
