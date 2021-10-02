import React, { useContext } from "react";
import GlobalContext from "../../contexts/GlobalContext";
import { logout, setSignInOpen } from "../../Common";

function UserMenu(props) {
	const globalContext = useContext(GlobalContext.Context);

	return (
		<div className="container is-hidden-mobile">
			<nav className="level signin-bar">
				<div className="level-left"></div>
				<div className="level-right">
					{!globalContext.state.loggedIn ? (
						<p className="level-item">
							<a
								onClick={() => {
									setSignInOpen(globalContext, true);
								}}
							>
								<i className="fas fa-sign-in-alt icon-spacer"></i>
								Sign in
							</a>
						</p>
					) : (
						<>
							<p className="level-item">
								<a onClick={logout}>
									<i className="fas fa-sign-out-alt icon-spacer"></i>
									Log out
								</a>
							</p>
						</>
					)}
				</div>
			</nav>
		</div>
	);
}

export default UserMenu;
