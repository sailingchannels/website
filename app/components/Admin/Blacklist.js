import React from "react";
import AdminActions from "../../actions/AdminActions";
import AdminStore from "../../stores/AdminStore";
import AdminListItem from "./AdminListItem";
import $ from "jquery";

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
		AdminStore.unlisten(this.onChange);
	}

	// ON CHANGE
	onChange(state) {
		this.setState(state);
	}

	// DELETE BLACKLISTED
	deleteItem(id) {
		if (confirm("Really?") === true) {
			AdminActions.deleteBlacklisted(id);
		}
	}

	// ADD BLACKLISTED
	addBlacklisted() {
		var id = $("input[name='channelId']").val();
		if (id) {
			AdminActions.addBlacklisted(id);
		}
	}

	// RENDER
	render() {
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="row">
						<div className="col-md-12">
							<h2>Blacklist Channels</h2>
						</div>
					</div>

					<div className="row">
						<div className="col-md-3">
							<input
								type="text"
								width="100%"
								className="form-control"
								placeholder="ChannelId"
								name="channelId"
							/>
						</div>
						<div className="col-md-1">
							<button
								className="btn btn-primary"
								onClick={this.addBlacklisted.bind(this)}
							>
								Add
							</button>
						</div>
						<div className="col-md-8" />
					</div>

					<div className="row">
						<div className="col-md-12">
							<table className="table">
								<tbody>
									{this.state.blacklisted.map((b) => (
										<AdminListItem key={b._id} id={b._id} parent={this} />
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Blacklist;
