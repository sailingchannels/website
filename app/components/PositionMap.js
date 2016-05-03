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
				// OSM map
                L.tileLayer("//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
					attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
				}),
				// Seamarks
				L.tileLayer("//sailing-channels.com/seamark/{z}/{x}/{y}.png", {
					maxZoom: 17,
					minZoom: 10
				})
			],
            attributionControl: false
        });

		var pressurecntr = L.OWM.pressureContour({opacity: 0.5});
		var wind = L.OWM.wind({opacity: 0.5});

		var overlayMaps = {};
		overlayMaps.Windspeed = wind;
		overlayMaps.Isobars = pressurecntr;

		var layerControl = L.control.layers([], overlayMaps, {collapsed: false}).addTo(map);

		var marker = L.boatMarker(this.props.coordinate, {
		    color: this.props.boatcolor || "#f1c40f"
		});

		// more information available?
		if(this.props.more) {

			// name the boat
			if(this.props.more.name) marker.bindLabel(this.props.more.name, { noHide: true });

			// set heading
			marker.setHeading(this.props.more.course || 0);
		}

		marker.addTo(map);
		map.setView(this.props.coordinate, 9);
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
