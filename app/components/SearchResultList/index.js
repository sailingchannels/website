import React from "react";
import ChannelListItem from "components/ChannelListItem";
import VideoListItem from "components/VideoListItem";
import ChannelActions from "actions/ChannelActions";
import ChannelStore from "stores/ChannelStore";
import $ from "jquery";

import "./SearchResultList.css";

class SearchResultList extends React.Component {
	// CONSTRUCTOR
	constructor(props) {
		super(props);
		this.state = ChannelStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		ChannelStore.listen(this.onChange);

		if (this.props.query) {
			$("#search-bar").val(this.props.query);
			window.setTimeout(function() {
				$("#search-bar").focus();
			}, 1);
		}

		// trigger initial search
		ChannelActions.searchChannels(this.props.query);
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		ChannelStore.unlisten(this.onChange);
	}

	// COMPOENTNT WILL RECEIVE PROPS
	componentWillReceiveProps(nextProps) {
		if (this.props.query !== nextProps.query) {
			ChannelActions.searchChannels(nextProps.query);
		}
	}

	// ON CHANGE
	onChange(state) {
		this.setState(state);
	}

	// RENDER
	render() {
		// no channels found
		if (this.state.results.length === 0) {
			return (
				<div className="row">
					<div className="col-md-1" />
					<div className="col-md-10">
						<center>No channels or videos match the search query!</center>
					</div>
					<div className="col-md-1" />
				</div>
			);
		}

		var results = [];

		// loop results
		for (var i in this.state.results) {
			var item = this.state.results[i];

			// what type of result is this?
			if (item.type === "channel") {
				results.push(<ChannelListItem key={"cli-" + item.id} channel={item} />);
			} else {
				results.push(<VideoListItem key={"vli-" + item._id} video={item} />);
			}
		}

		return (
			<div className="row">
				<div className="col-md-1" />
				<div className="col-md-10">
					{this.state.loading === true ? (
						<center className="loadMore">Loading more channels ...</center>
					) : (
						results
					)}
				</div>
				<div className="col-md-1" />
			</div>
		);
	}
}

export default SearchResultList;
