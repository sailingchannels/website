import * as React from "react";
import LanguageSelect from "../LanguageSelect";
import mainMenuData from "../../data/NavMenuData";

export default function NavMobile() {
	return (
		<aside className="menu is-hidden-mobile">
			<a href="/">
				<img
					className="nav-menu-margin"
					width="200"
					src="https://cdn.jsdelivr.net/gh/thomasbrueggemann/sailing-channels/public/img/logo.svg"
				/>
			</a>

			<p className="menu-label">
				<div className="control has-icons-left has-icons-right">
					<input
						type="search"
						className="input is-rounded nav-menu-margin"
						placeholder="Search for channels..."
					/>

					<span className="icon is-small is-left">
						<i className="fas fa-search" />
					</span>
				</div>
			</p>

			{mainMenuData.map((section) => {
				return (
					<>
						<p className="menu-label">{section.title}</p>
						<ul className="menu-list">
							{section.items.map((item) => {
								return (
									<li>
										<a href={item.href}>{item.title}</a>
									</li>
								);
							})}
						</ul>
					</>
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
