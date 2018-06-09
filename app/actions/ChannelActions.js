import alt from "../alt";
import HTTP from "../helpers/http";
import $ from "jquery";

// CHANNEL ACTIONS
class ChannelActions {
	constructor() {
		this.generateActions(
			"getChannelsSuccess",
			"getChannelsFail",
			"getChannelSuccess",
			"getChannelFail",
			"searchChannelsSuccess",
			"searchChannelsFail",
			"getTagsSuccess",
			"getTagsFail"
		);
	}

	// GET CHANNEL
	getChannels(sortBy, skip, take) {
		var url = "/api/channels/get?sort=" + sortBy + "&skip=" + skip + "&take=" + take;

		// append mobile parameter to not load description
		if ($(window).width() < 768) {
			url += "&mobile=true";
		}

		new HTTP().get(
			{
				url: url,
				type: "GET",
				dataType: "json",
				cache: false
			},
			(err, data) => {
				if (err) {
					return this.actions.getChannelsFail(err);
				}

				this.actions.getChannelsSuccess(data);
			}
		);
	}

	// GET TAGS
	getTags(id) {
		new HTTP().get(
			{
				url: "/api/tags/" + id,
				type: "GET",
				dataType: "json",
				cache: false
			},
			(err, data) => {
				if (err) {
					return this.actions.getTagsFail(err);
				}

				this.actions.getTagsSuccess(data);
			}
		);
	}

	// GET CHANNEL
	getChannel(id) {
		new HTTP().get(
			{
				url: "/api/channel/get/" + id,
				type: "GET",
				dataType: "json",
				cache: false
			},
			(err, data) => {
				if (err) {
					return this.actions.getChannelFail(err);
				}

				this.actions.getChannelSuccess(data);
			}
		);
	}

	// SEARCH CHANNELS
	searchChannels(q) {
		var url = "/api/channels/search?q=" + encodeURIComponent(q);

		// append mobile parameter to not load description
		if ($(window).width() < 768) {
			url += "&mobile=true";
		}

		new HTTP().get(
			{
				url: url,
				type: "GET",
				dataType: "json",
				cache: false
			},
			(err, data) => {
				if (err) {
					return this.actions.searchChannelsFail(err);
				}

				this.actions.searchChannelsSuccess(data);
			}
		);
	}

	// SUBSCRIBE
	subscribe(channelId, callback) {
		new HTTP().post(
			{
				url: "/api/channel/subscribe",
				data: {
					channel: channelId
				},
				type: "POST",
				dataType: "json",
				cache: false
			},
			(err, data) => {
				if (err) {
					return callback(err);
				}

				return callback(null, data);
			}
		);
	}

	// UNSUBSCRIBE
	unsubscribe(channelId, callback) {
		new HTTP().post(
			{
				url: "/api/channel/unsubscribe",
				data: {
					channel: channelId
				},
				type: "POST",
				dataType: "json",
				cache: false
			},
			(err, data) => {
				console.log(err);
				if (err) {
					return callback(err);
				}

				return callback(null, data);
			}
		);
	}
}

export default alt.createActions(ChannelActions);
