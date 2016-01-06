import requests, json, config, calendar, sys
from pymongo import MongoClient
from datetime import datetime
import detectlanguage

# config
startChannelId = "UC5xDht2blPNWdVtl9PkDmgA" # SailLife
maxLevels = 4
sailingTerms = []

# open mongodb connection
client = MongoClient(config.mongoDB())
db_name = "sailing-channels"

if len(sys.argv) != 2:
	db_name += "-dev"

db = client[db_name]

# add sailing terms
for tt in db.sailingterms.find({}):
	sailingTerms.append(tt["_id"])

print sailingTerms

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

	r = requests.get("https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=" + channelId + "&key=" + config.apiKey())
	stats = r.json()
	return stats["items"][0]["statistics"], stats["items"][0]["snippet"]

# ADD SINGLE CHANNEL
def addSingleChannel(subChannelId, i, level, readSubs = True, ignoreSailingTerm = False):

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

		if ignoreSailingTerm == True:
			hasSailingTerm = True

		if int(stats["videoCount"]) > 0 and hasSailingTerm:

			pd = datetime.strptime(channel_detail["publishedAt"], "%Y-%m-%dT%H:%M:%S.000Z")

			channels[subChannelId] = {
				"id": subChannelId, # TODO: can go if switched to mongodb
				"title": i["snippet"]["title"],
				"description": i["snippet"]["description"],
				"publishedAt": calendar.timegm(pd.utctimetuple()),
				"thumbnail": i["snippet"]["thumbnails"]["default"]["url"],
				"subscribers": int(stats["subscriberCount"]),
				"views": int(stats["viewCount"]),
				"subscribersHidden": bool(stats["hiddenSubscriberCount"]),
				"videos": readVideos(subChannelId)
			}

			# video count
			channels[subChannelId]["videoCount"] = len(channels[subChannelId]["videos"])

			lotsOfText = channels[subChannelId]["description"] + " "

			# last upload at
			maxVideoAge = 0
			for vid in channels[subChannelId]["videos"]:
				lotsOfText += vid["description"] + " "
				if vid["publishedAt"] > maxVideoAge:
					maxVideoAge = vid["publishedAt"]

			channels[subChannelId]["lastUploadAt"] = maxVideoAge

			# add country info if available
			if channel_detail.has_key("country"):
				channels[subChannelId]["country"] = channel_detail["country"].lower()

			hasLanguage = False
			ch_lang = db.channels.find_one({"_id": subChannelId}, projection=["detectedLanguage"])
			if ch_lang:
				if ch_lang.has_key("detectedLanguage"):
					hasLanguage = True

			useDetectLangKey = 0
			detectlanguage.configuration.api_key = config.detectLanguage()[useDetectLangKey]


			# detect the language of the channel
			if not hasLanguage:

				channels[subChannelId]["language"] = "en"

				runLoop = True
				while runLoop:
					try:
						detectedLang = detectlanguage.detect(lotsOfText)
						runLoop = False
					except:
						useDetectLangKey = useDetectLangKey + 1

						if useDetectLangKey > len(config.detectLanguage()):
							 runLoop = False
						else:
							detectlanguage.configuration.api_key = config.detectLanguage()[useDetectLangKey]

				# did we find a language in the text body?
				if len(detectedLang) > 0:

					# is the detection reliable?
					if detectedLang[0]["isReliable"]:
						channels[subChannelId]["language"] = detectedLang[0]["language"]
						channels[subChannelId]["detectedLanguage"] = True

			# upsert data in mongodb
			db.channels.update_one({
				"_id": subChannelId
			}, {
				"$set": channels[subChannelId]
			}, True)

			# read sub level subscriptions
			subLevel = level + 1
			if readSubs == True:
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

# ADDITIONAL SUBSCRIPTIONS
def addAdditionalSubscriptions():

	for cc in db.additional.find({}):

		if not channels.has_key(cc["_id"]):

			# get info of additional channel
			r = requests.get("https://www.googleapis.com/youtube/v3/channels?part=snippet&id=" + cc["_id"] + "&key=" + config.apiKey())
			result = r.json()

			print "additional ", cc["_id"]

			# add this channel
			addSingleChannel(cc["_id"], result["items"][0], 0, False, True)

readSubscriptions(startChannelId, 1)
addAdditionalSubscriptions()
