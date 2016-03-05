import requests, json, config, calendar, sys, time, math
from pymongo import MongoClient
from datetime import datetime, date, timedelta
import detectlanguage
from Queue import Queue
from threading import Thread
from twython import Twython
from facepy import GraphAPI

# social networks
twitter = Twython(config.twitter()["consumerKey"], config.twitter()["consumerSecret"], config.twitter()["accessToken"], config.twitter()["accessSecret"])

# WORKER
class Worker(Thread):
    """Thread executing tasks from a given tasks queue"""
    def __init__(self, tasks):
        Thread.__init__(self)
        self.tasks = tasks
        self.daemon = True
        self.start()

    def run(self):
        while True:
            func, args, kargs = self.tasks.get()
            try:
                func(*args, **kargs)
            except Exception, e:
                print e
            finally:
                self.tasks.task_done()

# THREAD POOL
class ThreadPool:
    """Pool of threads consuming tasks from a queue"""
    def __init__(self, num_threads):
        self.tasks = Queue(num_threads)
        for _ in range(num_threads): Worker(self.tasks)

    def add_task(self, func, *args, **kargs):
        """Add a task to the queue"""
        self.tasks.put((func, args, kargs))

    def wait_completion(self):
        """Wait for completion of all the tasks in the queue"""
        self.tasks.join()

# config
startChannelId = "UC5xDht2blPNWdVtl9PkDmgA" # SailLife
maxLevels = 4
sailingTerms = []
blacklist = []

# open mongodb connection
client = MongoClient(config.mongoDB())
db_name = "sailing-channels"
devMode = False

pool = ThreadPool(16)

if len(sys.argv) != 2:
	db_name += "-dev"
	devMode = True
	print "*** DEVELOPER MODE ***"

db = client[db_name]

# add sailing terms
for tt in db.sailingterms.find({}):
	sailingTerms.append(tt["_id"])

# fill blacklist
for bb in db.blacklist.find({}):
	blacklist.append(bb["_id"])

print sailingTerms

# members
channels = {}

# DELETE CHANNEL
def deleteChannel(channelId):
	db.channels.delete_one({"_id": channelId})
	db.videos.delete_many({"channel": channelId})

# STORE VIDEO STATS
def storeVideoStats(channelId, vid):

	# fetch video statistics
	rd = requests.get("https://www.googleapis.com/youtube/v3/videos?part=statistics&id=" + vid["id"] + "&key=" + config.apiKey())
	videoStat = rd.json()
	statistics = None

	if len(videoStat["items"]) > 0:
		statistics = videoStat["items"][0]["statistics"]

	if statistics:
		if statistics.has_key("viewCount"):
			vid["views"] = int(statistics["viewCount"])

		if statistics.has_key("likeCount"):
			vid["likes"] = int(statistics["likeCount"])

		if statistics.has_key("dislikeCount"):
			vid["dislikes"] = int(statistics["dislikeCount"])

		if statistics.has_key("commentCount"):
			vid["comments"] = int(statistics["commentCount"])

	# prepare video for inserting into database
	dbVid = vid
	dbVid["_id"] = dbVid["id"]
	dbVid["channel"] = channelId
	del dbVid["id"]

	try:
		# check if this video exists in database
		vid_exists = db.videos.count({"_id": dbVid["_id"]})

		# reasonable fresh video, post to twitter and facebook
		if vid_exists == 0 and math.fabs(int(dbVid["publishedAt"]) - time.mktime(datetime.utcnow().timetuple())) <= 15000:

			ch = db.channels.find_one({"_id": channelId}, projection=["title"])

			# twitter
			try:
				msg = "New: " + ch["title"] + " \"" + dbVid["title"] + "\" https://sailing-channels.com/video/" + dbVid["_id"]
				if devMode <> True:
					twitter.update_status(status=msg)
				else:
					print msg

			except Exception, e:
				print e

		# update information in database
		db.videos.update_one({
			"_id": dbVid["_id"]
		}, {
			"$set": dbVid
		}, True)

	except:
		pass

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

		vid = {
			"id": v["id"]["videoId"],
			"title": v["snippet"]["title"],
			"description": v["snippet"]["description"],
			"publishedAt": calendar.timegm(d.utctimetuple())
		}

		videos.append(vid)

		# start new thread to extract video statistics
		#start_new_thread(storeVideoStats, (channelId, vid,))
		pool.add_task(storeVideoStats, channelId, vid)

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

		# blacklisted channel
		if subChannelId in blacklist:
			hasSailingTerm = False
			deleteChannel(subChannelId)

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
				"lastCrawl": datetime.now()
			}

			# read the videos
			channelVideos = readVideos(subChannelId)

			# video count
			channels[subChannelId]["videoCount"] = len(channelVideos)

			lotsOfText = channels[subChannelId]["description"] + " "

			# last upload at
			maxVideoAge = 0
			for vid in channelVideos:
				lotsOfText += vid["description"] + " "
				if vid["publishedAt"] > maxVideoAge:
					maxVideoAge = vid["publishedAt"]

			# channel is older than
			aYearAgoDate = date.today() - timedelta(days=365)
			aYearAgoUnix = calendar.timegm(aYearAgoDate.timetuple())
			if maxVideoAge < aYearAgoUnix:
				deleteChannel(subChannelId)
				return

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

			# insert subscriber counts
			try:
				db.subscribers.update_one({
					"_id": {
						"channel": subChannelId,
						"date": int(date.today().strftime("%Y%m%d"))
					}
				}, {
					"$set": {
						"year": date.today().year,
						"month": date.today().month,
						"day": date.today().day,
						"date": datetime.utcnow(),
						"subscribers": channels[subChannelId]["subscribers"]
					}
				}, True)
			except:
				pass

			# insert view counts
			try:
				db.views.update_one({
					"_id": {
						"channel": subChannelId,
						"date": int(date.today().strftime("%Y%m%d"))
					}
				}, {
					"$set": {
						"year": date.today().year,
						"month": date.today().month,
						"day": date.today().day,
						"date": datetime.utcnow(),
						"views": channels[subChannelId]["views"]
					}
				}, True)
			except:
				pass

			# upsert data in mongodb
			try:

				db.channels.update_one({
					"_id": subChannelId
				}, {
					"$set": channels[subChannelId]
				}, True)
			except:
				pass

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

pool.wait_completion()
