import gql from "graphql-tag";

export const SUBSCRIBER_HISTORY_QUERY = gql`
	query SubscriberHistory($channelId: String!, $days: Int) {
		subscriberHistory(channelId: $channelId, days: $days) {
			date
			subscribers
		}
	}
`;
