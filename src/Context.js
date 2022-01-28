import md5 from "md5";
import React, { Component } from "react";
import cookie from "react-cookie";
import CryptoJS from "crypto-js";
import UID from "uniquebrowserid";

const BROWSER_ID = md5(new UID().completeID() + "6rw3xm49");

let ContextType;
const { Provider, Consumer } = (ContextType = React.createContext());

class Context extends Component {
	constructor(props) {
		super(props);
		this.state = {
			authenticated: false,
			loginAs: "",
			user: { user_id: "", user_lock: "" },
			loadingApp: false,
			message: [
				// {
				// 	error: 0,
				// 	user: "taruna",
				// 	header: "Sekolah Tinggi Petanahan Nasional",
				// 	msg: "Lorent ipsum dolar set",
				// },
				// {
				// 	error: 0,
				// 	user: md5("taruna"),
				// 	header: "Selamat Datang, Dhea",
				// 	msg: "Sistem Informasi Pengasuhan STPN Yogyakarta",
				// },
			],
			notification: [],
			semesterActive: [],
		};
	}

	componentDidMount() {
		this.loadCookies();
	}

	componentWillUnmount() {
		cookie.save("autenticated", this.state.authenticated, { maxAge: 3600 });
		cookie.save("user_level", this.state.loginAs, { maxAge: 3600 });
		cookie.save("user", this.state.user.user_id, { maxAge: 3600 });
	}

	setLogin = (id, is_admin, token, nama, id_user, email) => {
		this.saveCookies(id, is_admin, token, nama, id_user, email);
		this.loadCookies();
		this.setState({
			message: [
				{
					error: 0,
					user: md5("taruna"),
					header: "Selamat Datang, " + nama.toUpperCase(),
					msg: "Sistem Informasi Pengasuhan STPN Yogyakarta",
				},
			],
		});
	};

	setSemesterActive = (arr = []) => {
		this.setState({ semesterActive: arr });
	};

	crypto = (encrypt, string) => {
		if (string === "") return "";
		if (encrypt) {
			return CryptoJS.AES.encrypt(
				JSON.stringify(string),
				BROWSER_ID
			).toString();
		} else {
			try {
				return JSON.parse(
					CryptoJS.AES.decrypt(string, BROWSER_ID).toString(CryptoJS.enc.Utf8)
				);
			} catch {
				return "";
			}
		}
	};

	loadCookies() {
		let tmp = this.crypto(false, cookie.load("context") || "");
		// if (tmp !== "")
		this.setState({
			authenticated: Boolean(tmp.authenticated) || false,
			loginAs: tmp.user_level || "",
			user: tmp.user || "",
			loadingApp: true,
		});
	}

	saveCookies = (user, is_admin, token, nama, id_user, email) => {
		cookie.save(
			"context",
			this.crypto(true, {
				authenticated: true,
				user_level: is_admin ? md5("admin") : md5("taruna"),
				user: {
					user_id: user,
					user_lock: token,
					identity: id_user,
					username: nama,
					email: email,
				},
			})
		);
	};

	logout = () => {
		cookie.remove("context");
		this.loadCookies();
	};

	setLoadingApp = (bool) => {
		this.setState({ loadingApp: bool });
	};

	notify = async (icon, header, msg, color) => {
		let tmp = this.state.notification;
		tmp.unshift({
			color: color || "teal",
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

	popNotify = (msg) => {
		let tmp = this.state.notification;
		let index = tmp.indexOf(msg);
		if (tmp.length > 0) {
			tmp.splice(index, 1);
			this.setState({ notification: tmp });
		}
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
					setSemesterActive: this.setSemesterActive,
				}}
			>
				{this.props.children}
			</Provider>
		);
	}
}

export { Context, Consumer, ContextType };
