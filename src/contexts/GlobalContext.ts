import { buildContext, ReducerAction } from "./Context";

export interface GlobalState {
	subscriptions: string[];
}

export enum GlobalActions {
	SET_SUBSCRIPTIONS
}

const initialState: GlobalState = {
	subscriptions: []
};

// reducer actions to mutate state
function reducer(state: GlobalState, action: GlobalState & ReducerAction<GlobalActions>): GlobalState {
	switch (action.type) {
		case GlobalActions.SET_SUBSCRIPTIONS:
			return {
				...state,
				subscriptions: action.subscriptions
			};
	}
}

export default buildContext<GlobalState, GlobalActions>(initialState, reducer);
