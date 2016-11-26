import React from "react";
import AdminStore from "../../stores/AdminStore";
import AdminActions from "../../actions/AdminActions";
import ChannelInfo from "./ChannelInfo";

class BlacklistItem extends React.Component {

	constructor(props) {
		super(props);
		this.state = AdminStore.getState();
	}

	deleteItem() {
		this.props.parent.deleteItem(this.props.id);
	}

	// RENDER
	render() {
		return (
			<tr>
                <td>
					<button className="btn btn-danger" onClick={this.deleteItem.bind(this)}>Delete</button>
                </td>
                <td>
					<ChannelInfo id={this.props.id} />
                </td>
			</tr>
		);
	}
}

export default BlacklistItem;
