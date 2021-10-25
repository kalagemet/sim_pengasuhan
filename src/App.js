import "semantic-ui-css/semantic.min.css";
import "./Styles/Styles.scss";
import "react-datepicker/dist/react-datepicker.css";
import { AppLayout } from "./AppLayout/AppLayout";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Consumer, Context } from "./Context";
import NotFound from "./Page/404";
import Dashboard from "./Page/Admin/Dashboard";
import Entri from "./Page/Admin/Entri/Entri";
import peristiwa from "./Page/Admin/Peristiwa/Peristiwa";
import DashboardTaruna from "./Page/Taruna/Dashboard";
import TranskripTaruna from "./Page/Taruna/Transkrip";
import Detailperistiwa from "./Page/Admin/Peristiwa/Detail";
import Riwayatperistiwa from "./Page/Admin/Peristiwa/Riwayat";
import Riwayat from "./Page/Admin/Riwayat/Riwayat";
import Users from "./Page/Admin/Users/Users";
import DetailUser from "./Page/Admin/Users/Detail";
import TambahTaruna from "./Page/Admin/Users/Tambah";
import md5 from "md5";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import Poin from "./Page/Admin/Poin/Poin";
import EditPoin from "./Page/Admin/Poin/EditPoin";
import RequiredApi from "./Dummy/Required";
import DaftarPoin from "./Page/Taruna/Poin";

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
			<Route exact path="/poin" component={Poin} />
			<Route path="/poin/entri-poin" component={Entri} />
			<Route path="/poin/edit" component={EditPoin} />

			<Route exact path="/peristiwa" component={peristiwa} />
			<Route path="/peristiwa/detail" component={Detailperistiwa} />
			<Route path="/peristiwa/riwayat" component={Riwayatperistiwa} />

			<Route exact path="/riwayat" component={Riwayat} />

			<Route exact path="/users" component={Users} />
			<Route path="/users/detail" component={DetailUser} />
			<Route path="/users/tambah_taruna" component={TambahTaruna} />

			<Route exact path="/api" component={RequiredApi} />

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
			<Route exact path="/daftarpoin" component={DaftarPoin} />
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
				<Consumer>
					{({ loginAs, logout, setLoad }) => (
						<AppLayout setLoad={(e) => setLoad(e)}>
							{loginAs === md5("admin") ? (
								<AdminRouter logout={() => logout()} />
							) : loginAs === md5("taruna") ? (
								<TarunaRouter logout={() => logout()} />
							) : (
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
							)}
						</AppLayout>
					)}
				</Consumer>
			</Context>
		</BrowserRouter>
	);
}

export default App;
