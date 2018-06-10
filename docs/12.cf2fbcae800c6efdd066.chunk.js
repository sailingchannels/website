webpackJsonp([12], {
	"./app/components/Suggest/Suggest.css": function(e, n, t) {
		var o = t("./node_modules/css-loader/index.js!./app/components/Suggest/Suggest.css");
		"string" == typeof o && (o = [[e.i, o, ""]]);
		var s = {};
		s.transform = void 0;
		t("./node_modules/style-loader/lib/addStyles.js")(o, s);
		o.locals && (e.exports = o.locals);
	},
	"./app/components/Suggest/index.js": function(e, n, t) {
		"use strict";
		function o(e, n) {
			if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
		}
		function s(e, n) {
			if (!e)
				throw new ReferenceError(
					"this hasn't been initialised - super() hasn't been called"
				);
			return !n || ("object" != typeof n && "function" != typeof n) ? e : n;
		}
		function a(e, n) {
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
		var i = t("./node_modules/react/index.js"),
			r = t("./app/components/OffsetMenu/index.js"),
			l = t("./app/components/OffsetSocial/index.js"),
			c = t("./app/components/Logo/index.js"),
			u = t("./node_modules/react-loadable/lib/index.js"),
			d = t.n(u),
			p = d()({
				loader: function() {
					return t
						.e(25)
						.then(t.bind(null, "./app/components/ChannelMissingTester/index.js"));
				},
				loading: function() {
					return null;
				}
			}),
			f = t("./app/actions/MeActions.js"),
			h = t("./app/stores/MeStore.js"),
			g = d()({
				loader: function() {
					return t.e(21).then(t.bind(null, "./app/components/SuggestChannels/index.js"));
				},
				loading: function() {
					return null;
				}
			}),
			m = t("./node_modules/react-router-dom/index.js"),
			b = t("./node_modules/react-cookie/index.js"),
			v = t.n(b),
			y = (t("./app/components/Suggest/Suggest.css"),
			(function() {
				var e =
					("function" == typeof Symbol && Symbol.for && Symbol.for("react.element")) ||
					60103;
				return function(n, t, o, s) {
					var a = n && n.defaultProps,
						i = arguments.length - 3;
					if ((t || 0 === i || (t = {}), t && a))
						for (var r in a) void 0 === t[r] && (t[r] = a[r]);
					else t || (t = a || {});
					if (1 === i) t.children = s;
					else if (i > 1) {
						for (var l = Array(i), c = 0; c < i; c++) l[c] = arguments[c + 3];
						t.children = l;
					}
					return {
						$$typeof: e,
						type: n,
						key: void 0 === o ? null : "" + o,
						ref: null,
						props: t,
						_owner: null
					};
				};
			})()),
			S = (function() {
				function e(e, n) {
					for (var t = 0; t < n.length; t++) {
						var o = n[t];
						(o.enumerable = o.enumerable || !1),
							(o.configurable = !0),
							"value" in o && (o.writable = !0),
							Object.defineProperty(e, o.key, o);
					}
				}
				return function(n, t, o) {
					return t && e(n.prototype, t), o && e(n, o), n;
				};
			})(),
			w = y(l.a, {}),
			x = y(c.a, { className: "hidden-xs hidden-sm" }),
			j = y(r.a, {}),
			_ = y("div", { className: "col-md-3" }),
			k = y("h1", { className: "content-h1" }, void 0, "Suggest a channel"),
			N = y(
				"p",
				{},
				void 0,
				"Know of any sailing channels that are not listed here? Well, that's brilliant! You can use the form below to check and suggest a channel for the list:"
			),
			O = y(p, {}),
			C = y(
				"center",
				{},
				void 0,
				y(
					"a",
					{
						href: "/oauth2callback",
						className: "btn btn-raised btn-sm btn-danger yt-login"
					},
					void 0,
					"Sign In with ",
					y("i", { className: "fa fa-youtube" }),
					" YouTube"
				),
				y(
					m.Link,
					{ className: "btn btn-link show btn-more-info", to: "/signin" },
					void 0,
					"More info"
				),
				y(
					"p",
					{},
					void 0,
					"If you login with your YouTube account,",
					y("br", {}),
					"you can easily suggest channels from this page:"
				),
				y("p", {}, void 0, " "),
				y(
					m.Link,
					{ to: "/signin" },
					void 0,
					y("img", {
						className: "feature-backdrop",
						width: "80%",
						src:
							"https://cdn.rawgit.com/sailingchannels/website/9783a9b7/public/img/features/suggest.png"
					})
				)
			),
			M = y("div", { className: "col-md-3" }),
			P = (function(e) {
				function n(e) {
					o(this, n);
					var t = s(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, e));
					return (t.state = h.a.getState()), (t.onChange = t.onChange.bind(t)), t;
				}
				return (
					a(n, e),
					S(n, [
						{
							key: "componentDidMount",
							value: function() {
								var e = this;
								(document.title = "Suggest a channel | Sailing Channels"),
									h.a.listen(this.onChange),
									this.setState(
										{
											me: v.a.load("me")
												? JSON.parse(v.a.load("me").replace("j:", ""))
												: null
										},
										function() {
											0 === e.state.subscriptions.length &&
												e.state.me &&
												f.a.getSubscriptions();
										}
									);
							}
						},
						{
							key: "componentWillUnmount",
							value: function() {
								h.a.unlisten(this.onChange);
							}
						},
						{
							key: "onChange",
							value: function(e) {
								this.setState(e);
							}
						},
						{
							key: "replaceX",
							value: function(e) {
								e.target.href = e.target.href.replace(/x/g, "");
							}
						},
						{
							key: "render",
							value: function() {
								return y(
									"div",
									{ className: "container" },
									void 0,
									w,
									x,
									j,
									y(
										"div",
										{ className: "row content-row" },
										void 0,
										_,
										y(
											"div",
											{ className: "col-md-6" },
											void 0,
											k,
											this.state.me
												? y(
														"div",
														{},
														void 0,
														N,
														O,
														y(g, {
															subscriptions: this.state.subscriptions
														})
												  )
												: y(
														"div",
														{},
														void 0,
														y(
															"p",
															{},
															void 0,
															"Know of any sailing channels that are not listed here? Well, that's brilliant! Send an email with the link to the channel to",
															" ",
															y(
																"a",
																{
																	href:
																		"mailto:ahoyx@sailingx-channels.com",
																	onMouseOver: this.replaceX.bind(
																		this
																	),
																	className: "reverse"
																},
																void 0,
																"moc.slennahc-gnilias@yoha"
															)
														),
														C
												  )
										),
										M
									)
								);
							}
						}
					]),
					n
				);
			})(i.Component);
		n.default = P;
	},
	"./node_modules/css-loader/index.js!./app/components/Suggest/Suggest.css": function(e, n, t) {
		(n = e.exports = t("./node_modules/css-loader/lib/css-base.js")(void 0)),
			n.push([
				e.i,
				".feature-backdrop{-webkit-box-shadow:0 0 20px 0 rgba(0,0,0,.2);-moz-box-shadow:0 0 20px 0 rgba(0,0,0,.2);box-shadow:0 0 20px 0 rgba(0,0,0,.2);border:1px solid #ddd}",
				""
			]);
	}
});
