import React from "react";
import { Line } from "react-chartjs-2";

interface HistoryChartProps {
	values: number[];
	labels: string[];
}

function HistoryChart(props: HistoryChartProps) {
	// prepare data
	var data = {
		labels: props.labels,
		datasets: [
			{
				backgroundColor: "rgba(151,187,205,0.2)",
				borderColor: "rgba(151,187,205,1)",
				borderWidth: 3,
				pointBackgroundColor: "rgba(151,187,205,1)",
				pointBorderColor: "rgba(151,187,205,1)",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(151,187,205,1)",
				pointBorderWidth: 2,
				data: props.values
			}
		]
	};

	const minValue: number = Math.min(...props.values);
	const maxValue: number = Math.max(...props.values);
	const steps = Math.ceil(Math.abs((maxValue - minValue) / 4));

	let adjust: number = 100;
	const average = (minValue + maxValue) / 2;
	if (average > 1000) {
		adjust = 100;
	} else if (average > 100000) {
		adjust = 10000;
	} else {
		adjust = 5;
	}

	return (
		<Line
			data={data}
			options={{
				scales: {
					xAxes: [{ display: false }],
					yAxes: [
						{
							ticks: {
								beginAtZero: false,
								min: minValue - adjust,
								max: maxValue + adjust,
								stepSize: steps
							}
						}
					]
				}
			}}
			legend={{ display: false }}
			height={130}
		/>
	);
}

export default HistoryChart;
