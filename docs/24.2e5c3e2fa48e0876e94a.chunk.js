webpackJsonp([24], {
	"./app/components/Tags/index.js": function(e, n, t) {
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
		var a = t("./node_modules/react/index.js"),
			u = t.n(a),
			s = t("./node_modules/react-router-dom/index.js"),
			c = (t.n(s), t("./app/actions/ChannelActions.js")),
			l = t("./app/stores/ChannelStore.js"),
			f = (function() {
				var e =
					("function" == typeof Symbol && Symbol.for && Symbol.for("react.element")) ||
					60103;
				return function(n, t, o, r) {
					var i = n && n.defaultProps,
						a = arguments.length - 3;
					if ((t || 0 === a || (t = {}), t && i))
						for (var u in i) void 0 === t[u] && (t[u] = i[u]);
					else t || (t = i || {});
					if (1 === a) t.children = r;
					else if (a > 1) {
						for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
						t.children = s;
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
			p = (function() {
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
			d = (function(e) {
				function n(e) {
					o(this, n);
					var t = r(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, e));
					return (t.state = l.a.getState()), (t.onChange = t.onChange.bind(t)), t;
				}
				return (
					i(n, e),
					p(n, [
						{
							key: "componentDidMount",
							value: function() {
								l.a.listen(this.onChange), c.a.getTags(this.props.id);
							}
						},
						{
							key: "componentWillReceiveProps",
							value: function(e) {
								e.id !== this.props.id && c.a.getTags(e.id);
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
							key: "render",
							value: function() {
								if (this.state.tags)
									return f(
										"div",
										{},
										void 0,
										this.state.tags.map(function(e, n) {
											return f(
												s.Link,
												{
													className: "badge badge-secondary",
													to: "/topic/" + encodeURIComponent(e.tag)
												},
												n,
												e.tag
											);
										})
									);
							}
						}
					]),
					n
				);
			})(u.a.Component);
		n.default = d;
	}
});
