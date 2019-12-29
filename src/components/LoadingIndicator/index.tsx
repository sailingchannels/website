import React from "react";

function LoadingIndicator() {
	return (
		<div className="columns is-centered">
			<div className="column" style={{ marginTop: "100px", maxWidth: "300px" }}>
				<h4 className="subtitle is-5">Loading...</h4>
				<progress className="progress is-small is-info" max="100">
					60%
				</progress>
			</div>
		</div>
	);
}

export default LoadingIndicator;
