import React from "react";
import OffsetMenu from "./OffsetMenu";
import Logo from "./Logo";

class DataCollection extends React.Component {

	// COMPONENT DID MOUNT
	componentDidMount() {
		document.title = "How does this work? | Sailing Channels";
	}

	// RENDER
	render() {

		return (
            <div className="container">
				<Logo />
				<OffsetMenu />
                <div className="row content-row">
					<div className="col-md-3"></div>
					<div className="col-md-6">
	                    <h1 className="content-h1">How does this work?</h1>
						<p>
							Well basically what this website does is list youtube channels that are related to sailing, circumnavigation or people living aboard their boats.
						</p>
						<p>
							The channels are discovered by doing a network analysis. Basically finding out who subscribed to whom.
						</p>
						<p>
							The algorithm uses a (super secret) starting channel and scans all subscriptions of this channel. The next step is recursively scanning all subscriptions of the subscriptions of the starting channel and so on.
						</p>
					</div>
					<div className="col-md-3"></div>
                </div>
            </div>
		);
	}
}

export default DataCollection;
