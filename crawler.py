import requests, json, config

# config
startChannelId = "UC5xDht2blPNWdVtl9PkDmgA" # SailLife

# members
channels = {}

# READ STATISTICS
def readStatistics(channelId):

	r = requests.get("https://www.googleapis.com/youtube/v3/channels?part=statistics&id=" + channelId + "&key=" + config.apiKey())
	stats = r.json()

	if len(stats["items"]) > 0:
		return stats["items"][0]["statistics"]
	else:
		return None

# READ SUBSCRIPTIONS PAGE
def readSubscriptionsPage(channelId, pageToken = None):

	url = "https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&maxResults=50&channelId=" + channelId + "&key=" + config.apiKey()

	if pageToken != None:
		url += "&pageToken" = pageToken

	# fetch subscriptions of channel
	r = requests.get(url)
	subs = r.json()

	# loop channel items in result set
	for i in subs["items"]:

		subChannelId = i["snippet"]["resourceId"]["channelId"]
		print subChannelId

		# store this channel
		if not channels.has_key(subChannelId):
			channels[subChannelId] = {
				"id": subChannelId,
				"title": i["snippet"]["title"],
				"description": i["snippet"]["description"],
				"thumbnail": i["snippet"]["thumbnails"]["default"]["url"],
				"statistics": readStatistics(channelId)
			}

	# is there a next page?
	if subs.has_key("nextPageToken"):
		reuturn subs["nextPageToken"]
	else:
		return None

# READ SUBSCRIPTIONS
def readSubscriptions(channelId):

	

# WRITE SUBSCRIPTIONS
def writeSubscriptions():

	with open("data.json", "w") as dataFile:
		dataFile.write(json.dumps(channels.values()))

readSubscriptions(startChannelId)
writeSubscriptions()