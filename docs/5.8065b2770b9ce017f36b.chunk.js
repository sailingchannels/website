webpackJsonp([5], {
	"./app/components/SupportUs/index.js": function(e, t, o) {
		"use strict";
		function n(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
		}
		function a(e, t) {
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
		Object.defineProperty(t, "__esModule", { value: !0 });
		var r = o("./node_modules/react/index.js"),
			p = o.n(r),
			s = o("./app/components/OffsetMenu/index.js"),
			c = o("./app/components/OffsetSocial/index.js"),
			l = o("./app/components/Logo/index.js"),
			u = o("./node_modules/react-lazyload/lib/index.js"),
			d = o.n(u),
			f = (function() {
				var e =
					("function" == typeof Symbol && Symbol.for && Symbol.for("react.element")) ||
					60103;
				return function(t, o, n, a) {
					var i = t && t.defaultProps,
						r = arguments.length - 3;
					if ((o || 0 === r || (o = {}), o && i))
						for (var p in i) void 0 === o[p] && (o[p] = i[p]);
					else o || (o = i || {});
					if (1 === r) o.children = a;
					else if (r > 1) {
						for (var s = Array(r), c = 0; c < r; c++) s[c] = arguments[c + 3];
						o.children = s;
					}
					return {
						$$typeof: e,
						type: t,
						key: void 0 === n ? null : "" + n,
						ref: null,
						props: o,
						_owner: null
					};
				};
			})(),
			m = (function() {
				function e(e, t) {
					for (var o = 0; o < t.length; o++) {
						var n = t[o];
						(n.enumerable = n.enumerable || !1),
							(n.configurable = !0),
							"value" in n && (n.writable = !0),
							Object.defineProperty(e, n.key, n);
					}
				}
				return function(t, o, n) {
					return o && e(t.prototype, o), n && e(t, n), t;
				};
			})(),
			b = f(c.a, {}),
			h = f(l.a, { className: "hidden-xs hidden-sm" }),
			v = f(s.a, {}),
			g = f("div", { className: "col-md-3" }),
			y = f("h1", { className: "content-h1" }, void 0, "Support Us"),
			w = f(
				"p",
				{},
				void 0,
				"The",
				" ",
				f(
					"a",
					{ href: "/channel/UCZbZeC2OfdVMwm9AR_zu0_g", target: "_blank" },
					void 0,
					f("b", {}, void 0, "Two aboard Tuuli crew")
				),
				" ",
				"created this website in their sparetime for you."
			),
			j = f(
				"p",
				{},
				void 0,
				"If you like it, and want to give something back, feel free to support us with a tip via the following platforms. It means a lot to us!"
			),
			_ = f("p", {}, void 0, "- Kristy & Thomas"),
			x = f("div", { className: "col-md-3" }),
			O = (function(e) {
				function t() {
					return (
						n(this, t),
						a(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
					);
				}
				return (
					i(t, e),
					m(t, [
						{
							key: "componentDidMount",
							value: function() {
								document.title = "Support Us | Sailing Channels";
							}
						},
						{
							key: "render",
							value: function() {
								return f(
									"div",
									{ className: "container" },
									void 0,
									b,
									h,
									v,
									f(
										"div",
										{ className: "row content-row" },
										void 0,
										g,
										f(
											"div",
											{ className: "col-md-6" },
											void 0,
											y,
											f(
												d.a,
												{},
												void 0,
												f(
													"p",
													{},
													void 0,
													f("img", {
														id: "banner-img",
														src: o("./app/images/twoaboardtuuli.jpg"),
														width: "100%"
													})
												)
											),
											w,
											j,
											_,
											f(
												"div",
												{
													id: "support-links",
													className: "row support-row"
												},
												void 0,
												f(
													"div",
													{ className: "col-md-6 text-center" },
													void 0,
													f(
														"a",
														{
															href:
																"https://www.patreon.com/sailingchannels",
															target: "_blank"
														},
														void 0,
														f("img", {
															src: o("./app/images/patreon.jpg"),
															height: "150",
															width: "150"
														})
													)
												),
												f(
													"div",
													{ className: "col-md-6 text-center" },
													void 0,
													f(
														"a",
														{
															href:
																"https://www.paypal.me/sailingchannels",
															target: "_blank"
														},
														void 0,
														f("img", {
															src: o("./app/images/paypal.png"),
															height: "150",
															width: "150"
														})
													)
												)
											)
										),
										x
									)
								);
							}
						}
					]),
					t
				);
			})(p.a.PureComponent);
		t.default = O;
	},
	"./app/images/patreon.jpg": function(e, t, o) {
		e.exports = o.p + "c28786718cde9f7fa6b0c00b03bccacf.jpg";
	},
	"./app/images/paypal.png": function(e, t, o) {
		e.exports = o.p + "993dcdc9accc3ba091b9cc34a4aea2b2.png";
	},
	"./app/images/twoaboardtuuli.jpg": function(e, t, o) {
		e.exports = o.p + "066e6bc09552583108f5b742c2618022.jpg";
	}
});
