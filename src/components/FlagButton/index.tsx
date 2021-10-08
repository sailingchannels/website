import React, { useContext } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { FLAG_EXISTS_QUERY, FLAG_CHANNEL_MUTATION } from "./gql";
import GlobalContext from "../../contexts/GlobalContext";
import { setSignInOpen } from "../../Common";
import useGoogleAnalyticsEvent from "../../hooks/useGoogleAnalyticsEvent";

interface FlagButtonProps {
	channelId: string;
}

function FlagButton(props: FlagButtonProps) {
	const globalContext = useContext(GlobalContext.Context);
	const trackGAEvent = useGoogleAnalyticsEvent();

	const { data, refetch } = useQuery(FLAG_EXISTS_QUERY, {
		fetchPolicy: "cache-and-network",
		variables: {
			channelId: props.channelId
		},
		skip: !globalContext.state.loggedIn // only trigger query if user is considered logged in
	});

	const [flagChannel] = useMutation(FLAG_CHANNEL_MUTATION);

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
				if (globalContext.state.loggedIn) {
					// flag this channel
					await flagChannel({
						variables: {
							channelId: props.channelId
						}
					});

					trackGAEvent("User", "Flag channel", "LoggedIn");

					// fetch flagging data again
					await refetch();
				} else {
					setSignInOpen(globalContext, true);
					trackGAEvent("User", "Flag channel", "LoggedOut");
				}
			}}
		>
			<i className="fas fa-flag" /> Flag as not sailing related
		</a>
	);
}

export default FlagButton;
