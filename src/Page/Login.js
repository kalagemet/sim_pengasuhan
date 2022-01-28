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
import { login as login_api } from "../Apis/Apis";
import { loginTaruna } from "../Apis/ApisTaruna";
import loginlogo from "../Assets/image/login.png";
import logoStpn from "../Assets/logo_stpn.png";
import { ContextType } from "../Context";

class Login extends Component {
	static contextType = ContextType;
	state = {
		loading: false,
		username: "",
		password: "",
		auth_failed: false,
		msg_err: "",
		direct_link: false,
	};

	componentDidMount() {
		if (window.location.pathname !== "/") {
			this.setState({ direct_link: true });
		}
	}

	login = async () => {
		this.setState({ direct_link: false, auth_failed: false });
		if (this.state.username !== "" || this.state.password !== "") {
			this.setState({ loading: true });
			await login_api(this.state.username, this.state.password, (data) => {
				if (data.status === 200) {
					data.data.error_code === 0
						? this.context.setLogin(
								this.state.username,
								data.data.data.admin === 1,
								data.data.data.token,
								data.data.data.nama,
								data.data.data.id,
								data.data.data.email
						  )
						: this.login_taruna();
					//   this.setState({
					// 		msg_err: data.data.error_msg,
					// 		auth_failed: true,
					// 		loading: false,
					//   });
				} else {
					this.setState({
						msg_err: data.msg,
						auth_failed: true,
						loading: false,
					});
				}
			});
		}
	};

	login_taruna = async () => {
		await loginTaruna(this.state.username, this.state.password, (data) => {
			if (data.status === 200) {
				data.data.error_code === 0
					? this.context.setLogin(
							this.state.username,
							data.data.data.admin === 1,
							data.data.data.token,
							data.data.data.nama,
							data.data.data.id,
							data.data.data.email
					  )
					: this.setState({
							msg_err: data.data.error_msg,
							auth_failed: true,
							loading: false,
					  });
			} else {
				this.setState({
					msg_err: data.msg,
					auth_failed: true,
					loading: false,
				});
			}
		});
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
							onDismiss={() => this.setState({ auth_failed: false })}
							error
							content={this.state.msg_err}
						/>
					) : this.state.direct_link ? (
						<Message
							style={{ margin: "0 70px 20px 40px" }}
							warning
							onDismiss={() => this.setState({ direct_link: false })}
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
							<Button disabled className="login-btn-lupa">
								Lupa Password
							</Button>
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
