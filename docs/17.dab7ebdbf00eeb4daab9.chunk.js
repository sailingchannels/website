webpackJsonp([17], {
	"./app/actions/VideoActions.js": function(e, t, n) {
		"use strict";
		function i(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
		}
		var o = n("./app/alt.js"),
			a = n("./node_modules/jquery/dist/jquery.js"),
			s = n.n(a),
			r = (function() {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var i = t[n];
						(i.enumerable = i.enumerable || !1),
							(i.configurable = !0),
							"value" in i && (i.writable = !0),
							Object.defineProperty(e, i.key, i);
					}
				}
				return function(t, n, i) {
					return n && e(t.prototype, n), i && e(t, i), t;
				};
			})(),
			c = (function() {
				function e() {
					i(this, e),
						this.generateActions(
							"getVideosSuccess",
							"getVideosFail",
							"getVideoSuccess",
							"getVideoFail"
						);
				}
				return (
					r(e, [
						{
							key: "getVideos",
							value: function(e, t, n) {
								var i = this;
								s.a
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
										i.actions.getVideosSuccess(e);
									})
									.fail(function(e) {
										i.actions.getVideosFail(e);
									});
							}
						},
						{
							key: "getVideo",
							value: function(e) {
								var t = this;
								s.a
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
		t.a = o.a.createActions(c);
	},
	"./app/components/Description/Loadable.js": function(e, t, n) {
		"use strict";
		var i = n("./node_modules/react-loadable/lib/index.js"),
			o = n.n(i);
		t.a = o()({
			loader: function() {
				return n.e(16).then(n.bind(null, "./app/components/Description/index.js"));
			},
			loading: function() {
				return null;
			}
		});
	},
	"./app/components/VideoList/index.js": function(e, t, n) {
		"use strict";
		function i(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
		}
		function o(e, t) {
			if (!e)
				throw new ReferenceError(
					"this hasn't been initialised - super() hasn't been called"
				);
			return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
		}
		function a(e, t) {
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
		var s = n("./node_modules/react/index.js"),
			r = n.n(s),
			c = (n("./app/components/VideoListItem/Loadable.js"),
			n("./app/actions/VideoActions.js")),
			l = n("./app/stores/VideoStore.js"),
			u = n("./app/components/Description/Loadable.js"),
			d = n("./node_modules/react-router-dom/index.js"),
			p = (n.n(d), n("./node_modules/react-lazyload/lib/index.js")),
			f = n.n(p),
			h = (function() {
				var e =
					("function" == typeof Symbol && Symbol.for && Symbol.for("react.element")) ||
					60103;
				return function(t, n, i, o) {
					var a = t && t.defaultProps,
						s = arguments.length - 3;
					if ((n || 0 === s || (n = {}), n && a))
						for (var r in a) void 0 === n[r] && (n[r] = a[r]);
					else n || (n = a || {});
					if (1 === s) n.children = o;
					else if (s > 1) {
						for (var c = Array(s), l = 0; l < s; l++) c[l] = arguments[l + 3];
						n.children = c;
					}
					return {
						$$typeof: e,
						type: t,
						key: void 0 === i ? null : "" + i,
						ref: null,
						props: n,
						_owner: null
					};
				};
			})(),
			v = (function() {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var i = t[n];
						(i.enumerable = i.enumerable || !1),
							(i.configurable = !0),
							"value" in i && (i.writable = !0),
							Object.defineProperty(e, i.key, i);
					}
				}
				return function(t, n, i) {
					return n && e(t.prototype, n), i && e(t, i), t;
				};
			})(),
			m = h("i", { className: "fa fa-eye" }),
			b = h("i", { className: "fa fa-thumbs-up" }),
			y = h("i", { className: "fa fa-thumbs-down" }),
			k = h("i", { className: "fa fa-arrow-left" }),
			g = h("i", { className: "fa fa-arrow-right" }),
			j = (function(e) {
				function t(e) {
					i(this, t);
					var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
					return (n.state = l.a.getState()), (n.onChange = n.onChange.bind(n)), n;
				}
				return (
					a(t, e),
					v(t, [
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
								return h(
									"div",
									{},
									void 0,
									this.state.videos.map(function(t) {
										return h(
											"div",
											{ className: "row channel-row" },
											t._id,
											h(
												"div",
												{ className: "col-md-3 col-xs-3" },
												void 0,
												h(
													"center",
													{},
													void 0,
													h(
														f.a,
														{},
														void 0,
														h("img", {
															src:
																"https://img.youtube.com/vi/" +
																t._id +
																"/default.jpg",
															className: "channel-thumb"
														})
													)
												)
											),
											h(
												"div",
												{ className: "col-md-9 col-xs-9" },
												void 0,
												h(
													"h3",
													{},
													void 0,
													h(
														d.Link,
														{ to: "/video/" + t._id },
														void 0,
														t.title
													)
												),
												h(
													"p",
													{},
													void 0,
													e.formatDate(t.publishedAt),
													" ·",
													" ",
													m,
													" ",
													t.views,
													" ·",
													" ",
													b,
													" ",
													t.likes,
													" ·",
													" ",
													y,
													" ",
													t.dislikes
												),
												h(u.a, { text: t.description, video: !0 })
											)
										);
									}),
									h(
										"div",
										{ className: "row" },
										void 0,
										h(
											"div",
											{ className: "col-md-6 col-xs-6 text-left" },
											void 0,
											this.state.skip > 0
												? h(
														"a",
														{
															className: "btn btn-raised",
															onClick: this.prev.bind(this)
														},
														void 0,
														k,
														" Previous"
												  )
												: null
										),
										h(
											"div",
											{ className: "col-md-6 col-xs-6 text-right" },
											void 0,
											!1 === this.state.fin
												? h(
														"a",
														{
															className: "btn btn-raised",
															onClick: this.next.bind(this)
														},
														void 0,
														"Next ",
														g
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
			})(r.a.Component);
		t.default = j;
	},
	"./app/components/VideoListItem/Loadable.js": function(e, t, n) {
		"use strict";
		var i = n("./node_modules/react-loadable/lib/index.js"),
			o = n.n(i);
		t.a = o()({
			loader: function() {
				return n.e(21).then(n.bind(null, "./app/components/VideoListItem/index.js"));
			},
			loading: function() {
				return null;
			}
		});
	},
	"./app/stores/VideoStore.js": function(e, t, n) {
		"use strict";
		function i(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
		}
		var o = n("./app/alt.js"),
			a = n("./app/actions/VideoActions.js"),
			s = (function() {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var i = t[n];
						(i.enumerable = i.enumerable || !1),
							(i.configurable = !0),
							"value" in i && (i.writable = !0),
							Object.defineProperty(e, i.key, i);
					}
				}
				return function(t, n, i) {
					return n && e(t.prototype, n), i && e(t, i), t;
				};
			})(),
			r = (function() {
				function e() {
					i(this, e),
						this.bindActions(a.a),
						(this.videos = []),
						(this.video = null),
						(this.skip = 0),
						(this.take = 5),
						(this.fin = !1);
				}
				return (
					s(e, [
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
		t.a = o.a.createStore(r);
	}
});
