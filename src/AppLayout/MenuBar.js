import md5 from "md5";
import React, { Component } from "react";
import { Menu, MenuItem } from "react-pro-sidebar";
import { NavLink } from "react-router-dom";
import { Header, Icon } from "semantic-ui-react";

const AdminPanel = () => {
	return (
		<Menu popperArrow iconShape="round">
			<Header icon color="blue" as="h6" textAlign="center">
				<Icon name="user circle" size="mini" />
				<Header.Content>Administrator</Header.Content>
			</Header>
			<NavLink
				activeClassName="active"
				className="menu-item-sidebar"
				to="/dashboard"
			>
				<MenuItem
					icon={<Icon name="chart pie" size="large" />}
					className="menu-item-sidebar"
				>
					Dashboard
				</MenuItem>
			</NavLink>
			<NavLink
				activeClassName="active"
				className="menu-item-sidebar"
				to="/poin"
			>
				<MenuItem
					icon={<Icon name="pencil square" size="large" />}
					className="menu-item-sidebar"
				>
					Poin Pengasuhan
				</MenuItem>
			</NavLink>
			{/* <SubMenu
				title="Poin Taruna"
				className="menu-item-sidebar"
				icon={<Icon name="pencil square" size="large" />}
			>
				<NavLink
					activeClassName="active"
					className="menu-item-sidebar"
					to="/entri-poin"
				>
					<MenuItem>Entri Poin</MenuItem>
				</NavLink>
				<NavLink
					activeClassName="active"
					className="menu-item-sidebar"
					to="/pemutihan"
				>
					<MenuItem>Pemutihan Poin</MenuItem>
				</NavLink>
			</SubMenu> */}
			<NavLink
				activeClassName="active"
				className="menu-item-sidebar"
				to="/users"
			>
				<MenuItem
					icon={<Icon name="users" size="large" />}
					className="menu-item-sidebar"
				>
					Taruna
				</MenuItem>
			</NavLink>
			<NavLink
				activeClassName="active"
				className="menu-item-sidebar"
				to="/peristiwa"
			>
				<MenuItem
					className="menu-item-sidebar"
					icon={<Icon name="tasks" size="large" />}
				>
					Peristiwa
				</MenuItem>
			</NavLink>
			<NavLink
				activeClassName="active"
				className="menu-item-sidebar"
				to="/riwayat"
			>
				<MenuItem
					className="menu-item-sidebar"
					icon={<Icon name="history" size="large" />}
				>
					Riwayat
				</MenuItem>
			</NavLink>
		</Menu>
	);
};

const TarunaPanel = () => {
	return (
		<Menu iconShape="round">
			<Header icon color="blue" as="h5" textAlign="center">
				<Icon name="user circle" size="mini" />
				<Header.Content>Taruna</Header.Content>
			</Header>
			<NavLink
				activeClassName="active"
				className="menu-item-sidebar"
				to="/dashboard"
			>
				<MenuItem
					className="menu-item-sidebar"
					icon={<Icon name="chart pie" size="large" />}
				>
					Dashboard
				</MenuItem>
			</NavLink>
			<NavLink
				activeClassName="active"
				className="menu-item-sidebar"
				to="/transkrip"
			>
				<MenuItem
					className="menu-item-sidebar"
					icon={<Icon name="file text" size="large" />}
				>
					Transkrip
				</MenuItem>
			</NavLink>
		</Menu>
	);
};

export default class MenuBar extends Component {
	render() {
		if (this.props.panel === md5("admin")) {
			return <AdminPanel {...this.props} />;
		} else if (this.props.panel === md5("taruna")) {
			return <TarunaPanel />;
		} else {
			return <div />;
		}
	}
}
