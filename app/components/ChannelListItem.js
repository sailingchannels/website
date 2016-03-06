import React from "react";
import Description from "./Description";
import {Link} from "react-router";

class ChannelListItem extends React.Component {

	// COMPONENT DID MOUNT
	componentDidMount() {
		$(".channel-thumb").unveil();
	}

	// FORMAT DATE
	formatDate(unix) {
		var m = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		var d = new Date(unix * 1000);
		return m[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
	}

    // RENDER
	render() {
		return (
			<div className="row channel-row">
                <div className="col-md-2 col-sm-2 col-xs-3">
					<center>
                    	<img src={this.props.channel.thumbnail} className="channel-thumb" />
					</center>
                </div>
                <div className="col-md-7 col-sm-6 col-xs-9">
                    <h3>
                        <Link to={"/channel/" + this.props.channel.id}>
                            {this.props.channel.title}
                        </Link>
                    </h3>
					<div className="hidden-xs">
						<Description text={this.props.channel.description} maxLength={300} />
					</div>
                </div>
                <div className="col-md-3 col-sm-4 col-xs-10 col-xs-offset-3 col-md-offset-0 col-sm-offset-0">

					{(this.props.channel.subscribersHidden === true) ? <p className="text-warning"><b>Subscriber info hidden <i className="fa fa-frown-o"></i></b></p> : null}
                    {(this.props.channel.subscribersHidden === false) ? <p><b>Subscribers:</b> {this.props.channel.subscribers.toLocaleString()}</p> : null}
					<p><b>Views:</b> {this.props.channel.views.toLocaleString()}</p>
					{(this.props.channel.subscribersHidden === false) ? <p><b>Videos:</b> {this.props.channel.videoCount.toLocaleString()}</p> : null}
					{(this.props.channel.lastUploadAt) ? <p><b>Last upload:</b> {$.timeago(new Date(this.props.channel.lastUploadAt * 1000))}</p> : ""}
					<p><b>Founded:</b> {this.formatDate(this.props.channel.publishedAt)}</p>

					{(this.props.channel.subscribed === false)
					?
						<a target="_blank" href={"https://youtube.com/channel/" + this.props.channel.id + "?sub_confirmation=1"} className="hidden-xs btn btn-danger btn-sidebar btn-raised">
							<i className="fa fa-youtube-play"></i> Subscribe
						</a>
					:
						<a target="_blank" href={"https://youtube.com/channel/" + this.props.channel.id + "?sub_confirmation=1"} className="hidden-xs btn btn-sidebar btn-raised">
							<i className="fa fa-youtube-play"></i> Unsubscribe
						</a>
					}

                </div>
			</div>
		);
	}
}

export default ChannelListItem;
