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
                    <h1>My channel is missing?</h1>
                </div>
            </div>
		);
	}
}

export default ChannelMissing;
