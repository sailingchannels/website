webpackJsonp([13], {
	"./app/actions/TopicActions.js": function(t, e, n) {
		"use strict";
		function i(t, e) {
			if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
		}
		var o = n("./app/alt.js"),
			a = n("./app/helpers/http.js"),
			s = (function() {
				function t(t, e) {
					for (var n = 0; n < e.length; n++) {
						var i = e[n];
						(i.enumerable = i.enumerable || !1),
							(i.configurable = !0),
							"value" in i && (i.writable = !0),
							Object.defineProperty(t, i.key, i);
					}
				}
				return function(e, n, i) {
					return n && t(e.prototype, n), i && t(e, i), e;
				};
			})(),
			c = (function() {
				function t() {
					i(this, t),
						this.generateActions(
							"getTopicsSuccess",
							"getTopicsFail",
							"getTopicSuccess",
							"getTopicFail",
							"resetChannels",
							"setLoading"
						);
				}
				return (
					s(t, [
						{
							key: "getTopics",
							value: function() {
								var t = this;
								this.actions.setLoading(),
									new a.a().get(
										{
											url: "/api/topics",
											type: "GET",
											dataType: "json",
											cache: !0
										},
										function(e, n) {
											return e
												? t.actions.getTopicsFail(e)
												: t.actions.getTopicsSuccess(n);
										}
									);
							}
						},
						{
							key: "getTopic",
							value: function(t, e, n) {
								var i = this;
								this.actions.setLoading(),
									new a.a().get(
										{
											url: "/api/topic/" + t + "?skip=" + e + "&take=" + n,
											type: "GET",
											dataType: "json",
											cache: !0
										},
										function(t, e) {
											return t
												? i.actions.getTopicFail(t)
												: i.actions.getTopicSuccess(e);
										}
									);
							}
						}
					]),
					t
				);
			})();
		e.a = o.a.createActions(c);
	},
	"./app/components/Topic/index.js": function(t, e, n) {
		"use strict";
		function i(t, e) {
			if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
		}
		function o(t, e) {
			if (!t)
				throw new ReferenceError(
					"this hasn't been initialised - super() hasn't been called"
				);
			return !e || ("object" != typeof e && "function" != typeof e) ? t : e;
		}
		function a(t, e) {
			if ("function" != typeof e && null !== e)
				throw new TypeError(
					"Super expression must either be null or a function, not " + typeof e
				);
			(t.prototype = Object.create(e && e.prototype, {
				constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 }
			})),
				e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : (t.__proto__ = e));
		}
		Object.defineProperty(e, "__esModule", { value: !0 });
		var s = n("./node_modules/react/index.js"),
			c = n.n(s),
			r = n("./node_modules/react-router-dom/index.js"),
			l = (n.n(r), n("./app/actions/TopicActions.js")),
			p = n("./app/stores/TopicStore.js"),
			u = n("./app/components/OffsetMenu/index.js"),
			f = n("./app/components/OffsetSocial/index.js"),
			h = n("./app/components/Logo/index.js"),
			d = n("./node_modules/react-infinite/build/react-infinite.js"),
			g = n.n(d),
			v = n("./app/components/ChannelListItem/Loadable.js"),
			y = (function() {
				var t =
					("function" == typeof Symbol && Symbol.for && Symbol.for("react.element")) ||
					60103;
				return function(e, n, i, o) {
					var a = e && e.defaultProps,
						s = arguments.length - 3;
					if ((n || 0 === s || (n = {}), n && a))
						for (var c in a) void 0 === n[c] && (n[c] = a[c]);
					else n || (n = a || {});
					if (1 === s) n.children = o;
					else if (s > 1) {
						for (var r = Array(s), l = 0; l < s; l++) r[l] = arguments[l + 3];
						n.children = r;
					}
					return {
						$$typeof: t,
						type: e,
						key: void 0 === i ? null : "" + i,
						ref: null,
						props: n,
						_owner: null
					};
				};
			})(),
			m = (function() {
				function t(t, e) {
					for (var n = 0; n < e.length; n++) {
						var i = e[n];
						(i.enumerable = i.enumerable || !1),
							(i.configurable = !0),
							"value" in i && (i.writable = !0),
							Object.defineProperty(t, i.key, i);
					}
				}
				return function(e, n, i) {
					return n && t(e.prototype, n), i && t(e, i), e;
				};
			})(),
			b = y(f.a, {}),
			k = y(h.a, { className: "hidden-xs hidden-sm" }),
			T = y(u.a, {}),
			j = y("div", { className: "col-md-3" }),
			w = y("i", { className: "fa fa-arrow-left" }),
			S = y("div", { className: "col-md-3" }),
			C = (function(t) {
				function e(t) {
					i(this, e);
					var n = o(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t));
					return (n.state = p.a.getState()), (n.onChange = n.onChange.bind(n)), n;
				}
				return (
					a(e, t),
					m(e, [
						{
							key: "componentDidMount",
							value: function() {
								p.a.listen(this.onChange),
									l.a.resetChannels(),
									l.a.getTopic(
										this.props.match.params.id,
										this.state.skip,
										this.state.take
									);
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
							value: function(t) {
								this.setState(t);
							}
						},
						{
							key: "loadMore",
							value: function() {
								!1 === this.state.loading &&
									l.a.getTopic(
										this.props.match.params.id,
										this.state.skip + this.state.take,
										this.state.take
									);
							}
						},
						{
							key: "render",
							value: function() {
								return this.state.topic
									? y(
											"div",
											{ className: "container" },
											void 0,
											b,
											k,
											T,
											y(
												"div",
												{ className: "row content-row" },
												void 0,
												j,
												y(
													"div",
													{ className: "col-md-6" },
													void 0,
													y(
														"h1",
														{ className: "content-h1" },
														void 0,
														"Topic: ",
														this.state.topic.title
													),
													y(
														"center",
														{},
														void 0,
														y(
															"p",
															{},
															void 0,
															this.state.topic.description
														),
														y(
															r.Link,
															{
																style: { marginBottom: "40px" },
																className:
																	"btn btn-default btn-raised",
																to: "/topics"
															},
															void 0,
															w,
															" back to topics"
														)
													)
												),
												S
											),
											y(
												"div",
												{ className: "row content-row" },
												void 0,
												y(
													g.a,
													{
														useWindowAsScrollContainer: !0,
														elementHeight: 230,
														infiniteLoadBeginEdgeOffset: 230,
														onInfiniteLoad: this.loadMore.bind(this)
													},
													void 0,
													this.state.channels.map(function(t) {
														return y(
															v.a,
															{ channel: t },
															"cli-" + t.id
														);
													})
												)
											)
									  )
									: null;
							}
						}
					]),
					e
				);
			})(c.a.Component);
		e.default = C;
	},
	"./app/stores/TopicStore.js": function(t, e, n) {
		"use strict";
		function i(t, e) {
			if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
		}
		var o = n("./app/alt.js"),
			a = n("./app/actions/TopicActions.js"),
			s = (function() {
				function t(t, e) {
					for (var n = 0; n < e.length; n++) {
						var i = e[n];
						(i.enumerable = i.enumerable || !1),
							(i.configurable = !0),
							"value" in i && (i.writable = !0),
							Object.defineProperty(t, i.key, i);
					}
				}
				return function(e, n, i) {
					return n && t(e.prototype, n), i && t(e, i), e;
				};
			})(),
			c = (function() {
				function t() {
					i(this, t),
						this.bindActions(a.a),
						(this.topics = []),
						(this.topic = null),
						(this.channels = []),
						(this.loading = !1),
						(this.skip = 0),
						(this.take = 10);
				}
				return (
					s(t, [
						{
							key: "setLoading",
							value: function() {
								this.loading = !0;
							}
						},
						{
							key: "getTopicsSuccess",
							value: function(t) {
								(this.topics = t), (this.loading = !1);
							}
						},
						{
							key: "getTopicsFail",
							value: function(t) {
								console.log(t), (this.loading = !1);
							}
						},
						{
							key: "resetChannels",
							value: function() {
								this.channels = [];
							}
						},
						{
							key: "getTopicSuccess",
							value: function(t) {
								(this.topic = t.topic),
									(this.channels = this.channels.concat(t.channels)),
									(this.loading = !1),
									(this.skip = t.skip),
									(this.take = t.take);
							}
						},
						{
							key: "getTopicFail",
							value: function(t) {
								console.log(t), (this.loading = !1);
							}
						}
					]),
					t
				);
			})();
		e.a = o.a.createStore(c);
	}
});
