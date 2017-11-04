import alt from "../alt";
import ChannelActions from "../actions/ChannelActions";

class ChannelStore {
	constructor() {
		this.bindActions(ChannelActions);
		this.channels = [];
		this.results = [];
		this.loading = false;
		this.skip = 0;
		this.take = 25;
		this.sortBy = "subscribers";

		this.channel = null;
	}

	// GET CHANNELS SUCCESS
	getChannelsSuccess(result) {
		// add new data
		if (result.skip > 0) {
			this.channels = this.channels.concat(result.data);
		} else {
			this.channels = result.data;
		}

		this.skip = result.skip;
		this.take = result.take;
		this.loading = false;
	}

	// GET CHANNEL SUCCESS
	getChannelSuccess(result) {
		this.channel = result;

		if (!result) {
			location.href = "/404";
		}
	}

	// GET CHANNEL FAIL
	getChannelFail(err) {
		// Handle multiple response formats, fallback to HTTP status code number.
		location.href = "/404";
	}

	// GET CHANNELS FAIL
	getChannelsFail(err) {
		this.loading = false;

		// Handle multiple response formats, fallback to HTTP status code number.
		console.error(err);
	}

	// SEARCH CHANNELS SUCCESS
	searchChannelsSuccess(result) {
		this.results = result;
		this.loading = false;
	}

	// SEARCH CHANNELS FAIL
	searchChannelsFail(err) {
		this.loading = false;

		// Handle multiple response formats, fallback to HTTP status code number.
		console.error(err);
	}
}

export default alt.createStore(ChannelStore);
