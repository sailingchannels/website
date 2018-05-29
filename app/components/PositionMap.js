import React from "react";
import ReactDOM from "react-dom";

class PositionMap extends React.Component {
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
