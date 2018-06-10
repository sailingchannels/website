import alt from "../alt";
import HTTP from "../helpers/http";

// TOPIC ACTIONS
class TopicActions {
	constructor() {
		this.generateActions(
			"getTopicsSuccess",
			"getTopicsFail",
			"getTopicSuccess",
			"getTopicFail"
		);
	}

	getTopics() {
		new HTTP().get(
			{
				url: "/api/topics",
				type: "GET",
				dataType: "json",
				cache: true
			},
			(err, data) => {
				if (err) {
					return this.actions.getTopicsFail(err);
				}

				return this.actions.getTopicsSuccess(data);
			}
		);
	}

	getTopic(id) {
		new HTTP().get(
			{
				url: "/api/topic/" + id,
				type: "GET",
				dataType: "json",
				cache: true
			},
			(err, data) => {
				if (err) {
					return this.actions.getTopicFail(err);
				}

				return this.actions.getTopicSuccess(data);
			}
		);
	}
}

export default alt.createActions(TopicActions);
