webpackJsonp([8], {
	"./app/components/SignInDialog/SignInDialog.css": function(e, n, o) {
		var t = o(
			"./node_modules/css-loader/index.js!./app/components/SignInDialog/SignInDialog.css"
		);
		"string" == typeof t && (t = [[e.i, t, ""]]);
		var i = {};
		i.transform = void 0;
		o("./node_modules/style-loader/lib/addStyles.js")(t, i);
		t.locals && (e.exports = t.locals);
	},
	"./app/components/SignInDialog/index.js": function(e, n, o) {
		"use strict";
		function t(e, n) {
			if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
		}
		function i(e, n) {
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
		var r = o("./node_modules/react/index.js"),
			s = o.n(r),
			l = o("./app/components/SignInDialog/SignInDialog.css"),
			c = (o.n(l),
			(function() {
				var e =
					("function" == typeof Symbol && Symbol.for && Symbol.for("react.element")) ||
					60103;
				return function(n, o, t, i) {
					var a = n && n.defaultProps,
						r = arguments.length - 3;
					if ((o || 0 === r || (o = {}), o && a))
						for (var s in a) void 0 === o[s] && (o[s] = a[s]);
					else o || (o = a || {});
					if (1 === r) o.children = i;
					else if (r > 1) {
						for (var l = Array(r), c = 0; c < r; c++) l[c] = arguments[c + 3];
						o.children = l;
					}
					return {
						$$typeof: e,
						type: n,
						key: void 0 === t ? null : "" + t,
						ref: null,
						props: o,
						_owner: null
					};
				};
			})()),
			d = (function() {
				function e(e, n) {
					for (var o = 0; o < n.length; o++) {
						var t = n[o];
						(t.enumerable = t.enumerable || !1),
							(t.configurable = !0),
							"value" in t && (t.writable = !0),
							Object.defineProperty(e, t.key, t);
					}
				}
				return function(n, o, t) {
					return o && e(n.prototype, o), t && e(n, t), n;
				};
			})(),
			u = c(
				"div",
				{ id: "signin-dialog", className: "modal fade" },
				void 0,
				c(
					"div",
					{ className: "modal-dialog" },
					void 0,
					c(
						"div",
						{ className: "modal-content" },
						void 0,
						c(
							"div",
							{ className: "modal-header" },
							void 0,
							c(
								"button",
								{
									type: "button",
									className: "close",
									"data-dismiss": "modal",
									"aria-hidden": "true"
								},
								void 0,
								"×"
							),
							c("h3", { className: "modal-title" }, void 0, "Oh no!")
						),
						c(
							"div",
							{ className: "modal-body" },
							void 0,
							c(
								"p",
								{},
								void 0,
								"You need to sign in with your YouTube account in order to perform this action."
							),
							c(
								"p",
								{},
								void 0,
								"Consider visiting the sign in page for more information:"
							),
							c(
								"center",
								{ className: "banner-channel" },
								void 0,
								c(
									"a",
									{
										href: "/signin",
										className: "btn btn-raised btn-sm btn-danger yt-login"
									},
									void 0,
									"Sign In with ",
									c("i", { className: "fa fa-youtube" }),
									" YouTube"
								)
							)
						)
					)
				)
			),
			p = (function(e) {
				function n() {
					return (
						t(this, n),
						i(this, (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments))
					);
				}
				return (
					a(n, e),
					d(n, [
						{
							key: "render",
							value: function() {
								return u;
							}
						}
					]),
					n
				);
			})(s.a.PureComponent);
		n.default = p;
	},
	"./node_modules/css-loader/index.js!./app/components/SignInDialog/SignInDialog.css": function(
		e,
		n,
		o
	) {
		(n = e.exports = o("./node_modules/css-loader/lib/css-base.js")(void 0)),
			n.push([
				e.i,
				".banner-channel{margin-top:20px;margin-bottom:20px}.banner-channel iframe{height:50px!important}",
				""
			]);
	}
});
