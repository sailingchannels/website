import React from "react";
import MapGL from "react-map-gl";

class Map extends React.Component {

	constructor(props) {
		super(props);
	}

	// RENDER
	render() {

		return (
			<MapGL
			  width={700}
			  height={450}
			  latitude={37.78}
			  longitude={-122.45}
			  zoom={11}
			  mapStyle={"mapbox://styles/mapbox/streets-v8"}
			  mapboxApiAccessToken={"pk.eyJ1Ijoic2FpbGluZ2NoYW5uZWxzIiwiYSI6ImNpbHp5MngxczAwaHp2OW00Y2szOG1oM2wifQ.4w_KaRlbtjBf9_TNQL6SXw"}
			 />
		);
	}
}

export default Map;
