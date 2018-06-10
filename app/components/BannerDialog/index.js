import React from "react";
import { Modal } from "react-bootstrap";
import LazyLoad, { forceCheck } from "react-lazyload";
import Cookies from "js-cookie";

class BannerDialog extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			show: false
		};
	}

	componentDidMount() {
		window.setTimeout(() => {
			if (this.state.show === false && !Cookies.get("banner-dialog")) {
				// open the dialog
				this.setState({
					show: true
				});

				window.setTimeout(() => {
					forceCheck();
				}, 1000);

				Cookies.set("banner-dialog", "shown", { expires: 3 });
			}
		}, 45000);
	}

	handleClose() {
		this.setState({ show: false });
	}

	handleShow() {
		this.setState({ show: true });
	}

	// RENDER
	render() {
		return (
			<Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
				<div className="modal-dialog">
					<div className="modal-content">
						<Modal.Header closeButton>
							<Modal.Title>Thanks for stopping by!</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<LazyLoad>
								<p>
									<img
										id="banner-img"
										src={require("images/twoaboardtuuli.jpg")}
										width="100%"
									/>
								</p>
							</LazyLoad>
							<p>
								The{" "}
								<a href="/channel/UCZbZeC2OfdVMwm9AR_zu0_g" target="_blank">
									<b>Two aboard Tuuli crew</b>
								</a>{" "}
								created this website in their sparetime for you.
							</p>
							<p>
								If you like it, and want to give something back, feel free to
								support us with a tip via the following platforms. It means a lot to
								us!
							</p>
							<p>- Kristy & Thomas</p>

							<div className="row support-row">
								<div className="col-md-6 text-center">
									<a
										href="https://www.patreon.com/sailingchannels"
										target="_blank"
									>
										<img
											src="https://rawgit.com/sailingchannels/website/master/public/img/patreon.jpg"
											height="120"
											width="120"
										/>
									</a>
								</div>
								<div className="col-md-6 text-center">
									<a href="https://www.paypal.me/sailingchannels" target="_blank">
										<img
											src="https://rawgit.com/sailingchannels/website/master/public/img/paypal.png"
											height="120"
											width="120"
										/>
									</a>
								</div>
							</div>
						</Modal.Body>
					</div>
				</div>
			</Modal>
		);
	}
}

export default BannerDialog;
