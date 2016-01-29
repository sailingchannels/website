import React from "react";

class App extends React.Component {

	// COMPONENT DID MOUNT
	componentDidMount() {
		var $el = $("#subsriberChart_" + this.props.channel.id);

		// get canvas and set width
		var canvas = $el.get(0);
		canvas.width = $el.parent().width();

		// get context object
		var ctx = canvas.getContext("2d");

		// filter out values and dates for labels
		var values = this.props.channel.subHist.map((item) => {
			return item.subscribers;
		});

		var labels = this.props.channel.subHist.map((item) => {
			var raw = item._id.date + "";
			var d = new Date(parseInt(raw.substr(0, 4)), parseInt(raw.substr(4, 2)), parseInt(raw.substr(6, 2)));
			return d.toLocaleDateString();
		});

		console.log(labels);

		// prepare data
		var data = {
		    labels: labels,
		    datasets: [
		        {
		            label: "My Second dataset",
		            fillColor: "rgba(151,187,205,0.2)",
		            strokeColor: "rgba(151,187,205,1)",
		            pointColor: "rgba(151,187,205,1)",
		            pointStrokeColor: "#fff",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "rgba(151,187,205,1)",
		            data: values
		        }
		    ]
		};

		Chart.defaults.global.showScale = false;

		// draw line chart
		var ch = new Chart(ctx).Line(data);
	}

	// RENDER
	render() {

		return (
			<canvas id={"subsriberChart_" + this.props.channel.id} height="100"></canvas>
		);
	}
}

export default App;
