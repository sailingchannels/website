import gql from "graphql-tag";

export const TOPICS_QUERY = gql`
	query Topics($language: String!) {
		topicsOverview(language: $language) {
			topic {
				iD
				title
				description
			}
			latestChannelTitle
			latestVideoID
		}
	}
`;
