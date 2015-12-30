import React from "react";
import ChannelListItem from "./ChannelListItem";
import ChannelActions from "../actions/ChannelActions";
import ChannelStore from "../stores/ChannelStore";
import {Navigation} from "react-router";

class ChannelList extends React.Component {

    // CONSTRUCTOR
	constructor(props) {
		super(props);
		this.state = ChannelStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		ChannelStore.listen(this.onChange);

		// handle event bus page changes
		$(window).on("typeSearchterm", this.typeSearchterm.bind(this));
		$(window).on("changeSort", this.changeSort.bind(this));
		$(window).on("scroll", this.scrollWindow.bind(this));

		var sortBy = this.props.sortBy;
		this.setState({
			"sortBy": sortBy || "subscribers"
		});

		// load the channels
		ChannelActions.getChannels(sortBy, 0, 25);
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		$(window).off("typeSearchterm");
		$(window).off("scroll");
		$(window).off("changeSort");

		ChannelStore.unlisten(this.onChange);
	}

    // ON CHANGE
	onChange(state) {
		this.setState(state);
	}

	// TYPE SEARCHTERM
	typeSearchterm(e, data) {

		// start search
		if(data.term.length >= 2) {

			this.setState({
				searching: true
			});

			ChannelActions.searchChannels(data.term, this.state.sortBy);
		}

		// reset search
		else if(data.term.length === 0) {

			this.setState({
				channels: [],
				skip: 0,
				take: 25,
				loading: false,
				searching: false
			});

			ChannelActions.getChannels(this.state.sortBy, 0, 25);
		}
	}

	// SCROLL WINDOW
	scrollWindow() {

		var scrollBottomThreshold = 250;
		if ($(window).scrollTop() + $(window).height() > $(document).height() - scrollBottomThreshold &&
			this.state.loading === false && this.state.searching === false)
		{
		   this.setState({
			   "loading": true
		   });

		   // load more data
		   ChannelActions.getChannels(this.state.sortBy, this.state.skip + this.state.take, 25);
	   	}
	}

	// CHANGE SORT
	changeSort(e, data) {

		this.setState({
			sortBy: data.sortBy
		});

		// replace url state
		this.props.history.replaceState(null, "/by-" + data.sortBy);

		// load the channels
		if(this.state.searching ===  true) {
			ChannelActions.searchChannels($("#search-bar").val(), data.sortBy);
		}
		else {
			ChannelActions.getChannels(data.sortBy, 0, 25);
		}
	}

    // RENDER
	render() {

		// is this the first time loading data?
		if(this.state.firstLoad === true) {
			return (
				<div className="row">
					<div className="col-md-1"></div>
					<div className="col-md-10">
						<center>
							Loading channels ...
						</center>
					</div>
					<div className="col-md-1"></div>
				</div>
			);
		}

		// no channels found
		if(this.state.channels.length === 0) {
			return (
				<div className="row">
					<div className="col-md-1"></div>
					<div className="col-md-10">
						<center>
							No channels match the criteria!
						</center>
					</div>
					<div className="col-md-1"></div>
				</div>
			);
		}

		// channels where found
		return (
            <div className="row">
				<div className="col-md-1"></div>
                <div className="col-md-10">
                    {this.state.channels.map(c => (
        				<ChannelListItem key={c.id} channel={c} sortBy={this.state.sortBy} />
        			))}
					{(this.state.loading === true) ? <center className="loadMore">Loading more channels ...</center> : null}
                </div>
				<div className="col-md-1"></div>
            </div>
		);
	}
}

export default ChannelList;
