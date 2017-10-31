import alt from "../alt";
import HTTP from "../helpers/http";

// LANGUAGE ACTIONS
class MeActions {
	constructor() {
		this.generateActions(
			"getMeSuccess",
			"getMeFail",
			"getSubscriptionsSuccess",
			"getSubscriptionsFail"
		);
	}

	// GET ME
	getMe() {
		new HTTP().get(
			{
				url: "/api/me",
				type: "GET",
				dataType: "json",
				cache: false
			},
			(err, data) => {
				if (err) {
					return this.actions.getMeFail(err);
				}

				this.actions.getMeSuccess(data);
			}
		);
	}

	// GET SUBSCRIPTIONS
	getSubscriptions() {
		new HTTP().get(
			{
				url: "/api/me/subscriptions",
				type: "GET",
				dataType: "json",
				cache: false
			},
			(err, data) => {
				if (err) {
					return this.actions.getSubscriptionsFail(err);
				}

				this.actions.getSubscriptionsSuccess(data);
			}
		);
	}
}

export default alt.createActions(MeActions);
