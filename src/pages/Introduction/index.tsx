import React from "react";
import { Helmet } from "react-helmet";
import Hero from "../../components/Hero";

function Introduction(props) {
	return (
		<>
			<Helmet>
				<title>Introduction | Sailing-Channels</title>
			</Helmet>

			<Hero title="Introduction" subtitle="How does this page work?" />

			<p>
				Well basically what this website does is list youtube channels that are related to sailing,
				circumnavigation or people living aboard their boats.
			</p>
			<p style={{ marginTop: "20px" }}>
				The channels are discovered by doing a network analysis. Basically finding out who subscribed
				to whom.
			</p>
			<p style={{ marginTop: "20px" }}>
				The algorithm uses a (super secret) starting channel and scans all subscriptions of this
				channel. The next step is recursively scanning all subscriptions of the subscriptions of the
				starting channel and so on.
			</p>

			<div style={{ marginTop: "20px" }}>
				<iframe
					className="intro-video"
					width="100%"
					height="390"
					style={{ height: "390px" }}
					src="https://www.youtube.com/embed/RWosJPnB900?start=53"
					frameBorder="0"
					allowFullScreen
				/>
				<iframe
					className="intro-video"
					width="100%"
					height="390"
					style={{ height: "390px" }}
					src="https://www.youtube.com/embed/WFuSJj3v7PM"
					frameBorder="0"
					allowFullScreen
				/>
				<iframe
					className="intro-video"
					width="100%"
					height="390"
					style={{ height: "390px" }}
					src="https://www.youtube.com/embed/5PXhfW7j2m8"
					frameBorder="0"
					allowFullScreen
				/>
			</div>
		</>
	);
}

export default Introduction;
