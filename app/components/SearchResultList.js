import React from "react";
import ChannelListItem from "./ChannelListItem";
import ChannelActions from "../actions/ChannelActions";
import ChannelStore from "../stores/ChannelStore";

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

		if(this.props.query) {
			$("#search-bar").val(this.props.query);
			window.setTimeout(function() { $("#search-bar").focus(); }, 1);
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

		if(this.props.query !== nextProps.query) {
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
		if(this.state.channels.length === 0) {
			return (
				<div className="row">
					<div className="col-md-1"></div>
					<div className="col-md-10">
						<center>
							No channels match the search query!
						</center>
					</div>
					<div className="col-md-1"></div>
				</div>
			);
		}

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

export default SearchResultList;
