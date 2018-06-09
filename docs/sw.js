var __wpo = {
	assets: {
		main: [
			"/f4769f9bdb7466be65088239c12046d1.eot",
			"/89889688147bd7575d6327160d64e760.svg",
			"/e18bbf611f2a2e43afc071aa2f4e1512.ttf",
			"/fa2772327f55d8198301fdb8bcfc8158.woff",
			"/448c34a56d699c29117adc64c43affeb.woff2",
			"/favicon.ico",
			"/icon-128x128.png",
			"/icon-144x144.png",
			"/icon-152x152.png",
			"/icon-192x192.png",
			"/icon-384x384.png",
			"/icon-512x512.png",
			"/icon-72x72.png",
			"/icon-96x96.png",
			"/manifest.json",
			"/674f50d287a8c48dc19ba404d20fe713.eot",
			"/912ec66d7572ff821749319396470bde.svg",
			"/b06871f281fee6b241d60582ae9369b9.ttf",
			"/af7ae505a9eed503f8b8e6982036873e.woff2",
			"/fee66e712a8a08eef5805a46892932ad.woff",
			"/main.cd4c9b5561fd1e5bda2e.js",
			"/"
		],
		additional: [],
		optional: []
	},
	externals: [],
	hashesMap: {
		"86b6f62b7853e67d3e635f6512a5a5efc58ea3c3": "/f4769f9bdb7466be65088239c12046d1.eot",
		de51a8494180a6db074af2dee2383f0a363c5b08: "/89889688147bd7575d6327160d64e760.svg",
		"44bc1850f570972267b169ae18f1cb06b611ffa2": "/e18bbf611f2a2e43afc071aa2f4e1512.ttf",
		"278e49a86e634da6f2a02f3b47dd9d2a8f26210f": "/fa2772327f55d8198301fdb8bcfc8158.woff",
		ca35b697d99cae4d1b60f2d60fcd37771987eb07: "/448c34a56d699c29117adc64c43affeb.woff2",
		f934f4c958337e13ec0117b6a7763951709c2a23: "/favicon.ico",
		"3eced6b6e1748396f674c9c1cad205a423cc5099": "/icon-128x128.png",
		"4750407e330ede5c4fb7253f3a2373cbe1b7ac56": "/icon-144x144.png",
		b274400bfe19dd0abac388c5ee973679339db7a6: "/icon-152x152.png",
		e31b18d12006ba9ac73e0735c68227f081dc9577: "/icon-192x192.png",
		"398aae1b6bcccb758b92166d26369663639b3cd3": "/icon-384x384.png",
		b67f088e7e322151554db542d2178263ee5d9d9e: "/icon-512x512.png",
		a92e8d747cad968d6ba947fc04936aa1234114cd: "/icon-72x72.png",
		eee8b3b18d94bcdb972bd7aab450f2ce0ee7fb71: "/icon-96x96.png",
		"35892e63232118565bb6215e09f53ac06b5782ad": "/manifest.json",
		d980c2ce873dc43af460d4d572d441304499f400: "/674f50d287a8c48dc19ba404d20fe713.eot",
		"98a8aa5cf7d62c2eff5f07ede8d844b874ef06ed": "/912ec66d7572ff821749319396470bde.svg",
		"13b1eab65a983c7a73bc7997c479d66943f7c6cb": "/b06871f281fee6b241d60582ae9369b9.ttf",
		d6f48cba7d076fb6f2fd6ba993a75b9dc1ecbf0c: "/af7ae505a9eed503f8b8e6982036873e.woff2",
		"28b782240b3e76db824e12c02754a9731a167527": "/fee66e712a8a08eef5805a46892932ad.woff",
		"3eae595db11cb93e6f6e030c2bdd33547141b2b9": "/main.cd4c9b5561fd1e5bda2e.js",
		"4bb3760348cf66e067b1d83de10ae0c114654859": "/"
	},
	strategy: "changed",
	responseStrategy: "cache-first",
	version: "6/9/2018, 9:10:32 PM",
	name: "webpack-offline",
	pluginVersion: "4.8.1",
	relativePaths: false
};

