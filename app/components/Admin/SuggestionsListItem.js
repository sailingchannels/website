import React from "react";
import ChannelInfo from "./ChannelInfo";
import dayjs from "dayjs";

class SuggestionsListItem extends React.Component {
	addAdditional() {
		this.props.parent.addAdditional(this.props.data._id.channel, this.props.data._id.user);
	}

	ignoreSuggestion() {
		this.props.parent.ignoreSuggestion(this.props.data._id.channel, this.props.data._id.user);
	}

	// RENDER
	render() {
		return (
			<tr>
				<td>
					<button className="btn btn-success" onClick={this.addAdditional.bind(this)}>
						Add
					</button>
					<button className="btn btn-default" onClick={this.ignoreSuggestion.bind(this)}>
						Ignore
					</button>
				</td>
				<td>
					<ChannelInfo id={this.props.data._id.channel} />
				</td>
				<td>
					<ChannelInfo id={this.props.data._id.user} />
				</td>
				<td>{dayjs(this.props.data.when).format("YYYY-MM-DD  HH:mm")}</td>
			</tr>
		);
	}
}

export default SuggestionsListItem;
