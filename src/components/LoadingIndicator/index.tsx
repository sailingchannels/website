import React from "react";

function LoadingIndicator() {
	return (
		<nav className="level">
			<div className="level-item has-text-centered">
				<div style={{ marginTop: "100px", width: "300px" }}>
					<h4 className="subtitle" style={{ marginBottom: "10px" }}>
						Loading...
					</h4>
					<progress className="progress is-small is-info" max="100">
						60%
					</progress>
				</div>
			</div>
		</nav>
	);
}

export default LoadingIndicator;
