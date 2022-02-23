import React from "react";
import { UPLOAD_PREDICTION_QUERY } from "./gql";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";

const MIN_GRADIENT: number = 0.5;

interface UploadPredictionProp {
	channelId: string;
}

interface PublishPredictionResult {
	channelPublishPrediction: PublishPrediction[];
}

interface PublishPrediction {
	hourOfTheDay: number;
	dayOfTheWeek: number;
	publishedVideos: number;
	deviationFromAverage: number;
}

interface Weekstamp {
	weekday: string;
	timeOfDay: string;
	hourOfTheDay: string;
}

function ConvertHourToTimeOfDay(hour: number): string {
	if (hour == 0 || hour < 6) return "Night";
	else if (hour >= 6 && hour < 12) return "Morning";
	else if (hour >= 12 && hour < 13) return "Noon";
	else if (hour >= 13 && hour < 18) return "Afternoon";
	else return "Evening";
}

function ConvertDayOfWeekToName(dayOfTheWeek: number) {
	const weekdayNames: string[] = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	];

	return weekdayNames[dayOfTheWeek % (weekdayNames.length - 1)];
}

function ConvertWeekdayHourToLocal(prediction: PublishPrediction): Weekstamp {
	let predictionMomentUtc = moment().utc();
	predictionMomentUtc.day(prediction.dayOfTheWeek);
	predictionMomentUtc.hour(prediction.hourOfTheDay);
	predictionMomentUtc.minute(0);
	predictionMomentUtc.second(0);

	const predictionMomentLocal = predictionMomentUtc.local();

	return {
		weekday: ConvertDayOfWeekToName(predictionMomentLocal.weekday()),
		timeOfDay: ConvertHourToTimeOfDay(predictionMomentLocal.hour()),
		hourOfTheDay: predictionMomentLocal.format("h a")
	};
}

function UploadPrediction(props: UploadPredictionProp) {
	const { loading, error, data } = useQuery<PublishPredictionResult>(UPLOAD_PREDICTION_QUERY, {
		fetchPolicy: "cache-and-network",
		variables: {
			channelId: props.channelId,
			filterBelowAverage: true,
			minGradient: MIN_GRADIENT
		}
	});

	const noPredictionAvailable =
		loading || error || !data.channelPublishPrediction || data.channelPublishPrediction.length === 0;

	if (noPredictionAvailable) return null;

	const prediction: PublishPrediction = data.channelPublishPrediction[0];

	const weekstamp = ConvertWeekdayHourToLocal(prediction);

	return (
		<div className="top-spacer">
			<i className="far fa-calendar-alt icon-spacer text-success" /> <b>Usually uploads:</b> <br />
			{weekstamp.weekday} {weekstamp.timeOfDay.toLowerCase()}, around {weekstamp.hourOfTheDay}
		</div>
	);
}

export default UploadPrediction;
