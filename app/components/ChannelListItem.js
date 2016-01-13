import React from "react";
import Description from "./Description";
import {Link} from "react-router";

class ChannelListItem extends React.Component {

	// COMPONENT DID MOUNT
	componentDidMount() {
		$(".channel-thumb").unveil();
	}

    // RENDER
	render() {
		return (
			<div className="row channel-row">
                <div className="col-md-2 col-xs-2">
					<center>
                    	<img src="https://cdn.rawgit.com/thomasbrueggemann/sailing-channels/master/public/img/1x1.png" data-src={this.props.channel.thumbnail} className="channel-thumb" />
					</center>
                </div>
                <div className="col-md-7 col-xs-10">
                    <h3>
                        <Link to={"/channel/" + this.props.channel.id}>
                            {this.props.channel.title}
                        </Link>
                    </h3>
					<Description text={this.props.channel.description} />
                </div>
                <div className="col-md-3 col-xs-10 col-xs-offset-2 col-md-offset-0">

					{(this.props.channel.subscribersHidden === true) ? <p className="text-warning"><b>Subscriber info hidden <i className="fa fa-frown-o"></i></b></p> : null}
                    {(this.props.channel.subscribersHidden === false) ? <p><b>Subscribers:</b> {this.props.channel.subscribers.toLocaleString()}</p> : null}
                    {(this.props.channel.subscribersHidden === false) ? <p><b>Videos:</b> {this.props.channel.videoCount.toLocaleString()}</p> : null}
					{(this.props.channel.lastUploadAt) ? <p><b>Last upload:</b> {moment.unix(this.props.channel.lastUploadAt).fromNow()}</p> : ""}
					<p><b>Founded:</b> {moment.unix(this.props.channel.publishedAt).format("ll")}</p>

					<a target="_blank" href={"https://youtube.com/channel/" + this.props.channel.id + "?sub_confirmation=1"} className="btn btn-danger btn-sidebar btn-raised">
						<i className="fa fa-youtube-play"></i> Subscribe
					</a>
                </div>
			</div>
		);
	}
}

export default ChannelListItem;
