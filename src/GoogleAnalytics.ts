import ReactGA, { EventArgs } from "react-ga";
import { GOOGLE_ANALYTICS_TRACKING_ID } from "./Constants";

function init(): void {
	const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === "development";
	ReactGA.initialize(GOOGLE_ANALYTICS_TRACKING_ID, { debug: isDev });
}

function sendEvent(payload: EventArgs): void {
	ReactGA.event(payload);
}

function sendPageview(path: string): void {
	ReactGA.set({ page: path });
	ReactGA.pageview(path);
}

export default {
	init,
	sendEvent,
	sendPageview
};
