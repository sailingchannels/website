import { GlobalActions, GlobalState } from "./contexts/GlobalContext";
import { ReducerAction } from "./contexts/Context";

export function logout() {
	document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	location.href = "/";
}

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
