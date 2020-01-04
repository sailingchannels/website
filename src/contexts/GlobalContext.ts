import { buildContext, ReducerAction } from "./Context";

export interface GlobalState {
	subscriptions: string[];
	loggedIn: boolean;
	signInModalOpen: boolean;
}

export enum GlobalActions {
	SET_SUBSCRIPTIONS,
	SET_LOGGED_IN,
	SET_SIGNIN_MODAL_OPEN
}

const initialState: GlobalState = {
	subscriptions: [],
	loggedIn: false,
	signInModalOpen: false
};

// reducer actions to mutate state
function reducer(state: GlobalState, action: GlobalState & ReducerAction<GlobalActions>): GlobalState {
	switch (action.type) {
		case GlobalActions.SET_SUBSCRIPTIONS:
			return {
				...state,
				subscriptions: action.subscriptions
			};

		case GlobalActions.SET_LOGGED_IN:
			return {
				...state,
				loggedIn: action.loggedIn
			};

		case GlobalActions.SET_SIGNIN_MODAL_OPEN:
			return {
				...state,
				signInModalOpen: action.signInModalOpen
			};
	}
}

export default buildContext<GlobalState, GlobalActions>(initialState, reducer);
