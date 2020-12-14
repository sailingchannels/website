import gql from "graphql-tag";

export const UPLOAD_PREDICTION_QUERY = gql`
	query PublishSchedulePrediction($channelId: ID!, $filterBelowAverage: Boolean) {
		channelPublishPrediction(channelId: $channelId, filterBelowAverage: $filterBelowAverage) {
			hourOfTheDay, 
			dayOfTheWeek, 
			publishedVideos, 
			deviationFromAverage
		}
	}
`;
