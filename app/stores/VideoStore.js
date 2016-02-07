import alt from "../alt";
import VideoActions from "../actions/VideoActions";

class VideoStore {

	constructor() {
		this.bindActions(VideoActions);
		this.videos = [];
		this.skip = 0;
		this.take = 5;
	}

	// GET VIDEOS SUCCESS
  	getVideosSuccess(result) {

		this.videos = result.data;
		this.skip = result.skip;
		this.take = result.take;
  	}

	// GET VIDEOS FAIL
  	getVideosFail(jqXhr) {

    	// Handle multiple response formats, fallback to HTTP status code number.
    	console.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  	}
}

export default alt.createStore(VideoStore);
