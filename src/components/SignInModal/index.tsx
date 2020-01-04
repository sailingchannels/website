import React, { useContext } from "react";
import { IdentityService } from "../../ServiceUrls";
import GlobalContext, { GlobalActions } from "../../contexts/GlobalContext";
import { setSignInOpen } from "../../Common";

export default function SignInModal(props) {
	const globalContext = useContext(GlobalContext.Context);

	return (
		<div className={"modal " + (globalContext.state.signInModalOpen ? "is-active" : "")}>
			<div className="modal-background"></div>
			<div className="modal-card">
				<header className="modal-card-head">
					<p className="modal-card-title">Sign In</p>
					<button
						className="delete"
						aria-label="close"
						onClick={() => {
							setSignInOpen(globalContext, false);
						}}
					></button>
				</header>
				<section className="modal-card-body">
					<div className="top-spacer is-centered">
						<a href={IdentityService() + "/oauth2"} className="button is-large is-danger">
							Sign In with <i className="fab fa-youtube" style={{ margin: "0 10px" }}></i>{" "}
							YouTube
						</a>
					</div>

					<p className="top-spacer-2x">
						To provide you with an awesome tailored user interface, you can sign in with your
						YouTube account.
					</p>

					<p>
						sailing-channels.com does not publish anything on your behalf nor does it track, share
						or store any of your YouTube data!
					</p>

					<div className="columns top-spacer-2x">
						<div className="column has-text-centered">
							<div>
								<p className="title">
									<span className="fa-stack fa-1x">
										<i className="fas fa-circle fa-stack-2x"></i>
										<i className="fab fa-youtube fa-stack-1x fa-inverse"></i>
									</span>
								</p>
								<p className="heading">Manage subscribtions directly from list view</p>
							</div>
						</div>
						<div className="column has-text-centered">
							<div>
								<p className="title">
									<span className="fa-stack fa-1x">
										<i className="fas fa-circle fa-stack-2x"></i>
										<i className="fas fa-flag fa-stack-1x fa-inverse"></i>
									</span>
								</p>
								<p className="heading">Flag channels as not sailing-related</p>
							</div>
						</div>
					</div>

					<nav className="columns">
						<div className="column has-text-centered">
							<div>
								<p className="title">
									<span className="fa-stack fa-1x">
										<i className="fas fa-circle fa-stack-2x"></i>
										<i className="fas fa-bullhorn fa-stack-1x fa-inverse"></i>
									</span>
								</p>
								<p className="heading">Suggest channels to the list</p>
							</div>
						</div>
						<div className="column has-text-centered">
							<div>
								<p className="title">
									<span className="fa-stack fa-1x">
										<i className="fas fa-circle fa-stack-2x"></i>
										<i className="fas fa-id-card fa-stack-1x fa-inverse"></i>
									</span>
								</p>
								<p className="heading">View your detailed channel profile page</p>
							</div>
						</div>
					</nav>
				</section>
			</div>
		</div>
	);
}
