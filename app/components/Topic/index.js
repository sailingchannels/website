import React from "react";
import { Link } from "react-router-dom";
import TopicActions from "actions/TopicActions";
import TopicStore from "stores/TopicStore";
import OffsetMenu from "components/OffsetMenu";
import OffsetSocial from "components/OffsetSocial";
import Logo from "components/Logo";
import $ from "jquery";

import "./Topic.css";

class Topic extends React.Component {
	// CONSTRUCTOR
	constructor(props) {
		super(props);
		this.state = TopicStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		TopicStore.listen(this.onChange);
		TopicActions.getTopic(this.props.match.params.id);
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		TopicStore.unlisten(this.onChange);
	}

	// ON CHANGE
	onChange(state) {
		this.setState(state);
	}

	render() {
		if (!this.state.topic) return null;

		return (
			<div className="container">
				<OffsetSocial />
				<Logo className="hidden-xs hidden-sm" />
				<OffsetMenu />
				<div className="row content-row">
					<div className="col-md-1" />
					<div className="col-md-10">
						<h1 className="content-h1">Topic: {this.state.topic.topic.title}</h1>
						<center>
							<p style={{ marginBottom: "40px" }}>
								{this.state.topic.topic.description}
							</p>
						</center>
					</div>
					<div className="col-md-1" />
				</div>
				<div className="row content-row" />
			</div>
		);
	}
}

export default Topic;
