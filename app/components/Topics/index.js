import React from "react";
import { Link } from "react-router-dom";
import TopicActions from "actions/TopicActions";
import TopicStore from "stores/TopicStore";
import OffsetMenu from "components/OffsetMenu";
import OffsetSocial from "components/OffsetSocial";
import Logo from "components/Logo";
import $ from "jquery";

import "./Topics.css";

/**
 * Chunk an array [,,,,] into n-tuple arrays, e.g. [[,,],[,,]]
 * @param {Number} n Amount of chunks
 */
Array.prototype.chunk = function(n) {
	if (!this.length) {
		return [];
	}
	return [this.slice(0, n)].concat(this.slice(n).chunk(n));
};

class Topics extends React.Component {
	// CONSTRUCTOR
	constructor(props) {
		super(props);
		this.state = TopicStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		TopicStore.listen(this.onChange);
		TopicActions.getTopics();
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		TopicStore.unlisten(this.onChange);
	}

	// ON CHANGE
	onChange(state) {
		this.setState(state);
	}

	// REPLACE X
	replaceX(e) {
		var $e = $(e.target);
		if (!$e.attr("href")) {
			$e = $e.parents("[href]");
		}

		$e.attr("href", $e.attr("href").replace(/x/g, ""));
	}

	render() {
		if (!this.state.topics) return;

		return (
			<div className="container">
				<OffsetSocial />
				<Logo className="hidden-xs hidden-sm" />
				<OffsetMenu />
				<div className="row content-row">
					<div className="col-md-3" />
					<div className="col-md-6">
						<h1 className="content-h1">
							Explore by topics <sup style={{ color: "#C0C0C0" }}>beta</sup>
						</h1>
						<center>
							<p style={{ marginBottom: "40px" }}>
								Explore sailing channels by their topics. Channels are automatically
								grouped into topics by their video tags.<br />If you wish to suggest
								an additional topic to list here, please{" "}
								<a
									title="E-Mail"
									href="mailto:ahxoy@sailing-chaxnnels.com?subject=Topic suggestions"
									onMouseOver={this.replaceX.bind(this)}
								>
									send an email
								</a>.
							</p>
						</center>
					</div>
					<div className="col-md-3" />
				</div>
				<div className="row content-row">
					{this.state.topics.chunk(2).map((resultsChunk, chunkIdx) => {
						return (
							<div className="row topics-row" key={"result_row_" + chunkIdx}>
								<div className="col-md-1" />
								{resultsChunk.map((result, resultIdx) => {
									return (
										<div
											className="col-md-5"
											key={"result_" + chunkIdx + "_" + resultIdx}
										>
											<Link to={"/topic/" + result._id}>
												<div className="panel panel-default">
													<img
														src={
															"https://img.youtube.com/vi/" +
															result.latestVideo._id +
															"/mqdefault.jpg"
														}
														width="100%"
													/>
													<div className="panel-body">
														<small className="photo-credits">
															(Photo by: {result.latestVideo.title})
														</small>

														<h2>{result.title}</h2>

														<p>{result.description}</p>

														{/*<center>
														<button className="btn btn-default">
															<i className="fa fa-arrow-right" /> view
															channels
														</button>
													</center>*/}
													</div>
												</div>
											</Link>
										</div>
									);
								})}
								<div className="col-md-1" />
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

export default Topics;
