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
					<div className="col-md-4"></div>
					<div className="col-md-4">
	                    <h1 className="content-h1">SignIn</h1>
						<p>
							To provide you with an awesome tailored user interface, you can log in with your YouTube account.
						</p>
						<p>
							sailing-channels.com <u>does not publish anything on your behalf nor track or share your data</u>.
						</p>
						<center>
							<a href="/oauth2callback" className="btn btn-danger btn-lg btn-raised">
								Sign In with <i className="fa fa-youtube"></i> YouTube
							</a>
						</center>
					</div>
					<div className="col-md-4"></div>
                </div>
            </div>
		);
	}
}

export default Login;
