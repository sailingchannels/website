import React from "react";
import AdminStore from "../../stores/AdminStore";
import AdminActions from "../../actions/AdminActions";
import ChannelInfo from "./ChannelInfo";
import moment from "moment";

class BlacklistItem extends React.Component {
	addBlacklisted() {
		this.props.parent.addBlacklisted(
			this.props.data._id.channel,
			this.props.data._id.user
		);
	}

	ignoreFlags() {
		this.props.parent.ignoreFlags(
			this.props.data._id.channel,
			this.props.data._id.user
		);
	}

	// RENDER
	render() {
		return (
			<tr>
				<td>
					<button
						className="btn btn-danger"
						onClick={this.addBlacklisted.bind(this)}
					>
						Blacklist
					</button>
					<button
						className="btn btn-default"
						onClick={this.ignoreFlags.bind(this)}
					>
						Ignore
					</button>
				</td>
				<td>
					<ChannelInfo id={this.props.data._id.channel} />
				</td>
				<td>
					<ChannelInfo id={this.props.data._id.user} />
				</td>
				<td>{moment(this.props.data.when).format("lll")}</td>
			</tr>
		);
	}
}

export default BlacklistItem;
