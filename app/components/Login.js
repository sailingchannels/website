import React from "react";
import OffsetMenu from "./OffsetMenu";
import OffsetSocial from "./OffsetSocial";
import Logo from "./Logo";

class Login extends React.Component {

	// COMPONENT DID MOUNT
	componentDidMount() {
		document.title = "Login | Sailing Channels";
	}

	// RENDER
	render() {

		return (
            <div className="container">
				<OffsetSocial />
				<Logo />
				<OffsetMenu />
                <div className="row content-row">
					<div className="col-md-3"></div>
					<div className="col-md-6">
	                    <h1 className="content-h1">Login</h1>
						<p>
							To provide you with a tailored user interface, you can log in with your YouTube account.
						</p>
						<p>
							sailing-channels.com <u>does not publish anything in your behalf nor track or share your data</u>.
						</p>
						<p>
							The tailored features are:
							<ol>
								<li>Subscribe to channels directly from sailing-channels.com</li>
							</ol>
						</p>
						<center>
							<a href="/oauth2callback" className="btn btn-danger btn-lg btn-raised">
								<i className="fa fa-youtube"></i> Login with YouTube
							</a>
						</center>
					</div>
					<div className="col-md-3"></div>
                </div>
            </div>
		);
	}
}

export default Login;
