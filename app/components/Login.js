import React from "react";
import OffsetMenu from "./OffsetMenu";
import OffsetSocial from "./OffsetSocial";
import Logo from "./Logo";

class Login extends React.Component {
	// COMPONENT DID MOUNT
	componentDidMount() {
		document.title = "Sign In | Sailing Channels";
	}

	// RENDER
	render() {
		return (
			<div className="container">
				<OffsetSocial />
				<Logo />
				<OffsetMenu />
				<div className="row content-row">
					<div className="col-md-4" />
					<div className="col-md-4">
						<h1 className="content-h1">SignIn</h1>
						<p>
							To provide you with an awesome tailored user
							interface, you can sign in with your YouTube
							account.
						</p>
						<center>
							<p>~</p>
						</center>
						<p>
							sailing-channels.com{" "}
							<u>
								does not publish anything on your behalf nor
								does it track or share your data
							</u>.
						</p>

						<center
							style={{ marginTop: "30px", marginBottom: "30px" }}
						>
							<a
								href="/oauth2callback"
								className="btn btn-danger btn-lg btn-raised"
							>
								Sign In with <i className="fa fa-youtube" />{" "}
								YouTube
							</a>
						</center>

						<div className="row feature-row">
							<div className="col-md-6 feature-col">
								<span className="fa-stack fa-lg">
									<i className="fa fa-circle fa-stack-2x" />
									<i className="fa fa-youtube-play fa-stack-1x fa-inverse" />
								</span>
								<p>
									Manage subscribtions directly from list view
								</p>
							</div>
							<div className="col-md-6 feature-col">
								<span className="fa-stack fa-lg">
									<i className="fa fa-circle fa-stack-2x" />
									<i className="fa fa-flag fa-stack-1x fa-inverse" />
								</span>
								<p>Flag channels as not sailing-related</p>
							</div>
						</div>

						<div className="row feature-row">
							<div className="col-md-6 feature-col">
								<span className="fa-stack fa-lg">
									<i className="fa fa-circle fa-stack-2x" />
									<i className="fa fa-bullhorn fa-stack-1x fa-inverse" />
								</span>
								<p>Suggest channels to the list</p>
							</div>
							<div className="col-md-6 feature-col">
								<span className="fa-stack fa-lg">
									<i className="fa fa-circle fa-stack-2x" />
									<i className="fa fa-user fa-stack-1x fa-inverse" />
								</span>
								<p>View your detailed channel profile page</p>
							</div>
						</div>
					</div>
					<div className="col-md-4" />
				</div>
			</div>
		);
	}
}

export default Login;
