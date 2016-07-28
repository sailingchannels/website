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
            attributionControl: false,
			fullscreenControl: true
        });

		var windytyInit = {
			// Required: API key
			"key": "PsL-At-XpsPTZexBwUkO7Mx5I"
		};

		var marker = L.boatMarker(this.props.coordinate, {
		    "color": this.props.boatcolor || "#f1c40f"
		});

		var pup = "<table border='0'>";
		pup += "<tr><td><b>Name:</b></td><td>" + this.props.more.name + "</td></tr>";

		var coded_src = "";
		switch(this.props.source) {
			case "mmsi": coded_src = "AIS"; break;
			case "inreach": coded_src = "DeLorme inReach"; break;
		}

		var crs = this.props.more.course || 0;
		var spd = this.props.more.speed || 0;

		pup += "<tr><td><b>Device:</b></td><td>" + coded_src + "</td></tr>";
		pup += "<tr><td><b>Course:&nbsp;</b></td><td>" + parseInt(crs) + "°</td></tr>";
		pup += "<tr><td><b>Speed:</b></td><td>" + spd.toFixed(1) + " kn</td></tr>";

		if("time" in this.props.more && this.props.more.time) {
			pup += "<tr><td><b>Received:</b></td><td>" + $.timeago(new Date(this.props.more.time * 1000)) + "</td></tr>";
		}

		marker.bindPopup(pup);

		// more information available?
		if(this.props.more) {

			// name the boat
			if(this.props.more.name) marker.bindLabel(this.props.more.name, { noHide: true });

			// set heading
			marker.setHeading(crs);
		}

		marker.addTo(map);
		map.setView(this.props.coordinate, 8);

		// check for fullscreen change event
		map.on("fullscreenchange", function () {
		    if (map.isFullscreen()) {
				$(".leaflet-control-layers-overlays input[type='checkbox']").trigger("click");
		    }
		});
    }

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
        this.map = null;
    }

	// RENDER
	render() {
		return (
			<div id="windyty" className="position-map"></div>
		);
	}
}

export default PositionMap;
