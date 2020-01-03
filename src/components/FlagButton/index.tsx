import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { FLAG_EXISTS_QUERY, FLAG_CHANNEL_MUTATION } from "./gql";

interface FlagButtonProps {
	channelId: string;
}

function FlagButton(props: FlagButtonProps) {
	//#region Hooks

	// check if flag was set
	const { data, refetch } = useQuery(FLAG_EXISTS_QUERY, {
		fetchPolicy: "cache-and-network",
		variables: {
			channelId: props.channelId
		}
	});

	const [flagChannel] = useMutation(FLAG_CHANNEL_MUTATION);

	//#endregion

	const flagged = data && data.flagExists;
	if (flagged) {
		return (
			<div>
				<i className="fas fa-check has-text-success" /> Flagged as not sailing-related
			</div>
		);
	}

	return (
		<a
			onClick={async () => {
				// flag this channel
				await flagChannel({
					variables: {
						channelId: props.channelId
					}
				});

				// fetch flagging data again
				await refetch();
			}}
		>
			<i className="fas fa-flag" /> Flag as not sailing related
		</a>
	);
}

export default FlagButton;
