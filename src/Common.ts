import { GlobalActions, GlobalState } from "./contexts/GlobalContext";
import { ReducerAction } from "./contexts/Context";

/**
 * Logout from this site by removing the relevant cookie
 */
export function logout() {
	document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	location.href = "/";
}

/**
 * Toggle the sign in modal window open or closed
 * @param globalContext
 * @param open
 */
export function setSignInOpen(
	globalContext: {
		state: GlobalState;
		dispatch?: React.Dispatch<GlobalState & ReducerAction<GlobalActions>>;
	},
	open: boolean
) {
	globalContext.dispatch({
		...globalContext.state,
		type: GlobalActions.SET_SIGNIN_MODAL_OPEN,
		signInModalOpen: open
	});
}
