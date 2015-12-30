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
	}

    // COMPONENT WILL RECEIVE PROPS
    componentWillReceiveProps(nextProps) {

        console.log(nextProps.params.id, this.props.params.id);
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
                    <h4 className="modal-title">{this.state.channel.title}</h4>
                  </div>
                  <div className="modal-body">
                    <img src={this.state.channel.thumbnail} className="channel-thumb" />
                    <p className="channel-description">{linkifyHtml(this.state.channel.description.replace("\n", "<br />"))}</p>
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
