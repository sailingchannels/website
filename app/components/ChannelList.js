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

		// handle event bus page changes
		$(window).on("typeSearchterm", this.typeSearchterm.bind(this));

		// load the channels
		ChannelActions.getChannels();
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		$(window).off("typeSearchterm");
		ChannelStore.unlisten(this.onChange);
	}

    // ON CHANGE
	onChange(state) {
		this.setState(state);
	}

	// TYPE SEARCHTERM
	typeSearchterm(e, data) {

		// filter channels by the searchterm
		var redefined = this.state.all.filter(item => {
			return item.title.toLowerCase().indexOf(data.term) >= 0 ||
				   item.description.toLowerCase().indexOf(data.term) >= 0;
		});

		this.setState({
			"channels": redefined
		});
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
        				<ChannelListItem key={c.id} channel={c} />
        			))}
                </div>
				<div className="col-md-1"></div>
            </div>
		);
	}
}

export default ChannelList;
