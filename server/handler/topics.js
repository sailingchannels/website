const async = require("async");
const textCutter = require("../utils/textcutter");

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

						// find the latest video
						const latestVideos = await global.videos
							.find({
								channel: { $in: taggedChannelIds }
							})
							.sort({
								publishedAt: -1
							})
							.project({
								_id: true,
								channel: true
							})
							.limit(1)
							.toArray();

						// pick a random video of the latest 49
						const latestVideo = latestVideos[0];

						// fetch some more infos about this channel
						const latestVideoChannel = await global.channels.findOne(
							{
								_id: latestVideo.channel
							},
							{
								fields: {
									title: true
								}
							}
						);

						topic["latestVideo"] = {
							_id: latestVideo._id,
							title: latestVideoChannel.title
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
				.find({ _id: { $in: taggedChannelIds } })
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
