import React from "react";

import "./PositionMap.css";

class PositionMap extends React.PureComponent {
	// RENDER
	render() {
		return (
			<iframe
				frameBorder="0"
				className="position-map"
				src={"/map?channel=" + this.props.channel}
			/>
		);
	}
}

export default PositionMap;
