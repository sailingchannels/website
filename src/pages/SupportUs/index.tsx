import React from "react";
import { Helmet } from "react-helmet";

import "./styles.css";
import Hero from "../../components/Hero";

function SupportUs(props) {
	return (
		<>
			<Helmet>
				<title>Support us | Sailing-Channels</title>
			</Helmet>

			<Hero title="Support us" />

			<p>
				<img
					id="banner-img"
					alt="Two aboard Tuuli Crew"
					src={require("../../static/img/twoaboardtuuli@2x.jpg")}
					width="100%"
				/>
			</p>
			<p className="support-row">
				The{" "}
				<a
					href="/channel/UCZbZeC2OfdVMwm9AR_zu0_g"
					title="Go to Two aboard Tuuli's channel"
					target="_blank"
				>
					<b>Two aboard Tuuli Crew</b>
				</a>{" "}
				created this website in their sparetime for you.
			</p>
			<p>
				If you like it, and want to give something back, feel free to support us with a tip via the
				following platforms. It means a lot to us!
			</p>
			<p>- Kristy & Thomas</p>

			<div className="columns support-row">
				<div className="column has-text-centered">
					<a
						href="https://www.patreon.com/sailingchannels"
						target="_blank"
						title="Go to sailing-channels Patreon page"
						rel="noopener"
					>
						<img
							src={require("../../static/img/patreon.jpg")}
							height="150"
							width="150"
							alt="Patreon"
						/>
					</a>
				</div>
				<div className="column has-text-centered">
					<a
						href="https://www.paypal.me/sailingchannels"
						target="_blank"
						rel="noopener"
						title="Go to sailing-channels PayPal page"
					>
						<img
							src={require("../../static/img/paypal.png")}
							height="150"
							width="150"
							alt="Paypal"
						/>
					</a>
				</div>
			</div>
		</>
	);
}

export default SupportUs;
