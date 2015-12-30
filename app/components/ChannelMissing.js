import React from "react";
import OffsetMenu from "./OffsetMenu";
import Logo from "./Logo";

class ChannelMissing extends React.Component {

	render() {

		return (
            <div className="container">
                <Logo />
				<OffsetMenu />
                <div className="row content-row">
					<div className="col-md-4"></div>
					<div className="col-md-4">
	                    <h1 className="content-h1">Your channel is missing?</h1>
						<p>
							You were expecting to see your channel here?<br />
							Well, that's easy.
						</p>
						<p>
							Just get in touch with us and we'll make sure you get listed!
						</p>
						<p>
							Send an email to <a href="mailto:ahoy@sailing-channels.com?subject=My channel is missing">ahoy@sailing-channels.com</a>
						</p>
					</div>
					<div className="col-md-4"></div>
                </div>
            </div>
		);
	}
}

export default ChannelMissing;
