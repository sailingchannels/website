import requests, json, config, calendar, sys
from datetime import datetime

# config
startChannelId = "UC5xDht2blPNWdVtl9PkDmgA" # SailLife
maxLevels = 4
sailingTerms = ["sail", "skipper", "circumnavigate", "yacht", " boat "]

# members
channels = {}
channel_logs = {}

# READ VIDEOS PAGE
def readVideosPage(channelId, pageToken = None):

	url = "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=" + channelId + "&maxResults=50&regionCode=us&key=" + config.apiKey()

	if pageToken != None:
		url += "&pageToken=" + pageToken

	# fetch videos of channel
	r = requests.get(url)
	vids = r.json()

	videos = []
	for v in vids["items"]:

		# ignore playlists
		if v["id"]["kind"] != "youtube#video":
			continue

		d = datetime.strptime(v["snippet"]["publishedAt"], "%Y-%m-%dT%H:%M:%S.000Z")

		videos.append({
			"id": v["id"]["videoId"],
			"title": v["snippet"]["title"],
			"description": v["snippet"]["description"],
			"publishedAt": calendar.timegm(d.utctimetuple())
		})

	# is there a next page?
	if vids.has_key("nextPageToken"):
		return vids["nextPageToken"], videos
	else:
		return None, videos

# READ VIDEOS
def readVideos(channelId):

	nextPage = None
	nextPageNew = None
	videos = []

	while True:
		nextPageNew, vids = readVideosPage(channelId, nextPage)

		# extend video list with new page ones
		videos.extend(vids);

		if nextPageNew == None:
			break

		nextPage = nextPageNew

	return videos

# READ STATISTICS
def readStatistics(channelId):

	r = requests.get("https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=" + channelId + "&key=" + config.apiKey())
	stats = r.json()
	return stats["items"][0]["statistics"], stats["items"][0]["snippet"]

# ADD SINGLE CHANNEL
def addSingleChannel(subChannelId, i, level, readSubs = True):

	# store this channel
	if not channels.has_key(subChannelId):

		stats, channel_detail = readStatistics(subChannelId)
		hasSailingTerm = False

		# check if one of the sailing terms is available
		for term in sailingTerms:
			if (term in i["snippet"]["title"].lower() or term in i["snippet"]["description"].lower()):
				hasSailingTerm = True
				break

		# log what happened to the channel
		print subChannelId, hasSailingTerm, int(stats["videoCount"])

		if int(stats["videoCount"]) > 0 and hasSailingTerm:

			pd = datetime.strptime(channel_detail["publishedAt"], "%Y-%m-%dT%H:%M:%S.000Z")

			channels[subChannelId] = {
				"id": subChannelId,
				"title": i["snippet"]["title"],
				"description": i["snippet"]["description"],
				"publishedAt": calendar.timegm(pd.utctimetuple()),
				"thumbnail": i["snippet"]["thumbnails"]["default"]["url"],
				"subscribers": int(stats["subscriberCount"]),
				"views": int(stats["viewCount"]),
				"subscribersHidden": bool(stats["hiddenSubscriberCount"]),
				"videos": readVideos(subChannelId)
			}

			# read sub level subscriptions
			subLevel = level + 1
			readSubscriptions(subChannelId, subLevel)

# READ SUBSCRIPTIONS PAGE
def readSubscriptionsPage(channelId, pageToken = None, level = 1):

	url = "https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&maxResults=50&channelId=" + channelId + "&key=" + config.apiKey()

	if pageToken != None:
		url += "&pageToken=" + pageToken

	# fetch subscriptions of channel
	r = requests.get(url)
	subs = r.json()

	# error? ignore!
	if r.status_code != 200:
		print "error", r.status_code, channelId, level
		return None

	# loop channel items in result set
	for i in subs["items"]:

		if i["snippet"]["resourceId"]["kind"] != "youtube#channel":
			#print i["snippet"]["resourceId"]["kind"]
			continue

		subChannelId = i["snippet"]["resourceId"]["channelId"]

		# store this channel
		addSingleChannel(subChannelId, i, level, True)

	# is there a next page?
	if subs.has_key("nextPageToken"):
		return subs["nextPageToken"]
	else:
		return None

# READ SUBSCRIPTIONS
def readSubscriptions(channelId, level = 1):

	# we reached the maximum level of recursion
	if level >= maxLevels:
		return None

	nextPage = None
	nextPageNew = None

	while True:
		nextPageNew = readSubscriptionsPage(channelId, nextPage, level)

		if nextPageNew == None:
			break

		nextPage = nextPageNew

# WRITE SUBSCRIPTIONS
def writeSubscriptions():

	print len(channels.keys()), " channels found"

	dataFile = "data.json"
	dataPath = ""
	if len(sys.argv) == 2:
		dataPath = sys.argv[1]

	dataFile = dataPath + dataFile

	# order them by subscribers
	with open(dataFile, "w") as dataFile:
		dataFile.write(json.dumps(channels.values(), sort_keys=True))

# ADDITIONAL SUBSCRIPTIONS
def addAdditionalSubscriptions():

	dataFile = "additional-channels.txt"
	dataPath = ""

	if len(sys.argv) == 2:
		dataPath = sys.argv[1]

	dataFile = dataPath + dataFile

	# read the file line by line
	with open(dataFile) as f:
		for channelId in f.readlines():

			if len(channelId) > 1:

				# get info of additional channel
				r = requests.get("https://www.googleapis.com/youtube/v3/channels?part=snippet&id=" + channelId + "&key=" + config.apiKey())
				result = r.json()

				print "additional ", channelId

				# add this channel
				addSingleChannel(channelId, result["items"][0], 0, False)

readSubscriptions(startChannelId, 1)
addAdditionalSubscriptions()
writeSubscriptions()
