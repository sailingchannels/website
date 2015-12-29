import requests, json, config, calendar
from datetime import datetime

# config
startChannelId = "UC5xDht2blPNWdVtl9PkDmgA" # SailLife
maxLevels = 3
sailingTerms = ["sail", "skipper", "circumnavigate", "yacht"]

# members
channels = {}

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

	r = requests.get("https://www.googleapis.com/youtube/v3/channels?part=statistics&id=" + channelId + "&key=" + config.apiKey())
	stats = r.json()
	return stats["items"][0]["statistics"]

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

	print len(subs["items"]), "items"

	# loop channel items in result set
	for i in subs["items"]:

		if i["snippet"]["resourceId"]["kind"] != "youtube#channel":
			print i["snippet"]["resourceId"]["kind"]
			continue

		subChannelId = i["snippet"]["resourceId"]["channelId"]

		# store this channel
		if not channels.has_key(subChannelId):

			stats = readStatistics(subChannelId)
			hasSailingTerm = False

			# check if one of the sailing terms is available
			for term in sailingTerms:
				if (term in i["snippet"]["title"].lower() or term in i["snippet"]["description"].lower()):
					hasSailingTerm = True
					break

			if int(stats["videoCount"]) > 0 and hasSailingTerm:

				channels[subChannelId] = {
					"id": subChannelId,
					"title": i["snippet"]["title"],
					"description": i["snippet"]["description"],
					"thumbnail": i["snippet"]["thumbnails"]["default"]["url"],
					"subscribers": int(stats["subscriberCount"]),
					"views": int(stats["viewCount"]),
					"subscribersHidden": bool(stats["hiddenSubscriberCount"]),
					"videos": readVideos(subChannelId)
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

	# we reached the maximum level of recursion
	if level >= maxLevels:
		return None

	print channelId, level

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

	# order them by subscribers

	with open("data.json", "w") as dataFile:
		dataFile.write(json.dumps(channels.values(), indent=4, sort_keys=True))

readSubscriptions(startChannelId, 1)
writeSubscriptions()
