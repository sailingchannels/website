webpackJsonp([22], {
	"./app/components/Description/Loadable.js": function(e, n, t) {
		"use strict";
		var o = t("./node_modules/react-loadable/lib/index.js"),
			r = t.n(o);
		n.a = r()({
			loader: function() {
				return t.e(16).then(t.bind(null, "./app/components/Description/index.js"));
			},
			loading: function() {
				return null;
			}
		});
	},
	"./app/components/SuggestChannelsList/index.js": function(e, n, t) {
		"use strict";
		function o(e, n) {
			if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
		}
		function r(e, n) {
			if (!e)
				throw new ReferenceError(
					"this hasn't been initialised - super() hasn't been called"
				);
			return !n || ("object" != typeof n && "function" != typeof n) ? e : n;
		}
		function i(e, n) {
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
		var l = t("./node_modules/react/index.js"),
			a = t("./app/components/Description/Loadable.js"),
			c = t("./node_modules/react-lazyload/lib/index.js"),
			s = t.n(c),
			u = t("./node_modules/react-loadable/lib/index.js"),
			d = t.n(u),
			f = d()({
				loader: function() {
					return t.e(25).then(t.bind(null, "./app/components/SuggestButton/index.js"));
				},
				loading: function() {
					return null;
				}
			}),
			p = (function() {
				var e =
					("function" == typeof Symbol && Symbol.for && Symbol.for("react.element")) ||
					60103;
				return function(n, t, o, r) {
					var i = n && n.defaultProps,
						l = arguments.length - 3;
					if ((t || 0 === l || (t = {}), t && i))
						for (var a in i) void 0 === t[a] && (t[a] = i[a]);
					else t || (t = i || {});
					if (1 === l) t.children = r;
					else if (l > 1) {
						for (var c = Array(l), s = 0; s < l; s++) c[s] = arguments[s + 3];
						t.children = c;
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
			})(),
			m = (function() {
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
			b = (function(e) {
				function n() {
					return (
						o(this, n),
						r(this, (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments))
					);
				}
				return (
					i(n, e),
					m(n, [
						{
							key: "render",
							value: function() {
								return p(
									"div",
									{},
									void 0,
									this.props.channels.map(function(e) {
										return p(
											"div",
											{ className: "row", style: { minHeight: "120px" } },
											"channel-suggest-" + e._id,
											p(
												"div",
												{ className: "col-md-2 col-sm-2 col-xs-3" },
												void 0,
												p(
													"center",
													{},
													void 0,
													p(
														s.a,
														{ once: !0 },
														void 0,
														p("img", {
															src: e.data.thumbnail,
															className: "channel-thumb"
														})
													)
												)
											),
											p(
												"div",
												{ className: "col-md-7 col-sm-6 col-xs-9" },
												void 0,
												p(
													"h3",
													{},
													void 0,
													p(
														"a",
														{
															href:
																"https://youtube.com/channel/" +
																e._id,
															target: "_blank"
														},
														void 0,
														e.data.title
													)
												),
												p(
													"div",
													{ className: "hidden-xs" },
													void 0,
													e.data.description
														? p(a.a, {
																text: e.data.description,
																more: !0,
																maxLength: 100
														  })
														: null
												)
											),
											p(
												"div",
												{
													className:
														"col-md-3 col-sm-4 col-xs-10 col-xs-offset-3 col-md-offset-0 col-sm-offset-0"
												},
												void 0,
												p(f, { channel: e._id })
											)
										);
									})
								);
							}
						}
					]),
					n
				);
			})(l.Component);
		n.default = b;
	}
});
