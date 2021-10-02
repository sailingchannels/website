import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { SUGGEST_CHANNEL_MUTATION } from "./gql";
import classNames from "classnames";

interface SuggestButtonProps {
	channelId: string;
}

function SuggestButton(props: SuggestButtonProps) {
	const [suggested, setSuggested] = useState<boolean>(false);
	const [suggestChannel] = useMutation<boolean>(SUGGEST_CHANNEL_MUTATION);

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
			<i
				className={classNames({
					fas: true,
					"icon-spacer": true,
					"fa-check": suggested,
					"fa-plus": !suggested
				})}
			></i>{" "}
			{suggested ? "Thanks!" : "Suggest"}
		</button>
	);
}

export default SuggestButton;
