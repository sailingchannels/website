import React from "react";
import OffsetMenu from "components/OffsetMenu";
import OffsetSocial from "components/OffsetSocial";
import Logo from "components/Logo";
import LazyLoad from "react-lazyload";

class Contributions extends React.PureComponent {
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
						<LazyLoad>
							<p>
								<img
									id="banner-img"
									alt="Two aboard Tuuli Crew"
									src={require("images/twoaboardtuuli.jpg")}
									width="100%"
								/>
							</p>
						</LazyLoad>
						<p>
							The{" "}
							<a href="/channel/UCZbZeC2OfdVMwm9AR_zu0_g" title="Go to Two aboard Tuuli's channel" target="_blank">
								<b>Two aboard Tuuli Crew</b>
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
								<a
									href="https://www.patreon.com/sailingchannels"
									target="_blank"
									title="Go to sailing-channels Patreon page"
									rel="noopener"
								>
									<img
										src={require("images/patreon.jpg")}
										height="150"
										width="150"
										alt="Patreon"
									/>
								</a>
							</div>
							<div className="col-md-6 text-center">
								<a
									href="https://www.paypal.me/sailingchannels"
									target="_blank"
									rel="noopener"
									title="Go to sailing-channels PayPal page"
								>
									<img
										src={require("images/paypal.png")}
										height="150"
										width="150"
										alt="Paypal"
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
