import alt from "../alt";
import MeActions from "../actions/MeActions";

class MeStore {

	constructor() {
		this.bindActions(MeActions);
		this.me = {};
		this.loading = false;
	}

	// GET ME SUCCESS
  	getMeSuccess(result) {
		this.me = result;
		this.loading = false;
  	}

	// GET ME FAIL
  	getMeFail(err) {
		this.loading = false;
    	console.error(err);
  	}
}

export default alt.createStore(MeStore);
