import alt from "../alt";
import HTTP from "../helpers/http";

// ADMIN ACTIONS
class AdminActions {
	constructor() {
		this.generateActions(
			"getBlacklistedSuccess",
			"getBlacklistedFail",
			"deleteBlacklistedSuccess",
			"deleteBlacklistedFail",
			"addBlacklistedSuccess",
			"addBlacklistedFail",
			"getAdditionalSuccess",
			"getAdditionalFail",
			"addAdditionalSuccess",
			"addAdditionalFail",
			"deleteAdditionalSuccess",
			"deleteAdditionalFail",
			"getFlagsSuccess",
			"getFlagsFail",
			"deleteFlagsSuccess",
			"deleteFlagsFail",
			"getSuggestionsSuccess",
			"getSuggestionsFail",
			"deleteSuggestionsSuccess",
			"deleteSuggestionsFail"
		);
	}

	// GET CHANNEL
	getBlacklisted() {
		new HTTP().get(
			{
				url: "/api/admin/blacklisted",
				dataType: "json",
				cache: false
			},
			(err, data) => {
				if (err) {
					return this.actions.getBlacklistedFail(err);
				}

				this.actions.getBlacklistedSuccess(data);
			}
		);
	}

	// DELETE BACKLISTED
	deleteBlacklisted(id) {
		new HTTP().get(
			{
				url: "/api/admin/blacklisted/delete/" + id,
				dataType: "json",
				cache: false
			},
			(err, data) => {
				if (err) {
					return this.actions.deleteBlacklistedFail(err);
				}

				this.actions.deleteBlacklistedSuccess(data);
			}
		);
	}

	// ADD BLACKLISTED
	addBlacklisted(id) {
		new HTTP().get(
			{
				url: "/api/admin/blacklisted/add/" + id,
				dataType: "json",
				cache: false
			},
			(err, data) => {
				if (err) {
					return this.actions.addBlacklistedFail(err);
				}

				this.actions.addBlacklistedSuccess(data);
			}
		);
	}

	// GET ADDITIONAL
	getAdditional() {
		new HTTP().get(
			{
				url: "/api/admin/additional",
				dataType: "json",
				cache: false
			},
			(err, data) => {
				if (err) {
					return this.actions.getAdditionalFail(err);
				}

				this.actions.getAdditionalSuccess(data);
			}
		);
	}

	// ADD ADDITIONAL
	addAdditional(id) {
		new HTTP().get(
			{
				url: "/api/admin/additional/add/" + id,
				dataType: "json",
				cache: false
			},
			(err, data) => {
				if (err) {
					return this.actions.addAdditionalFail(err);
				}

				this.actions.addAdditionalSuccess(data);
			}
		);
	}

	// DELETE BACKLISTED
	deleteAdditional(id) {
		new HTTP().get(
			{
				url: "/api/admin/additional/delete/" + id,
				dataType: "json",
				cache: false
			},
			(err, data) => {
				if (err) {
					return this.actions.deleteAdditionalFail(err);
				}

				this.actions.deleteAdditionalSuccess(data);
			}
		);
	}

	// GET FLAGS
	getFlags() {
		new HTTP().get(
			{
				url: "/api/admin/flags",
				dataType: "json",
				cache: false
			},
			(err, data) => {
				if (err) {
					return this.actions.getFlagsFail(err);
				}

				this.actions.getFlagsSuccess(data);
			}
		);
	}

	// DELETE FLAGS
	deleteFlags(channel, user) {
		new HTTP().get(
			{
				url: "/api/admin/flags/delete/" + channel + "/" + user,
				dataType: "json",
				cache: false
			},
			(err, data) => {
				if (err) {
					return this.actions.deleteFlagsFail(err);
				}

				this.actions.deleteFlagsSuccess(data);
			}
		);
	}

	// GET CHANNEL
	getSuggestions() {
		new HTTP().get(
			{
				url: "/api/admin/suggestions",
				dataType: "json",
				cache: false
			},
			(err, data) => {
				if (err) {
					return this.actions.getSuggestionsFail(err);
				}

				this.actions.getSuggestionsSuccess(data);
			}
		);
	}

	// DELETE SUGGESTIONS
	deleteSuggestions(channel, user) {
		new HTTP().get(
			{
				url: "/api/admin/suggestions/delete/" + channel + "/" + user,
				dataType: "json",
				cache: false
			},
			(err, data) => {
				if (err) {
					return this.actions.deleteSuggestionsFail(err);
				}

				this.actions.deleteSuggestionsSuccess(data);
			}
		);
	}
}

export default alt.createActions(AdminActions);
