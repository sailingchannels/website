import gql from "graphql-tag";

export const IDENTIFY_CHANNELS_QUERY = gql`
	query IdentifyChannel($channelUrlHint: String!) {
		identifyChannel(channelUrlHint: $channelUrlHint) {
			channelID
			channel {
				title
				description
				thumbnail
			}
			isSailingChannel
			source
			status
		}
	}
`;
