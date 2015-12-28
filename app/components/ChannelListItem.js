import React from "react";
import Description from "./Description";

class ChannelListItem extends React.Component {

    // RENDER
	render() {
		return (
			<div className="row channel-row">
                <div className="col-md-2 col-xs-2">
					<center>
                    	<img src={this.props.channel.thumbnail} height="100%" />
					</center>
                </div>
                <div className="col-md-7 col-xs-10">
                    <h3>
                        <a target="_blank" href={"https://youtube.com/channel/" + this.props.channel.id}>
                            {this.props.channel.title}
                        </a>
                    </h3>
					<Description text={this.props.channel.description} />
                </div>
                <div className="col-md-3 col-xs-10">
                    <p><b>Subscribers:</b> {this.props.channel.subscribers.toLocaleString()}</p>
                    <p><b>Videos:</b> {this.props.channel.videos}</p>
                    <p><b>Views:</b> {this.props.channel.views.toLocaleString()}</p>

	                <a target="_blank" href={"https://youtube.com/channel/" + this.props.channel.id} className="btn btn-danger btn-raised">Subscribe</a>
                </div>
			</div>
		);
	}
}

export default ChannelListItem;
