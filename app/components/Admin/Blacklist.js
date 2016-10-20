import React from "react";
import AdminActions from "../../actions/AdminActions";
import AdminStore from "../../stores/AdminStore";
import BlacklistItem from "./BlacklistItem";

class Blacklist extends React.Component {

	constructor(props) {
		super(props);
		this.state = AdminStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		AdminStore.listen(this.onChange);
		AdminActions.getBlacklisted();
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
				<div className="col-md-12">
					{this.state.blacklisted.map(b => (
						<BlacklistItem id={b._id} />
					))}
				</div>
			</div>
		);
	}
}

export default Blacklist;
