class HTTP {

	// CONSTRUCTOR
	constructor(debug) {
		this.debug = debug || false;
	}

	// UNIX
	unix() {
		return parseInt(new Date().getTime() / 1000);
	}

	// GET OBJECT
	getObject(key) {
		key = key.split("&_=")[0];
		var value = localStorage.getItem(key);

		// check ttl
		var ttl = localStorage.getItem(key + "~ttl");
		if(ttl) {
			var expired = parseInt(ttl) > this.unix();
			if(expired) {
				localStorage.removeItem(key);
				localStorage.removeItem(key + "~ttl");
				return null;
			}
		}

		return value && JSON.parse(value);
	}

	// SET OBJECT
	setObject(key, value, ttl) {
		key = key.split("&_=")[0];
		localStorage.setItem(key, JSON.stringify(value));

		if(ttl) {
			var expiring = this.unix() + parseInt(ttl);
			localStorage.setItem(key + "~ttl", expiring);
		}
	}

	// GET
	get(o, callback) {

		var obj = $.extend({
			url: "",
			params: {},
			ttl: null,
			force: false,
			timeout: 10000,
			headers: {}
		}, o);

		var url = obj.url;

		// check if at least a url was given
		if(url.length === 0) {
			return callback({
				"error": "no url"
			});
		}

		// construct url from dictionary of parameters
		var i = 0;
		for(var k in obj.params) {
			if(i === 0) url += "?";
			else url += "&";

			url += k + "=" + obj.params[k];
			i++;
		}

		// try access the cache
		var cached = this.getObject("GET:" + url);
		if(cached !== null && obj.force === false && obj.cache === true) {
			if(this.debug) console.log(url + " [cache hit]");

			// render table with cached data
			return callback(null, cached);
		}
		else {

			if(this.debug) console.log(url + " [remote fetch]");

			$.ajax({
				"url": url,
				"method": "GET",
				"cache": false,
				"headers": obj.headers,
				"timeout": obj.timeout,
				"dataType": "json"
			})
			.done((data) => {

			  	// add to cache with TTL
				if(obj.ttl) {
				    this.setObject("GET:" + url, data, obj.ttl);
				}

				// render table with remote data
				return callback(null, data);
			})
			.fail((xhr) => {
				var data = JSON.parse(xhr.responseText);
				return callback({
					"statusCode": xhr.status,
					"error": data.error
				});
			});
		}
	}

	// POST
	post(o, callback) {

		var obj = $.extend({
			url: "",
			data: {},
			ttl: null,
			force: false,
			timeout: 10000,
			headers: {}
		}, o);

		var url = obj.url;

		// check if at least a url was given
		if(url.length === 0) {
			return callback({
				"error": "no url"
			});
		}

		// try access the cache
		var cached = this.getObject("POST:" + url);
		if(cached && obj.force === false && obj.cache === true) {
			if(this.debug) console.log(url + " [cache hit]");

			// render table with cached data
			return callback(null, cached);
		}
		else {

			if(this.debug) console.log(url + " [remote fetch]");

			// no cached result, fetch portals from webservice
			$.ajax({
				"url": url,
				"method": "POST",
				"cache": false,
				"headers": obj.headers,
				"dataType": "json",
				"timeout": obj.timeout,
				"data": obj.data
			})
			.done((data) => {

				// add to cache with TTL
				if(obj.ttl) {
					this.setObject("POST:" + url, data, obj.ttl);
				}

				// render table with remote data
				return callback(null, data);
			})
			.fail((err) => {
				var data = JSON.parse(xhr.responseText);
				return callback({
					"statusCode": xhr.status,
					"error": data.error
				});
			});
		}
	}
}

export default HTTP;
