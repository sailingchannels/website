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

		window.setTimeout(function() {
			$("input[type='color']").spectrum();
		}, 100);
  	}

	// GET ME FAIL
  	getMeFail(err) {
		this.loading = false;
    	location.href = "/";
  	}
}

export default alt.createStore(MeStore);
