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
		$(window).on("changeSort", this.changeSort.bind(this));
		$(window).on("scroll", this.scrollWindow.bind(this));
		$(window).on("rerenderList", this.rerenderList.bind(this));

		var sortBy = this.props.sortBy;
		this.setState({
			"sortBy": sortBy
		});

		// load the channels
		this.loadData(this.props);
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		$(window).off("scroll");
		$(window).off("changeSort");
		$(window).off("rerenderList");

		ChannelStore.unlisten(this.onChange);
	}

	// COMPOENTNT WILL RECEIVE PROPS
	componentWillReceiveProps(nextProps) {

		//console.log("componentWillReceiveProps", this.props, nextProps);
		if(this.props.sortBy !== nextProps.sortBy) {
			this.loadData(nextProps);
		}
	}

	// LOAD
	loadData(nextProps) {

		document.title = "Sailing Channels";
		$("meta[name='description']").attr("content", "A compiled list of YouTube channels that are related to sailing or living aboard a sailboat.");

		this.setState({
			channels: [],
			skip: 0,
			take: 25,
			loading: false
		});

		ChannelActions.getChannels(nextProps.sortBy, 0, 25);
	}

    // ON CHANGE
	onChange(state) {
		this.setState(state);
	}

	// SCROLL WINDOW
	scrollWindow() {

		var scrollBottomThreshold = 150;
		if ($(window).scrollTop() + $(window).height() > $(document).height() - scrollBottomThreshold &&
			this.state.loading === false && this.state.searching === false)
		{
		   this.setState({
			   "loading": true
		   });

		   // load more data
		   ChannelActions.getChannels(this.props.sortBy, this.state.skip + this.state.take, 25);
	   	}
	}

	// RERENDER LIST
	rerenderList() {
		console.log("rerender");
		this.loadData(this.props);
	}

	// CHANGE SORT
	changeSort(e, data) {

		this.setState({
			sortBy: data.sortBy
		});

		// load the channels
		this.props.history.replaceState(null, "/by-" + data.sortBy);
	}

    // RENDER
	render() {

		// no channels found
		if(this.state.channels.length === 0) {
			return (
				<div className="row">
					<div className="col-md-1"></div>
					<div className="col-md-10">
						<center>
							Loading channels...
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
        				<ChannelListItem key={"cli-" + c.id} channel={c} sortBy={this.state.sortBy} />
        			))}
					{(this.state.loading === true) ? <center className="loadMore">Loading more channels ...</center> : null}
                </div>
				<div className="col-md-1"></div>
            </div>
		);
	}
}

export default ChannelList;
