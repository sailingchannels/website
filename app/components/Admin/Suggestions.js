import React from "react";
import AdminActions from "../../actions/AdminActions";
import AdminStore from "../../stores/AdminStore";
import SuggestionsListItem from "./SuggestionsListItem";

class Suggestions extends React.Component {
	constructor(props) {
		super(props);
		this.state = AdminStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		AdminStore.listen(this.onChange);
		AdminActions.getSuggestions();
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
	addAdditional(channel, user) {
		if (channel && user) {
			AdminActions.addAdditional(channel);
			AdminActions.deleteSuggestions(channel, user);
		}
	}

	ignoreSuggestion(channel, user) {
		if (channel && user) {
			AdminActions.deleteSuggestions(channel, user);
		}
	}

	// RENDER
	render() {
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="row">
						<div className="col-md-12">
							<h2>Suggestions</h2>
						</div>
					</div>

					<div className="row">
						<div className="col-md-12">
							<table className="table">
								<thead>
									<tr>
										<td />
										<td>Channel</td>
										<td>By User</td>
										<td>When</td>
									</tr>
								</thead>
								<tbody>
									{this.state.suggestions.map(b => (
										<SuggestionsListItem
											key={JSON.stringify(b._id)}
											data={b}
											parent={this}
										/>
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

export default Suggestions;
