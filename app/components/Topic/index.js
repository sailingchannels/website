import React from "react";
import { Link } from "react-router-dom";
import TopicActions from "actions/TopicActions";
import TopicStore from "stores/TopicStore";
import OffsetMenu from "components/OffsetMenu";
import OffsetSocial from "components/OffsetSocial";
import Logo from "components/Logo";
import Infinite from "react-infinite";
import ChannelListItem from "components/ChannelListItem/Loadable";

class Topic extends React.PureComponent {
	// CONSTRUCTOR
	constructor(props) {
		super(props);
		this.state = TopicStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		TopicStore.listen(this.onChange);
		TopicActions.resetChannels();
		TopicActions.getTopic(this.props.match.params.id, this.state.skip, this.state.take);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.match.params.id !== this.props.match.params.id) {
			TopicActions.resetChannels();
			TopicActions.getTopic(this.props.match.params.id, this.state.skip, this.state.take);
		}
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		TopicStore.unlisten(this.onChange);
	}

	// ON CHANGE
	onChange(state) {
		this.setState(state);
	}

	// LOAD MORE
	loadMore() {
		if (this.state.loading === false) {
			// load more data
			window.setTimeout(() => {
				TopicActions.getTopic(
					this.props.match.params.id,
					this.state.skip + this.state.take,
					this.state.take
				);
			}, 0);
		}
	}

	render() {
		if (!this.state.topic) return null;

		return (
			<div className="container">
				<OffsetSocial />
				<Logo className="hidden-xs hidden-sm" />
				<OffsetMenu />
				<div className="row content-row">
					<div className="col-md-3" />
					<div className="col-md-6">
						<h1 className="content-h1">Topic: {this.state.topic.title}</h1>
						<center>
							<p>{this.state.topic.description}</p>
							<Link
								style={{ marginBottom: "40px" }}
								className="btn btn-default btn-raised"
								to="/topics"
							>
								<i className="fa fa-arrow-left" /> back to topics
							</Link>
						</center>
					</div>
					<div className="col-md-3" />
				</div>
				<div className="row content-row">
					<Infinite
						useWindowAsScrollContainer={true}
						elementHeight={230}
						infiniteLoadBeginEdgeOffset={230}
						onInfiniteLoad={this.loadMore.bind(this)}
					>
						{this.state.channels.map((c) => {
							return <ChannelListItem key={"cli-" + c.id} channel={c} />;
						})}
					</Infinite>
				</div>
			</div>
		);
	}
}

export default Topic;
