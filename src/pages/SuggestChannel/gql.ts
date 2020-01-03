import gql from "graphql-tag";

export const IDENTIFY_CHANNELS_QUERY = gql`
	query IdentifyChannels($channelUrlHints: [String]!) {
		identifyChannels(channelUrlHints: $channelUrlHints) {
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
