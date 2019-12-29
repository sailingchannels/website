import React, { useContext } from "react";
import GlobalContext from "../../contexts/GlobalContext";

interface SubscribeButtonProps {
	channelId: string;
}

function SubscribeButton(props: SubscribeButtonProps) {
	//#region Hooks

	const globalContext = useContext(GlobalContext.Context);

	//#endregion

	const isSubscribedTo = globalContext.state.subscriptions.indexOf(props.channelId) >= 0;
	if (isSubscribedTo) {
		return (
			<button className="button is-light">
				<i className="fab fa-youtube subscribe-icon" /> Unsubscribe
			</button>
		);
	} else {
		return (
			<button className="button is-danger">
				<i className="fab fa-youtube subscribe-icon" /> Subscribe
			</button>
		);
	}
}

export default SubscribeButton;
