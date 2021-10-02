import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { SUBSCRIBER_HISTORY_QUERY } from "./gql";
import HistoryChart from "../HistoryChart";
import Subscriber from "../../entities/Subscriber";

interface SubscriberHistoryChartProps {
	channelId: string;
	days?: number;
}

interface SubscribersResult {
	subscriberHistory: Subscriber[];
}

function SubscriberHistoryChart(props: SubscriberHistoryChartProps) {
	const { loading, error, data } = useQuery<SubscribersResult>(SUBSCRIBER_HISTORY_QUERY, {
		fetchPolicy: "cache-first",
		variables: {
			channelId: props.channelId,
			days: props.days
		}
	});

	if (loading || !data) return null;

	// show historic chart
	return (
		<div className="bottom-spacer">
			<p style={{ marginBottom: "10px" }}>
				<strong>Subscribers in last 7 days:</strong>
			</p>
			<HistoryChart
				values={data?.subscriberHistory.map((s) => s.subscribers)}
				labels={data?.subscriberHistory.map((s) => {
					var raw = s.date + "";
					var d = new Date(
						parseInt(raw.substr(0, 4)),
						parseInt(raw.substr(4, 2)) - 1,
						parseInt(raw.substr(6, 2))
					);

					return d.toLocaleDateString();
				})}
			/>
		</div>
	);
}

export default SubscriberHistoryChart;
