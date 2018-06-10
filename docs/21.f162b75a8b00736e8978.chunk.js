webpackJsonp([21], {
	"./app/components/Description/Loadable.js": function(e, o, t) {
		"use strict";
		var n = t("./node_modules/react-loadable/lib/index.js"),
			i = t.n(n);
		o.a = i()({
			loader: function() {
				return t.e(16).then(t.bind(null, "./app/components/Description/index.js"));
			},
			loading: function() {
				return null;
			}
		});
	},
	"./app/components/VideoListItem/index.js": function(e, o, t) {
		"use strict";
		function n(e, o) {
			if (!(e instanceof o)) throw new TypeError("Cannot call a class as a function");
		}
		function i(e, o) {
			if (!e)
				throw new ReferenceError(
					"this hasn't been initialised - super() hasn't been called"
				);
			return !o || ("object" != typeof o && "function" != typeof o) ? e : o;
		}
		function r(e, o) {
			if ("function" != typeof o && null !== o)
				throw new TypeError(
					"Super expression must either be null or a function, not " + typeof o
				);
			(e.prototype = Object.create(o && o.prototype, {
				constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 }
			})),
				o && (Object.setPrototypeOf ? Object.setPrototypeOf(e, o) : (e.__proto__ = o));
		}
		Object.defineProperty(o, "__esModule", { value: !0 });
		var a = t("./node_modules/react/index.js"),
			s = t.n(a),
			l = t("./app/components/Description/Loadable.js"),
			d = t("./node_modules/react-router-dom/index.js"),
			c = (t.n(d), t("./node_modules/react-lazyload/lib/index.js")),
			p = t.n(c),
			u = (function() {
				var e =
					("function" == typeof Symbol && Symbol.for && Symbol.for("react.element")) ||
					60103;
				return function(o, t, n, i) {
					var r = o && o.defaultProps,
						a = arguments.length - 3;
					if ((t || 0 === a || (t = {}), t && r))
						for (var s in r) void 0 === t[s] && (t[s] = r[s]);
					else t || (t = r || {});
					if (1 === a) t.children = i;
					else if (a > 1) {
						for (var l = Array(a), d = 0; d < a; d++) l[d] = arguments[d + 3];
						t.children = l;
					}
					return {
						$$typeof: e,
						type: o,
						key: void 0 === n ? null : "" + n,
						ref: null,
						props: t,
						_owner: null
					};
				};
			})(),
			f = (function() {
				function e(e, o) {
					for (var t = 0; t < o.length; t++) {
						var n = o[t];
						(n.enumerable = n.enumerable || !1),
							(n.configurable = !0),
							"value" in n && (n.writable = !0),
							Object.defineProperty(e, n.key, n);
					}
				}
				return function(o, t, n) {
					return t && e(o.prototype, t), n && e(o, n), o;
				};
			})(),
			v = u("b", {}, void 0, "Channel:"),
			b = u("b", {}, void 0, "Views:"),
			h = u("b", {}, void 0, "Likes:"),
			m = u("i", { className: "fa fa-thumbs-up fa-fw" }),
			y = u("i", { className: "fa fa-thumbs-down fa-fw" }),
			_ = u("b", {}, void 0, "Uploaded:"),
			w = u("i", { className: "fa fa-youtube-play" }),
			g = (function(e) {
				function o() {
					return (
						n(this, o),
						i(this, (o.__proto__ || Object.getPrototypeOf(o)).apply(this, arguments))
					);
				}
				return (
					r(o, e),
					f(o, [
						{
							key: "formatDate",
							value: function(e) {
								var o = [
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
									t = new Date(1e3 * e);
								return o[t.getMonth()] + " " + t.getDate() + ", " + t.getFullYear();
							}
						},
						{
							key: "render",
							value: function() {
								return this.props.video.channel
									? u(
											"div",
											{ className: "row channel-row" },
											void 0,
											u(
												"div",
												{ className: "col-md-2 col-xs-2" },
												void 0,
												u(
													"center",
													{},
													void 0,
													u(
														p.a,
														{ once: !0 },
														void 0,
														u("img", {
															src:
																"https://img.youtube.com/vi/" +
																this.props.video._id +
																"/default.jpg",
															className: "channel-thumb"
														})
													)
												)
											),
											u(
												"div",
												{ className: "col-md-7 col-xs-10" },
												void 0,
												u(
													"h3",
													{},
													void 0,
													u(
														d.Link,
														{ to: "/video/" + this.props.video._id },
														void 0,
														this.props.video.title
													)
												),
												u(l.a, {
													text: this.props.video.description,
													video: !0
												})
											),
											u(
												"div",
												{
													className:
														"col-md-3 col-xs-10 col-xs-offset-2 col-md-offset-0"
												},
												void 0,
												u(
													"p",
													{},
													void 0,
													v,
													" ",
													u(
														d.Link,
														{
															to:
																"/channel/" +
																this.props.video.channel._id
														},
														void 0,
														this.props.video.channel.title
													)
												),
												u(
													"p",
													{},
													void 0,
													b,
													" ",
													(this.props.video.views || 0).toLocaleString()
												),
												u(
													"p",
													{},
													void 0,
													h,
													" ",
													m,
													" ",
													(this.props.video.likes || 0).toLocaleString(),
													" ",
													y,
													" ",
													(
														this.props.video.dislikes || 0
													).toLocaleString()
												),
												u(
													"p",
													{},
													void 0,
													_,
													" ",
													this.formatDate(this.props.video.publishedAt)
												),
												u(
													d.Link,
													{
														to: "/video/" + this.props.video._id,
														className:
															"btn btn-default btn-sidebar btn-raised"
													},
													void 0,
													w,
													" Watch video"
												)
											)
									  )
									: null;
							}
						}
					]),
					o
				);
			})(s.a.Component);
		o.default = g;
	}
});
