import gql from "graphql-tag";

export const CHANNEL_SUGGESTIONS_QUERY = gql`
	query ChannelSuggestions($channelIds: [String]!, $source: String) {
		channelSuggestions(channelIds: $channelIds, source: $source) {
			channelID
			channel {
				title
				description
				thumbnail
			}
			isSailingChannel
			source
		}
	}
`;
