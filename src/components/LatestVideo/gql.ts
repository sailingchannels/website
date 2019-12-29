import gql from "graphql-tag";

export const LATEST_VIDEO_QUERY = gql`
	query LatestVideo($channelId: ID!) {
		latestVideo(channelId: $channelId) {
			iD
		}
	}
`;
