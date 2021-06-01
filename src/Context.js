import React, { Component } from "react";

let ContextType;
const { Provider, Consumer } = (ContextType = React.createContext());

class Context extends Component {
	state = {
		token: "",
		authenticated: true,
		loginAs: "admin",
		loadingApp: false,
		message: [
			// {
			// 	error: 0,
			// 	user: "taruna",
			// 	header: "Sekolah Tinggi Petanahan Nasional",
			// 	msg: "Lorent ipsum dolar set",
			// },
			// {
			// 	error: 1,
			// 	user: "all",
			// 	header: "Pesan dari Sistem",
			// 	msg: "Pesan Peringatan untuk semua",
			// },
		],
		notification: [],
	};

	setLoadingApp = (bool) => {
		this.setState({ loadingApp: bool });
	};

	notify = async (icon, header, msg) => {
		let tmp = this.state.notification;
		let i = tmp.length;
		tmp.unshift({
			icon: icon,
			msg: msg,
			header: header,
			open: true,
		});
		this.setState({
			notification: tmp,
		});
		setTimeout(() => this.popNotify(i), 3000);
	};

	popNotify = async (index) => {
		let tmp = this.state.notification;
		if (tmp.length > 0) {
			delete tmp[index];
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
				}}
			>
				{this.props.children}
			</Provider>
		);
	}
}

export { Context, Consumer, ContextType };
