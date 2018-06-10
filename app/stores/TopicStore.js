import alt from "../alt";
import TopicActions from "../actions/TopicActions";

class TopicStore {
	constructor() {
		this.bindActions(TopicActions);

		this.topics = [];
		this.topic = null;
		this.channels = [];
		this.loading = false;
		this.skip = 0;
		this.take = 10;
	}

	setLoading() {
		this.loading = true;
	}

	getTopicsSuccess(result) {
		this.topics = result;
		this.loading = false;
	}

	getTopicsFail(err) {
		console.log(err);
		this.loading = false;
	}

	resetChannels() {
		this.channels = [];
	}

	getTopicSuccess(result) {
		this.topic = result.topic;
		this.channels = this.channels.concat(result.channels);
		this.loading = false;
		this.skip = result.skip;
		this.take = result.take;
	}

	getTopicFail(err) {
		console.log(err);
		this.loading = false;
	}
}

export default alt.createStore(TopicStore);
