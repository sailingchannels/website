import React from "react";
import {Link} from "react-router";

class OffsetMenu extends React.Component {

	// TOGGLE MENU
	toggleMenu() {

		if($(".offset-menu").find("ul").hasClass("hidden-xs")) {
			$(".offset-menu").find("ul").removeClass("hidden-xs");
			$(".logo").css("opacity", 0);
		}
		else {
			$(".offset-menu").find("ul").addClass("hidden-xs");
			$(".logo").css("opacity", 1);
		}
	}

	// REPLACE X
    replaceX(e) {
        e.target.href = e.target.href.replace(/x/g, "");
    }

	// RENDER
	render() {

		return (
			<div>
				<div className="offset-bars hidden-md hidden-lg hidden-sm">
					<div onClick={this.toggleMenu.bind(this)}>
						<i className="fa fa-bars"></i>
					</div>
				</div>
	            <div className="offset-menu">
	                <ul className="hidden-xs">
						<li><Link to="/">Home</Link></li>
	                    <li><Link to="/how-it-works">How does this work?</Link></li>
	                    <li><Link to="/channel-missing">My channel is missing!</Link></li>
	                    <li><a href="mailto:ahxoy@sailing-chaxnnels.com?subject=Ahoy sailor!" onMouseOver={this.replaceX.bind(this)}>Contact</a></li>
	                </ul>
	            </div>
			</div>
		);
	}
}

export default OffsetMenu;
