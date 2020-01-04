import gql from "graphql-tag";

export const CHANNELS_QUERY = gql`
	query Channels($sortBy: String!, $skip: Int!, $take: Int!, $language: String!) {
		channels(sortBy: $sortBy, skip: $skip, take: $take, language: $language) {
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
	}
`;
