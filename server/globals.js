module.exports = (db) => {
	// collections
	global.channels = db.collection("channels");
	global.searches = db.collection("searches");
	global.videos = db.collection("videos");
	global.subscribers = db.collection("subscribers");
	global.views = db.collection("views");
	global.users = db.collection("users");
	global.visits = db.collection("visits");
	global.flags = db.collection("flags");
	global.positions = db.collection("positions");
	global.blacklist = db.collection("blacklist");
	global.additional = db.collection("additional");
	global.sailingterms = db.collection("sailingterms");
	global.suggestions = db.collection("suggestions");
	global.tags = db.collection("tags");
	global.topics = db.collection("topics");
	global.CACHE_users_subscriptions = db.collection("CACHE_users_subscriptions");
	global.CACHE_ais_positions = db.collection("CACHE_ais_positions");
	global.CACHE_inreach_positions = db.collection("CACHE_inreach_positions");
	global.CACHE_custom_links = db.collection("CACHE_custom_links");
	global.CACHE_languages = db.collection("CACHE_languages");
};
