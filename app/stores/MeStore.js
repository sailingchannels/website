import alt from "../alt";
import MeActions from "../actions/MeActions";
import Modernizr from "modernizr";

class MeStore {
	constructor() {
		this.bindActions(MeActions);
		this.me = {};
		this.loading = false;
		this.subscriptions = [];
	}

	// GET ME SUCCESS
	getMeSuccess(result) {
		this.me = result;
		this.loading = false;

		window.setTimeout(function() {
			if (!Modernizr.inputtypes.color) {
				$("input[type='color']").spectrum({
					preferredFormat: "hex"
				});
			}
		}, 100);
	}

	// GET ME FAIL
	getMeFail(err) {
		this.loading = false;
		location.href = "/";
	}

	// GET SUBSCRIPTIONS SUCCESS
	getSubscriptionsSuccess(result) {
		this.subscriptions = result;
	}

	// GET SUBSCRIPTIONS FAIL
	getSubscriptionsFail(err) {
		console.error(err);
	}
}

export default alt.createStore(MeStore);
