import alt from "../alt";

// VIDEO ACTIONS
class VideoActions {

    constructor() {
        this.generateActions(
            "getVideosSuccess",
            "getVideosFail"
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
			console.log(data);
            this.actions.getVideosSuccess(data);
        })
        .fail((jqXhr) => {
            this.actions.getVideosFail(jqXhr);
        });
    }
}

export default alt.createActions(VideoActions);
