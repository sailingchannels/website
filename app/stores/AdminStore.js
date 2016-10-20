import alt from "../alt";
import AdminActions from "../actions/AdminActions";

class AdminStore {

	constructor() {
		this.bindActions(AdminActions);
		this.blacklisted = [];
		this.loading = false;
	}

	// GET ME SUCCESS
  	getBlacklistedSuccess(result) {
		this.blacklisted = result;
		this.loading = false;
  	}

	// GET ME FAIL
  	getBlacklistedFail(err) {
		this.loading = false;
  	}
}

export default alt.createStore(AdminStore);
