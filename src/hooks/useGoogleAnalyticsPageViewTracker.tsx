import React from "react";
import { useLocation } from "react-router-dom";

import GA from "../GoogleAnalytics";

export default function useGoogleAnalyticsPageViewTracker() {
	const location = useLocation();

	React.useEffect(() => {
		GA.init();
	}, []);

	React.useEffect(() => {
		const currentPath = location.pathname + location.search;
		console.log(currentPath);
		GA.sendPageview(currentPath);
	}, [location]);
}
