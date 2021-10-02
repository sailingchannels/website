import React from "react";
import { Link } from "react-router-dom";
import ChannelIdentification from "../../entities/ChannelIdentification";
import LoadingIndicator from "../LoadingIndicator";
import ChannelSuggestList from "../ChannelSuggestList";
import ChannelIdentificationStatus from "../../entities/ChannelIdentificationStatus";
import { useLazyQuery } from "@apollo/react-hooks";
import { IDENTIFY_CHANNELS_QUERY } from "./gql";

interface IdentifyChannelsQueryResult {
	identifyChannel: ChannelIdentification;
}

function ChannelIdentificationResult(props) {
	const [getIdentified, { loading, error, data }] = useLazyQuery<IdentifyChannelsQueryResult>(
		IDENTIFY_CHANNELS_QUERY,
		{
			fetchPolicy: "cache-first"
		}
	);

	function identifyKeyUp(e) {
		getIdentified({
			variables: {
				channelUrlHint: e.target.value
			}
		});
	}

	let result = null;

	if (loading) {
		result = <LoadingIndicator />;
	} else {
		if (data) {
			const status = ChannelIdentificationStatus[data.identifyChannel.status];

			switch (status) {
				case ChannelIdentificationStatus.NotValid:
					result = (
						<p className="has-text-danger is-centered top-spacer">
							This does not seem like a valid YouTube channel!
						</p>
					);
					break;

				case ChannelIdentificationStatus.AlreadyListed:
					result = (
						<p className="is-centered top-spacer">
							This channel is already listed,{" "}
							<Link to={"/channel/" + data.identifyChannel.channelID}>check it out here!</Link>
						</p>
					);
					break;

				case ChannelIdentificationStatus.AlreadySuggested:
					result = (
						<>
							<p className="is-centered top-spacer">
								Thanks! Somebody already suggested this channel.
								<br />
								It is currently under review and might be added to the list very soon!
							</p>
						</>
					);
					break;

				case ChannelIdentificationStatus.Novel:
					result = (
						<div className="top-spacer">
							<ChannelSuggestList channels={[data.identifyChannel]} />
						</div>
					);
					break;
			}
		}
	}

	return (
		<>
			<p className="top-spacer">
				<input
					className="input"
					type="text"
					placeholder="https://youtube.com/channel/..."
					onKeyUp={identifyKeyUp}
				/>
			</p>
			{result}
		</>
	);
}

export default ChannelIdentificationResult;
