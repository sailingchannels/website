import gql from "graphql-tag";

export const FLAG_EXISTS_QUERY = gql`
	query FlagExists($channelId: String!) {
		flagExists(channelId: $channelId)
	}
`;

export const FLAG_CHANNEL_MUTATION = gql`
	mutation FlagChannel($channelId: String!) {
		flagChannel(channelId: $channelId)
	}
`;
