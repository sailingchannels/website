webpackJsonp([23], {
	"./app/components/ChannelMissingTester/index.js": function(e, n, t) {
		"use strict";
		function l(e, n) {
			if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
		}
		function a(e, n) {
			if (!e)
				throw new ReferenceError(
					"this hasn't been initialised - super() hasn't been called"
				);
			return !n || ("object" != typeof n && "function" != typeof n) ? e : n;
		}
		function o(e, n) {
			if ("function" != typeof n && null !== n)
				throw new TypeError(
					"Super expression must either be null or a function, not " + typeof n
				);
			(e.prototype = Object.create(n && n.prototype, {
				constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 }
			})),
				n && (Object.setPrototypeOf ? Object.setPrototypeOf(e, n) : (e.__proto__ = n));
		}
		Object.defineProperty(n, "__esModule", { value: !0 });
		var s = t("./node_modules/react/index.js"),
			i = (t.n(s), t("./node_modules/react-router-dom/index.js")),
			c = (t.n(i), t("./app/helpers/http.js")),
			r = t("./app/components/SuggestChannelsList/Loadable.js"),
			u = (function() {
				var e =
					("function" == typeof Symbol && Symbol.for && Symbol.for("react.element")) ||
					60103;
				return function(n, t, l, a) {
					var o = n && n.defaultProps,
						s = arguments.length - 3;
					if ((t || 0 === s || (t = {}), t && o))
						for (var i in o) void 0 === t[i] && (t[i] = o[i]);
					else t || (t = o || {});
					if (1 === s) t.children = a;
					else if (s > 1) {
						for (var c = Array(s), r = 0; r < s; r++) c[r] = arguments[r + 3];
						t.children = c;
					}
					return {
						$$typeof: e,
						type: n,
						key: void 0 === l ? null : "" + l,
						ref: null,
						props: t,
						_owner: null
					};
				};
			})(),
			h = (function() {
				function e(e, n) {
					for (var t = 0; t < n.length; t++) {
						var l = n[t];
						(l.enumerable = l.enumerable || !1),
							(l.configurable = !0),
							"value" in l && (l.writable = !0),
							Object.defineProperty(e, l.key, l);
					}
				}
				return function(n, t, l) {
					return t && e(n.prototype, t), l && e(n, l), n;
				};
			})(),
			p = u("p", {}, void 0, "Checking..."),
			d = u(
				"center",
				{},
				void 0,
				u(
					"p",
					{ className: "text text-warning" },
					void 0,
					"This is not a valid YouTube channel!"
				)
			),
			f = (function(e) {
				function n(e) {
					l(this, n);
					var t = a(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, e));
					return (
						(t.state = { channelValue: "", checkChannelResult: null, checking: !1 }), t
					);
				}
				return (
					o(n, e),
					h(n, [
						{
							key: "handleChange",
							value: function(e) {
								var n = this,
									t = e.target.value;
								this.setState({
									channelValue: t,
									checking: t.length > 0,
									checkChannelResult: null
								}),
									new c.a().post(
										{
											url: "/api/channels/identify",
											data: JSON.stringify({ hints: [t] }),
											headers: { "Content-Type": "application/json" },
											type: "POST",
											dataType: "json",
											cache: !1
										},
										function(e, t) {
											e || !t
												? n.setState({
														checkChannelResult: null,
														channel: null,
														checking: !1
												  })
												: null === t[0].src
													? n.setState({
															checkChannelResult: !1,
															channel: null,
															checking: !1
													  })
													: n.setState({
															checkChannelResult: "db" === t[0].src,
															channel: t[0],
															checking: !1
													  });
										}
									);
							}
						},
						{
							key: "render",
							value: function() {
								return u(
									"div",
									{},
									void 0,
									u(
										"center",
										{},
										void 0,
										u("input", {
											type: "text",
											placeholder: "https://youtube.com/channel/...",
											style: { width: "80%", marginBottom: "20px" },
											className: "form-control",
											value: this.state.channelValue,
											onChange: this.handleChange.bind(this)
										}),
										this.state.checking ? p : null
									),
									!1 === this.state.checkChannelResult &&
									null !== this.state.channel &&
									this.state.channelValue.length > 0
										? u(r.a, { channels: [this.state.channel] })
										: null,
									!0 === this.state.checkChannelResult &&
									this.state.channelValue.length > 0
										? u(
												"center",
												{},
												void 0,
												u(
													"p",
													{ className: "text text-success" },
													void 0,
													"Well, this channel is already listed, check it out:",
													" ",
													u(
														i.Link,
														{
															to: "/channel/" + this.state.channel._id
														},
														void 0,
														this.state.channel.data.title
													)
												)
										  )
										: null,
									!1 === this.state.checkChannelResult &&
									null === this.state.channel &&
									this.state.channelValue.length > 0
										? d
										: null
								);
							}
						}
					]),
					n
				);
			})(s.Component);
		n.default = f;
	},
	"./app/components/SuggestChannelsList/Loadable.js": function(e, n, t) {
		"use strict";
		var l = t("./node_modules/react-loadable/lib/index.js"),
			a = t.n(l);
		n.a = a()({
			loader: function() {
				return t.e(22).then(t.bind(null, "./app/components/SuggestChannelsList/index.js"));
			},
			loading: function() {
				return null;
			}
		});
	}
});
