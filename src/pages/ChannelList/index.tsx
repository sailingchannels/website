import React, { useState, useEffect } from "react";
import Channel from "../../entities/Channel";
import { useQuery } from "@apollo/react-hooks";
import { CHANNELS_QUERY } from "./gql";
import ChannelListItem from "../../components/ChannelListItem";
import LoadingIndicator from "../../components/LoadingIndicator";
import { LANGUAGE_SETTING_KEY, DEFAULT_LANGUAGE } from "../../Constants";
import { useLocalStorage } from "@rehooks/local-storage";
import { Helmet } from "react-helmet";
import { v4 as uuid } from "uuid";

const capitalize = (s) => {
	if (typeof s !== "string") return "";
	return s.charAt(0).toUpperCase() + s.slice(1);
};

const TAKE: number = 8;

interface ChannelListResult {
	channels: Channel[];
}

export default function ChannelList(props: any) {
	const sortByRaw: string = props.match.params.sortBy || "upload";
	const sortBy: string = capitalize(sortByRaw);

	//#region Hooks

	const [loadingMore, setLoadingMore] = useState<boolean>(false);
	const [selectedLanguage] = useLocalStorage<string>(LANGUAGE_SETTING_KEY);

	// load channels via graphql
	const { loading, error, data, fetchMore, client } = useQuery<ChannelListResult>(CHANNELS_QUERY, {
		fetchPolicy: "network-only",
		variables: {
			sortBy: sortBy,
			skip: 0,
			take: TAKE,
			language: selectedLanguage || DEFAULT_LANGUAGE
		}
	});

	//#endregion

	if (loading || !data) return <LoadingIndicator />;

	return (
		<>
			<Helmet>
				<title>Sailing-Channels</title>
			</Helmet>

			<section className="hero channels-hero">
				<div className="hero-body">
					<h1 className="title">Sailing Channels</h1>
					<h2 className="subtitle">
						sorted by <strong>{sortByRaw}</strong>
					</h2>
				</div>
			</section>

			{data.channels.map((channel: Channel) => {
				return <ChannelListItem key={uuid()} channel={channel} client={client} />;
			})}

			<nav className="level" style={{ marginTop: "25px" }}>
				<div className="level-item has-text-centered">
					<button
						className={"button is-medium is-rounded " + (loadingMore ? "is-loading" : null)}
						disabled={loadingMore}
						onClick={() => {
							setLoadingMore(true);
							fetchMore({
								variables: {
									skip: data.channels.length
								},
								updateQuery: (prev: ChannelListResult, { fetchMoreResult }) => {
									if (!fetchMoreResult) return prev;

									setLoadingMore(false);

									return Object.assign({}, prev, {
										channels: [...prev.channels, ...fetchMoreResult.channels]
									});
								}
							});
						}}
					>
						<i className="fas fa-arrow-circle-down icon-spacer"></i> Load more channels
					</button>
				</div>
			</nav>
		</>
	);
}
