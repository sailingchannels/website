import alt from "../alt";
import AdminActions from "../actions/AdminActions";

class AdminStore {
	constructor() {
		this.bindActions(AdminActions);
		this.blacklisted = [];
		this.additional = [];
		this.flags = [];
		this.loading = false;
		this.suggestions = [];
	}

	// GET BLACKLISTED SUCCESS
	getBlacklistedSuccess(result) {
		this.blacklisted = result;
		this.loading = false;
	}

	// GET BLACKLISTED FAIL
	getBlacklistedFail(err) {
		this.loading = false;
	}

	// GET ADDITIONAL SUCCESS
	getAdditionalSuccess(result) {
		this.additional = result;
		this.loading = false;
	}

	// GET ADDITIONAL FAIL
	getAdditionalFail(err) {
		this.loading = false;
	}

	// GET ADDITIONAL SUCCESS
	addAdditionalSuccess(result) {
		this.additional.push(result);
		this.loading = false;
	}

	// GET ADDITIONAL FAIL
	addAdditionalFail(err) {
		this.loading = false;
	}

	deleteAdditionalSuccess(result) {
		this.additional = this.additional.filter(function(item) {
			return item._id !== result._id;
		});
		this.loading = false;
	}

	deleteAdditionalFail(err) {
		this.loading = false;
	}

	// DELETE BLACKLISTED SUCCESS
	deleteBlacklistedSuccess(result) {
		this.blacklisted = this.blacklisted.filter(function(item) {
			return item._id !== result._id;
		});
		this.loading = false;
	}

	// GET ME FAIL
	deleteBlacklistedFail(err) {
		this.loading = false;
	}

	addBlacklistedSuccess(result) {
		this.blacklisted.push(result);
		this.loading = false;
	}

	addBlacklistedFail(err) {
		this.loading = false;
	}

	getFlagsSuccess(result) {
		this.flags = result;
		this.loading = false;
	}

	getFlagsFail(err) {
		this.loading = false;
	}

	deleteFlagsSuccess(result) {
		this.flags = this.flags.filter(function(item) {
			return item._id.channel !== result._id.channel && item._id.user !== result._id.user;
		});
		this.loading = false;
	}

	deleteFlagsFail(err) {
		this.loading = false;
	}

	// GET SUGGESTIONS SUCCESS
	getSuggestionsSuccess(result) {
		this.suggestions = result;
		this.loading = false;
	}

	// GET SUGGESTIONS FAIL
	getSuggestionsFail(err) {
		this.loading = false;
	}

	deleteSuggestionsSuccess(result) {
		this.suggestions = this.suggestions.filter(function(item) {
			return item._id.channel !== result._id.channel && item._id.user !== result._id.user;
		});
		this.loading = false;
	}

	deleteSuggestionsFail(err) {
		this.loading = false;
	}
}

export default alt.createStore(AdminStore);
