import React from "react";
import Footer from "./Footer";

class App extends React.Component {

	// COMPONENT DID MOUNT
	componentDidMount() {
		$.material.init();

		window.setTimeout(function() {
			if(!($("#banner-dialog").data("bs.modal") || {}).isShown && !Cookies.get("banner-dialog")) {

				// open the dialog
				$("#banner-dialog").modal("show");
				$("#banner-img").attr("src", STATIC_PATH + "/img/twoaboardtuuli.jpg");
				Cookies.set("banner-dialog", "shown", { expires: 3 });
			}
		}, 45000);
	}

	// RENDER
	render() {

		return (
			<div>
				{this.props.children}
				<Footer />
			</div>
		);
	}
}

export default App;
