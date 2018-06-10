import alt from "../alt";
import MeActions from "../actions/MeActions";
import $ from "jquery";

const isInputColorSupported = () => {
	var i = document.createElement("input");
	i.setAttribute("type", "color");
	return i.type !== "text";
};

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
			if (!isInputColorSupported()) {
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
