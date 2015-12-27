import React from "react";

class ChannelListItem extends React.Component {

	textCutter(i, text) {

		if(text.length < i) return text;

        var short = text.substr(0, i);
        if (/^\S/.test(text.substr(i))) {
            return short.replace(/\s+\S*$/, "") + " [..]";
		}

        return short + " [..]";
    }

    // RENDER
	render() {
		return (
			<div className="row channel-row">
                <div className="col-md-2">
                    <img src={this.props.channel.thumbnail} height="100%" />
                </div>
                <div className="col-md-7">
                    <h3>
                        <a target="_blank" href={"https://youtube.com/channel/" + this.props.channel.id}>
                            {this.props.channel.title}
                        </a>
                    </h3>
                    <p>{this.textCutter(400, this.props.channel.description)}</p>
                </div>
                <div className="col-md-3">
                    <p><b>Subscribers:</b> {this.props.channel.subscribers.toLocaleString()}</p>
                    <p><b>Videos:</b> {this.props.channel.videos}</p>
                    <p><b>Views:</b> {this.props.channel.views.toLocaleString()}</p>

	                <button className="btn btn-danger btn-raised">Subscribe</button>
                </div>
			</div>
		);
	}
}

export default ChannelListItem;
