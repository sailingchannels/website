webpackJsonp([1, 19], {
	"./app/actions/VideoActions.js": function(e, t, n) {
		"use strict";
		function o(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
		}
		var a = n("./app/alt.js"),
			r = n("./node_modules/jquery/dist/jquery.js"),
			i = n.n(r),
			s = (function() {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var o = t[n];
						(o.enumerable = o.enumerable || !1),
							(o.configurable = !0),
							"value" in o && (o.writable = !0),
							Object.defineProperty(e, o.key, o);
					}
				}
				return function(t, n, o) {
					return n && e(t.prototype, n), o && e(t, o), t;
				};
			})(),
			c = (function() {
				function e() {
					o(this, e),
						this.generateActions(
							"getVideosSuccess",
							"getVideosFail",
							"getVideoSuccess",
							"getVideoFail"
						);
				}
				return (
					s(e, [
						{
							key: "getVideos",
							value: function(e, t, n) {
								var o = this;
								i.a
									.ajax({
										url:
											"/api/channel/get/" +
											e +
											"/videos?skip=" +
											t +
											"&take=" +
											n,
										type: "GET",
										dataType: "json",
										cache: !0
									})
									.done(function(e) {
										o.actions.getVideosSuccess(e);
									})
									.fail(function(e) {
										o.actions.getVideosFail(e);
									});
							}
						},
						{
							key: "getVideo",
							value: function(e) {
								var t = this;
								i.a
									.ajax({
										url: "/api/video/get/" + e,
										type: "GET",
										dataType: "json",
										cache: !0
									})
									.done(function(e) {
										t.actions.getVideoSuccess(e);
									})
									.fail(function(e) {
										t.actions.getVideoFail(e);
									});
							}
						}
					]),
					e
				);
			})();
		t.a = a.a.createActions(c);
	},
	"./app/components/Description/Loadable.js": function(e, t, n) {
		"use strict";
		var o = n("./node_modules/react-loadable/lib/index.js"),
			a = n.n(o);
		t.a = a()({
			loader: function() {
				return n.e(18).then(n.bind(null, "./app/components/Description/index.js"));
			},
			loading: function() {
				return null;
			}
		});
	},
	"./app/components/SubscribeButton/Loadable.js": function(e, t, n) {
		"use strict";
		var o = n("./node_modules/react-loadable/lib/index.js"),
			a = n.n(o);
		t.a = a()({
			loader: function() {
				return n.e(28).then(n.bind(null, "./app/components/SubscribeButton/index.js"));
			},
			loading: function() {
				return null;
			}
		});
	},
	"./app/components/VideoDetail/VideoDetail.css": function(e, t, n) {
		var o = n(
			"./node_modules/css-loader/index.js!./app/components/VideoDetail/VideoDetail.css"
		);
		"string" == typeof o && (o = [[e.i, o, ""]]);
		var a = {};
		a.transform = void 0;
		n("./node_modules/style-loader/lib/addStyles.js")(o, a);
		o.locals && (e.exports = o.locals);
	},
	"./app/components/VideoDetail/index.js": function(e, t, n) {
		"use strict";
		function o(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
		}
		function a(e, t) {
			if (!e)
				throw new ReferenceError(
					"this hasn't been initialised - super() hasn't been called"
				);
			return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
		}
		function r(e, t) {
			if ("function" != typeof t && null !== t)
				throw new TypeError(
					"Super expression must either be null or a function, not " + typeof t
				);
			(e.prototype = Object.create(t && t.prototype, {
				constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 }
			})),
				t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
		}
		Object.defineProperty(t, "__esModule", { value: !0 });
		var i = n("./node_modules/react/index.js"),
			s = n.n(i),
			c = n("./node_modules/react-helmet/lib/Helmet.js"),
			l = n.n(c),
			u = n("./app/components/OffsetMenu/index.js"),
			d = n("./app/components/VideoList/index.js"),
			f = n("./app/actions/VideoActions.js"),
			p = n("./app/stores/VideoStore.js"),
			m = n("./app/components/OffsetSocial/index.js"),
			h = n("./app/components/Logo/index.js"),
			b = n("./node_modules/react-router-dom/index.js"),
			g = (n.n(b), n("./app/components/SubscribeButton/Loadable.js")),
			v = n("./node_modules/anchorme/dist-node/index.js"),
			y = n.n(v),
			T = n("./app/components/VideoDetail/VideoDetail.css"),
			x = (n.n(T),
			(function() {
				var e =
					("function" == typeof Symbol && Symbol.for && Symbol.for("react.element")) ||
					60103;
				return function(t, n, o, a) {
					var r = t && t.defaultProps,
						i = arguments.length - 3;
					if ((n || 0 === i || (n = {}), n && r))
						for (var s in r) void 0 === n[s] && (n[s] = r[s]);
					else n || (n = r || {});
					if (1 === i) n.children = a;
					else if (i > 1) {
						for (var c = Array(i), l = 0; l < i; l++) c[l] = arguments[l + 3];
						n.children = c;
					}
					return {
						$$typeof: e,
						type: t,
						key: void 0 === o ? null : "" + o,
						ref: null,
						props: n,
						_owner: null
					};
				};
			})()),
			E = (function() {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var o = t[n];
						(o.enumerable = o.enumerable || !1),
							(o.configurable = !0),
							"value" in o && (o.writable = !0),
							Object.defineProperty(e, o.key, o);
					}
				}
				return function(t, n, o) {
					return n && e(t.prototype, n), o && e(t, o), t;
				};
			})(),
			_ = x(m.a, {}),
			w = x(h.a, { className: "hidden-xs hidden-sm" }),
			k = x(u.a, {}),
			A = x("div", { className: "col-md-1" }),
			j = x("p", {}, void 0, " "),
			S = x("p", {}, void 0, x("b", {}, void 0, "Other videos:")),
			O = x("b", {}, void 0, "Views:"),
			P = x("b", {}, void 0, "Likes:"),
			N = x("i", { className: "fa fa-thumbs-up fa-fw" }),
			M = x("i", { className: "fa fa-thumbs-down fa-fw" }),
			R = x("b", {}, void 0, "Uploaded:"),
			C = x("p", {}, void 0, " "),
			L = x("b", {}, void 0, "Channel:"),
			I = x("div", { className: "col-md-1" }),
			G = x("p", {}, void 0, " "),
			q = (function(e) {
				function t(e) {
					o(this, t);
					var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
					return (n.state = p.a.getState()), (n.onChange = n.onChange.bind(n)), n;
				}
				return (
					r(t, e),
					E(t, [
						{
							key: "componentDidMount",
							value: function() {
								p.a.listen(this.onChange), f.a.getVideo(this.props.match.params.id);
							}
						},
						{
							key: "componentWillReceiveProps",
							value: function(e) {
								e.params.id !== this.props.match.params.id &&
									f.a.getVideo(e.params.id);
							}
						},
						{
							key: "componentWillUnmount",
							value: function() {
								p.a.unlisten(this.onChange);
							}
						},
						{
							key: "onChange",
							value: function(e) {
								this.setState(e);
							}
						},
						{
							key: "formatDate",
							value: function(e) {
								var t = [
										"Jan",
										"Feb",
										"Mar",
										"Apr",
										"May",
										"Jun",
										"Jul",
										"Aug",
										"Sep",
										"Oct",
										"Nov",
										"Dec"
									],
									n = new Date(1e3 * e);
								return t[n.getMonth()] + " " + n.getDate() + ", " + n.getFullYear();
							}
						},
						{
							key: "render",
							value: function() {
								return this.state.video
									? x(
											"div",
											{ className: "container" },
											void 0,
											x(l.a, { title: this.state.video.title }),
											_,
											w,
											k,
											x(
												"div",
												{ className: "row" },
												void 0,
												A,
												x(
													"div",
													{ className: "col-md-10" },
													void 0,
													x(
														"div",
														{ className: "row" },
														void 0,
														x(
															"div",
															{ className: "col-md-12" },
															void 0,
															x(
																"center",
																{},
																void 0,
																x(
																	"h1",
																	{
																		className:
																			"video-detail-title"
																	},
																	void 0,
																	this.state.video.title
																)
															)
														)
													),
													x(
														"div",
														{ className: "row" },
														void 0,
														x(
															"div",
															{ className: "col-md-2 col-sm-2" },
															void 0,
															x("img", {
																src: this.state.video.channel
																	.thumbnail,
																className: "channel-thumb"
															})
														),
														x(
															"div",
															{ className: "col-md-7 col-sm-7" },
															void 0,
															x("iframe", {
																width: "100%",
																height: "315",
																src:
																	"https://www.youtube.com/embed/" +
																	this.state.video._id +
																	"?origin=https://sailing-channels.com",
																frameBorder: "0",
																allowFullScreen: !0
															}),
															x("p", {
																className: "channel-description",
																dangerouslySetInnerHTML: {
																	__html: y()(
																		this.state.video.description.replace(
																			"\n",
																			"<br />"
																		),
																		{ target: "_blank" }
																	)
																}
															}),
															j,
															S,
															x(d.default, {
																channel: this.state.video.channel
															})
														),
														x(
															"div",
															{ className: "col-md-3 col-sm-3" },
															void 0,
															x(
																"p",
																{},
																void 0,
																O,
																" ",
																(
																	this.state.video.views || 0
																).toLocaleString()
															),
															x(
																"p",
																{},
																void 0,
																P,
																" ",
																N,
																" ",
																(
																	this.state.video.likes || 0
																).toLocaleString(),
																" ",
																M,
																" ",
																(
																	this.state.video.dislikes || 0
																).toLocaleString()
															),
															x(
																"p",
																{},
																void 0,
																R,
																" ",
																this.formatDate(
																	this.state.video.publishedAt
																)
															),
															C,
															x(
																"p",
																{},
																void 0,
																L,
																" ",
																x(
																	b.Link,
																	{
																		to:
																			"/channel/" +
																			this.state.video.channel
																				._id
																	},
																	void 0,
																	this.state.video.channel.title
																)
															),
															x(g.a, {
																channel: this.state.video.channel
															})
														)
													)
												),
												I
											),
											G
									  )
									: null;
							}
						}
					]),
					t
				);
			})(s.a.Component);
		t.default = q;
	},
	"./app/components/VideoList/index.js": function(e, t, n) {
		"use strict";
		function o(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
		}
		function a(e, t) {
			if (!e)
				throw new ReferenceError(
					"this hasn't been initialised - super() hasn't been called"
				);
			return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
		}
		function r(e, t) {
			if ("function" != typeof t && null !== t)
				throw new TypeError(
					"Super expression must either be null or a function, not " + typeof t
				);
			(e.prototype = Object.create(t && t.prototype, {
				constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 }
			})),
				t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
		}
		Object.defineProperty(t, "__esModule", { value: !0 });
		var i = n("./node_modules/react/index.js"),
			s = n.n(i),
			c = (n("./app/components/VideoListItem/Loadable.js"),
			n("./app/actions/VideoActions.js")),
			l = n("./app/stores/VideoStore.js"),
			u = n("./app/components/Description/Loadable.js"),
			d = n("./node_modules/react-router-dom/index.js"),
			f = (n.n(d), n("./node_modules/react-lazyload/lib/index.js")),
			p = n.n(f),
			m = (function() {
				var e =
					("function" == typeof Symbol && Symbol.for && Symbol.for("react.element")) ||
					60103;
				return function(t, n, o, a) {
					var r = t && t.defaultProps,
						i = arguments.length - 3;
					if ((n || 0 === i || (n = {}), n && r))
						for (var s in r) void 0 === n[s] && (n[s] = r[s]);
					else n || (n = r || {});
					if (1 === i) n.children = a;
					else if (i > 1) {
						for (var c = Array(i), l = 0; l < i; l++) c[l] = arguments[l + 3];
						n.children = c;
					}
					return {
						$$typeof: e,
						type: t,
						key: void 0 === o ? null : "" + o,
						ref: null,
						props: n,
						_owner: null
					};
				};
			})(),
			h = (function() {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var o = t[n];
						(o.enumerable = o.enumerable || !1),
							(o.configurable = !0),
							"value" in o && (o.writable = !0),
							Object.defineProperty(e, o.key, o);
					}
				}
				return function(t, n, o) {
					return n && e(t.prototype, n), o && e(t, o), t;
				};
			})(),
			b = m("i", { className: "fa fa-eye" }),
			g = m("i", { className: "fa fa-thumbs-up" }),
			v = m("i", { className: "fa fa-thumbs-down" }),
			y = m("i", { className: "fa fa-arrow-left" }),
			T = m("i", { className: "fa fa-arrow-right" }),
			x = (function(e) {
				function t(e) {
					o(this, t);
					var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
					return (n.state = l.a.getState()), (n.onChange = n.onChange.bind(n)), n;
				}
				return (
					r(t, e),
					h(t, [
						{
							key: "componentDidMount",
							value: function() {
								l.a.listen(this.onChange),
									c.a.getVideos(
										this.props.channel._id,
										this.state.skip,
										this.state.take
									);
							}
						},
						{
							key: "componentWillReceiveProps",
							value: function(e) {
								if (e.channel._id !== this.props.channel._id) {
									var t = { videos: [], skip: 0, take: this.state.take };
									this.setState(t), c.a.getVideos(e.channel._id, t.skip, t.take);
								}
							}
						},
						{
							key: "componentWillUnmount",
							value: function() {
								l.a.unlisten(this.onChange);
							}
						},
						{
							key: "onChange",
							value: function(e) {
								this.setState(e);
							}
						},
						{
							key: "formatDate",
							value: function(e) {
								var t = [
										"Jan",
										"Feb",
										"Mar",
										"Apr",
										"May",
										"Jun",
										"Jul",
										"Aug",
										"Sep",
										"Oct",
										"Nov",
										"Dec"
									],
									n = new Date(1e3 * e);
								return t[n.getMonth()] + " " + n.getDate() + ", " + n.getFullYear();
							}
						},
						{
							key: "next",
							value: function() {
								var e = {
									videos: [],
									skip: this.state.skip + this.state.take,
									take: this.state.take
								};
								this.setState(e),
									c.a.getVideos(this.props.channel._id, e.skip, e.take);
							}
						},
						{
							key: "prev",
							value: function() {
								var e = {
									videos: [],
									skip: this.state.skip - this.state.take,
									take: this.state.take
								};
								this.setState(e),
									c.a.getVideos(this.props.channel._id, e.skip, e.take);
							}
						},
						{
							key: "render",
							value: function() {
								var e = this;
								return m(
									"div",
									{},
									void 0,
									this.state.videos.map(function(t) {
										return m(
											"div",
											{ className: "row channel-row" },
											t._id,
											m(
												"div",
												{ className: "col-md-3 col-xs-3" },
												void 0,
												m(
													"center",
													{},
													void 0,
													m(
														p.a,
														{},
														void 0,
														m("img", {
															src:
																"https://img.youtube.com/vi/" +
																t._id +
																"/default.jpg",
															className: "channel-thumb"
														})
													)
												)
											),
											m(
												"div",
												{ className: "col-md-9 col-xs-9" },
												void 0,
												m(
													"h3",
													{},
													void 0,
													m(
														d.Link,
														{ to: "/video/" + t._id },
														void 0,
														t.title
													)
												),
												m(
													"p",
													{},
													void 0,
													e.formatDate(t.publishedAt),
													" ·",
													" ",
													b,
													" ",
													t.views,
													" ·",
													" ",
													g,
													" ",
													t.likes,
													" ·",
													" ",
													v,
													" ",
													t.dislikes
												),
												m(u.a, { text: t.description, video: !0 })
											)
										);
									}),
									m(
										"div",
										{ className: "row" },
										void 0,
										m(
											"div",
											{ className: "col-md-6 col-xs-6 text-left" },
											void 0,
											this.state.skip > 0
												? m(
														"a",
														{
															className: "btn btn-raised",
															onClick: this.prev.bind(this)
														},
														void 0,
														y,
														" Previous"
												  )
												: null
										),
										m(
											"div",
											{ className: "col-md-6 col-xs-6 text-right" },
											void 0,
											!1 === this.state.fin
												? m(
														"a",
														{
															className: "btn btn-raised",
															onClick: this.next.bind(this)
														},
														void 0,
														"Next ",
														T
												  )
												: null
										)
									)
								);
							}
						}
					]),
					t
				);
			})(s.a.Component);
		t.default = x;
	},
	"./app/components/VideoListItem/Loadable.js": function(e, t, n) {
		"use strict";
		var o = n("./node_modules/react-loadable/lib/index.js"),
			a = n.n(o);
		t.a = a()({
			loader: function() {
				return n.e(23).then(n.bind(null, "./app/components/VideoListItem/index.js"));
			},
			loading: function() {
				return null;
			}
		});
	},
	"./app/stores/VideoStore.js": function(e, t, n) {
		"use strict";
		function o(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
		}
		var a = n("./app/alt.js"),
			r = n("./app/actions/VideoActions.js"),
			i = (function() {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var o = t[n];
						(o.enumerable = o.enumerable || !1),
							(o.configurable = !0),
							"value" in o && (o.writable = !0),
							Object.defineProperty(e, o.key, o);
					}
				}
				return function(t, n, o) {
					return n && e(t.prototype, n), o && e(t, o), t;
				};
			})(),
			s = (function() {
				function e() {
					o(this, e),
						this.bindActions(r.a),
						(this.videos = []),
						(this.video = null),
						(this.skip = 0),
						(this.take = 5),
						(this.fin = !1);
				}
				return (
					i(e, [
						{
							key: "getVideosSuccess",
							value: function(e) {
								(this.videos = e.data),
									(this.skip = e.skip),
									(this.take = e.take),
									(this.fin = e.fin);
							}
						},
						{
							key: "getVideosFail",
							value: function(e) {
								console.error(
									(e.responseJSON && e.responseJSON.message) ||
										e.responseText ||
										e.statusText
								);
							}
						},
						{
							key: "getVideoSuccess",
							value: function(e) {
								(this.video = e), (this.video.channel.id = this.video.channel._id);
							}
						},
						{
							key: "getVideoFail",
							value: function(e) {
								location.href = "/404";
							}
						}
					]),
					e
				);
			})();
		t.a = a.a.createStore(s);
	},
	"./node_modules/anchorme/dist-node/index.js": function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", { value: !0 });
		var o = n("./node_modules/anchorme/dist-node/util.js"),
			a = n("./node_modules/anchorme/dist-node/tests/email.js"),
			r = n("./node_modules/anchorme/dist-node/tests/ip.js"),
			i = n("./node_modules/anchorme/dist-node/tests/url.js"),
			s = n("./node_modules/anchorme/dist-node/transform/transform.js"),
			c = n("./node_modules/anchorme/dist-node/tests/hasprotocol.js"),
			l = function(e, t) {
				return (t = o.defaultOptions(t)), s.default(e, t);
			};
		(l.validate = {
			ip: r.default,
			url: function(e) {
				var t = c.default(e) || "";
				return (e = e.substr(t.length)), (e = encodeURI(e)), i.default(e);
			},
			email: a.default
		}),
			(t.default = l);
	},
	"./node_modules/anchorme/dist-node/lists.js": function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", { value: !0 }),
			(t.tlds = [
				"com",
				"org",
				"net",
				"uk",
				"gov",
				"edu",
				"io",
				"cc",
				"co",
				"aaa",
				"aarp",
				"abarth",
				"abb",
				"abbott",
				"abbvie",
				"abc",
				"able",
				"abogado",
				"abudhabi",
				"ac",
				"academy",
				"accenture",
				"accountant",
				"accountants",
				"aco",
				"active",
				"actor",
				"ad",
				"adac",
				"ads",
				"adult",
				"ae",
				"aeg",
				"aero",
				"aetna",
				"af",
				"afamilycompany",
				"afl",
				"africa",
				"ag",
				"agakhan",
				"agency",
				"ai",
				"aig",
				"aigo",
				"airbus",
				"airforce",
				"airtel",
				"akdn",
				"al",
				"alfaromeo",
				"alibaba",
				"alipay",
				"allfinanz",
				"allstate",
				"ally",
				"alsace",
				"alstom",
				"am",
				"americanexpress",
				"americanfamily",
				"amex",
				"amfam",
				"amica",
				"amsterdam",
				"analytics",
				"android",
				"anquan",
				"anz",
				"ao",
				"aol",
				"apartments",
				"app",
				"apple",
				"aq",
				"aquarelle",
				"ar",
				"aramco",
				"archi",
				"army",
				"arpa",
				"art",
				"arte",
				"as",
				"asda",
				"asia",
				"associates",
				"at",
				"athleta",
				"attorney",
				"au",
				"auction",
				"audi",
				"audible",
				"audio",
				"auspost",
				"author",
				"auto",
				"autos",
				"avianca",
				"aw",
				"aws",
				"ax",
				"axa",
				"az",
				"azure",
				"ba",
				"baby",
				"baidu",
				"banamex",
				"bananarepublic",
				"band",
				"bank",
				"bar",
				"barcelona",
				"barclaycard",
				"barclays",
				"barefoot",
				"bargains",
				"baseball",
				"basketball",
				"bauhaus",
				"bayern",
				"bb",
				"bbc",
				"bbt",
				"bbva",
				"bcg",
				"bcn",
				"bd",
				"be",
				"beats",
				"beauty",
				"beer",
				"bentley",
				"berlin",
				"best",
				"bestbuy",
				"bet",
				"bf",
				"bg",
				"bh",
				"bharti",
				"bi",
				"bible",
				"bid",
				"bike",
				"bing",
				"bingo",
				"bio",
				"biz",
				"bj",
				"black",
				"blackfriday",
				"blanco",
				"blockbuster",
				"blog",
				"bloomberg",
				"blue",
				"bm",
				"bms",
				"bmw",
				"bn",
				"bnl",
				"bnpparibas",
				"bo",
				"boats",
				"boehringer",
				"bofa",
				"bom",
				"bond",
				"boo",
				"book",
				"booking",
				"boots",
				"bosch",
				"bostik",
				"boston",
				"bot",
				"boutique",
				"box",
				"br",
				"bradesco",
				"bridgestone",
				"broadway",
				"broker",
				"brother",
				"brussels",
				"bs",
				"bt",
				"budapest",
				"bugatti",
				"build",
				"builders",
				"business",
				"buy",
				"buzz",
				"bv",
				"bw",
				"by",
				"bz",
				"bzh",
				"ca",
				"cab",
				"cafe",
				"cal",
				"call",
				"calvinklein",
				"cam",
				"camera",
				"camp",
				"cancerresearch",
				"canon",
				"capetown",
				"capital",
				"capitalone",
				"car",
				"caravan",
				"cards",
				"care",
				"career",
				"careers",
				"cars",
				"cartier",
				"casa",
				"case",
				"caseih",
				"cash",
				"casino",
				"cat",
				"catering",
				"catholic",
				"cba",
				"cbn",
				"cbre",
				"cbs",
				"cd",
				"ceb",
				"center",
				"ceo",
				"cern",
				"cf",
				"cfa",
				"cfd",
				"cg",
				"ch",
				"chanel",
				"channel",
				"chase",
				"chat",
				"cheap",
				"chintai",
				"chloe",
				"christmas",
				"chrome",
				"chrysler",
				"church",
				"ci",
				"cipriani",
				"circle",
				"cisco",
				"citadel",
				"citi",
				"citic",
				"city",
				"cityeats",
				"ck",
				"cl",
				"claims",
				"cleaning",
				"click",
				"clinic",
				"clinique",
				"clothing",
				"cloud",
				"club",
				"clubmed",
				"cm",
				"cn",
				"coach",
				"codes",
				"coffee",
				"college",
				"cologne",
				"comcast",
				"commbank",
				"community",
				"company",
				"compare",
				"computer",
				"comsec",
				"condos",
				"construction",
				"consulting",
				"contact",
				"contractors",
				"cooking",
				"cookingchannel",
				"cool",
				"coop",
				"corsica",
				"country",
				"coupon",
				"coupons",
				"courses",
				"cr",
				"credit",
				"creditcard",
				"creditunion",
				"cricket",
				"crown",
				"crs",
				"cruise",
				"cruises",
				"csc",
				"cu",
				"cuisinella",
				"cv",
				"cw",
				"cx",
				"cy",
				"cymru",
				"cyou",
				"cz",
				"dabur",
				"dad",
				"dance",
				"data",
				"date",
				"dating",
				"datsun",
				"day",
				"dclk",
				"dds",
				"de",
				"deal",
				"dealer",
				"deals",
				"degree",
				"delivery",
				"dell",
				"deloitte",
				"delta",
				"democrat",
				"dental",
				"dentist",
				"desi",
				"design",
				"dev",
				"dhl",
				"diamonds",
				"diet",
				"digital",
				"direct",
				"directory",
				"discount",
				"discover",
				"dish",
				"diy",
				"dj",
				"dk",
				"dm",
				"dnp",
				"do",
				"docs",
				"doctor",
				"dodge",
				"dog",
				"doha",
				"domains",
				"dot",
				"download",
				"drive",
				"dtv",
				"dubai",
				"duck",
				"dunlop",
				"duns",
				"dupont",
				"durban",
				"dvag",
				"dvr",
				"dz",
				"earth",
				"eat",
				"ec",
				"eco",
				"edeka",
				"education",
				"ee",
				"eg",
				"email",
				"emerck",
				"energy",
				"engineer",
				"engineering",
				"enterprises",
				"epost",
				"epson",
				"equipment",
				"er",
				"ericsson",
				"erni",
				"es",
				"esq",
				"estate",
				"esurance",
				"et",
				"eu",
				"eurovision",
				"eus",
				"events",
				"everbank",
				"exchange",
				"expert",
				"exposed",
				"express",
				"extraspace",
				"fage",
				"fail",
				"fairwinds",
				"faith",
				"family",
				"fan",
				"fans",
				"farm",
				"farmers",
				"fashion",
				"fast",
				"fedex",
				"feedback",
				"ferrari",
				"ferrero",
				"fi",
				"fiat",
				"fidelity",
				"fido",
				"film",
				"final",
				"finance",
				"financial",
				"fire",
				"firestone",
				"firmdale",
				"fish",
				"fishing",
				"fit",
				"fitness",
				"fj",
				"fk",
				"flickr",
				"flights",
				"flir",
				"florist",
				"flowers",
				"fly",
				"fm",
				"fo",
				"foo",
				"food",
				"foodnetwork",
				"football",
				"ford",
				"forex",
				"forsale",
				"forum",
				"foundation",
				"fox",
				"fr",
				"free",
				"fresenius",
				"frl",
				"frogans",
				"frontdoor",
				"frontier",
				"ftr",
				"fujitsu",
				"fujixerox",
				"fun",
				"fund",
				"furniture",
				"futbol",
				"fyi",
				"ga",
				"gal",
				"gallery",
				"gallo",
				"gallup",
				"game",
				"games",
				"gap",
				"garden",
				"gb",
				"gbiz",
				"gd",
				"gdn",
				"ge",
				"gea",
				"gent",
				"genting",
				"george",
				"gf",
				"gg",
				"ggee",
				"gh",
				"gi",
				"gift",
				"gifts",
				"gives",
				"giving",
				"gl",
				"glade",
				"glass",
				"gle",
				"global",
				"globo",
				"gm",
				"gmail",
				"gmbh",
				"gmo",
				"gmx",
				"gn",
				"godaddy",
				"gold",
				"goldpoint",
				"golf",
				"goo",
				"goodhands",
				"goodyear",
				"goog",
				"google",
				"gop",
				"got",
				"gp",
				"gq",
				"gr",
				"grainger",
				"graphics",
				"gratis",
				"green",
				"gripe",
				"group",
				"gs",
				"gt",
				"gu",
				"guardian",
				"gucci",
				"guge",
				"guide",
				"guitars",
				"guru",
				"gw",
				"gy",
				"hair",
				"hamburg",
				"hangout",
				"haus",
				"hbo",
				"hdfc",
				"hdfcbank",
				"health",
				"healthcare",
				"help",
				"helsinki",
				"here",
				"hermes",
				"hgtv",
				"hiphop",
				"hisamitsu",
				"hitachi",
				"hiv",
				"hk",
				"hkt",
				"hm",
				"hn",
				"hockey",
				"holdings",
				"holiday",
				"homedepot",
				"homegoods",
				"homes",
				"homesense",
				"honda",
				"honeywell",
				"horse",
				"hospital",
				"host",
				"hosting",
				"hot",
				"hoteles",
				"hotmail",
				"house",
				"how",
				"hr",
				"hsbc",
				"ht",
				"htc",
				"hu",
				"hughes",
				"hyatt",
				"hyundai",
				"ibm",
				"icbc",
				"ice",
				"icu",
				"id",
				"ie",
				"ieee",
				"ifm",
				"ikano",
				"il",
				"im",
				"imamat",
				"imdb",
				"immo",
				"immobilien",
				"in",
				"industries",
				"infiniti",
				"info",
				"ing",
				"ink",
				"institute",
				"insurance",
				"insure",
				"int",
				"intel",
				"international",
				"intuit",
				"investments",
				"ipiranga",
				"iq",
				"ir",
				"irish",
				"is",
				"iselect",
				"ismaili",
				"ist",
				"istanbul",
				"it",
				"itau",
				"itv",
				"iveco",
				"iwc",
				"jaguar",
				"java",
				"jcb",
				"jcp",
				"je",
				"jeep",
				"jetzt",
				"jewelry",
				"jio",
				"jlc",
				"jll",
				"jm",
				"jmp",
				"jnj",
				"jo",
				"jobs",
				"joburg",
				"jot",
				"joy",
				"jp",
				"jpmorgan",
				"jprs",
				"juegos",
				"juniper",
				"kaufen",
				"kddi",
				"ke",
				"kerryhotels",
				"kerrylogistics",
				"kerryproperties",
				"kfh",
				"kg",
				"kh",
				"ki",
				"kia",
				"kim",
				"kinder",
				"kindle",
				"kitchen",
				"kiwi",
				"km",
				"kn",
				"koeln",
				"komatsu",
				"kosher",
				"kp",
				"kpmg",
				"kpn",
				"kr",
				"krd",
				"kred",
				"kuokgroup",
				"kw",
				"ky",
				"kyoto",
				"kz",
				"la",
				"lacaixa",
				"ladbrokes",
				"lamborghini",
				"lamer",
				"lancaster",
				"lancia",
				"lancome",
				"land",
				"landrover",
				"lanxess",
				"lasalle",
				"lat",
				"latino",
				"latrobe",
				"law",
				"lawyer",
				"lb",
				"lc",
				"lds",
				"lease",
				"leclerc",
				"lefrak",
				"legal",
				"lego",
				"lexus",
				"lgbt",
				"li",
				"liaison",
				"lidl",
				"life",
				"lifeinsurance",
				"lifestyle",
				"lighting",
				"like",
				"lilly",
				"limited",
				"limo",
				"lincoln",
				"linde",
				"link",
				"lipsy",
				"live",
				"living",
				"lixil",
				"lk",
				"loan",
				"loans",
				"locker",
				"locus",
				"loft",
				"lol",
				"london",
				"lotte",
				"lotto",
				"love",
				"lpl",
				"lplfinancial",
				"lr",
				"ls",
				"lt",
				"ltd",
				"ltda",
				"lu",
				"lundbeck",
				"lupin",
				"luxe",
				"luxury",
				"lv",
				"ly",
				"ma",
				"macys",
				"madrid",
				"maif",
				"maison",
				"makeup",
				"man",
				"management",
				"mango",
				"market",
				"marketing",
				"markets",
				"marriott",
				"marshalls",
				"maserati",
				"mattel",
				"mba",
				"mc",
				"mcd",
				"mcdonalds",
				"mckinsey",
				"md",
				"me",
				"med",
				"media",
				"meet",
				"melbourne",
				"meme",
				"memorial",
				"men",
				"menu",
				"meo",
				"metlife",
				"mg",
				"mh",
				"miami",
				"microsoft",
				"mil",
				"mini",
				"mint",
				"mit",
				"mitsubishi",
				"mk",
				"ml",
				"mlb",
				"mls",
				"mm",
				"mma",
				"mn",
				"mo",
				"mobi",
				"mobile",
				"mobily",
				"moda",
				"moe",
				"moi",
				"mom",
				"monash",
				"money",
				"monster",
				"montblanc",
				"mopar",
				"mormon",
				"mortgage",
				"moscow",
				"moto",
				"motorcycles",
				"mov",
				"movie",
				"movistar",
				"mp",
				"mq",
				"mr",
				"ms",
				"msd",
				"mt",
				"mtn",
				"mtpc",
				"mtr",
				"mu",
				"museum",
				"mutual",
				"mv",
				"mw",
				"mx",
				"my",
				"mz",
				"na",
				"nab",
				"nadex",
				"nagoya",
				"name",
				"nationwide",
				"natura",
				"navy",
				"nba",
				"nc",
				"ne",
				"nec",
				"netbank",
				"netflix",
				"network",
				"neustar",
				"new",
				"newholland",
				"news",
				"next",
				"nextdirect",
				"nexus",
				"nf",
				"nfl",
				"ng",
				"ngo",
				"nhk",
				"ni",
				"nico",
				"nike",
				"nikon",
				"ninja",
				"nissan",
				"nissay",
				"nl",
				"no",
				"nokia",
				"northwesternmutual",
				"norton",
				"now",
				"nowruz",
				"nowtv",
				"np",
				"nr",
				"nra",
				"nrw",
				"ntt",
				"nu",
				"nyc",
				"nz",
				"obi",
				"observer",
				"off",
				"office",
				"okinawa",
				"olayan",
				"olayangroup",
				"oldnavy",
				"ollo",
				"om",
				"omega",
				"one",
				"ong",
				"onl",
				"online",
				"onyourside",
				"ooo",
				"open",
				"oracle",
				"orange",
				"organic",
				"orientexpress",
				"origins",
				"osaka",
				"otsuka",
				"ott",
				"ovh",
				"pa",
				"page",
				"pamperedchef",
				"panasonic",
				"panerai",
				"paris",
				"pars",
				"partners",
				"parts",
				"party",
				"passagens",
				"pay",
				"pccw",
				"pe",
				"pet",
				"pf",
				"pfizer",
				"pg",
				"ph",
				"pharmacy",
				"philips",
				"phone",
				"photo",
				"photography",
				"photos",
				"physio",
				"piaget",
				"pics",
				"pictet",
				"pictures",
				"pid",
				"pin",
				"ping",
				"pink",
				"pioneer",
				"pizza",
				"pk",
				"pl",
				"place",
				"play",
				"playstation",
				"plumbing",
				"plus",
				"pm",
				"pn",
				"pnc",
				"pohl",
				"poker",
				"politie",
				"porn",
				"post",
				"pr",
				"pramerica",
				"praxi",
				"press",
				"prime",
				"pro",
				"prod",
				"productions",
				"prof",
				"progressive",
				"promo",
				"properties",
				"property",
				"protection",
				"pru",
				"prudential",
				"ps",
				"pt",
				"pub",
				"pw",
				"pwc",
				"py",
				"qa",
				"qpon",
				"quebec",
				"quest",
				"qvc",
				"racing",
				"radio",
				"raid",
				"re",
				"read",
				"realestate",
				"realtor",
				"realty",
				"recipes",
				"red",
				"redstone",
				"redumbrella",
				"rehab",
				"reise",
				"reisen",
				"reit",
				"reliance",
				"ren",
				"rent",
				"rentals",
				"repair",
				"report",
				"republican",
				"rest",
				"restaurant",
				"review",
				"reviews",
				"rexroth",
				"rich",
				"richardli",
				"ricoh",
				"rightathome",
				"ril",
				"rio",
				"rip",
				"rmit",
				"ro",
				"rocher",
				"rocks",
				"rodeo",
				"rogers",
				"room",
				"rs",
				"rsvp",
				"ru",
				"ruhr",
				"run",
				"rw",
				"rwe",
				"ryukyu",
				"sa",
				"saarland",
				"safe",
				"safety",
				"sakura",
				"sale",
				"salon",
				"samsclub",
				"samsung",
				"sandvik",
				"sandvikcoromant",
				"sanofi",
				"sap",
				"sapo",
				"sarl",
				"sas",
				"save",
				"saxo",
				"sb",
				"sbi",
				"sbs",
				"sc",
				"sca",
				"scb",
				"schaeffler",
				"schmidt",
				"scholarships",
				"school",
				"schule",
				"schwarz",
				"science",
				"scjohnson",
				"scor",
				"scot",
				"sd",
				"se",
				"seat",
				"secure",
				"security",
				"seek",
				"select",
				"sener",
				"services",
				"ses",
				"seven",
				"sew",
				"sex",
				"sexy",
				"sfr",
				"sg",
				"sh",
				"shangrila",
				"sharp",
				"shaw",
				"shell",
				"shia",
				"shiksha",
				"shoes",
				"shop",
				"shopping",
				"shouji",
				"show",
				"showtime",
				"shriram",
				"si",
				"silk",
				"sina",
				"singles",
				"site",
				"sj",
				"sk",
				"ski",
				"skin",
				"sky",
				"skype",
				"sl",
				"sling",
				"sm",
				"smart",
				"smile",
				"sn",
				"sncf",
				"so",
				"soccer",
				"social",
				"softbank",
				"software",
				"sohu",
				"solar",
				"solutions",
				"song",
				"sony",
				"soy",
				"space",
				"spiegel",
				"spot",
				"spreadbetting",
				"sr",
				"srl",
				"srt",
				"st",
				"stada",
				"staples",
				"star",
				"starhub",
				"statebank",
				"statefarm",
				"statoil",
				"stc",
				"stcgroup",
				"stockholm",
				"storage",
				"store",
				"stream",
				"studio",
				"study",
				"style",
				"su",
				"sucks",
				"supplies",
				"supply",
				"support",
				"surf",
				"surgery",
				"suzuki",
				"sv",
				"swatch",
				"swiftcover",
				"swiss",
				"sx",
				"sy",
				"sydney",
				"symantec",
				"systems",
				"sz",
				"tab",
				"taipei",
				"talk",
				"taobao",
				"target",
				"tatamotors",
				"tatar",
				"tattoo",
				"tax",
				"taxi",
				"tc",
				"tci",
				"td",
				"tdk",
				"team",
				"tech",
				"technology",
				"tel",
				"telecity",
				"telefonica",
				"temasek",
				"tennis",
				"teva",
				"tf",
				"tg",
				"th",
				"thd",
				"theater",
				"theatre",
				"tiaa",
				"tickets",
				"tienda",
				"tiffany",
				"tips",
				"tires",
				"tirol",
				"tj",
				"tjmaxx",
				"tjx",
				"tk",
				"tkmaxx",
				"tl",
				"tm",
				"tmall",
				"tn",
				"to",
				"today",
				"tokyo",
				"tools",
				"top",
				"toray",
				"toshiba",
				"total",
				"tours",
				"town",
				"toyota",
				"toys",
				"tr",
				"trade",
				"trading",
				"training",
				"travel",
				"travelchannel",
				"travelers",
				"travelersinsurance",
				"trust",
				"trv",
				"tt",
				"tube",
				"tui",
				"tunes",
				"tushu",
				"tv",
				"tvs",
				"tw",
				"tz",
				"ua",
				"ubank",
				"ubs",
				"uconnect",
				"ug",
				"unicom",
				"university",
				"uno",
				"uol",
				"ups",
				"us",
				"uy",
				"uz",
				"va",
				"vacations",
				"vana",
				"vanguard",
				"vc",
				"ve",
				"vegas",
				"ventures",
				"verisign",
				"versicherung",
				"vet",
				"vg",
				"vi",
				"viajes",
				"video",
				"vig",
				"viking",
				"villas",
				"vin",
				"vip",
				"virgin",
				"visa",
				"vision",
				"vista",
				"vistaprint",
				"viva",
				"vivo",
				"vlaanderen",
				"vn",
				"vodka",
				"volkswagen",
				"volvo",
				"vote",
				"voting",
				"voto",
				"voyage",
				"vu",
				"vuelos",
				"wales",
				"walmart",
				"walter",
				"wang",
				"wanggou",
				"warman",
				"watch",
				"watches",
				"weather",
				"weatherchannel",
				"webcam",
				"weber",
				"website",
				"wed",
				"wedding",
				"weibo",
				"weir",
				"wf",
				"whoswho",
				"wien",
				"wiki",
				"williamhill",
				"win",
				"windows",
				"wine",
				"winners",
				"wme",
				"wolterskluwer",
				"woodside",
				"work",
				"works",
				"world",
				"wow",
				"ws",
				"wtc",
				"wtf",
				"xbox",
				"xerox",
				"xfinity",
				"xihuan",
				"xin",
				"xn--11b4c3d",
				"xn--1ck2e1b",
				"xn--1qqw23a",
				"xn--30rr7y",
				"xn--3bst00m",
				"xn--3ds443g",
				"xn--3e0b707e",
				"xn--3oq18vl8pn36a",
				"xn--3pxu8k",
				"xn--42c2d9a",
				"xn--45brj9c",
				"xn--45q11c",
				"xn--4gbrim",
				"xn--54b7fta0cc",
				"xn--55qw42g",
				"xn--55qx5d",
				"xn--5su34j936bgsg",
				"xn--5tzm5g",
				"xn--6frz82g",
				"xn--6qq986b3xl",
				"xn--80adxhks",
				"xn--80ao21a",
				"xn--80aqecdr1a",
				"xn--80asehdb",
				"xn--80aswg",
				"xn--8y0a063a",
				"xn--90a3ac",
				"xn--90ae",
				"xn--90ais",
				"xn--9dbq2a",
				"xn--9et52u",
				"xn--9krt00a",
				"xn--b4w605ferd",
				"xn--bck1b9a5dre4c",
				"xn--c1avg",
				"xn--c2br7g",
				"xn--cck2b3b",
				"xn--cg4bki",
				"xn--clchc0ea0b2g2a9gcd",
				"xn--czr694b",
				"xn--czrs0t",
				"xn--czru2d",
				"xn--d1acj3b",
				"xn--d1alf",
				"xn--e1a4c",
				"xn--eckvdtc9d",
				"xn--efvy88h",
				"xn--estv75g",
				"xn--fct429k",
				"xn--fhbei",
				"xn--fiq228c5hs",
				"xn--fiq64b",
				"xn--fiqs8s",
				"xn--fiqz9s",
				"xn--fjq720a",
				"xn--flw351e",
				"xn--fpcrj9c3d",
				"xn--fzc2c9e2c",
				"xn--fzys8d69uvgm",
				"xn--g2xx48c",
				"xn--gckr3f0f",
				"xn--gecrj9c",
				"xn--gk3at1e",
				"xn--h2brj9c",
				"xn--hxt814e",
				"xn--i1b6b1a6a2e",
				"xn--imr513n",
				"xn--io0a7i",
				"xn--j1aef",
				"xn--j1amh",
				"xn--j6w193g",
				"xn--jlq61u9w7b",
				"xn--jvr189m",
				"xn--kcrx77d1x4a",
				"xn--kprw13d",
				"xn--kpry57d",
				"xn--kpu716f",
				"xn--kput3i",
				"xn--l1acc",
				"xn--lgbbat1ad8j",
				"xn--mgb9awbf",
				"xn--mgba3a3ejt",
				"xn--mgba3a4f16a",
				"xn--mgba7c0bbn0a",
				"xn--mgbaam7a8h",
				"xn--mgbab2bd",
				"xn--mgbai9azgqp6j",
				"xn--mgbayh7gpa",
				"xn--mgbb9fbpob",
				"xn--mgbbh1a71e",
				"xn--mgbc0a9azcg",
				"xn--mgbca7dzdo",
				"xn--mgberp4a5d4ar",
				"xn--mgbi4ecexp",
				"xn--mgbpl2fh",
				"xn--mgbt3dhd",
				"xn--mgbtx2b",
				"xn--mgbx4cd0ab",
				"xn--mix891f",
				"xn--mk1bu44c",
				"xn--mxtq1m",
				"xn--ngbc5azd",
				"xn--ngbe9e0a",
				"xn--node",
				"xn--nqv7f",
				"xn--nqv7fs00ema",
				"xn--nyqy26a",
				"xn--o3cw4h",
				"xn--ogbpf8fl",
				"xn--p1acf",
				"xn--p1ai",
				"xn--pbt977c",
				"xn--pgbs0dh",
				"xn--pssy2u",
				"xn--q9jyb4c",
				"xn--qcka1pmc",
				"xn--qxam",
				"xn--rhqv96g",
				"xn--rovu88b",
				"xn--s9brj9c",
				"xn--ses554g",
				"xn--t60b56a",
				"xn--tckwe",
				"xn--tiq49xqyj",
				"xn--unup4y",
				"xn--vermgensberater-ctb",
				"xn--vermgensberatung-pwb",
				"xn--vhquv",
				"xn--vuq861b",
				"xn--w4r85el8fhu5dnra",
				"xn--w4rs40l",
				"xn--wgbh1c",
				"xn--wgbl6a",
				"xn--xhq521b",
				"xn--xkc2al3hye2a",
				"xn--xkc2dl3a5ee0h",
				"xn--y9a3aq",
				"xn--yfro4i67o",
				"xn--ygbi2ammx",
				"xn--zfr164b",
				"xperia",
				"xxx",
				"xyz",
				"yachts",
				"yahoo",
				"yamaxun",
				"yandex",
				"ye",
				"yodobashi",
				"yoga",
				"yokohama",
				"you",
				"youtube",
				"yt",
				"yun",
				"za",
				"zappos",
				"zara",
				"zero",
				"zip",
				"zippo",
				"zm",
				"zone",
				"zuerich",
				"zw"
			]),
			(t.htmlAttrs = [
				"src=",
				"data=",
				"href=",
				"cite=",
				"formaction=",
				"icon=",
				"manifest=",
				"poster=",
				"codebase=",
				"background=",
				"profile=",
				"usemap="
			]);
	},
	"./node_modules/anchorme/dist-node/separate/fix.js": function(e, t, n) {
		"use strict";
		function o(e, t, n) {
			return (
				e.forEach(function(a, r) {
					!(a.indexOf(".") > -1) ||
						(e[r - 1] === t && e[r + 1] === n) ||
						(e[r + 1] !== t && e[r + 1] !== n) ||
						((e[r] = e[r] + e[r + 1]),
						"string" == typeof e[r + 2] && (e[r] = e[r] + e[r + 2]),
						"string" == typeof e[r + 3] && (e[r] = e[r] + e[r + 3]),
						"string" == typeof e[r + 4] && (e[r] = e[r] + e[r + 4]),
						e.splice(r + 1, 4),
						o(e, t, n));
				}),
				e
			);
		}
		function a(e) {
			return (
				(e = o(e, "(", ")")),
				(e = o(e, "[", "]")),
				(e = o(e, '"', '"')),
				(e = o(e, "'", "'"))
			);
		}
		Object.defineProperty(t, "__esModule", { value: !0 }),
			(t.fixSeparators = o),
			(t.default = a);
	},
	"./node_modules/anchorme/dist-node/separate/separate.js": function(e, t, n) {
		"use strict";
		function o(e) {
			var t = e
				.replace(/([\s\(\)\[\]<>"'])/g, "\0$1\0")
				.replace(/([?;:,.!]+)(?=(\0|$|\s))/g, "\0$1\0")
				.split("\0");
			return r.default(t);
		}
		function a(e) {
			return e.join("");
		}
		Object.defineProperty(t, "__esModule", { value: !0 });
		var r = n("./node_modules/anchorme/dist-node/separate/fix.js");
		(t.separate = o), (t.deSeparate = a);
	},
	"./node_modules/anchorme/dist-node/tests/email.js": function(e, t, n) {
		"use strict";
		function o(e) {
			var t = e.match(r);
			if (null === t) return !1;
			for (var n = i.length - 1; n >= 0; n--) if (i[n].test(e)) return !1;
			var o = t[2];
			return !!o && -1 !== a.tlds.indexOf(o);
		}
		Object.defineProperty(t, "__esModule", { value: !0 });
		var a = n("./node_modules/anchorme/dist-node/lists.js"),
			r = /^[a-z0-9!#$%&'*+\-\/=?^_`{|}~.]+@([a-z0-9%\-]+\.){1,}([a-z0-9\-]+)?$/i,
			i = [/^[!#$%&'*+\-\/=?^_`{|}~.]/, /[.]{2,}[a-z0-9!#$%&'*+\-\/=?^_`{|}~.]+@/i, /\.@/];
		t.default = o;
	},
	"./node_modules/anchorme/dist-node/tests/hasprotocol.js": function(e, t, n) {
		"use strict";
		function o(e) {
			return (
				(e = e.toLowerCase()),
				0 === e.indexOf("http://")
					? "http://"
					: 0 === e.indexOf("https://")
						? "https://"
						: 0 === e.indexOf("ftp://")
							? "ftp://"
							: 0 === e.indexOf("ftps://")
								? "ftps://"
								: 0 === e.indexOf("file:///")
									? "file:///"
									: 0 === e.indexOf("mailto:") && "mailto:"
			);
		}
		Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = o);
	},
	"./node_modules/anchorme/dist-node/tests/ip.js": function(e, t, n) {
		"use strict";
		function o(e) {
			if (!r.test(e)) return !1;
			var t = e.split("."),
				n = Number(t[0]);
			if (isNaN(n) || n > 255 || n < 0) return !1;
			var o = Number(t[1]);
			if (isNaN(o) || o > 255 || o < 0) return !1;
			var i = Number(t[2]);
			if (isNaN(i) || i > 255 || i < 0) return !1;
			var s = Number((t[3].match(/^\d+/) || [])[0]);
			if (isNaN(s) || s > 255 || s < 0) return !1;
			var c = (t[3].match(/(^\d+)(:)(\d+)/) || [])[3];
			return !(c && !a.isPort(c));
		}
		Object.defineProperty(t, "__esModule", { value: !0 });
		var a = n("./node_modules/anchorme/dist-node/util.js"),
			r = /^(\d{1,3}\.){3}\d{1,3}(:\d{1,5})?(\/([a-z0-9\-._~:\/\?#\[\]@!$&'\(\)\*\+,;=%]+)?)?$/i;
		t.default = o;
	},
	"./node_modules/anchorme/dist-node/tests/url.js": function(e, t, n) {
		"use strict";
		function o(e) {
			var t = e.match(i);
			return (
				null !== t &&
				("string" == typeof t[3] &&
					(-1 !== r.tlds.indexOf(t[3].toLowerCase()) && !(t[5] && !a.isPort(t[5]))))
			);
		}
		Object.defineProperty(t, "__esModule", { value: !0 });
		var a = n("./node_modules/anchorme/dist-node/util.js"),
			r = n("./node_modules/anchorme/dist-node/lists.js"),
			i = /^(https?:\/\/|ftps?:\/\/)?([a-z0-9%\-]+\.){1,}([a-z0-9\-]+)?(:(\d{1,5}))?(\/([a-z0-9\-._~:\/\?#\[\]@!$&'\(\)\*\+,;=%]+)?)?$/i;
		t.default = o;
	},
	"./node_modules/anchorme/dist-node/transform/identify.js": function(e, t, n) {
		"use strict";
		function o(e, t) {
			return e.map(function(n, o) {
				var l = encodeURI(n);
				if (l.indexOf(".") < 1 && !r.default(l)) return n;
				var u = null,
					d = r.default(l) || "";
				return (
					d && (l = l.substr(d.length)),
					t.files &&
						"file:///" === d &&
						l.split(/\/|\\/).length - 1 &&
						(u = { reason: "file", protocol: d, raw: n, encoded: l }),
					!u &&
						t.urls &&
						c.default(l) &&
						(u = {
							reason: "url",
							protocol:
								d ||
								("function" == typeof t.defaultProtocol
									? t.defaultProtocol(n)
									: t.defaultProtocol),
							raw: n,
							encoded: l
						}),
					!u &&
						t.emails &&
						a.default(l) &&
						(u = { reason: "email", protocol: "mailto:", raw: n, encoded: l }),
					!u &&
						t.ips &&
						s.default(l) &&
						(u = {
							reason: "ip",
							protocol:
								d ||
								("function" == typeof t.defaultProtocol
									? t.defaultProtocol(n)
									: t.defaultProtocol),
							raw: n,
							encoded: l
						}),
					u && (("'" !== e[o - 1] && '"' !== e[o - 1]) || !~i.htmlAttrs.indexOf(e[o - 2]))
						? u
						: n
				);
			});
		}
		Object.defineProperty(t, "__esModule", { value: !0 });
		var a = n("./node_modules/anchorme/dist-node/tests/email.js"),
			r = n("./node_modules/anchorme/dist-node/tests/hasprotocol.js"),
			i = n("./node_modules/anchorme/dist-node/lists.js"),
			s = n("./node_modules/anchorme/dist-node/tests/ip.js"),
			c = n("./node_modules/anchorme/dist-node/tests/url.js");
		t.default = o;
	},
	"./node_modules/anchorme/dist-node/transform/transform.js": function(e, t, n) {
		"use strict";
		function o(e, t) {
			var n = s.separate(e),
				o = i.default(n, t);
			if (t.exclude)
				for (var c = 0; c < o.length; c++) {
					var l = o[c];
					"object" == typeof l && t.exclude(l) && (o[c] = l.raw);
				}
			if (t.list) {
				for (var u = [], d = 0; d < o.length; d++) {
					var f = o[d];
					"string" != typeof f && u.push(f);
				}
				return u;
			}
			return (
				(o = o.map(function(e) {
					return "string" == typeof e ? e : a(e, t);
				})),
				r.deSeparate(o)
			);
		}
		function a(e, t) {
			var n = e.protocol + e.encoded,
				o = e.raw;
			return (
				"number" == typeof t.truncate &&
					o.length > t.truncate &&
					(o = o.substring(0, t.truncate) + "..."),
				"object" == typeof t.truncate &&
					o.length > t.truncate[0] + t.truncate[1] &&
					(o = o.substr(0, t.truncate[0]) + "..." + o.substr(o.length - t.truncate[1])),
				void 0 === t.attributes && (t.attributes = []),
				'<a href="' +
					n +
					'" ' +
					t.attributes
						.map(function(t) {
							if ("function" != typeof t) return " " + t.name + '="' + t.value + '" ';
							var n = (t(e) || {}).name,
								o = (t(e) || {}).value;
							return n && !o ? " name " : n && o ? " " + n + '="' + o + '" ' : void 0;
						})
						.join("") +
					">" +
					o +
					"</a>"
			);
		}
		Object.defineProperty(t, "__esModule", { value: !0 });
		var r = n("./node_modules/anchorme/dist-node/separate/separate.js"),
			i = n("./node_modules/anchorme/dist-node/transform/identify.js"),
			s = n("./node_modules/anchorme/dist-node/separate/separate.js");
		t.default = o;
	},
	"./node_modules/anchorme/dist-node/util.js": function(e, t, n) {
		"use strict";
		function o(e) {
			return (
				e ||
					(e = {
						attributes: [],
						ips: !0,
						emails: !0,
						urls: !0,
						files: !0,
						truncate: 1 / 0,
						defaultProtocol: "http://",
						list: !1
					}),
				"object" != typeof e.attributes && (e.attributes = []),
				"boolean" != typeof e.ips && (e.ips = !0),
				"boolean" != typeof e.emails && (e.emails = !0),
				"boolean" != typeof e.urls && (e.urls = !0),
				"boolean" != typeof e.files && (e.files = !0),
				"boolean" != typeof e.list && (e.list = !1),
				"string" != typeof e.defaultProtocol &&
					"function" != typeof e.defaultProtocol &&
					(e.defaultProtocol = "http://"),
				"number" == typeof e.truncate ||
					("object" == typeof e.truncate && null !== e.truncate) ||
					(e.truncate = 1 / 0),
				e
			);
		}
		function a(e) {
			return !isNaN(Number(e)) && !(Number(e) > 65535);
		}
		Object.defineProperty(t, "__esModule", { value: !0 }),
			(t.defaultOptions = o),
			(t.isPort = a);
	},
	"./node_modules/css-loader/index.js!./app/components/VideoDetail/VideoDetail.css": function(
		e,
		t,
		n
	) {
		(t = e.exports = n("./node_modules/css-loader/lib/css-base.js")(void 0)),
			t.push([e.i, ".video-detail-title{max-width:600px}", ""]);
	},
	"./node_modules/deep-equal/index.js": function(e, t, n) {
		function o(e) {
			return null === e || void 0 === e;
		}
		function a(e) {
			return (
				!(!e || "object" != typeof e || "number" != typeof e.length) &&
				("function" == typeof e.copy &&
					"function" == typeof e.slice &&
					!(e.length > 0 && "number" != typeof e[0]))
			);
		}
		function r(e, t, n) {
			var r, u;
			if (o(e) || o(t)) return !1;
			if (e.prototype !== t.prototype) return !1;
			if (c(e)) return !!c(t) && ((e = i.call(e)), (t = i.call(t)), l(e, t, n));
			if (a(e)) {
				if (!a(t)) return !1;
				if (e.length !== t.length) return !1;
				for (r = 0; r < e.length; r++) if (e[r] !== t[r]) return !1;
				return !0;
			}
			try {
				var d = s(e),
					f = s(t);
			} catch (e) {
				return !1;
			}
			if (d.length != f.length) return !1;
			for (d.sort(), f.sort(), r = d.length - 1; r >= 0; r--) if (d[r] != f[r]) return !1;
			for (r = d.length - 1; r >= 0; r--) if (((u = d[r]), !l(e[u], t[u], n))) return !1;
			return typeof e == typeof t;
		}
		var i = Array.prototype.slice,
			s = n("./node_modules/deep-equal/lib/keys.js"),
			c = n("./node_modules/deep-equal/lib/is_arguments.js"),
			l = (e.exports = function(e, t, n) {
				return (
					n || (n = {}),
					e === t ||
						(e instanceof Date && t instanceof Date
							? e.getTime() === t.getTime()
							: !e || !t || ("object" != typeof e && "object" != typeof t)
								? n.strict
									? e === t
									: e == t
								: r(e, t, n))
				);
			});
	},
	"./node_modules/deep-equal/lib/is_arguments.js": function(e, t) {
		function n(e) {
			return "[object Arguments]" == Object.prototype.toString.call(e);
		}
		function o(e) {
			return (
				(e &&
					"object" == typeof e &&
					"number" == typeof e.length &&
					Object.prototype.hasOwnProperty.call(e, "callee") &&
					!Object.prototype.propertyIsEnumerable.call(e, "callee")) ||
				!1
			);
		}
		var a =
			"[object Arguments]" ==
			(function() {
				return Object.prototype.toString.call(arguments);
			})();
		(t = e.exports = a ? n : o), (t.supported = n), (t.unsupported = o);
	},
	"./node_modules/deep-equal/lib/keys.js": function(e, t) {
		function n(e) {
			var t = [];
			for (var n in e) t.push(n);
			return t;
		}
		(t = e.exports = "function" == typeof Object.keys ? Object.keys : n), (t.shim = n);
	},
	"./node_modules/exenv/index.js": function(e, t, n) {
		var o; /*!
  Copyright (c) 2015 Jed Watson.
  Based on code that is Copyright 2013-2015, Facebook, Inc.
  All rights reserved.
*/
		!(function() {
			"use strict";
			var a = !(
					"undefined" == typeof window ||
					!window.document ||
					!window.document.createElement
				),
				r = {
					canUseDOM: a,
					canUseWorkers: "undefined" != typeof Worker,
					canUseEventListeners: a && !(!window.addEventListener && !window.attachEvent),
					canUseViewport: a && !!window.screen
				};
			void 0 !==
				(o = function() {
					return r;
				}.call(t, n, t, e)) && (e.exports = o);
		})();
	},
	"./node_modules/react-helmet/lib/Helmet.js": function(e, t, n) {
		function o(e) {
			return e && e.__esModule ? e : { default: e };
		}
		function a(e, t) {
			var n = {};
			for (var o in e)
				t.indexOf(o) >= 0 || (Object.prototype.hasOwnProperty.call(e, o) && (n[o] = e[o]));
			return n;
		}
		function r(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
		}
		function i(e, t) {
			if (!e)
				throw new ReferenceError(
					"this hasn't been initialised - super() hasn't been called"
				);
			return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
		}
		function s(e, t) {
			if ("function" != typeof t && null !== t)
				throw new TypeError(
					"Super expression must either be null or a function, not " + typeof t
				);
			(e.prototype = Object.create(t && t.prototype, {
				constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 }
			})),
				t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
		}
		(t.__esModule = !0), (t.Helmet = void 0);
		var c =
				Object.assign ||
				function(e) {
					for (var t = 1; t < arguments.length; t++) {
						var n = arguments[t];
						for (var o in n)
							Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
					}
					return e;
				},
			l = (function() {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var o = t[n];
						(o.enumerable = o.enumerable || !1),
							(o.configurable = !0),
							"value" in o && (o.writable = !0),
							Object.defineProperty(e, o.key, o);
					}
				}
				return function(t, n, o) {
					return n && e(t.prototype, n), o && e(t, o), t;
				};
			})(),
			u = n("./node_modules/react/index.js"),
			d = o(u),
			f = n("./node_modules/prop-types/index.js"),
			p = o(f),
			m = n("./node_modules/react-side-effect/lib/index.js"),
			h = o(m),
			b = n("./node_modules/deep-equal/index.js"),
			g = o(b),
			v = n("./node_modules/react-helmet/lib/HelmetUtils.js"),
			y = n("./node_modules/react-helmet/lib/HelmetConstants.js"),
			T = function() {
				return null;
			},
			x = (0, h.default)(v.reducePropsToState, v.handleClientStateChange, v.mapStateOnServer)(
				T
			),
			E = (function(e) {
				var t, n;
				return (
					(n = t = (function(t) {
						function n() {
							return r(this, n), i(this, t.apply(this, arguments));
						}
						return (
							s(n, t),
							(n.prototype.shouldComponentUpdate = function(e) {
								return !(0, g.default)(this.props, e);
							}),
							(n.prototype.mapNestedChildrenToProps = function(e, t) {
								if (!t) return null;
								switch (e.type) {
									case y.TAG_NAMES.SCRIPT:
									case y.TAG_NAMES.NOSCRIPT:
										return { innerHTML: t };
									case y.TAG_NAMES.STYLE:
										return { cssText: t };
								}
								throw new Error(
									"<" +
										e.type +
										" /> elements are self-closing and can not contain children. Refer to our API for more information."
								);
							}),
							(n.prototype.flattenArrayTypeChildren = function(e) {
								var t,
									n = e.child,
									o = e.arrayTypeChildren,
									a = e.newChildProps,
									r = e.nestedChildren;
								return c(
									{},
									o,
									((t = {}),
									(t[n.type] = [].concat(o[n.type] || [], [
										c({}, a, this.mapNestedChildrenToProps(n, r))
									])),
									t)
								);
							}),
							(n.prototype.mapObjectTypeChildren = function(e) {
								var t,
									n,
									o = e.child,
									a = e.newProps,
									r = e.newChildProps,
									i = e.nestedChildren;
								switch (o.type) {
									case y.TAG_NAMES.TITLE:
										return c(
											{},
											a,
											((t = {}),
											(t[o.type] = i),
											(t.titleAttributes = c({}, r)),
											t)
										);
									case y.TAG_NAMES.BODY:
										return c({}, a, { bodyAttributes: c({}, r) });
									case y.TAG_NAMES.HTML:
										return c({}, a, { htmlAttributes: c({}, r) });
								}
								return c({}, a, ((n = {}), (n[o.type] = c({}, r)), n));
							}),
							(n.prototype.mapArrayTypeChildrenToProps = function(e, t) {
								var n = c({}, t);
								return (
									Object.keys(e).forEach(function(t) {
										var o;
										n = c({}, n, ((o = {}), (o[t] = e[t]), o));
									}),
									n
								);
							}),
							(n.prototype.warnOnInvalidChildren = function(e, t) {
								return !0;
							}),
							(n.prototype.mapChildrenToProps = function(e, t) {
								var n = this,
									o = {};
								return (
									d.default.Children.forEach(e, function(e) {
										if (e && e.props) {
											var r = e.props,
												i = r.children,
												s = a(r, ["children"]),
												c = (0, v.convertReactPropstoHtmlAttributes)(s);
											switch ((n.warnOnInvalidChildren(e, i), e.type)) {
												case y.TAG_NAMES.LINK:
												case y.TAG_NAMES.META:
												case y.TAG_NAMES.NOSCRIPT:
												case y.TAG_NAMES.SCRIPT:
												case y.TAG_NAMES.STYLE:
													o = n.flattenArrayTypeChildren({
														child: e,
														arrayTypeChildren: o,
														newChildProps: c,
														nestedChildren: i
													});
													break;
												default:
													t = n.mapObjectTypeChildren({
														child: e,
														newProps: t,
														newChildProps: c,
														nestedChildren: i
													});
											}
										}
									}),
									(t = this.mapArrayTypeChildrenToProps(o, t))
								);
							}),
							(n.prototype.render = function() {
								var t = this.props,
									n = t.children,
									o = a(t, ["children"]),
									r = c({}, o);
								return (
									n && (r = this.mapChildrenToProps(n, r)),
									d.default.createElement(e, r)
								);
							}),
							l(n, null, [
								{
									key: "canUseDOM",
									set: function(t) {
										e.canUseDOM = t;
									}
								}
							]),
							n
						);
					})(d.default.Component)),
					(t.propTypes = {
						base: p.default.object,
						bodyAttributes: p.default.object,
						children: p.default.oneOfType([
							p.default.arrayOf(p.default.node),
							p.default.node
						]),
						defaultTitle: p.default.string,
						defer: p.default.bool,
						encodeSpecialCharacters: p.default.bool,
						htmlAttributes: p.default.object,
						link: p.default.arrayOf(p.default.object),
						meta: p.default.arrayOf(p.default.object),
						noscript: p.default.arrayOf(p.default.object),
						onChangeClientState: p.default.func,
						script: p.default.arrayOf(p.default.object),
						style: p.default.arrayOf(p.default.object),
						title: p.default.string,
						titleAttributes: p.default.object,
						titleTemplate: p.default.string
					}),
					(t.defaultProps = { defer: !0, encodeSpecialCharacters: !0 }),
					(t.peek = e.peek),
					(t.rewind = function() {
						var t = e.rewind();
						return (
							t ||
								(t = (0, v.mapStateOnServer)({
									baseTag: [],
									bodyAttributes: {},
									encodeSpecialCharacters: !0,
									htmlAttributes: {},
									linkTags: [],
									metaTags: [],
									noscriptTags: [],
									scriptTags: [],
									styleTags: [],
									title: "",
									titleAttributes: {}
								})),
							t
						);
					}),
					n
				);
			})(x);
		(E.renderStatic = E.rewind), (t.Helmet = E), (t.default = E);
	},
	"./node_modules/react-helmet/lib/HelmetConstants.js": function(e, t) {
		t.__esModule = !0;
		var n = ((t.ATTRIBUTE_NAMES = {
				BODY: "bodyAttributes",
				HTML: "htmlAttributes",
				TITLE: "titleAttributes"
			}),
			(t.TAG_NAMES = {
				BASE: "base",
				BODY: "body",
				HEAD: "head",
				HTML: "html",
				LINK: "link",
				META: "meta",
				NOSCRIPT: "noscript",
				SCRIPT: "script",
				STYLE: "style",
				TITLE: "title"
			})),
			o = ((t.VALID_TAG_NAMES = Object.keys(n).map(function(e) {
				return n[e];
			})),
			(t.TAG_PROPERTIES = {
				CHARSET: "charset",
				CSS_TEXT: "cssText",
				HREF: "href",
				HTTPEQUIV: "http-equiv",
				INNER_HTML: "innerHTML",
				ITEM_PROP: "itemprop",
				NAME: "name",
				PROPERTY: "property",
				REL: "rel",
				SRC: "src"
			}),
			(t.REACT_TAG_MAP = {
				accesskey: "accessKey",
				charset: "charSet",
				class: "className",
				contenteditable: "contentEditable",
				contextmenu: "contextMenu",
				"http-equiv": "httpEquiv",
				itemprop: "itemProp",
				tabindex: "tabIndex"
			}));
		(t.HELMET_PROPS = {
			DEFAULT_TITLE: "defaultTitle",
			DEFER: "defer",
			ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
			ON_CHANGE_CLIENT_STATE: "onChangeClientState",
			TITLE_TEMPLATE: "titleTemplate"
		}),
			(t.HTML_TAG_MAP = Object.keys(o).reduce(function(e, t) {
				return (e[o[t]] = t), e;
			}, {})),
			(t.SELF_CLOSING_TAGS = [n.NOSCRIPT, n.SCRIPT, n.STYLE]),
			(t.HELMET_ATTRIBUTE = "data-react-helmet");
	},
	"./node_modules/react-helmet/lib/HelmetUtils.js": function(e, t, n) {
		(function(e) {
			function o(e) {
				return e && e.__esModule ? e : { default: e };
			}
			(t.__esModule = !0),
				(t.warn = t.requestAnimationFrame = t.reducePropsToState = t.mapStateOnServer = t.handleClientStateChange = t.convertReactPropstoHtmlAttributes = void 0);
			var a =
					"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
						? function(e) {
								return typeof e;
						  }
						: function(e) {
								return e &&
									"function" == typeof Symbol &&
									e.constructor === Symbol &&
									e !== Symbol.prototype
									? "symbol"
									: typeof e;
						  },
				r =
					Object.assign ||
					function(e) {
						for (var t = 1; t < arguments.length; t++) {
							var n = arguments[t];
							for (var o in n)
								Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
						}
						return e;
					},
				i = n("./node_modules/react/index.js"),
				s = o(i),
				c = n("./node_modules/object-assign/index.js"),
				l = o(c),
				u = n("./node_modules/react-helmet/lib/HelmetConstants.js"),
				d = function(e) {
					return !1 ===
						(!(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1])
						? String(e)
						: String(e)
								.replace(/&/g, "&amp;")
								.replace(/</g, "&lt;")
								.replace(/>/g, "&gt;")
								.replace(/"/g, "&quot;")
								.replace(/'/g, "&#x27;");
				},
				f = function(e) {
					var t = g(e, u.TAG_NAMES.TITLE),
						n = g(e, u.HELMET_PROPS.TITLE_TEMPLATE);
					if (n && t)
						return n.replace(/%s/g, function() {
							return t;
						});
					var o = g(e, u.HELMET_PROPS.DEFAULT_TITLE);
					return t || o || void 0;
				},
				p = function(e) {
					return g(e, u.HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || function() {};
				},
				m = function(e, t) {
					return t
						.filter(function(t) {
							return void 0 !== t[e];
						})
						.map(function(t) {
							return t[e];
						})
						.reduce(function(e, t) {
							return r({}, e, t);
						}, {});
				},
				h = function(e, t) {
					return t
						.filter(function(e) {
							return void 0 !== e[u.TAG_NAMES.BASE];
						})
						.map(function(e) {
							return e[u.TAG_NAMES.BASE];
						})
						.reverse()
						.reduce(function(t, n) {
							if (!t.length)
								for (var o = Object.keys(n), a = 0; a < o.length; a++) {
									var r = o[a],
										i = r.toLowerCase();
									if (-1 !== e.indexOf(i) && n[i]) return t.concat(n);
								}
							return t;
						}, []);
				},
				b = function(e, t, n) {
					var o = {};
					return n
						.filter(function(t) {
							return (
								!!Array.isArray(t[e]) ||
								(void 0 !== t[e] &&
									_(
										"Helmet: " +
											e +
											' should be of type "Array". Instead found type "' +
											a(t[e]) +
											'"'
									),
								!1)
							);
						})
						.map(function(t) {
							return t[e];
						})
						.reverse()
						.reduce(function(e, n) {
							var a = {};
							n.filter(function(e) {
								for (var n = void 0, r = Object.keys(e), i = 0; i < r.length; i++) {
									var s = r[i],
										c = s.toLowerCase();
									-1 === t.indexOf(c) ||
										(n === u.TAG_PROPERTIES.REL &&
											"canonical" === e[n].toLowerCase()) ||
										(c === u.TAG_PROPERTIES.REL &&
											"stylesheet" === e[c].toLowerCase()) ||
										(n = c),
										-1 === t.indexOf(s) ||
											(s !== u.TAG_PROPERTIES.INNER_HTML &&
												s !== u.TAG_PROPERTIES.CSS_TEXT &&
												s !== u.TAG_PROPERTIES.ITEM_PROP) ||
											(n = s);
								}
								if (!n || !e[n]) return !1;
								var l = e[n].toLowerCase();
								return (
									o[n] || (o[n] = {}),
									a[n] || (a[n] = {}),
									!o[n][l] && ((a[n][l] = !0), !0)
								);
							})
								.reverse()
								.forEach(function(t) {
									return e.push(t);
								});
							for (var r = Object.keys(a), i = 0; i < r.length; i++) {
								var s = r[i],
									c = (0, l.default)({}, o[s], a[s]);
								o[s] = c;
							}
							return e;
						}, [])
						.reverse();
				},
				g = function(e, t) {
					for (var n = e.length - 1; n >= 0; n--) {
						var o = e[n];
						if (o.hasOwnProperty(t)) return o[t];
					}
					return null;
				},
				v = function(e) {
					return {
						baseTag: h([u.TAG_PROPERTIES.HREF], e),
						bodyAttributes: m(u.ATTRIBUTE_NAMES.BODY, e),
						defer: g(e, u.HELMET_PROPS.DEFER),
						encode: g(e, u.HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
						htmlAttributes: m(u.ATTRIBUTE_NAMES.HTML, e),
						linkTags: b(
							u.TAG_NAMES.LINK,
							[u.TAG_PROPERTIES.REL, u.TAG_PROPERTIES.HREF],
							e
						),
						metaTags: b(
							u.TAG_NAMES.META,
							[
								u.TAG_PROPERTIES.NAME,
								u.TAG_PROPERTIES.CHARSET,
								u.TAG_PROPERTIES.HTTPEQUIV,
								u.TAG_PROPERTIES.PROPERTY,
								u.TAG_PROPERTIES.ITEM_PROP
							],
							e
						),
						noscriptTags: b(u.TAG_NAMES.NOSCRIPT, [u.TAG_PROPERTIES.INNER_HTML], e),
						onChangeClientState: p(e),
						scriptTags: b(
							u.TAG_NAMES.SCRIPT,
							[u.TAG_PROPERTIES.SRC, u.TAG_PROPERTIES.INNER_HTML],
							e
						),
						styleTags: b(u.TAG_NAMES.STYLE, [u.TAG_PROPERTIES.CSS_TEXT], e),
						title: f(e),
						titleAttributes: m(u.ATTRIBUTE_NAMES.TITLE, e)
					};
				},
				y = (function() {
					var e = Date.now();
					return function(t) {
						var n = Date.now();
						n - e > 16
							? ((e = n), t(n))
							: setTimeout(function() {
									y(t);
							  }, 0);
					};
				})(),
				T = function(e) {
					return clearTimeout(e);
				},
				x =
					"undefined" != typeof window
						? window.requestAnimationFrame ||
						  window.webkitRequestAnimationFrame ||
						  window.mozRequestAnimationFrame ||
						  y
						: e.requestAnimationFrame || y,
				E =
					"undefined" != typeof window
						? window.cancelAnimationFrame ||
						  window.webkitCancelAnimationFrame ||
						  window.mozCancelAnimationFrame ||
						  T
						: e.cancelAnimationFrame || T,
				_ = function(e) {
					return console && "function" == typeof console.warn && console.warn(e);
				},
				w = null,
				k = function(e) {
					w && E(w),
						e.defer
							? (w = x(function() {
									A(e, function() {
										w = null;
									});
							  }))
							: (A(e), (w = null));
				},
				A = function(e, t) {
					var n = e.baseTag,
						o = e.bodyAttributes,
						a = e.htmlAttributes,
						r = e.linkTags,
						i = e.metaTags,
						s = e.noscriptTags,
						c = e.onChangeClientState,
						l = e.scriptTags,
						d = e.styleTags,
						f = e.title,
						p = e.titleAttributes;
					O(u.TAG_NAMES.BODY, o), O(u.TAG_NAMES.HTML, a), S(f, p);
					var m = {
							baseTag: P(u.TAG_NAMES.BASE, n),
							linkTags: P(u.TAG_NAMES.LINK, r),
							metaTags: P(u.TAG_NAMES.META, i),
							noscriptTags: P(u.TAG_NAMES.NOSCRIPT, s),
							scriptTags: P(u.TAG_NAMES.SCRIPT, l),
							styleTags: P(u.TAG_NAMES.STYLE, d)
						},
						h = {},
						b = {};
					Object.keys(m).forEach(function(e) {
						var t = m[e],
							n = t.newTags,
							o = t.oldTags;
						n.length && (h[e] = n), o.length && (b[e] = m[e].oldTags);
					}),
						t && t(),
						c(e, h, b);
				},
				j = function(e) {
					return Array.isArray(e) ? e.join("") : e;
				},
				S = function(e, t) {
					void 0 !== e && document.title !== e && (document.title = j(e)),
						O(u.TAG_NAMES.TITLE, t);
				},
				O = function(e, t) {
					var n = document.getElementsByTagName(e)[0];
					if (n) {
						for (
							var o = n.getAttribute(u.HELMET_ATTRIBUTE),
								a = o ? o.split(",") : [],
								r = [].concat(a),
								i = Object.keys(t),
								s = 0;
							s < i.length;
							s++
						) {
							var c = i[s],
								l = t[c] || "";
							n.getAttribute(c) !== l && n.setAttribute(c, l),
								-1 === a.indexOf(c) && a.push(c);
							var d = r.indexOf(c);
							-1 !== d && r.splice(d, 1);
						}
						for (var f = r.length - 1; f >= 0; f--) n.removeAttribute(r[f]);
						a.length === r.length
							? n.removeAttribute(u.HELMET_ATTRIBUTE)
							: n.getAttribute(u.HELMET_ATTRIBUTE) !== i.join(",") &&
							  n.setAttribute(u.HELMET_ATTRIBUTE, i.join(","));
					}
				},
				P = function(e, t) {
					var n = document.head || document.querySelector(u.TAG_NAMES.HEAD),
						o = n.querySelectorAll(e + "[" + u.HELMET_ATTRIBUTE + "]"),
						a = Array.prototype.slice.call(o),
						r = [],
						i = void 0;
					return (
						t &&
							t.length &&
							t.forEach(function(t) {
								var n = document.createElement(e);
								for (var o in t)
									if (t.hasOwnProperty(o))
										if (o === u.TAG_PROPERTIES.INNER_HTML)
											n.innerHTML = t.innerHTML;
										else if (o === u.TAG_PROPERTIES.CSS_TEXT)
											n.styleSheet
												? (n.styleSheet.cssText = t.cssText)
												: n.appendChild(document.createTextNode(t.cssText));
										else {
											var s = void 0 === t[o] ? "" : t[o];
											n.setAttribute(o, s);
										}
								n.setAttribute(u.HELMET_ATTRIBUTE, "true"),
									a.some(function(e, t) {
										return (i = t), n.isEqualNode(e);
									})
										? a.splice(i, 1)
										: r.push(n);
							}),
						a.forEach(function(e) {
							return e.parentNode.removeChild(e);
						}),
						r.forEach(function(e) {
							return n.appendChild(e);
						}),
						{ oldTags: a, newTags: r }
					);
				},
				N = function(e) {
					return Object.keys(e).reduce(function(t, n) {
						var o = void 0 !== e[n] ? n + '="' + e[n] + '"' : "" + n;
						return t ? t + " " + o : o;
					}, "");
				},
				M = function(e, t, n, o) {
					var a = N(n),
						r = j(t);
					return a
						? "<" +
								e +
								" " +
								u.HELMET_ATTRIBUTE +
								'="true" ' +
								a +
								">" +
								d(r, o) +
								"</" +
								e +
								">"
						: "<" +
								e +
								" " +
								u.HELMET_ATTRIBUTE +
								'="true">' +
								d(r, o) +
								"</" +
								e +
								">";
				},
				R = function(e, t, n) {
					return t.reduce(function(t, o) {
						var a = Object.keys(o)
								.filter(function(e) {
									return !(
										e === u.TAG_PROPERTIES.INNER_HTML ||
										e === u.TAG_PROPERTIES.CSS_TEXT
									);
								})
								.reduce(function(e, t) {
									var a = void 0 === o[t] ? t : t + '="' + d(o[t], n) + '"';
									return e ? e + " " + a : a;
								}, ""),
							r = o.innerHTML || o.cssText || "",
							i = -1 === u.SELF_CLOSING_TAGS.indexOf(e);
						return (
							t +
							"<" +
							e +
							" " +
							u.HELMET_ATTRIBUTE +
							'="true" ' +
							a +
							(i ? "/>" : ">" + r + "</" + e + ">")
						);
					}, "");
				},
				C = function(e) {
					var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
					return Object.keys(e).reduce(function(t, n) {
						return (t[u.REACT_TAG_MAP[n] || n] = e[n]), t;
					}, t);
				},
				L = function(e) {
					var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
					return Object.keys(e).reduce(function(t, n) {
						return (t[u.HTML_TAG_MAP[n] || n] = e[n]), t;
					}, t);
				},
				I = function(e, t, n) {
					var o,
						a = ((o = { key: t }), (o[u.HELMET_ATTRIBUTE] = !0), o),
						r = C(n, a);
					return [s.default.createElement(u.TAG_NAMES.TITLE, r, t)];
				},
				G = function(e, t) {
					return t.map(function(t, n) {
						var o,
							a = ((o = { key: n }), (o[u.HELMET_ATTRIBUTE] = !0), o);
						return (
							Object.keys(t).forEach(function(e) {
								var n = u.REACT_TAG_MAP[e] || e;
								if (
									n === u.TAG_PROPERTIES.INNER_HTML ||
									n === u.TAG_PROPERTIES.CSS_TEXT
								) {
									var o = t.innerHTML || t.cssText;
									a.dangerouslySetInnerHTML = { __html: o };
								} else a[n] = t[e];
							}),
							s.default.createElement(e, a)
						);
					});
				},
				q = function(e, t, n) {
					switch (e) {
						case u.TAG_NAMES.TITLE:
							return {
								toComponent: function() {
									return I(0, t.title, t.titleAttributes);
								},
								toString: function() {
									return M(e, t.title, t.titleAttributes, n);
								}
							};
						case u.ATTRIBUTE_NAMES.BODY:
						case u.ATTRIBUTE_NAMES.HTML:
							return {
								toComponent: function() {
									return C(t);
								},
								toString: function() {
									return N(t);
								}
							};
						default:
							return {
								toComponent: function() {
									return G(e, t);
								},
								toString: function() {
									return R(e, t, n);
								}
							};
					}
				},
				H = function(e) {
					var t = e.baseTag,
						n = e.bodyAttributes,
						o = e.encode,
						a = e.htmlAttributes,
						r = e.linkTags,
						i = e.metaTags,
						s = e.noscriptTags,
						c = e.scriptTags,
						l = e.styleTags,
						d = e.title,
						f = void 0 === d ? "" : d,
						p = e.titleAttributes;
					return {
						base: q(u.TAG_NAMES.BASE, t, o),
						bodyAttributes: q(u.ATTRIBUTE_NAMES.BODY, n, o),
						htmlAttributes: q(u.ATTRIBUTE_NAMES.HTML, a, o),
						link: q(u.TAG_NAMES.LINK, r, o),
						meta: q(u.TAG_NAMES.META, i, o),
						noscript: q(u.TAG_NAMES.NOSCRIPT, s, o),
						script: q(u.TAG_NAMES.SCRIPT, c, o),
						style: q(u.TAG_NAMES.STYLE, l, o),
						title: q(u.TAG_NAMES.TITLE, { title: f, titleAttributes: p }, o)
					};
				};
			(t.convertReactPropstoHtmlAttributes = L),
				(t.handleClientStateChange = k),
				(t.mapStateOnServer = H),
				(t.reducePropsToState = v),
				(t.requestAnimationFrame = x),
				(t.warn = _);
		}.call(t, n("./node_modules/webpack/buildin/global.js")));
	},
	"./node_modules/react-side-effect/lib/index.js": function(e, t, n) {
		"use strict";
		function o(e) {
			return e && "object" == typeof e && "default" in e ? e.default : e;
		}
		function a(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
		}
		function r(e, t) {
			if (!e)
				throw new ReferenceError(
					"this hasn't been initialised - super() hasn't been called"
				);
			return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
		}
		function i(e, t) {
			if ("function" != typeof t && null !== t)
				throw new TypeError(
					"Super expression must either be null or a function, not " + typeof t
				);
			(e.prototype = Object.create(t && t.prototype, {
				constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 }
			})),
				t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
		}
		function s(e, t, n) {
			function o(e) {
				return e.displayName || e.name || "Component";
			}
			if ("function" != typeof e)
				throw new Error("Expected reducePropsToState to be a function.");
			if ("function" != typeof t)
				throw new Error("Expected handleStateChangeOnClient to be a function.");
			if (void 0 !== n && "function" != typeof n)
				throw new Error("Expected mapStateOnServer to either be undefined or a function.");
			return function(s) {
				function f() {
					(m = e(
						p.map(function(e) {
							return e.props;
						})
					)),
						h.canUseDOM ? t(m) : n && (m = n(m));
				}
				if ("function" != typeof s)
					throw new Error("Expected WrappedComponent to be a React component.");
				var p = [],
					m = void 0,
					h = (function(e) {
						function t() {
							return a(this, t), r(this, e.apply(this, arguments));
						}
						return (
							i(t, e),
							(t.peek = function() {
								return m;
							}),
							(t.rewind = function() {
								if (t.canUseDOM)
									throw new Error(
										"You may only call rewind() on the server. Call peek() to read the current state."
									);
								var e = m;
								return (m = void 0), (p = []), e;
							}),
							(t.prototype.shouldComponentUpdate = function(e) {
								return !d(e, this.props);
							}),
							(t.prototype.componentWillMount = function() {
								p.push(this), f();
							}),
							(t.prototype.componentDidUpdate = function() {
								f();
							}),
							(t.prototype.componentWillUnmount = function() {
								var e = p.indexOf(this);
								p.splice(e, 1), f();
							}),
							(t.prototype.render = function() {
								return l.createElement(s, this.props);
							}),
							t
						);
					})(c.Component);
				return (h.displayName = "SideEffect(" + o(s) + ")"), (h.canUseDOM = u.canUseDOM), h;
			};
		}
		var c = n("./node_modules/react/index.js"),
			l = o(c),
			u = o(n("./node_modules/exenv/index.js")),
			d = o(n("./node_modules/shallowequal/index.js"));
		e.exports = s;
	},
	"./node_modules/shallowequal/index.js": function(e, t) {
		e.exports = function(e, t, n, o) {
			var a = n ? n.call(o, e, t) : void 0;
			if (void 0 !== a) return !!a;
			if (e === t) return !0;
			if ("object" != typeof e || !e || "object" != typeof t || !t) return !1;
			var r = Object.keys(e),
				i = Object.keys(t);
			if (r.length !== i.length) return !1;
			for (var s = Object.prototype.hasOwnProperty.bind(t), c = 0; c < r.length; c++) {
				var l = r[c];
				if (!s(l)) return !1;
				var u = e[l],
					d = t[l];
				if (!1 === (a = n ? n.call(o, u, d, l) : void 0) || (void 0 === a && u !== d))
					return !1;
			}
			return !0;
		};
	}
});
