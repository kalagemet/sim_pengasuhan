import React, { Component } from "react";

let ContextType;
const { Provider, Consumer } = (ContextType = React.createContext());

class Context extends Component {
	state = {
		id: "",
		password: "",
		token: "",
		authenticated: false,
		loginAs: "admin",
		loadingApp: false,
		message: [
			// {
			// 	error: 0,
			// 	user: "taruna",
			// 	header: "Sekolah Tinggi Petanahan Nasional",
			// 	msg: "Lorent ipsum dolar set",
			// },
			{
				error: 1,
				user: "all",
				header: "Pesan dari Sistem",
				msg: "Pesan Peringatan untuk semua",
			},
		],
		notification: [],
	};

	setCredential = (id, pass) => {
		if (id !== "") this.setState({ id: id });
		if (pass !== "") this.setState({ password: pass });
	};

	setLoadingApp = (bool) => {
		this.setState({ loadingApp: bool });
	};

	notify = (icon, header, msg) => {
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

	popNotify = (msg) => {
		let tmp = this.state.notification;
		let index = tmp.indexOf(msg);
		if (tmp.length > 0) {
			tmp.splice(index, 1);
			this.setState({ notification: tmp });
		}
	};

	switchUser = () => {
		this.setLoadingApp(true);
		if (this.state.loginAs === "admin") {
			this.setState({ loginAs: "taruna" });
		} else if (this.state.loginAs === "taruna") {
			this.setState({ loginAs: "admin" });
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
					setNotify: this.notify,
					popNotify: this.popNotify,
					setCredential: this.setCredential,
				}}
			>
				{this.props.children}
			</Provider>
		);
	}
}

export { Context, Consumer, ContextType };
