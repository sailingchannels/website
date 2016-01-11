import React from "react";
import SearchResultList from "./SearchResultList";
import SearchBar from "./SearchBar";
import OffsetMenu from "./OffsetMenu";
import Logo from "./Logo";
import Banner from "./Banner";

class SearchResult extends React.Component {

	// COMPONENT DID MOUNT
	componentDidMount() {
		$("#search-bar").focus();
	}

	// RENDER
	render() {

		var query = this.props.params.query;

		return (
			<div className="container">
				<Logo />
				<OffsetMenu />
				<SearchBar history={this.props.history} query={query} />
				<SearchResultList history={this.props.history} query={query} />
				{this.props.children}
				<Banner />
			</div>
		);
	}
}

export default SearchResult;
