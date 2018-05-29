import React from "react";
import OffsetMenu from "./OffsetMenu";
import OffsetSocial from "./OffsetSocial";
import Logo from "./Logo";

class Contributions extends React.Component {
	// COMPONENT DID MOUNT
	componentDidMount() {
		document.title = "Support Us | Sailing Channels";
	}

	// RENDER
	render() {
		return (
			<div className="container">
				<OffsetSocial />
				<Logo className="hidden-xs hidden-sm" />
				<OffsetMenu />
				<div className="row content-row">
					<div className="col-md-3" />
					<div className="col-md-6">
						<h1 className="content-h1">Support Us</h1>
						<p>
							<img id="banner-img" src="/img/twoaboardtuuli.jpg" width="100%" />
						</p>
						<p>
							The{" "}
							<a href="/channel/UCZbZeC2OfdVMwm9AR_zu0_g" target="_blank">
								<b>Two aboard Tuuli crew</b>
							</a>{" "}
							created this website in their sparetime for you.
						</p>
						<p>
							If you like it, and want to give something back, feel free to support us
							with a tip via the following platforms. It means a lot to us!
						</p>
						<p>- Kristy & Thomas</p>

						<div id="support-links" className="row support-row">
							<div className="col-md-6 text-center">
								<a href="https://www.patreon.com/sailingchannels" target="_blank">
									<img
										src="https://rawgit.com/sailingchannels/website/master/public/img/patreon.jpg"
										height="150"
										width="150"
									/>
								</a>
							</div>
							<div className="col-md-6 text-center">
								<a href="https://www.paypal.me/sailingchannels" target="_blank">
									<img
										src="https://rawgit.com/sailingchannels/website/master/public/img/paypal.png"
										height="150"
										width="150"
									/>
								</a>
							</div>
						</div>
					</div>
					<div className="col-md-3" />
				</div>
			</div>
		);
	}
}

export default Contributions;
