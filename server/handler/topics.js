const async = require("async");
const textCutter = require("../utils/textcutter");

const SUB_THRESHOLD = 4500;

module.exports = {
	// GET BY CHANNEL
	getAll: async (req, res) => {
		try {
			// fetch all topics
			const topics = await global.topics.find({}).toArray();

			// attach the latest video for each topic
			async.map(
				topics,
				async (topic, done) => {
					try {
						// search the tags for the topic search words and return distinct channels
						const taggedChannelIds = await global.tags.distinct("_id.channel", {
							$text: { $search: topic.searchterms.join(" ") },
							value: { $gte: 15 }
						});

						// find the channel that uploaded last and has > SUB_THRESHOLD subs
						const latestUploadChannel = await global.channels.findOne(
							{
								_id: { $in: taggedChannelIds },
								subscribers: { $gt: SUB_THRESHOLD }
							},
							{
								sort: [["lastUploadAt", -1]],
								fields: {
									_id: true,
									title: true
								}
							}
						);

						// find the latest video
						const latestVideo = await global.videos.findOne(
							{
								channel: latestUploadChannel._id
							},
							{
								sort: [["publishedAt", -1]],
								fields: {
									_id: true
								}
							}
						);

						topic["latestVideo"] = {
							_id: latestVideo._id,
							title: latestUploadChannel.title
						};

						return done(null, topic);
					} catch (e) {
						return done(e);
					}
				},
				(err, results) => {
					if (err) return res.status(500).send(err);

					return res.send(results);
				}
			);
		} catch (e) {
			return res.status(500).send(e);
		}
	},

	// GET ONE
	getOne: async (req, res) => {
		var take = parseInt(req.query.take) || 25;
		var skip = parseInt(req.query.skip) || 0;

		try {
			// find the current topic
			const topic = await global.topics.findOne({ _id: req.params.id });

			// search the tags for the topic search words and return distinct channels
			const taggedChannelIds = await global.tags.distinct("_id.channel", {
				$text: { $search: topic.searchterms.join(" ") },
				value: { $gte: 15 }
			});

			// retrieve more information about the found
			const channelInfos = await global.channels
				.find({
					_id: { $in: taggedChannelIds },
					subscribers: { $gt: SUB_THRESHOLD }
				})
				.project({
					title: true,
					description: true,
					subscribersHidden: true,
					thumbnail: true,
					subscribers: true,
					views: true,
					videoCount: true,
					lastUploadAt: true,
					publishedAt: true
				})
				.sort({
					lastUploadAt: -1
				})
				.skip(skip)
				.limit(take)
				.toArray();

			// return the result to the user
			return res.send({
				topic: topic,
				channels: channelInfos.map((c) => {
					c.id = c._id;
					c.description = textCutter(300, c.description);
					delete c._id;
					return c;
				}),
				skip: skip,
				take: take
			});
		} catch (e) {
			return res.status(500).send(e);
		}
	}
};
