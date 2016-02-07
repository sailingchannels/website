import alt from "../alt";

// VIDEO ACTIONS
class VideoActions {

    constructor() {
        this.generateActions(
            "getVideosSuccess",
            "getVideosFail",
			"getVideoSuccess",
			"getVideoFail"
        );
    }

    // GET VIDEOS
    getVideos(id, skip, take) {

        $.ajax({
            "url": "/api/channel/get/" + id + "/videos?skip=" + skip + "&take=" + take,
            "type": "GET",
            "dataType": "json",
            "cache": true
        })
        .done((data) => {
            this.actions.getVideosSuccess(data);
        })
        .fail((jqXhr) => {
            this.actions.getVideosFail(jqXhr);
        });
    }

	// GET VIDEO
	getVideo(id) {

		$.ajax({
			"url": "/api/video/get/" + id,
			"type": "GET",
			"dataType": "json",
			"cache": true
		})
		.done((data) => {
			this.actions.getVideoSuccess(data);
		})
		.fail((jqXhr) => {
			this.actions.getVideoFail(jqXhr);
		});
	}
}

export default alt.createActions(VideoActions);
