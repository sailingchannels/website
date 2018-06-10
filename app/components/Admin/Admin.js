import React from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookie";
import MeActions from "../../actions/MeActions";
import MeStore from "../../stores/MeStore";
import Logo from "../Logo/index";

class Admin extends React.Component {
	constructor(props) {
		super(props);

		this.state = MeStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
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

		// check if user is authorised to view the admin page
		if (!this.state.me.user || !(this.state.me.user.admin === true)) {
			this.props.history.push("/");
		}
	}

	// RENDER
	render() {
		if (!this.state.me.user || !(this.state.me.user.admin === true)) {
			return null;
		} else {
			// if so, render the admin page
			return (
				<div className="container">
					<Logo />
					<div className="row">
						<div className="col-md-3">
							<ul className="navi">
								<li>
									<Link to="/admin/dashboard">Dashboard</Link>
								</li>
								<li>
									<Link to="/admin/flags">Flags</Link>
								</li>
								<li>
									<Link to="/admin/additional">Additional Channels</Link>
								</li>
								<li>
									<Link to="/admin/blacklist">Blacklist Channel</Link>
								</li>
								<li>
									<Link to="/admin/suggestions">Channel Suggestions</Link>
								</li>
							</ul>
						</div>
						<div className="col-md-9">{this.props.children}</div>
					</div>
				</div>
			);
		}
	}
}

export default Admin;
