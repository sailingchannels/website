import alt from "../alt";

// VIDEO ACTIONS
class VideoActions {

    constructor() {
        this.generateActions(
            "getVideosSuccess",
            "getVideosFail"
        );
    }

    // GET CHANNEL
    getChannels(id, skip, take) {

        $.ajax({
            "url": "/api/channels/get/" + id + "/?skip=" + skip + "&take=" + take,
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
}

export default alt.createActions(VideoActions);
