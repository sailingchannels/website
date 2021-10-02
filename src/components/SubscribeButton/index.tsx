import React, { useContext, useEffect } from "react";
import GlobalContext, { GlobalActions } from "../../contexts/GlobalContext";
import { IdentityService } from "../../ServiceUrls";
import useAxios from "axios-hooks";
import { setSignInOpen } from "../../Common";

interface SubscribeButtonProps {
	channelId: string;
}

interface SubscriptionResponse {
	success: boolean;
	error?: any;
}

function SubscribeButton(props: SubscribeButtonProps) {
	const globalContext = useContext(GlobalContext.Context);

	const [{ data: dataSubscribe, loading: loadingSubscribe }, executeSubscribe] =
		useAxios<SubscriptionResponse>(
			{
				url: `${IdentityService()}/api/channel/subscribe`,
				method: "POST",
				data: {
					channel: props.channelId
				}
			},
			{
				manual: true,
				useCache: false
			}
		);

	useEffect(() => {
		// we successfully unsubscribed
		if (dataSubscribe && dataSubscribe.success === true) {
			// remove the channel ID from global context
			let subscribedTo = globalContext.state.subscriptions;
			subscribedTo.push(props.channelId);

			globalContext.dispatch({
				...globalContext.state,
				type: GlobalActions.SET_SUBSCRIPTIONS,
				subscriptions: subscribedTo
			});
		}
	}, [dataSubscribe]);

	// hook to send POST request to UNSUBSCRIBE from a channel
	const [{ data: dataUnsubscribe, loading: loadingUnsubscribe }, executeUnsubscribe] =
		useAxios<SubscriptionResponse>(
			{
				url: `${IdentityService()}/api/channel/unsubscribe`,
				method: "POST",
				data: {
					channel: props.channelId
				}
			},
			{
				manual: true,
				useCache: false
			}
		);

	useEffect(() => {
		// we successfully unsubscribed
		if (dataUnsubscribe && dataUnsubscribe.success === true) {
			// remove the channel ID from global context
			const subscribedTo = globalContext.state.subscriptions.filter((subscription: string) => {
				return subscription !== props.channelId;
			});

			globalContext.dispatch({
				...globalContext.state,
				type: GlobalActions.SET_SUBSCRIPTIONS,
				subscriptions: subscribedTo
			});
		}
	}, [dataUnsubscribe]);

	const isSubscribedTo = globalContext.state.subscriptions.indexOf(props.channelId) >= 0;

	if (isSubscribedTo) {
		let unsubscribeClassName = "button is-light";
		if (loadingUnsubscribe) {
			unsubscribeClassName += " is-loading";
		}

		return (
			<button
				className={unsubscribeClassName}
				disabled={loadingUnsubscribe}
				onClick={() => {
					executeUnsubscribe();
				}}
			>
				<i className="fab fa-youtube icon-spacer" /> Unsubscribe
			</button>
		);
	} else {
		let subscribeClassName = "button is-danger is-fullwidth";
		if (loadingSubscribe) {
			subscribeClassName += " is-loading";
		}

		return (
			<button
				className={subscribeClassName}
				disabled={loadingSubscribe}
				onClick={() => {
					// are we logged in?
					if (globalContext.state.loggedIn) {
						executeSubscribe();
					} else {
						setSignInOpen(globalContext, true);
					}
				}}
			>
				<i className="fab fa-youtube icon-spacer" /> Subscribe
			</button>
		);
	}
}

export default SubscribeButton;