!(function(e) {
	function t(r) {
		if (n[r]) return n[r].exports;
		var o = (n[r] = { i: r, l: !1, exports: {} });
		return e[r].call(o.exports, o, o.exports, t), (o.l = !0), o.exports;
	}
	var n = {};
	(t.m = e),
		(t.c = n),
		(t.d = function(e, n, r) {
			t.o(e, n) || Object.defineProperty(e, n, { configurable: !1, enumerable: !0, get: r });
		}),
		(t.n = function(e) {
			var n =
				e && e.__esModule
					? function() {
							return e.default;
					  }
					: function() {
							return e;
					  };
			return t.d(n, "a", n), n;
		}),
		(t.o = function(e, t) {
			return Object.prototype.hasOwnProperty.call(e, t);
		}),
		(t.p = "https://cdn.sailing-channels.com/"),
		t(
			(t.s =
				"./node_modules/offline-plugin/lib/misc/sw-loader.js?json=%7B%22data_var_name%22%3A%22__wpo%22%2C%22loaders%22%3A%5B%5D%2C%22cacheMaps%22%3A%5B%5D%7D!./node_modules/offline-plugin/tpls/empty-entry.js")
		);
})({
	"./node_modules/exports-loader/index.js?self.fetch!./node_modules/whatwg-fetch/fetch.js": function(
		e,
		t
	) {
		!(function() {
			"use strict";
			function e(e) {
				if (
					("string" != typeof e && (e = e.toString()),
					/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(e))
				)
					throw new TypeError("Invalid character in header field name");
				return e.toLowerCase();
			}
			function t(e) {
				return "string" != typeof e && (e = e.toString()), e;
			}
			function n(e) {
				(this.map = {}),
					e instanceof n
						? e.forEach(function(e, t) {
								this.append(t, e);
						  }, this)
						: e &&
						  Object.getOwnPropertyNames(e).forEach(function(t) {
								this.append(t, e[t]);
						  }, this);
			}
			function r(e) {
				if (e.bodyUsed) return Promise.reject(new TypeError("Already read"));
				e.bodyUsed = !0;
			}
			function o(e) {
				return new Promise(function(t, n) {
					(e.onload = function() {
						t(e.result);
					}),
						(e.onerror = function() {
							n(e.error);
						});
				});
			}
			function i(e) {
				var t = new FileReader();
				return t.readAsArrayBuffer(e), o(t);
			}
			function s(e) {
				var t = new FileReader();
				return t.readAsText(e), o(t);
			}
			function a() {
				return (
					(this.bodyUsed = !1),
					(this._initBody = function(e) {
						if (((this._bodyInit = e), "string" == typeof e)) this._bodyText = e;
						else if (d.blob && Blob.prototype.isPrototypeOf(e)) this._bodyBlob = e;
						else if (d.formData && FormData.prototype.isPrototypeOf(e))
							this._bodyFormData = e;
						else {
							if (e) throw new Error("unsupported BodyInit type");
							this._bodyText = "";
						}
					}),
					d.blob
						? ((this.blob = function() {
								var e = r(this);
								if (e) return e;
								if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
								if (this._bodyFormData)
									throw new Error("could not read FormData body as blob");
								return Promise.resolve(new Blob([this._bodyText]));
						  }),
						  (this.arrayBuffer = function() {
								return this.blob().then(i);
						  }),
						  (this.text = function() {
								var e = r(this);
								if (e) return e;
								if (this._bodyBlob) return s(this._bodyBlob);
								if (this._bodyFormData)
									throw new Error("could not read FormData body as text");
								return Promise.resolve(this._bodyText);
						  }))
						: (this.text = function() {
								var e = r(this);
								return e || Promise.resolve(this._bodyText);
						  }),
					d.formData &&
						(this.formData = function() {
							return this.text().then(f);
						}),
					(this.json = function() {
						return this.text().then(JSON.parse);
					}),
					this
				);
			}
			function u(e) {
				var t = e.toUpperCase();
				return p.indexOf(t) > -1 ? t : e;
			}
			function c(e, t) {
				if (
					((t = t || {}),
					(this.url = e),
					(this.credentials = t.credentials || "omit"),
					(this.headers = new n(t.headers)),
					(this.method = u(t.method || "GET")),
					(this.mode = t.mode || null),
					(this.referrer = null),
					("GET" === this.method || "HEAD" === this.method) && t.body)
				)
					throw new TypeError("Body not allowed for GET or HEAD requests");
				this._initBody(t.body);
			}
			function f(e) {
				var t = new FormData();
				return (
					e
						.trim()
						.split("&")
						.forEach(function(e) {
							if (e) {
								var n = e.split("="),
									r = n.shift().replace(/\+/g, " "),
									o = n.join("=").replace(/\+/g, " ");
								t.append(decodeURIComponent(r), decodeURIComponent(o));
							}
						}),
					t
				);
			}
			function l(e) {
				var t = new n();
				return (
					e
						.getAllResponseHeaders()
						.trim()
						.split("\n")
						.forEach(function(e) {
							var n = e.trim().split(":"),
								r = n.shift().trim(),
								o = n.join(":").trim();
							t.append(r, o);
						}),
					t
				);
			}
			function h(e, t) {
				t || (t = {}),
					this._initBody(e),
					(this.type = "default"),
					(this.url = null),
					(this.status = t.status),
					(this.ok = this.status >= 200 && this.status < 300),
					(this.statusText = t.statusText),
					(this.headers = t.headers instanceof n ? t.headers : new n(t.headers)),
					(this.url = t.url || "");
			}
			if (!self.fetch) {
				(n.prototype.append = function(n, r) {
					(n = e(n)), (r = t(r));
					var o = this.map[n];
					o || ((o = []), (this.map[n] = o)), o.push(r);
				}),
					(n.prototype.delete = function(t) {
						delete this.map[e(t)];
					}),
					(n.prototype.get = function(t) {
						var n = this.map[e(t)];
						return n ? n[0] : null;
					}),
					(n.prototype.getAll = function(t) {
						return this.map[e(t)] || [];
					}),
					(n.prototype.has = function(t) {
						return this.map.hasOwnProperty(e(t));
					}),
					(n.prototype.set = function(n, r) {
						this.map[e(n)] = [t(r)];
					}),
					(n.prototype.forEach = function(e, t) {
						Object.getOwnPropertyNames(this.map).forEach(function(n) {
							this.map[n].forEach(function(r) {
								e.call(t, r, n, this);
							}, this);
						}, this);
					});
				var d = {
						blob:
							"FileReader" in self &&
							"Blob" in self &&
							(function() {
								try {
									return new Blob(), !0;
								} catch (e) {
									return !1;
								}
							})(),
						formData: "FormData" in self
					},
					p = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
				a.call(c.prototype),
					a.call(h.prototype),
					(self.Headers = n),
					(self.Request = c),
					(self.Response = h),
					(self.fetch = function(e, t) {
						var n;
						return (
							(n = c.prototype.isPrototypeOf(e) && !t ? e : new c(e, t)),
							new Promise(function(e, t) {
								function r() {
									return "responseURL" in o
										? o.responseURL
										: /^X-Request-URL:/m.test(o.getAllResponseHeaders())
											? o.getResponseHeader("X-Request-URL")
											: void 0;
								}
								var o = new XMLHttpRequest();
								(o.onload = function() {
									var n = 1223 === o.status ? 204 : o.status;
									if (n < 100 || n > 599)
										return void t(new TypeError("Network request failed"));
									var i = {
											status: n,
											statusText: o.statusText,
											headers: l(o),
											url: r()
										},
										s = "response" in o ? o.response : o.responseText;
									e(new h(s, i));
								}),
									(o.onerror = function() {
										t(new TypeError("Network request failed"));
									}),
									o.open(n.method, n.url, !0),
									"include" === n.credentials && (o.withCredentials = !0),
									"responseType" in o && d.blob && (o.responseType = "blob"),
									n.headers.forEach(function(e, t) {
										o.setRequestHeader(t, e);
									}),
									o.send(void 0 === n._bodyInit ? null : n._bodyInit);
							})
						);
					}),
					(self.fetch.polyfill = !0);
			}
		})(),
			(e.exports = self.fetch);
	},
	"./node_modules/offline-plugin/lib/misc/sw-loader.js?json=%7B%22data_var_name%22%3A%22__wpo%22%2C%22loaders%22%3A%5B%5D%2C%22cacheMaps%22%3A%5B%5D%7D!./node_modules/offline-plugin/tpls/empty-entry.js": function(
		e,
		t,
		n
	) {
		"use strict";
		(function(t) {
			function r(e, t) {
				return caches
					.match(e, { cacheName: t })
					.then(function(n) {
						return s()
							? n
							: a(n).then(function(n) {
									return caches
										.open(t)
										.then(function(t) {
											return t.put(e, n);
										})
										.then(function() {
											return n;
										});
							  });
					})
					.catch(function() {});
			}
			function o(e, t) {
				return (
					e + (-1 !== e.indexOf("?") ? "&" : "?") + "__uncache=" + encodeURIComponent(t)
				);
			}
			function i(e) {
				return (
					"navigate" === e.mode ||
					e.headers.get("Upgrade-Insecure-Requests") ||
					-1 !== (e.headers.get("Accept") || "").indexOf("text/html")
				);
			}
			function s(e) {
				return !e || !e.redirected || !e.ok || "opaqueredirect" === e.type;
			}
			function a(e) {
				return s(e)
					? Promise.resolve(e)
					: ("body" in e ? Promise.resolve(e.body) : e.blob()).then(function(t) {
							return new Response(t, { headers: e.headers, status: e.status });
					  });
			}
			function u(e) {
				return Object.keys(e).reduce(function(t, n) {
					return (t[n] = e[n]), t;
				}, {});
			}
			function c(e, t) {
				console.groupCollapsed("[SW]:", e),
					t.forEach(function(e) {
						console.log("Asset:", e);
					}),
					console.groupEnd();
			}
			if (
				((function() {
					var e = ExtendableEvent.prototype.waitUntil,
						t = FetchEvent.prototype.respondWith,
						n = new WeakMap();
					(ExtendableEvent.prototype.waitUntil = function(t) {
						var r = this,
							o = n.get(r);
						return o
							? void o.push(Promise.resolve(t))
							: ((o = [Promise.resolve(t)]),
							  n.set(r, o),
							  e.call(
									r,
									Promise.resolve().then(function e() {
										var t = o.length;
										return Promise.all(
											o.map(function(e) {
												return e.catch(function() {});
											})
										).then(function() {
											return o.length != t
												? e()
												: (n.delete(r), Promise.all(o));
										});
									})
							  ));
					}),
						(FetchEvent.prototype.respondWith = function(e) {
							return this.waitUntil(e), t.call(this, e);
						});
				})(),
				void 0 === f)
			)
				var f = !1;
			!(function(e, n) {
				function s() {
					if (!P.additional.length) return Promise.resolve();
					f && console.log("[SW]:", "Caching additional");
					var e = void 0;
					return (
						(e = "changed" === O ? h("additional") : l("additional")),
						e.catch(function(e) {
							console.error("[SW]:", "Cache section `additional` failed to load");
						})
					);
				}
				function l(t) {
					var n = P[t];
					return caches
						.open(S)
						.then(function(t) {
							return b(t, n, { bust: e.version, request: e.prefetchRequest });
						})
						.then(function() {
							c("Cached assets: " + t, n);
						})
						.catch(function(e) {
							throw (console.error(e), e);
						});
				}
				function h(t) {
					return p().then(function(n) {
						if (!n) return l(t);
						var r = n[0],
							o = n[1],
							i = n[2],
							s = i.hashmap,
							a = i.version;
						if (!i.hashmap || a === e.version) return l(t);
						var u = Object.keys(s).map(function(e) {
								return s[e];
							}),
							f = o.map(function(e) {
								var t = new URL(e.url);
								return (t.search = ""), t.toString();
							}),
							h = P[t],
							d = [],
							p = h.filter(function(e) {
								return -1 === f.indexOf(e) || -1 === u.indexOf(e);
							});
						Object.keys(k).forEach(function(e) {
							var t = k[e];
							if (-1 !== h.indexOf(t) && -1 === p.indexOf(t) && -1 === d.indexOf(t)) {
								var n = s[e];
								n && -1 !== f.indexOf(n) ? d.push([n, t]) : p.push(t);
							}
						}),
							c("Changed assets: " + t, p),
							c("Moved assets: " + t, d);
						var m = Promise.all(
							d.map(function(e) {
								return r.match(e[0]).then(function(t) {
									return [e[1], t];
								});
							})
						);
						return caches.open(S).then(function(t) {
							var n = m.then(function(e) {
								return Promise.all(
									e.map(function(e) {
										return t.put(e[0], e[1]);
									})
								);
							});
							return Promise.all([
								n,
								b(t, p, { bust: e.version, request: e.prefetchRequest })
							]);
						});
					});
				}
				function d() {
					return caches.keys().then(function(e) {
						var t = e.map(function(e) {
							if (0 === e.indexOf(L) && 0 !== e.indexOf(S))
								return console.log("[SW]:", "Delete cache:", e), caches.delete(e);
						});
						return Promise.all(t);
					});
				}
				function p() {
					return caches.keys().then(function(e) {
						for (
							var t = e.length, n = void 0;
							t-- && ((n = e[t]), 0 !== n.indexOf(L));

						);
						if (n) {
							var r = void 0;
							return caches
								.open(n)
								.then(function(e) {
									return (r = e), e.match(new URL(q, location).toString());
								})
								.then(function(e) {
									if (e) return Promise.all([r, r.keys(), e.json()]);
								});
						}
					});
				}
				function m() {
					return caches.open(S).then(function(t) {
						var n = new Response(JSON.stringify({ version: e.version, hashmap: k }));
						return t.put(new URL(q, location).toString(), n);
					});
				}
				function v(e, n, o) {
					return r(o, S).then(function(r) {
						return r
							? (f && console.log("[SW]:", "URL [" + o + "](" + n + ") from cache"),
							  r)
							: t(e.request).then(function(t) {
									return t.ok
										? (f &&
												console.log(
													"[SW]:",
													"URL [" + n + "] from network"
												),
										  o === n &&
												(function() {
													var r = t.clone(),
														o = caches
															.open(S)
															.then(function(e) {
																return e.put(n, r);
															})
															.then(function() {
																console.log(
																	"[SW]:",
																	"Cache asset: " + n
																);
															});
													e.waitUntil(o);
												})(),
										  t)
										: (f &&
												console.log(
													"[SW]:",
													"URL [" +
														n +
														"] wrong response: [" +
														t.status +
														"] " +
														t.type
												),
										  t);
							  });
					});
				}
				function y(e, n, o) {
					return t(e.request)
						.then(function(e) {
							if (e.ok)
								return f && console.log("[SW]:", "URL [" + n + "] from network"), e;
							throw new Error("Response is not ok");
						})
						.catch(function() {
							return (
								f && console.log("[SW]:", "URL [" + n + "] from cache if possible"),
								r(o, S)
							);
						});
				}
				function g(e) {
					return e.catch(function() {}).then(function(e) {
						var t = e && e.ok,
							n = e && "opaqueredirect" === e.type;
						return t || (n && !B)
							? e
							: (f &&
									console.log(
										"[SW]:",
										"Loading navigation fallback [" + W + "] from cache"
									),
							  r(W, S));
					});
				}
				function b(e, n, r) {
					var i = !1 !== r.allowLoaders,
						s = r && r.bust,
						c = r.request || { credentials: "omit", mode: "cors" };
					return Promise.all(
						n.map(function(e) {
							return s && (e = o(e, s)), t(e, c).then(a);
						})
					).then(function(t) {
						if (
							t.some(function(e) {
								return !e.ok;
							})
						)
							return Promise.reject(new Error("Wrong response status"));
						var o = [],
							s = t.map(function(t, r) {
								return i && o.push(w(n[r], t)), e.put(n[r], t);
							});
						return (
							o.length
								? (function() {
										var t = u(r);
										t.allowLoaders = !1;
										var i = s;
										s = Promise.all(o).then(function(r) {
											var o = [].concat.apply([], r);
											return (
												n.length && (i = i.concat(b(e, o, t))),
												Promise.all(i)
											);
										});
								  })()
								: (s = Promise.all(s)),
							s
						);
					});
				}
				function w(e, t) {
					var n = Object.keys(U)
						.map(function(n) {
							if (-1 !== U[n].indexOf(e) && _[n]) return _[n](t.clone());
						})
						.filter(function(e) {
							return !!e;
						});
					return Promise.all(n).then(function(e) {
						return [].concat.apply([], e);
					});
				}
				function x(e) {
					var t = e.url,
						n = new URL(t),
						r = void 0;
					r =
						"navigate" === e.mode
							? "navigate"
							: n.origin === location.origin
								? "same-origin"
								: "cross-origin";
					for (var o = 0; o < E.length; o++) {
						var i = E[o];
						if (i && (!i.requestTypes || -1 !== i.requestTypes.indexOf(r))) {
							var s = void 0;
							if (
								(s =
									"function" == typeof i.match
										? i.match(n, e)
										: t.replace(i.match, i.to)) &&
								s !== t
							)
								return s;
						}
					}
				}
				var _ = n.loaders,
					E = n.cacheMaps,
					O = e.strategy,
					R = e.responseStrategy,
					P = e.assets,
					U = e.loaders || {},
					k = e.hashesMap,
					j = e.externals,
					L = e.name,
					T = e.version,
					S = L + ":" + T,
					q = "__offline_webpack__data";
				!(function() {
					Object.keys(P).forEach(function(e) {
						P[e] = P[e].map(function(e) {
							var t = new URL(e, location);
							return (
								-1 === j.indexOf(e) ? (t.search = "") : (t.hash = ""), t.toString()
							);
						});
					}),
						Object.keys(U).forEach(function(e) {
							U[e] = U[e].map(function(e) {
								var t = new URL(e, location);
								return (
									-1 === j.indexOf(e) ? (t.search = "") : (t.hash = ""),
									t.toString()
								);
							});
						}),
						(k = Object.keys(k).reduce(function(e, t) {
							var n = new URL(k[t], location);
							return (n.search = ""), (e[t] = n.toString()), e;
						}, {})),
						(j = j.map(function(e) {
							var t = new URL(e, location);
							return (t.hash = ""), t.toString();
						}));
				})();
				var D = [].concat(P.main, P.additional, P.optional),
					W = e.navigateFallbackURL,
					B = e.navigateFallbackForRedirects;
				self.addEventListener("install", function(e) {
					console.log("[SW]:", "Install event");
					var t = void 0;
					(t = "changed" === O ? h("main") : l("main")), e.waitUntil(t);
				}),
					self.addEventListener("activate", function(e) {
						console.log("[SW]:", "Activate event");
						var t = s();
						(t = t.then(m)),
							(t = t.then(d)),
							(t = t.then(function() {
								if (self.clients && self.clients.claim) return self.clients.claim();
							})),
							e.waitUntil(t);
					}),
					self.addEventListener("fetch", function(e) {
						var n = e.request.url,
							r = new URL(n),
							o = void 0;
						-1 !== j.indexOf(n) ? (o = n) : ((r.search = ""), (o = r.toString()));
						var s = "GET" === e.request.method,
							a = -1 !== D.indexOf(o),
							u = o;
						if (!a) {
							var c = x(e.request);
							c && ((u = c), (a = !0));
						}
						if (!a && s && W && i(e.request))
							return void e.respondWith(g(t(e.request)));
						if (!a || !s)
							return void (
								r.origin !== location.origin &&
								-1 !== navigator.userAgent.indexOf("Firefox/44.") &&
								e.respondWith(t(e.request))
							);
						var f = void 0;
						(f = "network-first" === R ? y(e, o, u) : v(e, o, u)),
							W && i(e.request) && (f = g(f)),
							e.respondWith(f);
					}),
					self.addEventListener("message", function(e) {
						var t = e.data;
						if (t)
							switch (t.action) {
								case "skipWaiting":
									self.skipWaiting && self.skipWaiting();
							}
					});
			})(__wpo, { loaders: {}, cacheMaps: [] }),
				(e.exports = n("./node_modules/offline-plugin/tpls/empty-entry.js"));
		}.call(
			t,
			n(
				"./node_modules/exports-loader/index.js?self.fetch!./node_modules/whatwg-fetch/fetch.js"
			)
		));
	},
	"./node_modules/offline-plugin/tpls/empty-entry.js": function(e, t) {}
});
