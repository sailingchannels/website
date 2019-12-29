import gql from "graphql-tag";

export const VIDEOS_QUERY = gql`
	query Videos($channelId: ID!, $skip: Int!, $take: Int!) {
		videos(channelId: $channelId, skip: $skip, take: $take) {
			iD
			title
			description
			likes
			dislikes
			views
			publishedAt
		}
	}
`;
