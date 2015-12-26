import React from "react";

class ChannelListItem extends React.Component {

    // RENDER
	render() {
		return (
			<div className="row channel-row">
                <div className="col-md-3">
                    <img src={this.props.channel.thumbnail} height="80" />
                </div>
                <div className="col-md-7">
                    <h3>{this.props.channel.title}</h3>
                    <p>{this.props.channel.description}</p>
                    <p><b>Subscribers:</b> {this.props.channel.subscribers}</p>
                    <p><b>Videos:</b> {this.props.channel.videos}</p>
                </div>
                <div className="col-md-2">
                    <button className="btn">Subscribe</button>
                </div>
			</div>
		);
	}
}

export default ChannelListItem;
