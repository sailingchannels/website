import React from "react";
import { EventArgs } from "react-ga";

import GA from "../GoogleAnalytics";

export default function useGoogleAnalyticsEvent() {
	React.useEffect(() => {
		GA.init();
	}, []);

	return (category: string, action: string, label?: string) => {
		GA.sendEvent({
			category,
			action,
			label
		});
	};
}
