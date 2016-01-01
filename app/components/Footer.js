import React from "react";
import {Link} from "react-router";

class App extends React.Component {

	render() {

		return (
			<div className="container footer">
                <center>
				    <Link to="/impressum">Impressum</Link>&nbsp;|&nbsp;
                    <Link to="/privacy">Privacy Policy</Link>&nbsp;|&nbsp;
                    <a href="https://github.com/thomasbrueggemann/sailing-channels" target="_blank">Code on GitHub</a>
                </center>
			</div>
		);
	}
}

export default App;
