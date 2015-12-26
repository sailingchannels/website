import requests, json, config

# config
startChannelId = "UC5xDht2blPNWdVtl9PkDmgA" # SailLife
maxLevels = 2

# members
channels = {}

# READ STATISTICS
def readStatistics(channelId):

	try:
		r = requests.get("https://www.googleapis.com/youtube/v3/channels?part=statistics&id=" + channelId + "&key=" + config.apiKey())
		stats = r.json()

		if len(stats["items"]) > 0:
			return stats["items"][0]["statistics"]
		else:
			return None
	except:
		return None

# READ SUBSCRIPTIONS PAGE
def readSubscriptionsPage(channelId, pageToken = None, level = 1):

	# we reached the maximum level of recursion
	if level >= maxLevels:
		return None

	url = "https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&maxResults=50&channelId=" + channelId + "&key=" + config.apiKey()

	if pageToken != None:
		url += "&pageToken" + pageToken

	# fetch subscriptions of channel
	r = requests.get(url)
	subs = r.json()

	# error? ignore!
	if r.status_code != 200:
		return None

	# loop channel items in result set
	for i in subs["items"]:

		if i["snippet"]["resourceId"]["kind"] != "youtube#channel":
			continue

		subChannelId = i["snippet"]["resourceId"]["channelId"]

		# store this channel
		if not channels.has_key(subChannelId):

			stats = readStatistics(subChannelId)

			channels[subChannelId] = {
				"id": subChannelId,
				"title": i["snippet"]["title"],
				"description": i["snippet"]["description"],
				"thumbnail": i["snippet"]["thumbnails"]["default"]["url"],
				"subscribers": int(stats["subscriberCount"]),
				"views": int(stats["viewCount"]),
				"subscribersHidden": bool(stats["hiddenSubscriberCount"]),
				"videos": int(stats["videoCount"])
			}

			# read sub level subscriptions
			subLevel = level + 1
			readSubscriptions(subChannelId, subLevel)

	# is there a next page?
	if subs.has_key("nextPageToken"):
		return subs["nextPageToken"]
	else:
		return None

# READ SUBSCRIPTIONS
def readSubscriptions(channelId, level = 1):

	print channelId, level

	nextPage = None
	while True:
		nextPageNew = readSubscriptionsPage(channelId, nextPage, level)

		if nextPageNew == None or nextPageNew == nextPage:
			break

		nextPage = nextPageNew

# WRITE SUBSCRIPTIONS
def writeSubscriptions():

	print len(channels.keys()), " channels found"

	with open("data.json", "w") as dataFile:
		dataFile.write(json.dumps(channels.values(), indent=4, sort_keys=True))

readSubscriptions(startChannelId, 1)
writeSubscriptions()
