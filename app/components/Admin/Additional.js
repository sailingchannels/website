import React from "react";
import AdminActions from "../../actions/AdminActions";
import AdminStore from "../../stores/AdminStore";
import AdminListItem from "./AdminListItem";
import $ from "jquery";

class Additional extends React.Component {
	constructor(props) {
		super(props);
		this.state = AdminStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		AdminStore.listen(this.onChange);
		AdminActions.getAdditional();
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		AdminStore.unlisten(this.onChange);
	}

	// ON CHANGE
	onChange(state) {
		this.setState(state);
	}

	// ADD ADDITIONAL
	addAdditional() {
		var id = $("input[name='channelId']").val();
		if (id) {
			AdminActions.addAdditional(id);
			$("input[name='channelId']").clear();
		}
	}

	// DELETE ADDITIONAL
	deleteItem(id) {
		if (confirm("Really?") === true) {
			AdminActions.deleteAdditional(id);
		}
	}

	// RENDER
	render() {
		// reverse the order the additional channels are listed
		this.state.additional.reverse();

		return (
			<div className="row">
				<div className="col-md-12">
					<div className="row">
						<div className="col-md-12">
							<h2>Additional Channels</h2>
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
								onClick={this.addAdditional.bind(this)}
							>
								Add
							</button>
						</div>
						<div className="col-md-8" />
					</div>

					<div className="row">
						<table className="table">
							<tbody>
								{this.state.additional.map((b) => (
									<AdminListItem key={b._id} id={b._id} parent={this} />
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}

export default Additional;
