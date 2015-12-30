import React from "react";
import {Link} from "react-router";

class Logo extends React.Component {

	render() {

		return (
            <div className="logo">
				<Link to="/">
	              <div className="turnaround">
	                <div className="front"></div>
	                <div className="back"></div>
	              </div>
				 </Link>
            </div>
		);
	}
}

export default Logo;
