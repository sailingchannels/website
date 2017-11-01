import React from "react";
import AdminStore from "../../stores/AdminStore";
import AdminActions from "../../actions/AdminActions";
import ChannelInfo from "./ChannelInfo";
import moment from "moment";

class SuggestionsListItem extends React.Component {
	addAdditional() {
		this.props.parent.addAdditional(
			this.props.data._id.channel,
			this.props.data._id.user
		);
	}

	ignoreSuggestion() {
		this.props.parent.ignoreSuggestion(
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
						className="btn btn-success"
						onClick={this.addAdditional.bind(this)}
					>
						Add
					</button>
					<button
						className="btn btn-default"
						onClick={this.ignoreSuggestion.bind(this)}
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

export default SuggestionsListItem;
