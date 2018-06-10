import React from "react";
import { Line } from "react-chartjs-2";

class HistoryChart extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: null
		};
	}

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
		// filter out values and dates for labels
		var values = props.data.map((item) => {
			return item[props.name];
		});

		var labels = props.data.map((item) => {
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
					backgroundColor: "rgba(151,187,205,0.2)",
					borderColor: "rgba(151,187,205,1)",
					boderWidth: 1,
					pointBackgroundColor: "rgba(151,187,205,1)",
					pointBorderColor: "rgba(151,187,205,1)",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(151,187,205,1)",
					pointBorderWidth: 2,
					data: values
				}
			]
		};

		this.setState({
			data: data
		});
	}

	// RENDER
	render() {
		if (!this.state.data) return null;

		return (
			<Line
				data={this.state.data}
				options={{ scales: { xAxes: [{ display: false }], yAxes: [{ display: false }] } }}
				legend={{ display: false }}
				height={130}
			/>
		);
	}
}

export default HistoryChart;
