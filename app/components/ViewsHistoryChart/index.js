import React from "react";
import $ from "jquery";
import Chart from "chart.js";

class ViewsHistoryChart extends React.Component {
	// COMPONENT DID MOUNT
	componentDidMount() {
		this.loadChart(this.props);
	}

	// COMPONENT WILL RECEIVE PROPS
	componentWillReceiveProps(nextProps) {
		this.loadChart(nextProps);
	}

	// LOAD CHART
	loadChart(props) {
		window.setTimeout(function() {
			var $el = $("#viewsChart_" + props.channel.id);

			// get canvas and set width
			var canvas = $el.get(0);
			canvas.width = $el.parent().width();

			// get context object
			var ctx = canvas.getContext("2d");

			// filter out values and dates for labels
			var values = props.channel.viewHist.map((item) => {
				return item.views;
			});

			var labels = props.channel.viewHist.map((item) => {
				var raw = item._id.date + "";
				var d = new Date(
					parseInt(raw.substr(0, 4)),
					parseInt(raw.substr(4, 2)) - 1,
					parseInt(raw.substr(6, 2))
				);
				return d.toLocaleDateString();
			});

			// prepare data
			var data = {
				labels: labels,
				datasets: [
					{
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
			var ch = new Chart(ctx).Line(data, {
				pointHitDetectionRadius: 5
			});
		}, 500);
	}

	// RENDER
	render() {
		return <canvas id={"viewsChart_" + this.props.channel.id} height="100" />;
	}
}

export default ViewsHistoryChart;
