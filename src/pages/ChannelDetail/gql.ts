import gql from "graphql-tag";

export const CHANNEL_DETAIL_QUERY = gql`
	query Channel($id: ID!) {
		channel(id: $id) {
			iD
			title
			thumbnail
			description
			lastUploadAt
			publishedAt
			views
			subscribers
			videoCount
			customLinks {
				title
				uRL
				icon
			}
		}
	}
`;
