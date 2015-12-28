import alt from "../alt";
import ChannelActions from "../actions/ChannelActions";

class ChannelStore {

	constructor() {
		this.bindActions(ChannelActions);
		this.channels = [];
		this.all = [];
		this.firstLoad = true;
	}

	// GET CHANNELS SUCCESS
  	getChannelsSuccess(data) {

		// filter out channels that have nothing to do
		// with sailing or no videos listed yet
		var filtered = data.filter(item => {
			return item.videos > 0 &&
				   (item.description.toLowerCase().indexOf("sail") >= 0 ||
					item.title.toLowerCase().indexOf("sail") >= 0);
		});

		// sort channels by subscribers
		filtered.sort(function(a, b) {
			return b.subscribers - a.subscribers;
		});

    	this.channels = filtered;
		this.all = filtered;
		this.firstLoad = false;
  	}

	// GET CHANNELS FAIL
  	getChannelsFail(jqXhr) {
    	// Handle multiple response formats, fallback to HTTP status code number.
    	console.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  	}
}

export default alt.createStore(ChannelStore);
