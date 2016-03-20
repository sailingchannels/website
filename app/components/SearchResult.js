import React from "react";
import SearchResultList from "./SearchResultList";
import SearchBar from "./SearchBar";
import OffsetMenu from "./OffsetMenu";
import Logo from "./Logo";
import BannerDialog from "./BannerDialog";
import SignInDialog from "./SignInDialog";
import cookie from "react-cookie";
import {Link} from "react-router";

class SearchResult extends React.Component {

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
		$("#search-bar").focus();
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		$(window).off("scroll");
	}

	// SCROLL UP
	scrollUp() {
		window.scrollTo(0, 0);
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

	// RENDER
	render() {

		var scrollUp = null;

		if(this.state.showScrollUp === true) {
			scrollUp = <div className="scroll-up-btn" title="Scroll to top" onClick={this.scrollUp.bind(this)}>
				<i className="fa fa-arrow-circle-up fa-3x"></i>
			</div>;
		}

		var query = this.props.params.query;

		return (
			<div className="container">
				<Logo />
				{(!this.state.me) ?
					<center>
						<Link to="/signin" className="btn btn-raised btn-sm btn-danger yt-login">Sign In with <i className="fa fa-youtube"></i> YouTube</Link>
					</center>
					: null
				}
				<OffsetMenu />
				{scrollUp}
				<SearchBar history={this.props.history} query={query} />
				<SearchResultList history={this.props.history} query={query} />
				{this.props.children}
				<BannerDialog />
				<SignInDialog />
			</div>
		);
	}
}

export default SearchResult;
