import React from "react";
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
				<b style={{ marginTop: "35px", display: "block" }}>Popular video tags:</b>
				{this.state.tags.map((t, i) => {
					return (
						<span className="badge badge-secondary" key={i}>
							{t.tag}
						</span>
					);
				})}
			</div>
		);
	}
}

export default Tags;
