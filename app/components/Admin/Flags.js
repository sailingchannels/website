import React from "react";
import AdminActions from "../../actions/AdminActions";
import AdminStore from "../../stores/AdminStore";
import FlagsListItem from "./FlagsListItem";

class Flags extends React.Component {

	constructor(props) {
		super(props);
		this.state = AdminStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		AdminStore.listen(this.onChange);
		AdminActions.getFlags();
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		AdminStore.unlisten(this.onChange);
	}

	// ON CHANGE
	onChange(state) {
		this.setState(state);
	}

	// ADD BLACKLISTED
	addBlacklisted(channel, user) {
		if(channel && user) {
			AdminActions.addBlacklisted(channel);
			AdminActions.deleteFlags(channel, user);
		}
	}

	ignoreFlags(channel, user) {
		if(channel && user) {
			AdminActions.deleteFlags(channel, user);
		}
	}

	// RENDER
	render() {

		return (
			<div className="row">
				<div className="col-md-12">

					<div className="row">
						<div className="col-md-12">
							<h2>Flags</h2>
						</div>
					</div>

					<div className="row">
						<div className="col-md-12">
							<table className="table">
								<thead>
									<tr>
										<td></td>
										<td>Channel</td>
										<td>By User</td>
										<td>When</td>
									</tr>
								</thead>
								<tbody>
									{this.state.flags.map(b => (
										<FlagsListItem key={JSON.stringify(b._id)} data={b} parent={this} />
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

export default Flags;
