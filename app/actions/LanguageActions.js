import alt from "../alt";
import HTTP from "../helpers/http";

// LANGUAGE ACTIONS
class LanguageActions {

    constructor() {
        this.generateActions(
            "getLanguagesSuccess",
            "getLanguagesFail"
        );
    }

    // GET LANGUAGES
    getLanguages() {

		new HTTP().get({
            "url": "/api/languages",
            "type": "GET",
            "dataType": "json",
            "cache": true,
			"ttl": 86400
        }, (err, data) => {

			if(err) {
				return this.actions.getLanguagesFail(err);
			}

			this.actions.getLanguagesSuccess(data);
		});
    }
}

export default alt.createActions(LanguageActions);
