import { buildContext, ReducerAction } from "./Context";

export interface GlobalState {
	pageTitle: string;
}

export enum GlobalActions {
	SET_PAGE_TITLE,
	INIT
}

const initialState: GlobalState = {
	pageTitle: ""
};

// reducer actions to mutate state
function reducer(state: GlobalState, action: GlobalState & ReducerAction<GlobalActions>): GlobalState {
	switch (action.type) {
		case GlobalActions.INIT:
			return {
				...state,
				pageTitle: action.pageTitle
			};

		case GlobalActions.SET_PAGE_TITLE:
			return {
				...state,
				pageTitle: action.pageTitle
			};
	}
}

export default buildContext<GlobalState, GlobalActions>(initialState, reducer);
