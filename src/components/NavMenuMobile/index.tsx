import React, { Fragment, useState, useContext } from "react";
import { NavLink, useLocation, Link } from "react-router-dom";
import mainMenuData from "../../data/NavMenuData";
import MainMenuSection from "../../entities/MainMenuSection";
import MainMenuItem from "../../entities/MainMenuItem";
import GlobalContext from "../../contexts/GlobalContext";
import { logout, setSignInOpen } from "../../Common";

export default function NavMenuMobile() {
	//#region Hooks

	const [open, setOpen] = useState(false);
	const location = useLocation();

	// hook to access the global context
	const globalContext = useContext(GlobalContext.Context);

	//#endregion

	const openMenu = (
		<div className="navbar-menu is-active">
			<div className="navbar-start">
				<div className="navbar-item has-dropdown is-hoverable">
					{mainMenuData.map((section: MainMenuSection) => {
						return (
							<Fragment key={section.title}>
								<a className="navbar-link">{section.title}</a>
								<div className="navbar-dropdown">
									{section.items.map((item: MainMenuItem) => {
										return (
											<NavLink
												className={
													"navbar-item " +
													(item.isDefault && location.pathname === "/"
														? "is-active"
														: null)
												}
												key={item.href}
												activeClassName="is-active"
												to={item.href}
												onClick={() => {
													setOpen(false);
												}}
											>
												{item.title}
											</NavLink>
										);
									})}
								</div>
							</Fragment>
						);
					})}
				</div>
			</div>

			<div className="navbar-end">
				<div className="navbar-item">
					<div className="buttons">
						{!globalContext.state.loggedIn ? (
							<a
								className="button is-info"
								onClick={() => {
									setSignInOpen(globalContext, true);
									setOpen(false);
								}}
							>
								<i className="fas fa-sign-in-alt icon-spacer"></i>
								<strong>Sign in</strong>
							</a>
						) : (
							<a className="button is-info" onClick={logout}>
								<i className="fas fa-sign-out-alt icon-spacer"></i>
								<strong>Log out</strong>
							</a>
						)}
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<nav className="navbar is-hidden-tablet" role="navigation" aria-label="main navigation">
			<div className="navbar-brand">
				<a className="navbar-item" href="/">
					<img src={require("../../static/img/logo.svg")} height="28" />
				</a>

				<a role="button" className="navbar-burger burger" onClick={() => setOpen(!open)}>
					<span aria-hidden="true" />
					<span aria-hidden="true" />
					<span aria-hidden="true" />
				</a>
			</div>

			{open ? openMenu : null}
		</nav>
	);
}
