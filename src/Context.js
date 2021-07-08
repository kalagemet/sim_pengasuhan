import md5 from "md5";
import React, { Component } from "react";
import cookie from "react-cookie";

let ContextType;
const { Provider, Consumer } = (ContextType = React.createContext());

class Context extends Component {
	constructor(props) {
		super(props);
		this.state = {
			authenticated: cookie.load("autenticated") || false,
			loginAs: cookie.load("user_level") || "",
			user: {
				user_id: cookie.load("user_id") || "",
				f_id: cookie.load("f_id") || "",
				token: cookie.load("user_lock") || "",
			},
			loadingApp: true,
			message: [
				// {
				// 	error: 0,
				// 	user: "taruna",
				// 	header: "Sekolah Tinggi Petanahan Nasional",
				// 	msg: "Lorent ipsum dolar set",
				// },
				{
					error: 0,
					user: "all",
					header: "Selamat Datang",
					msg: "Sistem Informasi Pengasuhan STPN Yogyakarta",
				},
			],
			notification: [],
		};
	}

	componentWillUnmount() {
		cookie.save("autenticated", this.state.authenticated, { maxAge: 3600 });
		cookie.save("user_level", this.state.loginAs, { maxAge: 3600 });
		cookie.save("user_id", this.state.user.user, { maxAge: 3600 });
		cookie.save("f_id", this.state.user.f_id, { maxAge: 3600 });
		cookie.save("user_lock", this.state.user.token, { maxAge: 3600 });
	}

	setLogin = (id, is_admin, f_id, password) => {
		cookie.save("autenticated", true);
		cookie.save("user_level", is_admin ? md5("admin") : md5("taruna"));
		cookie.save("user_id", id);
		cookie.save("f_id", f_id);
		cookie.save("user_lock", md5(password));
		this.setState({
			authenticated: cookie.load("autenticated") || false,
			loginAs: cookie.load("user_level") || "",
			user: {
				user: cookie.load("user_id") || "",
				f_id: cookie.load("f_id") || "",
				token: cookie.load("user_lock") || "",
			},
		});
		setTimeout(() => this.setState({ loadingApp: false }), 3000);
	};

	logout = () => {
		cookie.remove("autenticated");
		cookie.remove("user_level");
		this.setState({
			authenticated: false,
			loginAs: "",
		});
	};

	setLoadingApp = (bool) => {
		this.setState({ loadingApp: bool });
	};

	notify = async (icon, header, msg) => {
		let tmp = this.state.notification;
		tmp.unshift({
			icon: icon,
			msg: msg,
			header: header,
			open: true,
		});
		this.setState({
			notification: tmp,
		});
		setTimeout(() => this.popNotify(msg), 4000);
	};

	popNotify = async (msg) => {
		let tmp = this.state.notification;
		let index = tmp.indexOf(msg);
		if (tmp.length > 0) {
			tmp.splice(index, 1);
			this.setState({ notification: tmp });
		}
	};

	switchUser = () => {
		this.setLoadingApp(true);
		if (this.state.loginAs === md5("admin")) {
			this.setState({ loginAs: md5("taruna") });
		} else if (this.state.loginAs === md5("taruna")) {
			this.logout();
		} else {
			this.setState({ loginAs: "" });
		}
		setTimeout(() => this.setLoadingApp(false), 1000);
	};

	render() {
		return (
			<Provider
				value={{
					...this.state,
					switchUser: this.switchUser,
					setLoad: this.setLoadingApp,
					setLogin: this.setLogin,
					logout: this.logout,
					setNotify: this.notify,
					popNotify: this.popNotify,
				}}
			>
				{this.props.children}
			</Provider>
		);
	}
}

export { Context, Consumer, ContextType };
