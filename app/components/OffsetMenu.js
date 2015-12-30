import React from "react";
import {Link} from "react-router";

class OffsetMenu extends React.Component {

	render() {

		return (
            <div className="offset-menu">
                <ul>
					<li><Link to="/">Home</Link></li>
                    <li><Link to="/data-collection">How does this work?</Link></li>
                    <li><Link to="/channel-missing">My channel is missing!</Link></li>
                    <li><a href="mailto:ahoy@sailing-channels.com">Contact</a></li>
                </ul>
            </div>
		);
	}
}

export default OffsetMenu;
