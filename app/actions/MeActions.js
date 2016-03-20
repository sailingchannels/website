import alt from "../alt";
import HTTP from "../helpers/http";

// LANGUAGE ACTIONS
class MeActions {

    constructor() {
        this.generateActions(
            "getMeSuccess",
            "getMeFail"
        );
    }

    // GET ME
    getMe() {

		new HTTP().get({
            "url": "/api/me",
            "type": "GET",
            "dataType": "json",
            "cache": false
        }, (err, data) => {

			if(err) {
				return this.actions.getMeFail(err);
			}

			this.actions.getMeSuccess(data);
		});
    }
}

export default alt.createActions(MeActions);
