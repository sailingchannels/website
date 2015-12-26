import alt from "../alt";
import ChannelActions from "../actions/ChannelActions";

class ChannelStore {

	constructor() {
		this.bindActions(ChannelActions);
		this.channels = [];
	}

	// GET CHANNELS SUCCESS
  	getChannelsSuccess(data) {
    	this.channels = data;
  	}

	// GET CHANNELS FAIL
  	getChannelsFail(jqXhr) {
    	// Handle multiple response formats, fallback to HTTP status code number.
    	console.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  	}
}

export default alt.createStore(ChannelStore);
