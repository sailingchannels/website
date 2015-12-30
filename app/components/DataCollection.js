import React from "react";
import OffsetMenu from "./OffsetMenu";
import Logo from "./Logo";

class DataCollection extends React.Component {

	render() {

		return (
            <div className="container">
				<Logo />
				<OffsetMenu />
                <div className="row content-row">
                    <h1>How does this work?</h1>
                </div>
            </div>
		);
	}
}

export default DataCollection;
