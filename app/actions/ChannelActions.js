import alt from "../alt";

// CHANNEL ACTIONS
class ChannelActions {

    constructor() {
        this.generateActions(
            "getChannelsSuccess",
            "getChannelsFail",
            "getChannelSuccess",
            "getChannelFail",
            "searchChannelsSuccess",
            "searchChannelsFail"
        );
    }

    // GET CHANNEL
    getChannels(sortBy, skip, take) {

        $.ajax({
            "url": "/api/channels/get?sort=" + sortBy + "&skip=" + skip + "&take=" + take,
            "type": "GET",
            "dataType": "json",
            "cache": true
        })
        .done((data) => {
            this.actions.getChannelsSuccess(data);
        })
        .fail((jqXhr) => {
            this.actions.getChannelsFail(jqXhr);
        });
    }

    // GET CHANNEL
    getChannel(id) {

        $.ajax({
            "url": "/api/channel/get/" + id,
            "type": "GET",
            "dataType": "json"
        })
        .done((data) => {
            this.actions.getChannelSuccess(data);
        })
        .fail((jqXhr) => {
            this.actions.getChannelFail(jqXhr);
        });
    }

    // SEARCH CHANNELS
    searchChannels(q) {

        $.ajax({
            "url": "/api/channels/search?q=" + encodeURIComponent(q),
            "type": "GET",
            "dataType": "json"
        })
        .done((data) => {
            this.actions.searchChannelsSuccess(data);
        })
        .fail((jqXhr) => {
            this.actions.searchChannelsFail(jqXhr);
        });
    }
}

export default alt.createActions(ChannelActions);
