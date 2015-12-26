import alt from "../alt";

// CHANNEL ACTIONS
class ChannelActions {

    constructor() {
        this.generateActions(
            "getChannelsSuccess",
            "getChannelsFail"
        );
    }

    // GET CHANNEL
    getChannels() {

        $.ajax({
            "url": "/api/channels/get",
            "type": "GET",
            "dataType": "json"
        })
        .done((data) => {
            this.actions.getChannelsSuccess(data);
        })
        .fail((jqXhr) => {
            this.actions.getChannelsFail(jqXhr);
        });
    }
}

export default alt.createActions(ChannelActions);
