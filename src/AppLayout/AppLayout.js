import React, { useEffect, useState } from "react";
import {
	Button,
	Divider,
	Grid,
	Header,
	Icon,
	Image,
	Label,
	Message,
	Modal,
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
import { Consumer } from "../Context";
import Login from "../Page/Login";

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
	});

	return (
		<Consumer>
			{({
				authenticated,
				loginAs,
				message,
				switchUser,
				loadingApp,
				notification,
				popNotify,
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
								{mobileView ? (
									<Button
										fluid
										color="blue"
										icon="x"
										labelPosition="right"
										floated="right"
										content="Tutup"
									/>
								) : (
									""
								)}
								{LogoHeader(sidebarExpand)}
							</SidebarHeader>
							<SidebarContent>
								<MenuBar panel={loginAs} />
							</SidebarContent>
							<SidebarFooter
								className={
									sidebarExpand ? "sidebar-footer" : "sidebar-footer close"
								}
							>
								<Button animated color="red" onClick={switchUser}>
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
										<Grid.Column tablet={11} computer={11} mobile={2}>
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
											tablet={5}
											computer={5}
											mobile={14}
											textAlign="right"
										>
											<Header as="h4" textAlign="right">
												<Image
													style={{ marginLeft: "15px" }}
													className="user-account"
													src="https://react.semantic-ui.com/images/wireframe/square-image.png"
													circular
												/>
												Hamid Musafa
											</Header>
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
