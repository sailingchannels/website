import React from "react";
import { Link } from "react-router-dom";
import ChannelActions from "actions/ChannelActions";
import ChannelStore from "stores/ChannelStore";

class Tags extends React.Component {
	// CONSTRUCTOR
	constructor(props) {
		super(props);
		this.state = ChannelStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		ChannelStore.listen(this.onChange);
		ChannelActions.getTags(this.props.id);
	}

	// COMPONENT WILL RECEIVE PROPS
	componentWillReceiveProps(nextProps) {
		if (nextProps.id !== this.props.id) {
			ChannelActions.getTags(nextProps.id);
		}
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		ChannelStore.unlisten(this.onChange);
	}

	// ON CHANGE
	onChange(state) {
		this.setState(state);
	}

	render() {
		if (!this.state.tags) return;

		return (
			<div>
				{this.state.tags.map((t, i) => {
					return (
						<Link
							className="badge badge-secondary"
							key={i}
							to={"/topic/" + encodeURIComponent(t.tag)}
						>
							{t.tag}
						</Link>
					);
				})}
			</div>
		);
	}
}

export default Tags;
