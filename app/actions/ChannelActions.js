import alt from "../alt";

// CHANNEL ACTIONS
class ChannelActions {

    constructor() {
        this.generateActions(
            "getChannelsSuccess",
            "getChannelsFail",
            "searchChannelsSuccess",
            "searchChannelsFail"
        );
    }

    // GET CHANNEL
    getChannels(sortBy, skip, take) {

        $.ajax({
            "url": "/api/channels/get?sort=" + sortBy + "&skip=" + skip + "&take=" + take,
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

    searchChannels(q, sortBy) {

        $.ajax({
            "url": "/api/channels/search?q=" + encodeURIComponent(q) + "&sort=" + sortBy,
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
