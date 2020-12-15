import gql from "graphql-tag";

export const UPLOAD_PREDICTION_QUERY = gql`
	query PublishSchedulePrediction($channelId: ID!, $filterBelowAverage: Boolean, $minGradient: Float) {
		channelPublishPrediction(channelId: $channelId, filterBelowAverage: $filterBelowAverage, minGradient: $minGradient) {
			hourOfTheDay, 
			dayOfTheWeek, 
			publishedVideos, 
			deviationFromAverage
		}
	}
`;
