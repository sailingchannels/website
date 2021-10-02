import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import Hero from "../../components/Hero";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import ChannelIdentification from "../../entities/ChannelIdentification";
import GlobalContext from "../../contexts/GlobalContext";
import { CHANNEL_SUGGESTIONS_QUERY } from "./gql";
import LoadingIndicator from "../../components/LoadingIndicator";
import SuggestChannelSubscriptions from "../../components/SuggestChannelSubscriptions";
import ChannelIdentificationResult from "../../components/ChannelIdentification";

interface YouTubeDetailsQueryResult {
	channelSuggestions: ChannelIdentification[];
}

function SuggestChannel(props) {
	const globalContext = useContext(GlobalContext.Context);

	const { loading, error, data } = useQuery<YouTubeDetailsQueryResult>(CHANNEL_SUGGESTIONS_QUERY, {
		fetchPolicy: "cache-and-network",
		variables: {
			channelIds: globalContext.state.subscriptions,
			source: "yt"
		},
		skip: globalContext.state.subscriptions?.length === 0
	});

	return (
		<>
			<Helmet>
				<title>Suggest a channel | Sailing Channels</title>
			</Helmet>

			<Hero
				title="Suggest a channel"
				subtitle="Contribute by suggesting not-yet listed channels"
			></Hero>

			<p>
				There are currently 1219 channels and 120881 videos listed in this site, but we probably
				missed one or another interesting sailing YouTube channel!
			</p>
			<p className="top-spacer">
				Know of any sailing channels that are not listed here? Well, that's brilliant! You can use the
				form below to check and suggest a channel for the list:
			</p>

			<ChannelIdentificationResult />

			{loading && !data ? <LoadingIndicator /> : null}

			{data?.channelSuggestions?.length > 0 && (
				<SuggestChannelSubscriptions channelSuggestions={data.channelSuggestions} />
			)}
		</>
	);
}

export default SuggestChannel;
