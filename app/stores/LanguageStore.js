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
  	getLanguagesFail(err) {
    	console.error(err);
  	}
}

export default alt.createStore(LanguageStore);
