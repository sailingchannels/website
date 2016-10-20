import alt from "../alt";
import HTTP from "../helpers/http";

// ADMIN ACTIONS
class AdminActions {

    constructor() {
        this.generateActions(
            "getBlacklistedSuccess",
			"getBlacklistedFail"
        );
    }

    // GET CHANNEL
    getBlacklisted() {

		new HTTP().get({
            "url": "/api/admin/blacklisted",
            "type": "GET",
            "dataType": "json",
            "cache": false
        }, (err, data) => {

			if(err) {
				return this.actions.getBlacklistedFail(err);
			}

			this.actions.getBlacklistedSuccess(data);
		});
    }
}

export default alt.createActions(AdminActions);
