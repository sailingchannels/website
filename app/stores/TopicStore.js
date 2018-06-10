import alt from "../alt";
import TopicActions from "../actions/TopicActions";

class TopicStore {
	constructor() {
		this.bindActions(TopicActions);

		this.topics = [];
		this.topic = null;
	}

	getTopicsSuccess(result) {
		this.topics = result;
	}

	getTopicsFail(err) {
		console.log(err);
	}

	getTopicSuccess(result) {
		this.topic = result;
	}

	getTopicFail(err) {
		console.log(err);
	}
}

export default alt.createStore(TopicStore);
