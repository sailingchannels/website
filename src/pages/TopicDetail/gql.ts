import gql from "graphql-tag";

export const TOPIC_DETAIL_QUERY = gql`
	query TopicDetail($topicId: String!) {
		topicDetail(topicId: $topicId) {
			topic {
				iD
				title
				description
			}
			channels {
				iD
				title
				thumbnail
				description
				lastUploadAt
				publishedAt
				views
				subscribers
				videoCount
			}
			videos {
				iD
				title
				description
				views
				publishedAt
				channel {
					title
				}
			}
		}
	}
`;
