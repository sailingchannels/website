import gql from "graphql-tag";

export const SEARCH_RESULTS_QUERY = gql`
	query SearchResults($query: String!) {
		searchResults(query: $query) {
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
					iD
					title
				}
			}
		}
	}
`;
