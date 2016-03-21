import React from "react";
import ReactDOM from "react-dom";

class PositionMap extends React.Component {

	// COMPONENT DID MOUNT
	componentDidMount() {

		L.Icon.Default.imagePath = "/img/leaflet/";

        var map = this.map = L.map(ReactDOM.findDOMNode(this), {
            minZoom: 2,
            maxZoom: 20,
            layers: [
                L.tileLayer(
                    "//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                    {attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'})
            ],
            attributionControl: false
        });

		var marker = L.marker(this.props.coordinate).addTo(map);
		map.setView(this.props.coordinate, 13);
    }

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
        this.map = null;
    }

	// RENDER
	render() {

		return (
			<div className="position-map"></div>
		);
	}
}

export default PositionMap;
