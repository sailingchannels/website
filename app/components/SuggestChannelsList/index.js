import React, { Component } from "react";
import Description from "components/Description";
import LazyLoad from "react-lazyload";
import SuggestButton from "components/SuggestButton";

class SuggestChannelsList extends Component {
	// RENDER
	render() {
		return (
			<div>
				{this.props.channels.map((c) => {
					return (
						<div
							key={"channel-suggest-" + c._id}
							className="row"
							style={{ minHeight: "120px" }}
						>
							<div className="col-md-2 col-sm-2 col-xs-3">
								<center>
									<LazyLoad once>
										<img src={c.data.thumbnail} className="channel-thumb" />
									</LazyLoad>
								</center>
							</div>
							<div className="col-md-7 col-sm-6 col-xs-9">
								<h3>
									<a
										href={"https://youtube.com/channel/" + c._id}
										target="_blank"
									>
										{c.data.title}
									</a>
								</h3>
								<div className="hidden-xs">
									{c.data.description ? (
										<Description
											text={c.data.description}
											more={true}
											maxLength={100}
										/>
									) : null}
								</div>
							</div>
							<div className="col-md-3 col-sm-4 col-xs-10 col-xs-offset-3 col-md-offset-0 col-sm-offset-0">
								<SuggestButton channel={c._id} />
							</div>
						</div>
					);
				})}
			</div>
		);
	}
}

export default SuggestChannelsList;
