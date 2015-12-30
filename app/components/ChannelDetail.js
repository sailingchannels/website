import React from "react";
import ChannelActions from "../actions/ChannelActions";
import ChannelStore from "../stores/ChannelStore";

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

		$(document).on("hidden.bs.modal", "#channel-dialog",  function () {
		    console.log("closed");
		});
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
            $("#channel-dialog").modal("show");
            document.title = this.state.channel.title + " - Sailing Channels";
        }
    }

    // COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		$(document).off("hidden.bs.modal", "#channel-dialog");
		ChannelStore.unlisten(this.onChange);
	}

    // ON CHANGE
	onChange(state) {
		this.setState(state);
	}

    // RENDER
	render() {

        // no channel yet
        if(!this.state.channel) {
            return (null);
        }

        return (
            <div id="channel-dialog" className="modal fade">
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h3 className="modal-title">{this.state.channel.title}</h3>
                  </div>
                  <div className="modal-body">
				  	<div className="row">
						<div className="col-md-2">
							<img src={this.state.channel.thumbnail} className="channel-thumb" />
						</div>
						<div className="col-md-7">
							<p dangerouslySetInnerHTML={{__html: anchorme.js(this.state.channel.description.replace("\n", "<br />"), {target: "_blank"})}}></p>
						</div>
						<div className="col-md-3">
							{(this.state.channel.subscribersHidden === true) ? <p className="text-warning"><b>Subscriber info hidden by channel <i className="fa fa-frown-o"></i></b></p> : null}
							{(this.state.channel.subscribersHidden === false) ? <p><b>Subscribers:</b> {this.state.channel.subscribers.toLocaleString()}</p> : null}
							{(this.state.channel.subscribersHidden === false) ? <p><b>Videos:</b> {this.state.channel.videos.length}</p> : null}
							<p><b>Views:</b> {this.state.channel.views.toLocaleString()}</p>
							{(this.state.channel.lastUploadAt) ? <p><b>Last upload:</b> {moment.unix(this.state.channel.lastUploadAt).fromNow()}</p> : ""}

							<a target="_blank" href={"https://youtube.com/channel/" + this.state.channel.id + "?sub_confirmation=1"} className="btn btn-danger btn-raised">
								<i className="fa fa-youtube-play"></i> Subscribe
							</a>
						</div>
					</div>
					<div className="row">
						<div className="col-md-2"></div>
						<div className="col-md-10">
							<p><b>Latest video:</b></p>
							<iframe width="560" height="315" src={"https://www.youtube.com/embed/" + this.state.channel.videos[0].id} frameBorder="0" allowFullScreen></iframe>
						</div>
					</div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
        );
    }
}

export default ChannelDetail;
