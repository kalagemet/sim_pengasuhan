import md5 from "md5";
import React, { Component } from "react";
import {
	Button,
	Form,
	Header,
	Icon,
	Image,
	Input,
	Message,
	Segment,
} from "semantic-ui-react";
import loginlogo from "../Assets/image/login.png";
import logoStpn from "../Assets/logo_stpn.png";
import { ContextType } from "../Context";

class Login extends Component {
	state = {
		loading: false,
		username: "",
		password: "",
		auth_failed: false,
		msg_err: "",
		direct_link: false,
	};

	static contextType = ContextType;

	componentDidMount() {
		if (window.location.pathname !== "/") {
			this.setState({ direct_link: true });
		}
	}

	login = async () => {
		if (this.state.username !== "" || this.state.password !== "") {
			this.setState({ loading: true });
			let ts = new Date().toString();
			var formData = new FormData();
			formData.append(
				"post_data",
				JSON.stringify({
					isAuth: "logged",
					verb: "get_list_prodi_many",
					id: this.state.username,
					tSign: ts,
					token: md5(md5(this.state.password) + ts),
					special: 0,
					operation: "read",
					payload: {
						is_direct: 1,
						is_multiple: 0,
						is_filtered: 0,
						filter: {
							key1: "nama_prodi",
						},
						term: "a",
						count: "10",
						page: "1",
					},
				})
			);
			await fetch("http://10.0.21.30/api_pengasuhan/main_api", {
				// mode: "no-cors",
				method: "POST",
				body: formData,
			})
				.then((response) => response.text())
				.then((response) =>
					response === "auth failed"
						? this.setState({
								msg: "Autentikasi gagal !!",
								auth_failed: true,
								loading: false,
						  })
						: console.log(response)
				)
				.catch((e) => {
					console.error(e);
					this.setState({ msg: "Error priksa console !!", auth_failed: true });
				});
		}
	};

	render() {
		return (
			<div className="app-layout">
				<Segment className="login-layout" vertical>
					<Header className="header-login" as="h4">
						<Image circular src={logoStpn} />
						Sekolah Tinggi Petanahan Nasional
					</Header>
					<div className="sub-header-login">
						<Header size="large">Login</Header>
						<Header size="tiny">
							Sistem Informasi Manajement Pengasuhan
							<br />
							Sekolah Tinggi Petanahan Nasional
							<br />
							Yogyakarta
						</Header>
						<br />
					</div>
					{this.state.auth_failed ? (
						<Message
							style={{ margin: "0 70px 20px 40px" }}
							error
							content="Autentikasi gagal !!"
						/>
					) : this.state.direct_link ? (
						<Message
							style={{ margin: "0 70px 20px 40px" }}
							warning
							content="Autentikasi diperlukan !!"
						/>
					) : (
						""
					)}
					<Form>
						<Form.Field className="input-field">
							<Input
								onChange={(e, d) => this.setState({ username: d.value })}
								icon
								iconPosition="left"
								placeholder="username..."
							>
								<Icon className="login-icon-form" name="user" />
								<input value={this.state.username} className="username" />
							</Input>
						</Form.Field>
						<Form.Field className="input-field">
							<Input
								onChange={(e, d) => this.setState({ password: d.value })}
								icon
								iconPosition="left"
								placeholder="password..."
							>
								<Icon className="login-icon-form" name="lock" />
								<input
									value={this.state.password}
									type="password"
									name="password"
									className="password"
								/>
							</Input>
						</Form.Field>
						<br />
						<br />
						<div className="input-field">
							<Button
								loading={this.state.loading}
								disabled={this.state.loading}
								onClick={() => this.login()}
								className="login-btn"
								type="submit"
							>
								Login
							</Button>
							<Button className="login-btn-lupa">Lupa Password</Button>
						</div>
					</Form>
				</Segment>
				<Segment className="extend-login-layout" vertical textAlign="center">
					<Image
						className="login-image"
						verticalAlign="middle"
						src={loginlogo}
						size="medium"
					/>
				</Segment>
			</div>
		);
	}
}

export default Login;
