import alt from "../alt";
import ChannelActions from "../actions/ChannelActions";

class ChannelStore {

	constructor() {
		this.bindActions(ChannelActions);
		this.channels = [];
		this.loading = false;
		this.skip = 0;
		this.take = 25;
		this.searching = false;
		this.sortBy = "subscribers";

		this.channel = null;
	}

	// GET CHANNELS SUCCESS
  	getChannelsSuccess(result) {

		// add new data
		if(result.skip > 0) {
	    	this.channels = this.channels.concat(result.data);
		}
		else {
			this.channels = result.data;
		}

		this.skip = result.skip;
		this.take = result.take;
		this.loading = false;
		this.searching = false;
  	}

	// GET CHANNEL SUCCESS
	getChannelSuccess(result) {
		this.channel = result;
		this.searching = false;
	}

	// GET CHANNEL FAIL
  	getChannelFail(jqXhr) {

		this.searching = false;

    	// Handle multiple response formats, fallback to HTTP status code number.
    	console.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  	}

	// GET CHANNELS FAIL
  	getChannelsFail(jqXhr) {

		this.loading = false;

    	// Handle multiple response formats, fallback to HTTP status code number.
    	console.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  	}

	// SEARCH CHANNELS SUCCESS
  	searchChannelsSuccess(result) {

	    this.channels = result.data;
		this.searching = true;
		this.loading = false;
  	}

	// SEARCH CHANNELS FAIL
  	searchChannelsFail(jqXhr) {

		this.loading = false;
		this.searching = true;

    	// Handle multiple response formats, fallback to HTTP status code number.
    	console.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  	}
}

export default alt.createStore(ChannelStore);
