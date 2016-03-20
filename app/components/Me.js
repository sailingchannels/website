import React from "react";
import OffsetMenu from "./OffsetMenu";
import OffsetSocial from "./OffsetSocial";
import Logo from "./Logo";
import cookie from "react-cookie";
import MeActions from "../actions/MeActions";
import MeStore from "../stores/MeStore";

class Me extends React.Component {

	constructor(props) {
		super(props);

		this.state = MeStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		document.title = "Me | Sailing Channels";
		MeStore.listen(this.onChange);
        MeActions.getMe();
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		MeStore.unlisten(this.onChange);
	}

	// ON CHANGE
	onChange(state) {
		this.setState(state);
	}

	// RENDER
	render() {

		if(!this.state.me.user) return null;

		var channelListed = null;

		if(this.state.me.channel) {
			channelListed =
			<div className="form-horizontal">
			  <div className="form-group">
				<p>In case you broadcast your positions via <b>AIS</b>, you can store your MMSI number here. Your position will be displayed on a map on your channel detail page.</p>
				<label htmlFor="mmsi" className="col-sm-2 control-label">AIS MMSI</label>
				<div className="col-sm-10">
				  <input type="number" className="form-control" id="mmsi" placeholder="MMSI number" />
				</div>
			  </div>
			</div>;
		}

		return (
            <div className="container">
				<OffsetSocial />
				<Logo />
				<OffsetMenu />
                <div className="row content-row">
					<div className="col-md-3"></div>
					<div className="col-md-6">
	                    <h1 className="content-h1"><img src={this.state.me.user.thumbnail} width="50" /> {this.state.me.user.title}</h1>
						{channelListed}
						<center>
							{(channelListed) ?
							<button className="btn btn-success btn-raised">
								<i className="fa fa-check"> Save</i>
							</button>
							: null}
							<a href="/logout" className="btn">
								<i className="fa fa-power-off"></i> Sign Out
							</a>
						</center>
					</div>
					<div className="col-md-3"></div>
                </div>
            </div>
		);
	}
}

export default Me;
