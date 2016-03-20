import React from "react";
import {Link} from "react-router";

class SignInDialog extends React.Component {

    // RENDER
	render() {

		return (
            <div id="signin-dialog" className="modal fade">
				<div className="modal-dialog">
					<div className="modal-content">
					  	<div className="modal-header">
						    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
						    <h3 className="modal-title">Oh no!</h3>
					  	</div>
					  	<div className="modal-body">
						    <p>
						        You need to sign in with your YouTube account in order to perform this action.
						    </p>
							<p>
								Consider visiting the sign in page for more information:
							</p>
							<center className="banner-channel">
								<a href="/signin" className="btn btn-raised btn-sm btn-danger yt-login">Sign In with <i className="fa fa-youtube"></i> YouTube</a>
							</center>
					  	</div>
					</div>
				</div>
            </div>
		);
	}
}

export default SignInDialog;
