import React from "react";
import { Link } from "react-router-dom";

import "./Logo.css";

class Logo extends React.Component {
	render() {
		let classes = "logo";
		if (this.props.className) {
			classes += " " + this.props.className;
		}

		return (
			<div className={classes}>
				<Link to="/">
					<div className="turnaround">
						<div className="front" />
						<div className="back" />
					</div>
				</Link>
			</div>
		);
	}
}

export default Logo;
