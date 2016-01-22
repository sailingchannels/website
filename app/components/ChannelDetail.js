import React from "react";
import ChannelActions from "../actions/ChannelActions";
import ChannelStore from "../stores/ChannelStore";
import OffsetMenu from "./OffsetMenu";
import Logo from "./Logo";

class ChannelDetail extends React.Component {

    // CONSTRUCTOR
	constructor(props) {
		super(props);
		this.state = ChannelStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
        ChannelStore.listen(this.onChange);
        ChannelActions.getChannel(this.props.params.id);
	}

    // COMPONENT WILL RECEIVE PROPS
    componentWillReceiveProps(nextProps) {

        if(nextProps.params.id !== this.props.params.id) {
            ChannelActions.getChannel(nextProps.params.id);
        }
    }

    // COMPONENT DID UPDATE
    componentDidUpdate() {
        if(this.state.channel) {
            document.title = this.state.channel.title + " - Sailing Channels";
			$("meta[name='description']").attr("content", this.state.channel.description);
        }
    }

    // COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		ChannelStore.unlisten(this.onChange);
	}

    // ON CHANGE
	onChange(state) {
		this.setState(state);
	}

	// FORMAT DATE
	formatDate(unix) {
		var m = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		var d = new Date(unix * 1000);
		return m[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
	}

    // RENDER
	render() {

        // no channel yet
        if(!this.state.channel) {
            return (null);
        }

        return (
			<div className="container">
				<Logo />
				<OffsetMenu />
			  	<div className="row">
					<div className="col-md-1"></div>
					<div className="col-md-10">
						<div className="row">
							<div className="col-md-12">
								<center>
									<h1>{this.state.channel.title}</h1>
								</center>
							</div>
						</div>
						<div className="row">
							<div className="col-md-2 col-sm-2">
								<img src={this.state.channel.thumbnail} className="channel-thumb" />
							</div>
							<div className="col-md-7 col-sm-7">
								<p className="channel-description" dangerouslySetInnerHTML={{__html: anchorme.js(this.state.channel.description.replace("\n", "<br />"), {target: "_blank"})}}></p>
								<p>&nbsp;</p>
								<p><b>Latest video:</b></p>
								<iframe width="100%" height="315" src={"https://www.youtube.com/embed/" + this.state.channel.videos[0]["_id"]} frameBorder="0" allowFullScreen></iframe>
							</div>
							<div className="col-md-3 col-sm-3">
								{(this.state.channel.subscribersHidden === true) ? <p className="text-warning"><b>Subscriber info hidden by channel <i className="fa fa-frown-o"></i></b></p> : null}
								{(this.state.channel.subscribersHidden === false) ? <p><b>Subscribers:</b> {this.state.channel.subscribers.toLocaleString()}</p> : null}
								{(this.state.channel.subscribersHidden === false) ? <p><b>Videos:</b> {this.state.channel.videoCount}</p> : null}
								<p><b>Views:</b> {this.state.channel.views.toLocaleString()}</p>
								{(this.state.channel.lastUploadAt) ? <p><b>Last upload:</b> {$.timeago(new Date(this.state.channel.lastUploadAt * 1000))}</p> : ""}
								<p><b>Founded:</b> {this.formatDate(this.state.channel.publishedAt)}</p>
								<p>&nbsp;</p>
								<a target="_blank" href={"https://youtube.com/channel/" + this.state.channel.id}><i className="fa fa-external-link"></i> Open YouTube channel</a>

								<a target="_blank" href={"https://youtube.com/channel/" + this.state.channel.id + "?sub_confirmation=1"} className="btn btn-danger btn-raised">
									<i className="fa fa-youtube-play"></i> Subscribe
								</a>

							</div>
						</div>
					</div>
					<div className="col-md-1"></div>
				</div>
				<p>&nbsp;</p>
            </div>
        );
    }
}

export default ChannelDetail;
