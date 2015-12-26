import React from "react";
import ChannelListItem from "./ChannelListItem";
import ChannelActions from "../actions/ChannelActions";
import ChannelStore from "../stores/ChannelStore";

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

		// load the channels
		ChannelActions.getChannels();
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		ChannelStore.unlisten(this.onChange);
	}

    // ON CHANGE
	onChange(state) {
		this.setState(state);
	}

    // RENDER
	render() {
		return (
            <div className="row">
				<div className="col-md-3"></div>
                <div className="col-md-6">
                    {this.state.channels.map(c => (
        				<ChannelListItem key={c.channelId} channel={c} />
        			))}
                </div>
                <div className="col-md-3"></div>
            </div>
		);
	}
}

export default ChannelList;
