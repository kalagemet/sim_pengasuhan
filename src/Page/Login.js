import React, { Component } from "react";
import {
	Button,
	Form,
	Header,
	Icon,
	Image,
	Input,
	Segment,
} from "semantic-ui-react";
import loginlogo from "../Assets/image/login.png";
import logoStpn from "../Assets/logo_stpn.png";

class Login extends Component {
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
					<Form>
						<Form.Field className="input-field">
							<Input icon iconPosition="left" placeholder="username...">
								<Icon className="login-icon-form" name="user" />
								<input className="username" />
							</Input>
						</Form.Field>
						<Form.Field className="input-field">
							<Input icon iconPosition="left" placeholder="password...">
								<Icon className="login-icon-form" name="lock" />
								<input className="password" />
							</Input>
						</Form.Field>
						<br />
						<br />
						<div className="input-field">
							<Button className="login-btn" type="submit">
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
