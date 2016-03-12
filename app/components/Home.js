import React from "react";
import ChannelList from "./ChannelList";
import SearchBar from "./SearchBar";
import OffsetMenu from "./OffsetMenu";
import OffsetSocial from "./OffsetSocial";
import Logo from "./Logo";
import Banner from "./Banner";
import cookie from "react-cookie";
import {Link} from "react-router";

class Home extends React.Component {

	// CONSTRUCTOR
	constructor(props) {
		super(props);
		this.state = {
			"showScrollUp": false,
			"me": cookie.load("me") ? JSON.parse(cookie.load("me").replace("j:", "")) : null
		};
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		$(window).on("scroll", this.onWindowScroll.bind(this));
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		$(window).off("scroll");
	}

	// ON WINDOW SCROLL
	onWindowScroll() {

		// did the scrollup state change?
		if(this.state.showScrollUp !== ($(window).scrollTop() > 100)) {

			// do or do not show scrollup button
			this.setState({
				"showScrollUp": ($(window).scrollTop() > 100)
			});
		}
	}

	// SCROLL UP
	scrollUp() {
		window.scrollTo(0, 0);
	}

	// RENDER
	render() {

		var sortBy = this.props.params.sortBy || "subscribers";
		var scrollUp = null;

		if(this.state.showScrollUp === true) {
			scrollUp = <div className="scroll-up-btn" title="Scroll to top" onClick={this.scrollUp.bind(this)}>
				<i className="fa fa-arrow-circle-up fa-3x"></i>
			</div>;
		}

		return (
			<div className="container">
				<OffsetSocial />
				<Logo />
				{(!this.state.me) ?
					<center>
						<Link to="/login" className="btn btn-raised btn-sm btn-danger yt-login">Sign In with <i className="fa fa-youtube"></i> YouTube</Link>
					</center>
					: null
				}
				<OffsetMenu />
				{scrollUp}
				<SearchBar sortBy={sortBy} history={this.props.history} />
				<ChannelList sortBy={sortBy} history={this.props.history} />
				{this.props.children}
				<Banner />
			</div>
		);
	}
}

export default Home;
