import gql from "graphql-tag";

export const SUGGEST_CHANNEL_MUTATION = gql`
	mutation SuggestChannel($channelId: String!) {
		suggestChannel(channelId: $channelId)
	}
`;
