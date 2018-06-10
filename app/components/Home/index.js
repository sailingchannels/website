import React from "react";
import ChannelList from "components/ChannelList";
import SearchBar from "components/SearchBar";
import OffsetMenu from "components/OffsetMenu";
import OffsetSocial from "components/OffsetSocial";
import Logo from "components/Logo";
import BannerDialog from "components/BannerDialog";
import SignInDialog from "components/SignInDialog";
import cookie from "react-cookie";
import { Link } from "react-router-dom";
import $ from "jquery";

class Home extends React.Component {
	// CONSTRUCTOR
	constructor(props) {
		super(props);
		this.state = {
			showScrollUp: false,
			me: cookie.load("me") ? JSON.parse(cookie.load("me").replace("j:", "")) : null
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
		if (this.state.showScrollUp !== $(window).scrollTop() > 100) {
			// do or do not show scrollup button
			this.setState({
				showScrollUp: $(window).scrollTop() > 100
			});
		}
	}

	// SCROLL UP
	scrollUp() {
		window.scrollTo(0, 0);
	}

	// RENDER
	render() {
		const sortBy = this.props.match.params.sortBy || "upload";
		var scrollUp = null;

		if (this.state.showScrollUp === true) {
			scrollUp = (
				<div
					className="scroll-up-btn"
					title="Scroll to top"
					onClick={this.scrollUp.bind(this)}
				>
					<i className="fa fa-arrow-circle-up fa-3x" />
				</div>
			);
		}

		return (
			<div className="container">
				<OffsetSocial />
				<Logo className="hidden-xs hidden-sm" />
				{!this.state.me ? (
					<center>
						<a
							href="/oauth2callback"
							className="btn btn-raised btn-sm btn-danger yt-login"
						>
							Sign In with <i className="fa fa-youtube" /> YouTube
						</a>
						<Link className="btn btn-link show btn-more-info" to={"/signin"}>
							More info
						</Link>
					</center>
				) : null}
				<OffsetMenu />
				{scrollUp}
				<SearchBar sortBy={sortBy} history={this.props.history} />
				<ChannelList sortBy={sortBy} history={this.props.history} />
				{this.props.children}
				<BannerDialog />
				<SignInDialog />
			</div>
		);
	}
}

export default Home;
