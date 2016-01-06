import alt from "../alt";
import LanguageActions from "../actions/LanguageActions";

class LanguageStore {

	constructor() {
		this.bindActions(LanguageActions);
		this.languages = [];
		this.selectedLanguage = "en";
	}

	// GET LANGUAGES SUCCESS
  	getLanguagesSuccess(result) {

		this.languages = result.languages;
		this.selectedLanguage = result.selected;
  	}

	// GET LANGUAGES FAIL
  	getLanguagesFail(jqXhr) {

    	// Handle multiple response formats, fallback to HTTP status code number.
    	console.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  	}
}

export default alt.createStore(LanguageStore);
