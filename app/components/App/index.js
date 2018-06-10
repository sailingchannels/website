import React from "react";
import Footer from "components/Footer";
import MobileMenu from "components/MobileMenu";

class App extends React.Component {
	render() {
		return (
			<div>
				<MobileMenu />
				{this.props.children}
				<Footer />
			</div>
		);
	}
}

export default App;
