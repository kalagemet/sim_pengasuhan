import "semantic-ui-css/semantic.min.css";
import "./Styles/Styles.scss";
import "react-datepicker/dist/react-datepicker.css";
import { AppLayout } from "./AppLayout/AppLayout";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Consumer, Context } from "./Context";
import NotFound from "./Page/404";
import Dashboard from "./Page/Admin/Dashboard";
import Entri from "./Page/Admin/Entri/Entri";
import Pristiwa from "./Page/Admin/Pristiwa/Pristiwa";
import DashboardTaruna from "./Page/Taruna/Dashboard";
import TranskripTaruna from "./Page/Taruna/Transkrip";
import DetailPristiwa from "./Page/Admin/Pristiwa/Detail";
import RiwayatPristiwa from "./Page/Admin/Pristiwa/Riwayat";
import Riwayat from "./Page/Admin/Riwayat/Riwayat";
import Users from "./Page/Admin/Users/Users";
import DetailUser from "./Page/Admin/Users/Detail";
import TambahTaruna from "./Page/Admin/Users/Tambah";
import md5 from "md5";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

function AdminRouter(props) {
	return (
		<Switch>
			<Route exact path="/logout">
				<LogoutModal {...props} />
			</Route>
			<Route exact path="/">
				<Redirect to="/dashboard" />
			</Route>
			<Route exact path="/dashboard" component={Dashboard} />
			<Route path="/entri-poin" component={Entri} />
			<Route exact path="/pristiwa" component={Pristiwa} />
			<Route path="/pristiwa/detail" component={DetailPristiwa} />
			<Route path="/pristiwa/riwayat" component={RiwayatPristiwa} />
			<Route exact path="/riwayat" component={Riwayat} />
			<Route exact path="/users" component={Users} />
			<Route path="/users/detail" component={DetailUser} />
			<Route path="/users/tambah_taruna" component={TambahTaruna} />
			<Route exact path="*" component={NotFound} />
		</Switch>
	);
}

function TarunaRouter(props) {
	return (
		<Switch>
			<Route exact path="/logout">
				<LogoutModal {...props} />
			</Route>
			<Route exact path="/">
				<Redirect to="/dashboard" />
			</Route>
			<Route exact path="/dashboard" component={DashboardTaruna} />
			<Route exact path="/transkrip" component={TranskripTaruna} />
			<Route exact path="*" component={NotFound} />
		</Switch>
	);
}

function LogoutModal(props) {
	return (
		<Modal open basic>
			<Header style={{ margin: "0 30px 0 30px" }} as="h1" icon>
				<Icon name="sign-out alternate" color="red" />
				Anda yakin untuk log out ?
			</Header>
			<Modal.Actions style={{ textAlign: "center" }}>
				<Button onClick={() => props.logout()} negative>
					Ya, Keluar
				</Button>
				<Button as="a" href="/" positive>
					Tidak, kembali
				</Button>
			</Modal.Actions>
		</Modal>
	);
}

function App() {
	return (
		<BrowserRouter>
			<Context>
				<AppLayout>
					<Consumer>
						{({ loginAs, logout }) => {
							if (loginAs === md5("admin")) {
								return <AdminRouter logout={() => logout()} />;
							} else if (loginAs === md5("taruna")) {
								return <TarunaRouter logout={() => logout()} />;
							} else {
								return (
									<Modal size="tiny" open basic>
										<Header style={{ margin: "0 30px 0 30px" }} as="h1" icon>
											<Icon name="x" color="red" />
											Session invalid!
										</Header>
										<Modal.Actions style={{ textAlign: "center" }}>
											<Button onClick={() => logout()} positive>
												re-Login
											</Button>
										</Modal.Actions>
									</Modal>
								);
							}
						}}
					</Consumer>
				</AppLayout>
			</Context>
		</BrowserRouter>
	);
}

export default App;
