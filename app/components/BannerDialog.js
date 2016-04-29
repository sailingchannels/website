import React from "react";
import {Link} from "react-router";

class BannerDialog extends React.Component {

    // RENDER
	render() {

		return (
            <div id="banner-dialog" className="modal fade">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
							<h3 className="modal-title">Thanks for stopping by!</h3>
						</div>
						<div className="modal-body">
							<p>
								<img id="banner-img" src="" width="100%" />
							</p>
							<p>
								The <a href="/channel/UCZbZeC2OfdVMwm9AR_zu0_g" target="_blank"><b>Two aboard Tuuli crew</b></a> created this website in their sparetime for you.
							</p>
							<p>
								If you like it, and want to give something back, feel free to support us with a tip via the following platforms. It means a lot to us!
							</p>
							<p>
								- Kristy & Thomas
							</p>

							<div className="row support-row">
								<div className="col-md-6 text-center">
									<a href="https://www.patreon.com/sailingchannels" target="_blank">
										<img src="/img/patreon.jpg" height="120" width="120" />
									</a>
								</div>
								<div className="col-md-6 text-center">
									<a href="https://www.paypal.me/sailingchannels" target="_blank">
										<img src="/img/paypal.png" height="120" width="120" />
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
            </div>
		);
	}
}

export default BannerDialog;
