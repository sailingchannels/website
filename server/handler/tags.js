module.exports = {
	// GET BY CHANNEL
	getByChannel: (req, res) => {
		global.tags
			.find({ "_id.channel": req.params.channel, value: { $gt: 1 } })
			.sort({ value: -1 })
			.limit(15)
			.toArray((err, tags) => {
				if (err) {
					return res.status(500).send(err);
				}

				return res.send(
					tags.map((t) => {
						return {
							tag: t._id.tag,
							count: t.value
						};
					})
				);
			});
	}
};
