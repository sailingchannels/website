import * as React from "react";
import usePageTitle from "../../hooks/usePageTitle";
import Channel from "../../entities/Channel";
import { useQuery } from "@apollo/react-hooks";
import { CHANNELS_QUERY } from "./gql";
import ChannelListItem from "../../components/ChannelListItem";

export default function ChannelList() {
	//#region Hooks

	// set the title of the page
	usePageTitle("Sailing-Channels");

	// load main menu items via graphql
	const { loading, error, data } = useQuery(CHANNELS_QUERY, {
		fetchPolicy: "network-only",
		variables: {
			sortBy: "Upload",
			skip: 0,
			take: 8,
			language: "en"
		}
	});

	//#endregion

	if (loading) return <em>Loading</em>;

	return data.channels.map((channel) => {
		return <ChannelListItem channel={channel} />;
	});
}
