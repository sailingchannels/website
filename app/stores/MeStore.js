import alt from "../alt";
import MeActions from "../actions/MeActions";

class MeStore {

	constructor() {
		this.bindActions(MeActions);
		this.me = {};
	}

	// GET ME SUCCESS
  	getMeSuccess(result) {
		console.log(result);
		this.me = result;
  	}

	// GET ME FAIL
  	getMeFail(err) {
    	console.error(err);
  	}
}

export default alt.createStore(MeStore);
