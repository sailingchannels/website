webpackJsonp([10], {
	"./app/components/DataCollection/DataCollection.css": function(e, o, t) {
		var n = t(
			"./node_modules/css-loader/index.js!./app/components/DataCollection/DataCollection.css"
		);
		"string" == typeof n && (n = [[e.i, n, ""]]);
		var i = {};
		i.transform = void 0;
		t("./node_modules/style-loader/lib/addStyles.js")(n, i);
		n.locals && (e.exports = n.locals);
	},
	"./app/components/DataCollection/index.js": function(e, o, t) {
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
		function s(e, o) {
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
			r = t.n(a),
			l = t("./app/components/OffsetMenu/index.js"),
			c = t("./app/components/OffsetSocial/index.js"),
			d = t("./app/components/Logo/index.js"),
			u = t("./app/components/DataCollection/DataCollection.css"),
			p = (t.n(u),
			(function() {
				var e =
					("function" == typeof Symbol && Symbol.for && Symbol.for("react.element")) ||
					60103;
				return function(o, t, n, i) {
					var s = o && o.defaultProps,
						a = arguments.length - 3;
					if ((t || 0 === a || (t = {}), t && s))
						for (var r in s) void 0 === t[r] && (t[r] = s[r]);
					else t || (t = s || {});
					if (1 === a) t.children = i;
					else if (a > 1) {
						for (var l = Array(a), c = 0; c < a; c++) l[c] = arguments[c + 3];
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
			})()),
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
			m = p(
				"div",
				{ className: "container" },
				void 0,
				p(c.a, {}),
				p(d.a, { className: "hidden-xs hidden-sm" }),
				p(l.a, {}),
				p(
					"div",
					{ className: "row content-row" },
					void 0,
					p("div", { className: "col-md-3" }),
					p(
						"div",
						{ className: "col-md-6" },
						void 0,
						p("h1", { className: "content-h1" }, void 0, "How does this work?"),
						p(
							"p",
							{},
							void 0,
							"Well basically what this website does is list youtube channels that are related to sailing, circumnavigation or people living aboard their boats."
						),
						p("center", {}, void 0, p("p", {}, void 0, "~")),
						p(
							"p",
							{},
							void 0,
							"The channels are discovered by doing a network analysis. Basically finding out who subscribed to whom."
						),
						p("center", {}, void 0, p("p", {}, void 0, "~")),
						p(
							"p",
							{},
							void 0,
							"The algorithm uses a (super secret) starting channel and scans all subscriptions of this channel. The next step is recursively scanning all subscriptions of the subscriptions of the starting channel and so on."
						),
						p(
							"center",
							{},
							void 0,
							p("iframe", {
								className: "intro-video",
								width: "100%",
								height: "315",
								src: "https://www.youtube.com/embed/RWosJPnB900?start=53",
								frameBorder: "0",
								allowFullScreen: !0
							})
						),
						p(
							"center",
							{},
							void 0,
							p("iframe", {
								className: "intro-video",
								width: "100%",
								height: "315",
								src: "https://www.youtube.com/embed/WFuSJj3v7PM",
								frameBorder: "0",
								allowFullScreen: !0
							})
						),
						p(
							"center",
							{},
							void 0,
							p("iframe", {
								className: "intro-video",
								width: "100%",
								height: "315",
								src: "https://www.youtube.com/embed/5PXhfW7j2m8",
								frameBorder: "0",
								allowFullScreen: !0
							})
						)
					),
					p("div", { className: "col-md-3" })
				)
			),
			h = (function(e) {
				function o() {
					return (
						n(this, o),
						i(this, (o.__proto__ || Object.getPrototypeOf(o)).apply(this, arguments))
					);
				}
				return (
					s(o, e),
					f(o, [
						{
							key: "componentDidMount",
							value: function() {
								document.title = "How does this work? | Sailing Channels";
							}
						},
						{
							key: "render",
							value: function() {
								return m;
							}
						}
					]),
					o
				);
			})(r.a.Component);
		o.default = h;
	},
	"./node_modules/css-loader/index.js!./app/components/DataCollection/DataCollection.css": function(
		e,
		o,
		t
	) {
		(o = e.exports = t("./node_modules/css-loader/lib/css-base.js")(void 0)),
			o.push([e.i, ".intro-video{max-width:560px}", ""]);
	}
});
