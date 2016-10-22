var windytyInit = {
	// Required: API key
	key: "WAgdzv8AVSsdPqH",

	// Optional: Initial state of the map
	lat: 50.4,
	lon: 14.3,
	zoom: 6
};

if (typeof(Number.prototype.toRad) === "undefined") {
	Number.prototype.toRad = function() {
		return this * Math.PI / 180;
	}
}

function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Required: Windyty main function is called after
// initialization of API
//
// @map is instance of Leaflet maps
//
function windytyMain(map) {

	map.addLayer(L.tileLayer("//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
		attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
		maxZoom: 18,
		minZoom: 12
	}));

	// add seamarker layers
	map.addLayer(L.tileLayer("//sailing-channels.com/seamark/{z}/{x}/{y}.png", {
		maxZoom: 18,
		minZoom: 12
	}));

	var marker = null;
	var polyline = null;

	// load channel information
	var channel = getParameterByName("channel");

	/** DIST Calculates the distance between two spots.
	*
	* @param    object    Start position {latitude: 123, longitude: 123}
	* @param    object    End position {latitude: 123, longitude: 123}
	* @param    integer   Accuracy (in meters)
	* @return   integer   Distance (in meters)
	*/
	var dist = function(start, end, accuracy) {

		accuracy = Math.floor(accuracy) || 1;

		var distance =
			Math.round(
				Math.acos(
					Math.sin(end.latitude.toRad()) *
					Math.sin(start.latitude.toRad()) +
					Math.cos(end.latitude.toRad()) *
					Math.cos(start.latitude.toRad()) *
					Math.cos(start.longitude.toRad() - end.longitude.toRad())
				) * 6378137
			);

		return Math.floor(Math.round(distance / accuracy) * accuracy);
	};

	// GENERATE POPUP generates the popup html for
	// displaying boat information
	var generatePopup = function(data) {

		var pup = "<table border='0'>";
		pup += "<tr><td><b>Name:</b></td><td>" + data.name + "</td></tr>";

		var coded_src = "";
		switch(data.src) {
			case "mmsi": coded_src = "AIS"; break;
			case "inreach": coded_src = "DeLorme inReach"; break;
		}

		var speed = (data.spd !== null) ? data.spd.toFixed(1) : 0;
		var course = (data.crs !== null) ? parseInt(data.crs) : 0;

		pup += "<tr><td><b>Device:</b></td><td>" + coded_src + "</td></tr>";
		pup += "<tr><td><b>Course:&nbsp;</b></td><td>" + course + "°</td></tr>";
		pup += "<tr><td><b>Speed:</b></td><td>" + speed + " kn</td></tr>";

		if(data.time) {
			pup += "<tr><td><b>Received:</b></td><td>" + $.timeago(new Date(data.time * 1000)) + "</td></tr>";
		}

		return pup;
	};

	// LOAD POSITION fetches the positions from the server
	var loadPosition = function() {

		// get channel information (incl. position)
		$.getJSON("/api/channel/get/" + channel, function(data) {

			var crs = 0;
			var spd = 0;

			// try to gather course information
			if(data.vesselinfo && "course" in data.vesselinfo) {
				crs = data.vesselinfo.course;
			}

			// try to gather speed information
			if(data.vesselinfo && "speed" in data.vesselinfo) {
				crs = data.vesselinfo.speed;
			}

			// check if we are live
			sLive = false;
			if("time" in data.vesselinfo && data.vesselinfo.time) {
				isLive = Math.abs((new Date().getTime() / 1000) - data.vesselinfo.time) <= 3600 && spd > 0;
			}
			else {
				isLive = spd > 0;
			}

			// show hide the live indicator
			if(isLive) {
				$("#live").show();
			}
			else {
				$("#live").hide();
				window.clearInterval(window.loadPositionInterval);
			}

			// create or update marker
			if(marker) {
				marker.setHeading(crs);
				marker.setLatLng(data.position);
			}
			else {
				marker = L.boatMarker(data.position, {
					"color": data.boatcolor || "#f1c40f"
				});

				marker.addTo(map);
			}

			// generate popup
			var pup = generatePopup({
				"name": data.vesselinfo.name,
				"src": data.positionsource,
				"crs": crs,
				"spd": spd,
				"time": ("time in data.vesselinfo") ? data.vesselinfo.time : null
			});

			marker.bindPopup(pup);

			// more information available?
			if(data.vesselinfo) {

				// name the boat
				if(data.vesselinfo.name) {
					marker.bindLabel(data.vesselinfo.name, { noHide: true });
				}

				// set heading
				marker.setHeading(crs);
			}

			map.setView(data.position, 9);

			var trailnumber = 100;
			if(data.trailnumber !== null || typeof data.trailnumber !== undefined) {
				trailnumber = data.trailnumber;
			}

			var popup = new L.Popup();

			// fetch trail
			$.getJSON("/api/positions/" + channel + "/last/" + trailnumber, function(data) {

				if(data) {

					// filter out coords
					var coords = data.map(function(item) {
						return {
							"lat": item.pos[0],
							"lng": item.pos[1]
						};
					});

					if(coords.length > 0) {

						// add polyline to map
						if(polyline) {
							polyline.setLatLngs(coords);
						}
						else {
							polyline = L.polyline(coords, {
								color: "black"
							}).addTo(map);

							// polyline:mouseover
							polyline.on("mouseover", function(e) {

								var minDistDelta = Number.MAX_VALUE;
								var minData = null;

								// find the closest data object from the available positions
								for(var i in data) {

									// calculate distance between
									var distDelta = dist({
										"latitude": e.latlng.lat,
										"longitude": e.latlng.lng
									}, {
										"latitude": data[i].pos[0],
										"longitude": data[i].pos[1]
									});

									if(distDelta < minDistDelta) {
										minDistDelta = distDelta;
										minData = data[i];
									}
								}

								// we found a very close position
								if(minData !== null) {

									var pup = generatePopup({
										"name": minData.src.name,
										"src": (minData.src.type === "AIS") ? "mmsi": "inreach",
										"crs": minData.crs,
										"spd": minData.spd,
										"time": ("time" in minData) ? minData.time : null
									});

									// display a popup with the desired information at the closest position
									popup.setContent(pup);
									popup.setLatLng(e.latlng);
									map.openPopup(popup);
								}
							});

							// polyline:mouseout
							polyline.on("mouseout", function() {
								$("#windyty").trigger("click");
							});
						}
					}
				}
			});
		});
	};

	// update every x seconds
	window.loadPositionInterval = window.setInterval(loadPosition, 30000);
	loadPosition();
}
