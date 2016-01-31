import React from "react";
import VideoListItem from "./VideoListItem";
import VideoActions from "../actions/VideoActions";
import VideoStore from "../stores/VideoStore";
import {Navigation} from "react-router";

class VideoList extends React.Component {

	// CONSTRUCTOR
	constructor(props) {
		super(props);
		this.state = VideoStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		VideoStore.listen(this.onChange);
		VideoActions.getChannels(this.props.channel._id);
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		VideoStore.unlisten(this.onChange);
	}

	// ON CHANGE
	onChange(state) {
		this.setState(state);
	}

	// RENDER
	render() {

		return (
			<div>
			</div>
		);
	}
}

export default VideoList;
