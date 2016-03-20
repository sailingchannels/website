import React from "react";
import OffsetMenu from "./OffsetMenu";
import OffsetSocial from "./OffsetSocial";
import Logo from "./Logo";
import cookie from "react-cookie";

class Me extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			"me": cookie.load("me") ? JSON.parse(cookie.load("me").replace("j:", "")) : null
		};

	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		document.title = "Me | Sailing Channels";
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
	                    <h1 className="content-h1">{(this.state.me) ? (this.state.me.title || "Your Profile") : null}</h1>
						<p>
							This will be your profile page in the future. Lots of cool things will happen here. Check back very soon and you'll see what we're talking about!
						</p>
						<center>
							<a href="/logout" className="btn btn-raised">
								<i className="fa fa-power-off"></i> Sign Out
							</a>
						</center>
					</div>
					<div className="col-md-3"></div>
                </div>
            </div>
		);
	}
}

export default Me;
