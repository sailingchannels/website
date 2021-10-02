import React, { Fragment } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import LanguageSelect from "../LanguageSelect";
import mainMenuData from "../../data/NavMenuData";
import MainMenuSection from "../../entities/MainMenuSection";

export default function NavMenu() {
	let history = useHistory();
	const location = useLocation();

	function searchKeyUp(e) {
		// enter pressed
		if (e.keyCode === 13) {
			const query = e.target.value;
			history.push(`/search/${query}`);
		}
	}

	return (
		<aside className="menu is-hidden-mobile">
			<a href="/" className="is-centered">
				<img className="nav-menu-margin" width="200" src={require("../../static/img/logo.svg")} />
			</a>

			<div className="menu-label">
				<div className="control has-icons-left has-icons-right">
					<input
						type="search"
						className="input is-rounded nav-menu-margin"
						placeholder="Search..."
						onKeyUp={searchKeyUp}
					/>

					<span className="icon is-small is-left">
						<i className="fas fa-search" />
					</span>
				</div>
			</div>

			{mainMenuData.map((section: MainMenuSection) => {
				return (
					<Fragment key={section.title}>
						<p className="menu-label">{section.title}</p>
						<ul className="menu-list">
							{section.items.map((item) => {
								return (
									<li key={item.href}>
										<NavLink
											className={
												item.isDefault && location.pathname === "/" ? "is-active" : ""
											}
											to={item.href}
											activeClassName="is-active"
										>
											{item.icon ? (
												<>
													<i className={item.icon + " fa-fw menu-icon"} />
												</>
											) : null}
											{item.title}
										</NavLink>
									</li>
								);
							})}
						</ul>
					</Fragment>
				);
			})}

			<p className="menu-label">Channel Language</p>
			<ul className="menu-list">
				<li>
					<LanguageSelect />
				</li>
			</ul>
		</aside>
	);
}
