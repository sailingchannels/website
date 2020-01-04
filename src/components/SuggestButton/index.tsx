import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { SUGGEST_CHANNEL_MUTATION } from "./gql";

interface SuggestButtonProps {
	channelId: string;
}

function SuggestButton(props: SuggestButtonProps) {
	//#region Hooks

	const [suggested, setSuggested] = useState<boolean>(false);
	const [suggestChannel] = useMutation<boolean>(SUGGEST_CHANNEL_MUTATION);

	//#endregion

	return (
		<button
			className="button is-link"
			disabled={suggested}
			onClick={async () => {
				await suggestChannel({
					variables: {
						channelId: props.channelId
					}
				});

				setSuggested(true);
			}}
		>
			<i className={"fas icon-spacer " + (suggested ? "fa-check" : "fa-plus")}></i>{" "}
			{suggested ? "Thanks!" : "Suggest"}
		</button>
	);
}

export default SuggestButton;
