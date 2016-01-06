import alt from "../alt";

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

        $.ajax({
            "url": "/api/languages",
            "type": "GET",
            "dataType": "json",
            "cache": true
        })
        .done((data) => {
            this.actions.getLanguagesSuccess(data);
        })
        .fail((jqXhr) => {
            this.actions.getLanguagesFail(jqXhr);
        });
    }
}

export default alt.createActions(LanguageActions);
