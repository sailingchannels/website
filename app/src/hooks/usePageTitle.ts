import * as React from "react";
import { useEffect, useContext } from "react";
import GlobalContext, { GlobalActions } from "../contexts/GlobalContext";

/**
 * Set's the page title to the HTML head title tag and the TraceMate topbar
 * @param i18npageTitleKey The i18n pageTitle key to use
 */
export default function usePageTitle(pageTitle: string) {
	const globalContext = useContext(GlobalContext.Context);

	useEffect(
		() => {
			// set the title for this page to the global context
			globalContext.dispatch({
				...globalContext.state,
				type: GlobalActions.SET_PAGE_TITLE,
				pageTitle: pageTitle
			});
		},
		[pageTitle]
	);
}
