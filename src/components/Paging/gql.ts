import gql from "graphql-tag";

export const VIDEO_COUNT_QUERY = gql`
	query VideoCount($channelId: ID!) {
		videoCount(channelId: $channelId)
	}
`;
