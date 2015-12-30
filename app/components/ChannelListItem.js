import React from "react";
import Description from "./Description";
import {Link} from "react-router"

class ChannelListItem extends React.Component {

    // RENDER
	render() {
		return (
			<div className="row channel-row">
                <div className="col-md-2 col-xs-2">
					<center>
                    	<img src={this.props.channel.thumbnail} className="channel-thumb" />
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
                <div className="col-md-3 col-xs-10">

					{(this.props.channel.subscribersHidden === true) ? <p className="text-warning"><b>Subscriber info hidden by channel <i className="fa fa-frown-o"></i></b></p> : null}
                    {(this.props.channel.subscribersHidden === false) ? <p><b>Subscribers:</b> {this.props.channel.subscribers.toLocaleString()}</p> : null}
                    {(this.props.channel.subscribersHidden === false) ? <p><b>Videos:</b> {this.props.channel.videos}</p> : null}
                    <p><b>Views:</b> {this.props.channel.views.toLocaleString()}</p>
					{(this.props.channel.lastUploadAt) ? <p><b>Last upload:</b> {moment.unix(this.props.channel.lastUploadAt).fromNow()}</p> : ""}

	                <a target="_blank" href={"https://youtube.com/channel/" + this.props.channel.id + "?sub_confirmation=1"} className="btn btn-danger btn-raised">
						<i className="fa fa-youtube-play"></i> Subscribe
					</a>
                </div>
			</div>
		);
	}
}

export default ChannelListItem;
