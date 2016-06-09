import alt from "../alt";
import VideoActions from "../actions/VideoActions";

class VideoStore {

	constructor() {
		this.bindActions(VideoActions);
		this.videos = [];
		this.video = null;
		this.skip = 0;
		this.take = 5;
		this.fin = false;
	}

	// GET VIDEOS SUCCESS
  	getVideosSuccess(result) {

		this.videos = result.data;
		this.skip = result.skip;
		this.take = result.take;
		this.fin = result.fin;
  	}

	// GET VIDEOS FAIL
  	getVideosFail(jqXhr) {

    	// Handle multiple response formats, fallback to HTTP status code number.
    	console.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  	}

	// GET VIDEO SUCCESS
	getVideoSuccess(result) {
		this.video = result;
		this.video.channel.id = this.video.channel._id;
	}

	// GET VIDEO FAIL
  	getVideoFail(jqXhr) {

    	// Handle multiple response formats, fallback to HTTP status code number.
    	//console.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
		location.href = "/404";
  	}
}

export default alt.createStore(VideoStore);
