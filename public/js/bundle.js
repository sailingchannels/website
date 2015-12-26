(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _alt = require("../alt");

var _alt2 = _interopRequireDefault(_alt);

// CHANNEL LIST ACTIONS

var ArticleActions = (function () {
    function ArticleActions() {
        _classCallCheck(this, ArticleActions);
    }

    // VISIT

    _createClass(ArticleActions, [{
        key: "visit",
        value: function visit(articleId, callback) {

            $.ajax({
                url: "/articles/visit",
                type: "POST",
                dataType: "json",
                headers: {
                    "auth-type": localStorage.getItem("auth.type"),
                    "auth-token": localStorage.getItem("auth.token")
                },
                data: {
                    "id": articleId
                }
            }).done(function (data) {
                if (callback) return callback(null, data);
            }).fail(function (jqXhr) {
                if (callback) return callback(jqXhr, null);
            });
        }
    }]);

    return ArticleActions;
})();

exports["default"] = _alt2["default"].createActions(ArticleActions);
module.exports = exports["default"];

},{"../alt":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _alt = require("../alt");

var _alt2 = _interopRequireDefault(_alt);

// CHANNEL LIST ACTIONS

var ArticleListActions = (function () {
    function ArticleListActions() {
        _classCallCheck(this, ArticleListActions);

        this.generateActions("getArticlesSuccess", "getArticlesFail");
    }

    // GET ARTCILES

    _createClass(ArticleListActions, [{
        key: "getArticles",
        value: function getArticles(channelId) {
            var _this = this;

            $.ajax({
                url: "/articles?channel=" + channelId + "&skip=0&take=10"
            }).done(function (data) {
                window.scrollTo(0, 0);
                console.log(data.length);
                _this.actions.getArticlesSuccess(data);
            }).fail(function (jqXhr) {
                _this.actions.getArticlesFail(jqXhr);
            });
        }
    }]);

    return ArticleListActions;
})();

exports["default"] = _alt2["default"].createActions(ArticleListActions);
module.exports = exports["default"];

},{"../alt":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _alt = require("../alt");

var _alt2 = _interopRequireDefault(_alt);

// CHANNEL LIST ACTIONS

var ChannelListActions = (function () {
    function ChannelListActions() {
        _classCallCheck(this, ChannelListActions);

        this.generateActions("getChannelsSuccess", "getChannelsFail");
    }

    // GET CHANNELS

    _createClass(ChannelListActions, [{
        key: "getChannels",
        value: function getChannels() {
            var _this = this;

            $.ajax({
                url: "/channels/getByUser",
                headers: {
                    "auth-type": window.Cookie.get("auth-type"),
                    "auth-token": window.Cookie.get("auth-token")
                }
            }).done(function (data) {
                _this.actions.getChannelsSuccess(data);
            }).fail(function (jqXhr) {
                _this.actions.getChannelsFail(jqXhr);
            });
        }

        // UNSUBSCRIBE CHANNEL
    }, {
        key: "unsubscribeChannel",
        value: function unsubscribeChannel(channelId, callback) {

            $.ajax({
                url: "/channels/unsubscribe",
                type: "POST",
                dataType: "json",
                data: {
                    "id": channelId
                },
                headers: {
                    "auth-type": window.Cookie.get("auth-type"),
                    "auth-token": window.Cookie.get("auth-token")
                },
                statusCode: {
                    401: function _() {
                        // TODO: logout user, he is not allowed to do this!
                        if (callback) return callback(401, false);
                    }
                },
                success: function success() {
                    if (callback) return callback(null, true);
                }
            });
        }

        // VISIT
    }, {
        key: "visit",
        value: function visit() {
            /*$.ajax({
                url: "/channels/visit", 
                type: "POST",
                dataType: "json",
                headers: {
                    "auth-type": auth.type,
                    "auth-token": auth.token,
                    "tld": tld()["tld"]
                },
                data: {
                    "id": that.channel
                },
                success: function(d) {
                    if(d["success"] == true) {
                        var $badge = $("[data-badge='" + that.channel + "']");
                        $badge.html("0");
                        $badge.hide();
                         subscriptionView.subscriptionVisits[that.channel] = moment.utc();
                    }
                }
            });*/
        }
    }]);

    return ChannelListActions;
})();

exports["default"] = _alt2["default"].createActions(ChannelListActions);
module.exports = exports["default"];

},{"../alt":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _alt = require("alt");

var _alt2 = _interopRequireDefault(_alt);

exports["default"] = new _alt2["default"]();
module.exports = exports["default"];

},{"alt":"alt"}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ChannelList = require("./ChannelList");

var _ChannelList2 = _interopRequireDefault(_ChannelList);

var _NoChannelHead = require("./NoChannelHead");

var _NoChannelHead2 = _interopRequireDefault(_NoChannelHead);

var Account = (function (_React$Component) {
	_inherits(Account, _React$Component);

	function Account() {
		_classCallCheck(this, Account);

		_get(Object.getPrototypeOf(Account.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(Account, [{
		key: "render",
		value: function render() {
			return _react2["default"].createElement(
				"div",
				{ className: "row" },
				_react2["default"].createElement(_ChannelList2["default"], null),
				_react2["default"].createElement(
					"div",
					{ className: "col-md-9" },
					_react2["default"].createElement(
						"div",
						{ className: "row channelhead clearfix" },
						_react2["default"].createElement(
							"div",
							{ className: "channelNameArea pull-left" },
							_react2["default"].createElement(
								"h1",
								null,
								"Account"
							)
						),
						_react2["default"].createElement(_NoChannelHead2["default"], null)
					),
					_react2["default"].createElement(
						"div",
						{ className: "row" },
						"Account"
					)
				)
			);
		}
	}]);

	return Account;
})(_react2["default"].Component);

exports["default"] = Account;
module.exports = exports["default"];

},{"./ChannelList":12,"./NoChannelHead":19,"react":"react"}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var App = (function (_React$Component) {
	_inherits(App, _React$Component);

	function App() {
		_classCallCheck(this, App);

		_get(Object.getPrototypeOf(App.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(App, [{
		key: "render",
		value: function render() {
			return _react2["default"].createElement(
				"div",
				null,
				this.props.children
			);
		}
	}]);

	return App;
})(_react2["default"].Component);

exports["default"] = App;
module.exports = exports["default"];

},{"react":"react"}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _actionsArticleActions = require("../actions/ArticleActions");

var _actionsArticleActions2 = _interopRequireDefault(_actionsArticleActions);

var _ArticleImage = require("./ArticleImage");

var _ArticleImage2 = _interopRequireDefault(_ArticleImage);

var Article = (function (_React$Component) {
	_inherits(Article, _React$Component);

	function Article() {
		_classCallCheck(this, Article);

		_get(Object.getPrototypeOf(Article.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(Article, [{
		key: "componentDidMount",

		// COMPONENT DID MOUNT
		value: function componentDidMount() {
			localStorage.setItem("seen." + this.props.article.id, true);
		}

		// ON SHARE FACEBOOK
	}, {
		key: "onShareFacebook",
		value: function onShareFacebook() {
			var _this = this;

			this.getShortId(this.props.article.id, function (data) {

				// open facebook popup
				var url = "http://facebook.com/sharer/sharer.php?u=https://informme.de/a/" + data.sid;
				_this.openPopup(url, 600);
			});
		}

		// ON SHARE GOOGLE
	}, {
		key: "onShareGoogle",
		value: function onShareGoogle() {
			var _this2 = this;

			this.getShortId(this.props.article.id, function (data) {

				// open facebook popup
				var url = "https://plus.google.com/share?url=https://informme.de/a/" + data.sid;
				_this2.openPopup(url, 500);
			});
		}

		// ON SHARE TWITTER
	}, {
		key: "onShareTwitter",
		value: function onShareTwitter() {
			var _this3 = this;

			this.getShortId(this.props.article.id, function (data) {

				// erase annoying "+++" content
				var t = _this3.props.article.title;
				if (t.indexOf("+++") > 0) {
					t = data["t"].replace(/\+\+\+.*\+\+\+/, "");
				}

				var title;
				var splitted = t.split(":");
				var count = splitted.length - 1;

				// use title directly
				if (count == 0) {
					title = t;
				}

				// if title is longer than 80 characters,
				// take the seconds split
				else if (count == 1) {
						if (t.length <= 80) {
							title = t;
						} else {
							title = splitted[1];
						}
					}

					// if there are a multitude of colons
					// available, take the last two splits
					else {
							title = splitted[count - 1] + ": " + splitted[count];
						}

				title = title.replace(/(^\s+|\s+$)/g, "").replace(/^[-=\s]*/mg, "");
				var url = "http://twitter.com/?status=\"" + title + "\": " + "https://informme.de/a/" + data.sid + " @informme_de";

				_this3.openPopup(url, 500);
			});
		}

		// ON HEADLINK CLICK
	}, {
		key: "onHeadlinkClick",
		value: function onHeadlinkClick() {

			// store the visit to this article
			_actionsArticleActions2["default"].visit(this.props.article.id, function (err, success) {
				if (err) console.error(err);
			});
		}

		// OPEN POPUP
	}, {
		key: "openPopup",
		value: function openPopup(url) {
			var h = arguments.length <= 1 || arguments[1] === undefined ? 300 : arguments[1];

			var w = 500;
			var left = screen.width / 2 - w / 2;
			var top = screen.height / 2 - h / 2 - 100;
			if (top < 0) top = 50;

			var p = window.open(url, "InformMe", "width=" + w + ",height=" + h + ",status=yes,scrollbars=yes,resizable=yes,top=" + top + ",left=" + left);
			p.focus();
		}

		// GET SHORT ID
	}, {
		key: "getShortId",
		value: function getShortId(id, callback) {

			$.ajax({
				url: "/api/shorten?id=" + id + "&type=article",
				dataType: "json",
				type: "GET",
				headers: {
					"tld": "de"
				},
				success: function success(data) {
					return callback(data);
				}
			});
		}

		// RENDER
	}, {
		key: "render",
		value: function render() {

			var image;

			// display image?
			if (this.props.article.image) {
				image = _react2["default"].createElement(_ArticleImage2["default"], { articleId: this.props.article.id });
			}

			// new or old row?
			var rowClass = "row article ";
			if (localStorage.getItem("seen." + this.props.article.id)) {
				rowClass += "old";
			} else {
				rowClass += "new";
			}

			return _react2["default"].createElement(
				"div",
				{ className: rowClass },
				_react2["default"].createElement(
					"div",
					{ className: "col-md-9" },
					_react2["default"].createElement(
						"small",
						null,
						window.moment.utc(this.props.article.published).fromNow()
					),
					_react2["default"].createElement(
						"a",
						{ className: "headlink", href: this.props.article.url, target: "_blank", onClick: this.onHeadlinkClick.bind(this) },
						_react2["default"].createElement(
							"h3",
							null,
							this.props.article.title
						)
					),
					_react2["default"].createElement(
						"span",
						{ className: "label label-default" },
						this.props.article.feed
					),
					" ",
					_react2["default"].createElement(
						"span",
						{ className: "article_content" },
						this.props.article.content
					),
					_react2["default"].createElement(
						"ul",
						{ className: "list-inline social-signal" },
						_react2["default"].createElement(
							"li",
							{ title: this.props.article.fb + " Likes & Shares", className: "facebook-signal", onClick: this.onShareFacebook.bind(this) },
							_react2["default"].createElement("i", { className: "fa fa-facebook-square" }),
							" ",
							this.props.article.fb
						),
						_react2["default"].createElement(
							"li",
							{ title: this.props.article.tw + " Tweets", className: "twitter-signal", onClick: this.onShareTwitter.bind(this) },
							_react2["default"].createElement("i", { className: "fa fa-twitter-square" }),
							" ",
							this.props.article.tw
						),
						_react2["default"].createElement(
							"li",
							{ title: this.props.article.gg + " Google +1", className: "google-signal", onClick: this.onShareGoogle.bind(this) },
							_react2["default"].createElement("i", { className: "fa fa-google-plus-square" }),
							" ",
							this.props.article.gg
						)
					)
				),
				_react2["default"].createElement(
					"div",
					{ className: "col-md-3 hidden-phone" },
					image
				)
			);
		}
	}]);

	return Article;
})(_react2["default"].Component);

exports["default"] = Article;
module.exports = exports["default"];

},{"../actions/ArticleActions":1,"./ArticleImage":8,"react":"react"}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var ArticleImage = (function (_React$Component) {
	_inherits(ArticleImage, _React$Component);

	function ArticleImage() {
		_classCallCheck(this, ArticleImage);

		_get(Object.getPrototypeOf(ArticleImage.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(ArticleImage, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			$("img[data-imgid='" + this.props.articleId + "']").unveil();
		}
	}, {
		key: "render",
		value: function render() {

			return _react2["default"].createElement("img", { width: "100%", src: "https://informme.s3.amazonaws.com/img/s.gif", "data-imgid": this.props.articleId, "data-src": "https://informme.de/image?id=" + this.props.articleId + "&width=197" });
		}
	}]);

	return ArticleImage;
})(_react2["default"].Component);

exports["default"] = ArticleImage;
module.exports = exports["default"];

},{"react":"react"}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _storesArticleListStore = require("../stores/ArticleListStore");

var _storesArticleListStore2 = _interopRequireDefault(_storesArticleListStore);

var _actionsArticleListActions = require("../actions/ArticleListActions");

var _actionsArticleListActions2 = _interopRequireDefault(_actionsArticleListActions);

var _Article = require("./Article");

var _Article2 = _interopRequireDefault(_Article);

var ArticleList = (function (_React$Component) {
	_inherits(ArticleList, _React$Component);

	function ArticleList(props) {
		_classCallCheck(this, ArticleList);

		_get(Object.getPrototypeOf(ArticleList.prototype), "constructor", this).call(this, props);
		this.state = _storesArticleListStore2["default"].getState();
		this.onChange = this.onChange.bind(this);
	}

	_createClass(ArticleList, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			_storesArticleListStore2["default"].listen(this.onChange);
			_actionsArticleListActions2["default"].getArticles(this.props.channelId);
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			_storesArticleListStore2["default"].unlisten(this.onChange);
		}
	}, {
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(nextProps) {
			this.setState({ "articles": null });
			_actionsArticleListActions2["default"].getArticles(nextProps.channelId);
		}
	}, {
		key: "onChange",
		value: function onChange(state) {
			this.setState(state);
		}
	}, {
		key: "render",
		value: function render() {

			// loading spinner
			if (!this.state.articles) {

				// display loading indicator
				return _react2["default"].createElement(
					"div",
					{ className: "row", id: "content" },
					_react2["default"].createElement("div", { className: "spinner" })
				);
			} else {

				// no articles found?
				if (this.state.articles.length === 0) {

					return _react2["default"].createElement(
						"div",
						{ className: "row text-center no-articles" },
						_react2["default"].createElement(
							"div",
							{ className: "alert alert-warning" },
							_react2["default"].createElement("i", { className: "fa fa-clock-o" }),
							_react2["default"].createElement(
								"p",
								null,
								" "
							),
							_react2["default"].createElement(
								"p",
								null,
								_react2["default"].createElement(
									"span",
									null,
									"Wir haben hier noch keine Artikel gefunden.",
									_react2["default"].createElement("br", null),
									_react2["default"].createElement(
										"b",
										null,
										"Sobald es einen passenden Artikel gibt wird er dir natürlich hier angezeigt."
									)
								)
							)
						)
					);
				} else {

					var articles = [];
					this.state.articles.map(function (article) {
						articles.push(_react2["default"].createElement(_Article2["default"], { key: article.id, article: article }));
					});

					// display article list
					return _react2["default"].createElement(
						"div",
						{ className: "row", id: "content" },
						articles
					);
				}
			}
		}
	}]);

	return ArticleList;
})(_react2["default"].Component);

exports["default"] = ArticleList;
module.exports = exports["default"];

},{"../actions/ArticleListActions":2,"../stores/ArticleListStore":22,"./Article":7,"react":"react"}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ChannelHead = require("./ChannelHead");

var _ChannelHead2 = _interopRequireDefault(_ChannelHead);

var _NewArticlesInfo = require("./NewArticlesInfo");

var _NewArticlesInfo2 = _interopRequireDefault(_NewArticlesInfo);

var _ArticleList = require("./ArticleList");

var _ArticleList2 = _interopRequireDefault(_ArticleList);

var Channel = (function (_React$Component) {
	_inherits(Channel, _React$Component);

	function Channel() {
		_classCallCheck(this, Channel);

		_get(Object.getPrototypeOf(Channel.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(Channel, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			document.title = this.props.channelName + " - " + "InformMe";
		}
	}, {
		key: "componentDidUpdate",
		value: function componentDidUpdate() {
			document.title = this.props.channelName + " - " + "InformMe";
		}
	}, {
		key: "render",
		value: function render() {
			return _react2["default"].createElement(
				"div",
				{ className: "col-md-9" },
				_react2["default"].createElement(
					"div",
					{ className: "row channelhead clearfix" },
					_react2["default"].createElement(
						"div",
						{ className: "channelNameArea pull-left" },
						_react2["default"].createElement(
							"h1",
							null,
							this.props.channelName
						)
					),
					_react2["default"].createElement(_ChannelHead2["default"], null)
				),
				_react2["default"].createElement(_NewArticlesInfo2["default"], null),
				_react2["default"].createElement(_ArticleList2["default"], { channelId: this.props.channelId })
			);
		}
	}]);

	return Channel;
})(_react2["default"].Component);

exports["default"] = Channel;
module.exports = exports["default"];

},{"./ArticleList":9,"./ChannelHead":11,"./NewArticlesInfo":18,"react":"react"}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var ChannelHead = (function (_React$Component) {
	_inherits(ChannelHead, _React$Component);

	function ChannelHead() {
		_classCallCheck(this, ChannelHead);

		_get(Object.getPrototypeOf(ChannelHead.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(ChannelHead, [{
		key: "onChannelShareClick",

		// ON CHANNEL SHARE CLICK
		value: function onChannelShareClick() {}

		// RENDER
	}, {
		key: "render",
		value: function render() {
			return _react2["default"].createElement(
				"div",
				{ className: "pull-right" },
				_react2["default"].createElement(
					"div",
					{ className: "userArea" },
					"Hi, ",
					_react2["default"].createElement(
						"a",
						{ href: "/profile" },
						_react2["default"].createElement("i", { className: "fa fa-user" }),
						" ",
						_react2["default"].createElement("span", null)
					)
				),
				_react2["default"].createElement(
					"div",
					{ className: "actionArea" },
					_react2["default"].createElement(
						"div",
						{ className: "btn-group" },
						_react2["default"].createElement(
							"button",
							{ className: "options btn btn-danger" },
							"Entfolgen"
						),
						_react2["default"].createElement(
							"button",
							{ className: "options btn btn-default", id: "channelShareBtn", onClick: this.onChannelShareClick.bind(this) },
							_react2["default"].createElement("i", { className: "fa fa-send" })
						),
						_react2["default"].createElement(
							"button",
							{ className: "options btn btn-default" },
							_react2["default"].createElement("i", { className: "fa fa-trophy" })
						),
						_react2["default"].createElement(
							"button",
							{ className: "options btn btn-default" },
							_react2["default"].createElement("i", { className: "fa fa-power-off" })
						)
					)
				)
			);
		}
	}]);

	return ChannelHead;
})(_react2["default"].Component);

exports["default"] = ChannelHead;
module.exports = exports["default"];

},{"react":"react"}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require("react-router");

var _storesChannelListStore = require("../stores/ChannelListStore");

var _storesChannelListStore2 = _interopRequireDefault(_storesChannelListStore);

var _actionsChannelListActions = require("../actions/ChannelListActions");

var _actionsChannelListActions2 = _interopRequireDefault(_actionsChannelListActions);

var _ChannelListSection = require("./ChannelListSection");

var _ChannelListSection2 = _interopRequireDefault(_ChannelListSection);

// CHANNEL LIST

var ChannelList = (function (_React$Component) {
    _inherits(ChannelList, _React$Component);

    function ChannelList(props) {
        _classCallCheck(this, ChannelList);

        _get(Object.getPrototypeOf(ChannelList.prototype), "constructor", this).call(this, props);
        this.state = _storesChannelListStore2["default"].getState();
        this.onChange = this.onChange.bind(this);
    }

    _createClass(ChannelList, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            _storesChannelListStore2["default"].listen(this.onChange);
            _actionsChannelListActions2["default"].getChannels();
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            _storesChannelListStore2["default"].unlisten(this.onChange);
        }
    }, {
        key: "onChange",
        value: function onChange(state) {
            this.setState(state);
        }

        // ON REMOVE CHANNEL
    }, {
        key: "onRemoveChannel",
        value: function onRemoveChannel(type, channelId) {

            // filter out deletion channel
            var newChannels = this.state.channels;
            newChannels[type] = this.state.channels[type].filter(function (channel) {
                return channel._id != channelId;
            });

            // set new channel without the currently deleted one
            this.setState({
                "channels": newChannels
            });

            // populate deletion to server
            _actionsChannelListActions2["default"].unsubscribeChannel(channelId);
        }
    }, {
        key: "render",
        value: function render() {

            // render channel list
            return _react2["default"].createElement(
                "div",
                { className: "col-md-3" },
                _react2["default"].createElement(
                    "div",
                    { className: "bs-sidebar affix", id: "sidebar" },
                    _react2["default"].createElement("img", { className: "logo", alt: "InformMe", src: "/img/logo.png" }),
                    _react2["default"].createElement(
                        "p",
                        null,
                        _react2["default"].createElement(
                            "button",
                            { id: "addChannelBtn", type: "button", className: "btn btn-success btn-sm btn-block" },
                            _react2["default"].createElement("i", { className: "fa fa-plus" }),
                            " Channel hinzufügen"
                        )
                    ),
                    _react2["default"].createElement(_ChannelListSection2["default"], { title: "Suchbegriffe", type: "query", channels: this.state.channels["query"], activeId: this.props.activeId, onRemoveChannel: this.onRemoveChannel.bind(this) }),
                    _react2["default"].createElement(_ChannelListSection2["default"], { title: "Resorts", type: "resort", channels: this.state.channels["resort"], activeId: this.props.activeId, onRemoveChannel: this.onRemoveChannel }),
                    _react2["default"].createElement(_ChannelListSection2["default"], { title: "Stories", type: "story", channels: this.state.channels["story"], activeId: this.props.activeId, onRemoveChannel: this.onRemoveChannel }),
                    _react2["default"].createElement(
                        "div",
                        { className: "info text-center visible-desktop" },
                        _react2["default"].createElement(
                            "p",
                            { className: "itunes" },
                            _react2["default"].createElement(
                                "a",
                                { href: "https://itunes.apple.com/de/app/informme/id592086995", target: "_blank" },
                                _react2["default"].createElement("img", { className: "itunes-available", alt: "iTunes AppStore", src: "/img/appstore.png" })
                            )
                        ),
                        _react2["default"].createElement(
                            "p",
                            null,
                            _react2["default"].createElement(
                                "small",
                                null,
                                _react2["default"].createElement(
                                    "a",
                                    { href: "https://twitter.com/informme_de", target: "_blank" },
                                    "Twitter"
                                ),
                                " | ",
                                _react2["default"].createElement(
                                    "a",
                                    { href: "https://facebook.com/informme.de", target: "_blank" },
                                    "Facebook"
                                ),
                                _react2["default"].createElement("br", null),
                                _react2["default"].createElement(
                                    "a",
                                    { href: "http://status.informme.de/", target: "_blank" },
                                    "Status"
                                ),
                                " | ",
                                _react2["default"].createElement(
                                    _reactRouter.Link,
                                    { to: "/imprint" },
                                    "Impressum"
                                ),
                                " | ",
                                _react2["default"].createElement(
                                    "a",
                                    { href: "mailto:support@informme.de" },
                                    "Kontakt"
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return ChannelList;
})(_react2["default"].Component);

exports["default"] = ChannelList;
module.exports = exports["default"];

},{"../actions/ChannelListActions":3,"../stores/ChannelListStore":23,"./ChannelListSection":14,"react":"react","react-router":"react-router"}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require("react-router");

// CHANNEL LIST

var ChannelListItem = (function (_React$Component) {
    _inherits(ChannelListItem, _React$Component);

    function ChannelListItem(props) {
        _classCallCheck(this, ChannelListItem);

        _get(Object.getPrototypeOf(ChannelListItem.prototype), "constructor", this).call(this, props);
        this.state = { isHovered: false };
    }

    // ON MOUSE OVER ITEM

    _createClass(ChannelListItem, [{
        key: "onMouseOverItem",
        value: function onMouseOverItem() {
            this.setState({ isHovered: true });
        }

        // ON MOUSE OUT ITEM
    }, {
        key: "onMouseOutItem",
        value: function onMouseOutItem() {
            this.setState({ isHovered: false });
        }

        // ON DELETE CLICK
    }, {
        key: "onDeleteClick",
        value: function onDeleteClick(e) {
            e.preventDefault();
            var self = this;

            swal({
                title: "Channel wirklich löschen?",
                type: "error",
                showCancelButton: true,
                confirmButtonColor: "#dd6b55",
                confirmButtonText: "Ja",
                cancelButtonText: "Nein",
                closeOnConfirm: true
            }, function (result) {

                // call removing handler from parent element
                if (result === true) {
                    self.props.onRemoveChannel(self.props.type, self.props.channel._id);
                }
            });
        }
    }, {
        key: "render",
        value: function render() {

            // close button
            var buttonClassName = "close pull-right close-channel";
            if (this.state.isHovered === false) {
                buttonClassName += " hidden";
            }

            var spanClassName = "badge pull-right";
            if (this.state.isHovered === true || this.props.channel.f === 0) {
                spanClassName += " hidden";
            }

            var listClassName = "channelitem";
            if (this.props.activeId === this.props.channel._id) {
                listClassName += " active";
            }

            return _react2["default"].createElement(
                "li",
                { className: listClassName, "data-sorting": "0", draggable: "true", "data-channel": this.props.channel.n, "data-channelid": this.props.channel._id },
                _react2["default"].createElement(
                    _reactRouter.Link,
                    { to: "/" + this.props.channel._id + "/" + this.props.channel.n, onMouseOver: this.onMouseOverItem.bind(this), onMouseOut: this.onMouseOutItem.bind(this) },
                    _react2["default"].createElement(
                        "span",
                        { className: spanClassName },
                        this.props.channel.f
                    ),
                    _react2["default"].createElement(
                        "button",
                        { type: "button", className: buttonClassName, title: "Entfolgen", onClick: this.onDeleteClick.bind(this) },
                        "×"
                    ),
                    this.props.channel.n
                )
            );
        }
    }]);

    return ChannelListItem;
})(_react2["default"].Component);

exports["default"] = ChannelListItem;
module.exports = exports["default"];

},{"react":"react","react-router":"react-router"}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ChannelListItem = require("./ChannelListItem");

var _ChannelListItem2 = _interopRequireDefault(_ChannelListItem);

// CHANNEL LIST

var ChannelListSection = (function (_React$Component) {
    _inherits(ChannelListSection, _React$Component);

    function ChannelListSection() {
        _classCallCheck(this, ChannelListSection);

        _get(Object.getPrototypeOf(ChannelListSection.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(ChannelListSection, [{
        key: "render",
        value: function render() {
            var _this = this;

            if (this.props.channels) {

                var data = [];
                this.props.channels.map(function (channel) {
                    data.push(_react2["default"].createElement(_ChannelListItem2["default"], { key: channel._id, channel: channel, type: _this.props.type, activeId: _this.props.activeId, onRemoveChannel: _this.props.onRemoveChannel }));
                });

                return _react2["default"].createElement(
                    "ul",
                    { className: "nav nav-pills nav-stacked channel-list" },
                    _react2["default"].createElement(
                        "li",
                        { className: "header", draggable: "true" },
                        this.props.title
                    ),
                    data
                );
            } else {
                return _react2["default"].createElement("ul", null);
            }
        }
    }]);

    return ChannelListSection;
})(_react2["default"].Component);

exports["default"] = ChannelListSection;
module.exports = exports["default"];

},{"./ChannelListItem":13,"react":"react"}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ChannelList = require("./ChannelList");

var _ChannelList2 = _interopRequireDefault(_ChannelList);

var _Channel = require("./Channel");

var _Channel2 = _interopRequireDefault(_Channel);

var Home = (function (_React$Component) {
	_inherits(Home, _React$Component);

	function Home() {
		_classCallCheck(this, Home);

		_get(Object.getPrototypeOf(Home.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(Home, [{
		key: "render",
		value: function render() {
			return _react2["default"].createElement(
				"div",
				{ className: "row" },
				_react2["default"].createElement(_ChannelList2["default"], { activeId: this.props.params.channelid }),
				_react2["default"].createElement(_Channel2["default"], { channelName: this.props.params.channelname, channelId: this.props.params.channelid })
			);
		}
	}]);

	return Home;
})(_react2["default"].Component);

exports["default"] = Home;
module.exports = exports["default"];

},{"./Channel":10,"./ChannelList":12,"react":"react"}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ChannelList = require("./ChannelList");

var _ChannelList2 = _interopRequireDefault(_ChannelList);

var _NoChannelHead = require("./NoChannelHead");

var _NoChannelHead2 = _interopRequireDefault(_NoChannelHead);

var Imprint = (function (_React$Component) {
	_inherits(Imprint, _React$Component);

	function Imprint() {
		_classCallCheck(this, Imprint);

		_get(Object.getPrototypeOf(Imprint.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(Imprint, [{
		key: "render",
		value: function render() {
			return _react2["default"].createElement(
				"div",
				{ className: "row" },
				_react2["default"].createElement(_ChannelList2["default"], null),
				_react2["default"].createElement(
					"div",
					{ className: "col-md-9" },
					_react2["default"].createElement(
						"div",
						{ className: "row channelhead clearfix" },
						_react2["default"].createElement(
							"div",
							{ className: "channelNameArea pull-left" },
							_react2["default"].createElement(
								"h1",
								null,
								"Impressum"
							)
						),
						_react2["default"].createElement(_NoChannelHead2["default"], null)
					),
					_react2["default"].createElement(
						"div",
						{ className: "row" },
						_react2["default"].createElement(
							"p",
							null,
							"informme.de ist ein Projekt von ",
							_react2["default"].createElement(
								"a",
								{ target: "_blank", href: "http://phildiegmann.com" },
								"Phil Diegmann"
							),
							" und ",
							_react2["default"].createElement(
								"a",
								{ target: "_blank", href: "http://thomasbrueggemann.com" },
								"Thomas Brüggemann"
							),
							". Alle Rechte an den Inhalten verbleiben bei den verlinkten Urhebern."
						),
						_react2["default"].createElement(
							"p",
							null,
							"Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keinerlei Haftung für die Inhalte externer Links. Für den Inhalt verlinkter Seiten sind ausschließlich deren Betreiber verantwortlich."
						),
						_react2["default"].createElement(
							"p",
							null,
							"Alle auf der Seite www.informme.de erscheinenden Texte sind nicht von den oben genannten Personen verfasst worden, sondern Zitate und Ausschnitte der verlinkten Nachrichtenseiten. Die Rechte der angezeigten Texte und Zitate verbleiben ausschließlich bei den, am jeweilgen Text/Zitat genannten und auf den verlinkten Zielseiten ausgewiesenen, Urhebern. Die oben genannten Personen sind nicht im Besitz der Rechte der zitierten Inhalte, sondern geben Sie nur zu Zwecken der schnellen Übersichtsbeschaffung der aktuellen und vergangenen Nachrichtenlage wieder."
						),
						_react2["default"].createElement(
							"p",
							null,
							"Sollten wir Urheberrechte verletzen, bitten wir um sofortige E-Mail an support@informme.de"
						),
						_react2["default"].createElement(
							"h2",
							{ style: { "paddingTop": "35px" } },
							"Leistungsschutzrecht"
						),
						_react2["default"].createElement(
							"p",
							null,
							"Unter ",
							_react2["default"].createElement(
								"a",
								{ href: "http://www.leistungsschutzrecht.info", target: "_blank" },
								"www.leistungsschutzrecht.info"
							),
							" gibt es eine neue Plattform, die über das von den Presseverlagen geforderte Leistungsschutzrecht für Presseverlage informiert. Sie wird von der „Initiative gegen ein Leistungsschutzrecht” (IGEL) betrieben. Die Webseite informiert umfassend über das Thema, sammelt Materialien und Artikel und gibt einen Überblick über die wichtigsten Argumente pro und contra Leistungsschutzrecht. Die Initiative wird unterstützt von einer Vielzahl von Blogs, Informationsportalen, Initiativen und Unternehmen. Jeder kann seine Meinung sagen und weitere Unterstützer werden gesucht. IGEL, die Initiative gegen ein Leistungsschutzrecht, lädt Euch herzlich ein, mitzumachen!"
						),
						_react2["default"].createElement(
							"p",
							null,
							_react2["default"].createElement(
								"a",
								{ "class": "banner-igel", target: "_blank", href: "http://leistungsschutzrecht.info" },
								_react2["default"].createElement("img", { src: "https://informme.s3.amazonaws.com/img/banner-igel-160x160px.png", alt: "IGEL Banner" })
							)
						),
						_react2["default"].createElement(
							"h2",
							{ style: { "paddingTop": "35px" } },
							"Datenschutzerklärung"
						),
						_react2["default"].createElement(
							"p",
							null,
							"Diese Website benutzt Google Analytics, einen Webanalysedienst der Google Inc. („Google“). Google Analytics verwendet sog. „Cookies“, Textdateien, die auf Ihrem Computer gespeichert werden und die eine Analyse der Benutzung der Website durch Sie ermöglichen. Die durch den Cookie erzeugten Informationen über Ihre Benutzung dieser Website (einschließlich Ihrer IP-Adresse, welche allerdings anonymisiert wird) wird an einen Server von Google in den USA übertragen und dort gespeichert. Google wird diese Informationen benutzen, um Ihre Nutzung der Website auszuwerten, um Reports über die Websiteaktivitäten für die Websitebetreiber zusammenzustellen und um weitere mit der Websitenutzung und der Internetnutzung verbundene Dienstleistungen zu erbringen. Auch wird Google diese Informationen gegebenenfalls an Dritte übertragen, sofern dies gesetzlich vorgeschrieben oder soweit Dritte diese Daten im Auftrag von Google verarbeiten. Google wird in keinem Fall Ihre IP-Adresse mit anderen Daten von Google in Verbindung bringen. Sie können die Installation der Cookies durch eine entsprechende Einstellung Ihrer Browser Software verhindern;wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls nicht sämtliche Funktionen dieser Website vollumfänglich nutzen können. Durch die Nutzung dieser Website erklären Sie sich mit der Bearbeitung der über Sie erhobenen Daten durch Google in der zuvor beschriebenen Art und Weise und zu dem zuvor benannten Zweck einverstanden."
						),
						_react2["default"].createElement(
							"p",
							null,
							"Sie können der zuvor beschriebenen Datenerhebung mit Wirkung für die Zukunft widersprechen, indem Sie das Browser-Add-on zur Deaktivierung von Google Analytics installieren. Das ",
							_react2["default"].createElement(
								"a",
								{ href: "http://tools.google.com/dlpage/gaoptout?hl=", target: "_blank" },
								"Browser-Add-on zur Deaktivierung von Google Analytics"
							),
							" gibt Ihnen mehr Kontrolle darüber, welche Daten zu aufgerufenen Websites von Google Analytics erfasst werden. Das Add-on teilt dem JavaScript (ga.js) von Google Analytics mit, dass keine Informationen über den Website-Besuch an Google Analytics übermittelt werden sollen. Falls Sie diese Funktion nutzen möchten, laden Sie das Add-on herunter und installieren Sie es für Ihren aktuellen Webbrowser. Das Browser-Add-on zur Deaktivierung von Google Analytics ist für Internet Explorer (7 und 8), Google Chrome (4.x und höher) und Mozilla Firefox (3.5 und höher) verfügbar."
						),
						_react2["default"].createElement(
							"p",
							null,
							_react2["default"].createElement(
								"a",
								{ href: "http://www.google.com/intl/de/analytics/privacyoverview.html", target: "_blank" },
								"Weitere Informationen zum Datenschutz von Google Analytics »"
							)
						)
					)
				)
			);
		}
	}]);

	return Imprint;
})(_react2["default"].Component);

exports["default"] = Imprint;
module.exports = exports["default"];

},{"./ChannelList":12,"./NoChannelHead":19,"react":"react"}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var Login = (function (_React$Component) {
	_inherits(Login, _React$Component);

	function Login() {
		_classCallCheck(this, Login);

		_get(Object.getPrototypeOf(Login.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(Login, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			$("body").addClass("login");

			$("[data-toggle='tooltip']").tooltip();
		}
	}, {
		key: "render",
		value: function render() {
			return _react2["default"].createElement(
				"div",
				{ className: "row" },
				_react2["default"].createElement("div", { className: "login-bg" }),
				_react2["default"].createElement("div", { className: "col-md-4" }),
				_react2["default"].createElement(
					"div",
					{ className: "col-md-4 text-center" },
					_react2["default"].createElement(
						"p",
						null,
						_react2["default"].createElement("img", { className: "login-logo", src: "https://s3-eu-west-1.amazonaws.com/informme/img/m_informme.png" })
					),
					_react2["default"].createElement(
						"p",
						{ className: "login-spacer" },
						"Log dich ein um ",
						_react2["default"].createElement(
							"b",
							null,
							"News-Channels"
						),
						" hinzufügen und von überall darauf zugreifen zu können."
					),
					_react2["default"].createElement(
						"a",
						{ href: "/auth/twitter", className: "btn btn-block btn-social btn-twitter login-spacer" },
						_react2["default"].createElement("i", { className: "fa fa-twitter" }),
						" Mit Twitter einloggen"
					),
					_react2["default"].createElement(
						"a",
						{ href: "/auth/facebook", className: "btn btn-block btn-social btn-facebook" },
						_react2["default"].createElement("i", { className: "fa fa-facebook" }),
						" Mit Facebook einloggen"
					),
					_react2["default"].createElement(
						"small",
						{ className: "text-muted login-spacer-s" },
						"InformMe wird niemals in deinem Namen posten!"
					),
					_react2["default"].createElement(
						"p",
						{ className: "itunes login-spacer" },
						_react2["default"].createElement(
							"a",
							{ href: "https://itunes.apple.com/de/app/informme/id592086995", target: "_blank" },
							_react2["default"].createElement("img", { className: "itunes-available", alt: "iTunes AppStore", src: "/img/appstore.png" })
						)
					),
					_react2["default"].createElement(
						"div",
						{ className: "login-spacer login-seperator" },
						" "
					),
					_react2["default"].createElement(
						"p",
						{ className: "login-spacer" },
						"Du kannst InformMe in diesem Browser auch ohne Login benutzen! ",
						_react2["default"].createElement("i", { className: "fa text-muted fa-question-circle", "data-toggle": "tooltip", "data-placement": "bottom", title: "Du kannst dich von keinem anderen Gerät anmelden & deine abbonierten News-Channels werden nur mit diesem Browser synchronisiert!" })
					),
					_react2["default"].createElement(
						"a",
						{ href: "/auth/nope", className: "btn btn-block btn-social btn-default" },
						_react2["default"].createElement("i", { className: "fa fa-cloud-upload" }),
						" Los geht's!"
					)
				),
				_react2["default"].createElement("div", { className: "col-md-4" })
			);
		}
	}]);

	return Login;
})(_react2["default"].Component);

exports["default"] = Login;
module.exports = exports["default"];

},{"react":"react"}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var NewArticlesInfo = (function (_React$Component) {
	_inherits(NewArticlesInfo, _React$Component);

	function NewArticlesInfo(props) {
		_classCallCheck(this, NewArticlesInfo);

		_get(Object.getPrototypeOf(NewArticlesInfo.prototype), "constructor", this).call(this, props);
		this.state = { hasNewArticles: false };
	}

	_createClass(NewArticlesInfo, [{
		key: "render",
		value: function render() {

			var classes = "row text-center newArticles";
			if (this.state.hasNewArticles === false) classes += " hidden";

			return _react2["default"].createElement(
				"div",
				{ className: classes },
				_react2["default"].createElement(
					"div",
					{ className: "alert alert-info" },
					_react2["default"].createElement(
						"a",
						null,
						"3"
					)
				)
			);
		}
	}]);

	return NewArticlesInfo;
})(_react2["default"].Component);

exports["default"] = NewArticlesInfo;
module.exports = exports["default"];

},{"react":"react"}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var NoChannelHead = (function (_React$Component) {
	_inherits(NoChannelHead, _React$Component);

	function NoChannelHead() {
		_classCallCheck(this, NoChannelHead);

		_get(Object.getPrototypeOf(NoChannelHead.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(NoChannelHead, [{
		key: "render",
		value: function render() {
			return _react2["default"].createElement(
				"div",
				{ className: "pull-right" },
				_react2["default"].createElement(
					"div",
					{ className: "userArea" },
					"Hi, ",
					_react2["default"].createElement(
						"a",
						{ href: "/profile" },
						_react2["default"].createElement("i", { className: "fa fa-user" }),
						" ",
						_react2["default"].createElement("span", null)
					)
				),
				_react2["default"].createElement(
					"div",
					{ className: "actionArea" },
					_react2["default"].createElement(
						"div",
						{ className: "btn-group" },
						_react2["default"].createElement(
							"button",
							{ className: "options btn btn-default" },
							_react2["default"].createElement("i", { className: "fa fa-power-off" })
						)
					)
				)
			);
		}
	}]);

	return NoChannelHead;
})(_react2["default"].Component);

exports["default"] = NoChannelHead;
module.exports = exports["default"];

},{"react":"react"}],20:[function(require,module,exports){
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require("react-router");

var _reactRouter2 = _interopRequireDefault(_reactRouter);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _historyLibCreateBrowserHistory = require("history/lib/createBrowserHistory");

var _historyLibCreateBrowserHistory2 = _interopRequireDefault(_historyLibCreateBrowserHistory);

var _routes = require("./routes");

var _routes2 = _interopRequireDefault(_routes);

window.moment.locale("de");
var history = (0, _historyLibCreateBrowserHistory2["default"])();

_reactDom2["default"].render(_react2["default"].createElement(
  _reactRouter2["default"],
  { history: history },
  _routes2["default"]
), document.getElementById("app"));

},{"./routes":21,"history/lib/createBrowserHistory":30,"react":"react","react-dom":"react-dom","react-router":"react-router"}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require("react-router");

var _componentsApp = require("./components/App");

var _componentsApp2 = _interopRequireDefault(_componentsApp);

var _componentsHome = require("./components/Home");

var _componentsHome2 = _interopRequireDefault(_componentsHome);

var _componentsLogin = require("./components/Login");

var _componentsLogin2 = _interopRequireDefault(_componentsLogin);

var _componentsImprint = require("./components/Imprint");

var _componentsImprint2 = _interopRequireDefault(_componentsImprint);

var _componentsAccount = require("./components/Account");

var _componentsAccount2 = _interopRequireDefault(_componentsAccount);

exports["default"] = _react2["default"].createElement(
	_reactRouter.Route,
	{ component: _componentsApp2["default"] },
	_react2["default"].createElement(_reactRouter.Route, { path: "/:channelid/:channelname", component: _componentsHome2["default"] }),
	_react2["default"].createElement(_reactRouter.Route, { path: "/", component: _componentsHome2["default"] }),
	_react2["default"].createElement(_reactRouter.Route, { path: "/login", component: _componentsLogin2["default"] }),
	_react2["default"].createElement(_reactRouter.Route, { path: "/imprint", component: _componentsImprint2["default"] }),
	_react2["default"].createElement(_reactRouter.Route, { path: "/account", component: _componentsAccount2["default"] })
);
module.exports = exports["default"];

},{"./components/Account":5,"./components/App":6,"./components/Home":15,"./components/Imprint":16,"./components/Login":17,"react":"react","react-router":"react-router"}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _alt = require("../alt");

var _alt2 = _interopRequireDefault(_alt);

var _actionsArticleListActions = require("../actions/ArticleListActions");

var _actionsArticleListActions2 = _interopRequireDefault(_actionsArticleListActions);

var ArticleListStore = (function () {
  function ArticleListStore() {
    _classCallCheck(this, ArticleListStore);

    this.bindActions(_actionsArticleListActions2["default"]);
    this.articles = null;
  }

  _createClass(ArticleListStore, [{
    key: "onGetArticlesSuccess",
    value: function onGetArticlesSuccess(data) {
      this.articles = data;
    }
  }, {
    key: "onGetArticlesFail",
    value: function onGetArticlesFail(jqXhr) {
      // Handle multiple response formats, fallback to HTTP status code number.
      console.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
    }
  }]);

  return ArticleListStore;
})();

exports["default"] = _alt2["default"].createStore(ArticleListStore);
module.exports = exports["default"];

},{"../actions/ArticleListActions":2,"../alt":4}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _alt = require("../alt");

var _alt2 = _interopRequireDefault(_alt);

var _actionsChannelListActions = require("../actions/ChannelListActions");

var _actionsChannelListActions2 = _interopRequireDefault(_actionsChannelListActions);

var ChannelListStore = (function () {
  function ChannelListStore() {
    _classCallCheck(this, ChannelListStore);

    this.bindActions(_actionsChannelListActions2["default"]);
    this.channels = [];
  }

  _createClass(ChannelListStore, [{
    key: "onGetChannelsSuccess",
    value: function onGetChannelsSuccess(data) {
      this.channels = data;
    }
  }, {
    key: "onGetChannelsFail",
    value: function onGetChannelsFail(jqXhr) {
      // Handle multiple response formats, fallback to HTTP status code number.
      console.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
    }
  }]);

  return ChannelListStore;
})();

exports["default"] = _alt2["default"].createStore(ChannelListStore);
module.exports = exports["default"];

},{"../actions/ChannelListActions":3,"../alt":4}],24:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],25:[function(require,module,exports){
/**
 * Indicates that navigation was caused by a call to history.push.
 */
'use strict';

exports.__esModule = true;
var PUSH = 'PUSH';

exports.PUSH = PUSH;
/**
 * Indicates that navigation was caused by a call to history.replace.
 */
var REPLACE = 'REPLACE';

exports.REPLACE = REPLACE;
/**
 * Indicates that navigation was caused by some other action such
 * as using a browser's back/forward buttons and/or manually manipulating
 * the URL in a browser's location bar. This is the default.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate
 * for more information.
 */
var POP = 'POP';

exports.POP = POP;
exports['default'] = {
  PUSH: PUSH,
  REPLACE: REPLACE,
  POP: POP
};
},{}],26:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.loopAsync = loopAsync;

function loopAsync(turns, work, callback) {
  var currentTurn = 0;
  var isDone = false;

  function done() {
    isDone = true;
    callback.apply(this, arguments);
  }

  function next() {
    if (isDone) return;

    if (currentTurn < turns) {
      work.call(this, currentTurn++, next, done);
    } else {
      done.apply(this, arguments);
    }
  }

  next();
}
},{}],27:[function(require,module,exports){
/*eslint-disable no-empty */
'use strict';

exports.__esModule = true;
exports.saveState = saveState;
exports.readState = readState;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var KeyPrefix = '@@History/';
var QuotaExceededError = 'QuotaExceededError';

function createKey(key) {
  return KeyPrefix + key;
}

function saveState(key, state) {
  try {
    window.sessionStorage.setItem(createKey(key), JSON.stringify(state));
  } catch (error) {
    if (error.name === QuotaExceededError || window.sessionStorage.length === 0) {
      // Probably in Safari "private mode" where sessionStorage quota is 0. #42
      _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available in Safari private mode');

      return;
    }

    throw error;
  }
}

function readState(key) {
  var json = window.sessionStorage.getItem(createKey(key));

  if (json) {
    try {
      return JSON.parse(json);
    } catch (error) {
      // Ignore invalid JSON.
    }
  }

  return null;
}
},{"warning":41}],28:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.addEventListener = addEventListener;
exports.removeEventListener = removeEventListener;
exports.getHashPath = getHashPath;
exports.replaceHashPath = replaceHashPath;
exports.getWindowPath = getWindowPath;
exports.go = go;
exports.getUserConfirmation = getUserConfirmation;
exports.supportsHistory = supportsHistory;
exports.supportsGoWithoutReloadUsingHash = supportsGoWithoutReloadUsingHash;

function addEventListener(node, event, listener) {
  if (node.addEventListener) {
    node.addEventListener(event, listener, false);
  } else {
    node.attachEvent('on' + event, listener);
  }
}

function removeEventListener(node, event, listener) {
  if (node.removeEventListener) {
    node.removeEventListener(event, listener, false);
  } else {
    node.detachEvent('on' + event, listener);
  }
}

function getHashPath() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  return window.location.href.split('#')[1] || '';
}

function replaceHashPath(path) {
  window.location.replace(window.location.pathname + window.location.search + '#' + path);
}

function getWindowPath() {
  return window.location.pathname + window.location.search + window.location.hash;
}

function go(n) {
  if (n) window.history.go(n);
}

function getUserConfirmation(message, callback) {
  callback(window.confirm(message));
}

/**
 * Returns true if the HTML5 history API is supported. Taken from modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/rackt/react-router/issues/586
 */

function supportsHistory() {
  var ua = navigator.userAgent;
  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) {
    return false;
  }
  return window.history && 'pushState' in window.history;
}

/**
 * Returns false if using go(n) with hash history causes a full page reload.
 */

function supportsGoWithoutReloadUsingHash() {
  var ua = navigator.userAgent;
  return ua.indexOf('Firefox') === -1;
}
},{}],29:[function(require,module,exports){
'use strict';

exports.__esModule = true;
var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
exports.canUseDOM = canUseDOM;
},{}],30:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _Actions = require('./Actions');

var _ExecutionEnvironment = require('./ExecutionEnvironment');

var _DOMUtils = require('./DOMUtils');

var _DOMStateStorage = require('./DOMStateStorage');

var _createDOMHistory = require('./createDOMHistory');

var _createDOMHistory2 = _interopRequireDefault(_createDOMHistory);

/**
 * Creates and returns a history object that uses HTML5's history API
 * (pushState, replaceState, and the popstate event) to manage history.
 * This is the recommended method of managing history in browsers because
 * it provides the cleanest URLs.
 *
 * Note: In browsers that do not support the HTML5 history API full
 * page reloads will be used to preserve URLs.
 */
function createBrowserHistory() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  _invariant2['default'](_ExecutionEnvironment.canUseDOM, 'Browser history needs a DOM');

  var forceRefresh = options.forceRefresh;

  var isSupported = _DOMUtils.supportsHistory();
  var useRefresh = !isSupported || forceRefresh;

  function getCurrentLocation(historyState) {
    historyState = historyState || window.history.state || {};

    var path = _DOMUtils.getWindowPath();
    var _historyState = historyState;
    var key = _historyState.key;

    var state = undefined;
    if (key) {
      state = _DOMStateStorage.readState(key);
    } else {
      state = null;
      key = history.createKey();

      if (isSupported) window.history.replaceState(_extends({}, historyState, { key: key }), null, path);
    }

    return history.createLocation(path, state, undefined, key);
  }

  function startPopStateListener(_ref) {
    var transitionTo = _ref.transitionTo;

    function popStateListener(event) {
      if (event.state === undefined) return; // Ignore extraneous popstate events in WebKit.

      transitionTo(getCurrentLocation(event.state));
    }

    _DOMUtils.addEventListener(window, 'popstate', popStateListener);

    return function () {
      _DOMUtils.removeEventListener(window, 'popstate', popStateListener);
    };
  }

  function finishTransition(location) {
    var basename = location.basename;
    var pathname = location.pathname;
    var search = location.search;
    var hash = location.hash;
    var state = location.state;
    var action = location.action;
    var key = location.key;

    if (action === _Actions.POP) return; // Nothing to do.

    _DOMStateStorage.saveState(key, state);

    var path = (basename || '') + pathname + search + hash;
    var historyState = {
      key: key
    };

    if (action === _Actions.PUSH) {
      if (useRefresh) {
        window.location.href = path;
        return false; // Prevent location update.
      } else {
          window.history.pushState(historyState, null, path);
        }
    } else {
      // REPLACE
      if (useRefresh) {
        window.location.replace(path);
        return false; // Prevent location update.
      } else {
          window.history.replaceState(historyState, null, path);
        }
    }
  }

  var history = _createDOMHistory2['default'](_extends({}, options, {
    getCurrentLocation: getCurrentLocation,
    finishTransition: finishTransition,
    saveState: _DOMStateStorage.saveState
  }));

  var listenerCount = 0,
      stopPopStateListener = undefined;

  function listenBefore(listener) {
    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

    var unlisten = history.listenBefore(listener);

    return function () {
      unlisten();

      if (--listenerCount === 0) stopPopStateListener();
    };
  }

  function listen(listener) {
    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

    var unlisten = history.listen(listener);

    return function () {
      unlisten();

      if (--listenerCount === 0) stopPopStateListener();
    };
  }

  // deprecated
  function registerTransitionHook(hook) {
    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

    history.registerTransitionHook(hook);
  }

  // deprecated
  function unregisterTransitionHook(hook) {
    history.unregisterTransitionHook(hook);

    if (--listenerCount === 0) stopPopStateListener();
  }

  return _extends({}, history, {
    listenBefore: listenBefore,
    listen: listen,
    registerTransitionHook: registerTransitionHook,
    unregisterTransitionHook: unregisterTransitionHook
  });
}

exports['default'] = createBrowserHistory;
module.exports = exports['default'];
},{"./Actions":25,"./DOMStateStorage":27,"./DOMUtils":28,"./ExecutionEnvironment":29,"./createDOMHistory":31,"invariant":40}],31:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _ExecutionEnvironment = require('./ExecutionEnvironment');

var _DOMUtils = require('./DOMUtils');

var _createHistory = require('./createHistory');

var _createHistory2 = _interopRequireDefault(_createHistory);

function createDOMHistory(options) {
  var history = _createHistory2['default'](_extends({
    getUserConfirmation: _DOMUtils.getUserConfirmation
  }, options, {
    go: _DOMUtils.go
  }));

  function listen(listener) {
    _invariant2['default'](_ExecutionEnvironment.canUseDOM, 'DOM history needs a DOM');

    return history.listen(listener);
  }

  return _extends({}, history, {
    listen: listen
  });
}

exports['default'] = createDOMHistory;
module.exports = exports['default'];
},{"./DOMUtils":28,"./ExecutionEnvironment":29,"./createHistory":32,"invariant":40}],32:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _deepEqual = require('deep-equal');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _AsyncUtils = require('./AsyncUtils');

var _Actions = require('./Actions');

var _createLocation2 = require('./createLocation');

var _createLocation3 = _interopRequireDefault(_createLocation2);

var _runTransitionHook = require('./runTransitionHook');

var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

var _deprecate = require('./deprecate');

var _deprecate2 = _interopRequireDefault(_deprecate);

function createRandomKey(length) {
  return Math.random().toString(36).substr(2, length);
}

function locationsAreEqual(a, b) {
  return a.pathname === b.pathname && a.search === b.search &&
  //a.action === b.action && // Different action !== location change.
  a.key === b.key && _deepEqual2['default'](a.state, b.state);
}

var DefaultKeyLength = 6;

function createHistory() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var getCurrentLocation = options.getCurrentLocation;
  var finishTransition = options.finishTransition;
  var saveState = options.saveState;
  var go = options.go;
  var keyLength = options.keyLength;
  var getUserConfirmation = options.getUserConfirmation;

  if (typeof keyLength !== 'number') keyLength = DefaultKeyLength;

  var transitionHooks = [];

  function listenBefore(hook) {
    transitionHooks.push(hook);

    return function () {
      transitionHooks = transitionHooks.filter(function (item) {
        return item !== hook;
      });
    };
  }

  var allKeys = [];
  var changeListeners = [];
  var location = undefined;

  function getCurrent() {
    if (pendingLocation && pendingLocation.action === _Actions.POP) {
      return allKeys.indexOf(pendingLocation.key);
    } else if (location) {
      return allKeys.indexOf(location.key);
    } else {
      return -1;
    }
  }

  function updateLocation(newLocation) {
    var current = getCurrent();

    location = newLocation;

    if (location.action === _Actions.PUSH) {
      allKeys = [].concat(allKeys.slice(0, current + 1), [location.key]);
    } else if (location.action === _Actions.REPLACE) {
      allKeys[current] = location.key;
    }

    changeListeners.forEach(function (listener) {
      listener(location);
    });
  }

  function listen(listener) {
    changeListeners.push(listener);

    if (location) {
      listener(location);
    } else {
      var _location = getCurrentLocation();
      allKeys = [_location.key];
      updateLocation(_location);
    }

    return function () {
      changeListeners = changeListeners.filter(function (item) {
        return item !== listener;
      });
    };
  }

  function confirmTransitionTo(location, callback) {
    _AsyncUtils.loopAsync(transitionHooks.length, function (index, next, done) {
      _runTransitionHook2['default'](transitionHooks[index], location, function (result) {
        if (result != null) {
          done(result);
        } else {
          next();
        }
      });
    }, function (message) {
      if (getUserConfirmation && typeof message === 'string') {
        getUserConfirmation(message, function (ok) {
          callback(ok !== false);
        });
      } else {
        callback(message !== false);
      }
    });
  }

  var pendingLocation = undefined;

  function transitionTo(nextLocation) {
    if (location && locationsAreEqual(location, nextLocation)) return; // Nothing to do.

    pendingLocation = nextLocation;

    confirmTransitionTo(nextLocation, function (ok) {
      if (pendingLocation !== nextLocation) return; // Transition was interrupted.

      if (ok) {
        if (finishTransition(nextLocation) !== false) updateLocation(nextLocation);
      } else if (location && nextLocation.action === _Actions.POP) {
        var prevIndex = allKeys.indexOf(location.key);
        var nextIndex = allKeys.indexOf(nextLocation.key);

        if (prevIndex !== -1 && nextIndex !== -1) go(prevIndex - nextIndex); // Restore the URL.
      }
    });
  }

  function pushState(state, path) {
    transitionTo(createLocation(path, state, _Actions.PUSH, createKey()));
  }

  function replaceState(state, path) {
    transitionTo(createLocation(path, state, _Actions.REPLACE, createKey()));
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  function createKey() {
    return createRandomKey(keyLength);
  }

  function createPath(path) {
    if (path == null || typeof path === 'string') return path;

    var pathname = path.pathname;
    var search = path.search;
    var hash = path.hash;

    var result = pathname;

    if (search) result += search;

    if (hash) result += hash;

    return result;
  }

  function createHref(path) {
    return createPath(path);
  }

  function createLocation(path, state, action) {
    var key = arguments.length <= 3 || arguments[3] === undefined ? createKey() : arguments[3];

    return _createLocation3['default'](path, state, action, key);
  }

  // deprecated
  function setState(state) {
    if (location) {
      updateLocationState(location, state);
      updateLocation(location);
    } else {
      updateLocationState(getCurrentLocation(), state);
    }
  }

  function updateLocationState(location, state) {
    location.state = _extends({}, location.state, state);
    saveState(location.key, location.state);
  }

  // deprecated
  function registerTransitionHook(hook) {
    if (transitionHooks.indexOf(hook) === -1) transitionHooks.push(hook);
  }

  // deprecated
  function unregisterTransitionHook(hook) {
    transitionHooks = transitionHooks.filter(function (item) {
      return item !== hook;
    });
  }

  return {
    listenBefore: listenBefore,
    listen: listen,
    transitionTo: transitionTo,
    pushState: pushState,
    replaceState: replaceState,
    go: go,
    goBack: goBack,
    goForward: goForward,
    createKey: createKey,
    createPath: createPath,
    createHref: createHref,
    createLocation: createLocation,

    setState: _deprecate2['default'](setState, 'setState is deprecated; use location.key to save state instead'),
    registerTransitionHook: _deprecate2['default'](registerTransitionHook, 'registerTransitionHook is deprecated; use listenBefore instead'),
    unregisterTransitionHook: _deprecate2['default'](unregisterTransitionHook, 'unregisterTransitionHook is deprecated; use the callback returned from listenBefore instead')
  };
}

exports['default'] = createHistory;
module.exports = exports['default'];
},{"./Actions":25,"./AsyncUtils":26,"./createLocation":33,"./deprecate":34,"./runTransitionHook":36,"deep-equal":37}],33:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Actions = require('./Actions');

var _parsePath = require('./parsePath');

var _parsePath2 = _interopRequireDefault(_parsePath);

function createLocation() {
  var path = arguments.length <= 0 || arguments[0] === undefined ? '/' : arguments[0];
  var state = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
  var action = arguments.length <= 2 || arguments[2] === undefined ? _Actions.POP : arguments[2];
  var key = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

  if (typeof path === 'string') path = _parsePath2['default'](path);

  var pathname = path.pathname || '/';
  var search = path.search || '';
  var hash = path.hash || '';

  return {
    pathname: pathname,
    search: search,
    hash: hash,
    state: state,
    action: action,
    key: key
  };
}

exports['default'] = createLocation;
module.exports = exports['default'];
},{"./Actions":25,"./parsePath":35}],34:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function deprecate(fn, message) {
  return function () {
    _warning2['default'](false, '[history] ' + message);
    return fn.apply(this, arguments);
  };
}

exports['default'] = deprecate;
module.exports = exports['default'];
},{"warning":41}],35:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function extractPath(string) {
  var match = string.match(/^https?:\/\/[^\/]*/);

  if (match == null) return string;

  _warning2['default'](false, 'A path must be pathname + search + hash only, not a fully qualified URL like "%s"', string);

  return string.substring(match[0].length);
}

function parsePath(path) {
  var pathname = extractPath(path);
  var search = '';
  var hash = '';

  var hashIndex = pathname.indexOf('#');
  if (hashIndex !== -1) {
    hash = pathname.substring(hashIndex);
    pathname = pathname.substring(0, hashIndex);
  }

  var searchIndex = pathname.indexOf('?');
  if (searchIndex !== -1) {
    search = pathname.substring(searchIndex);
    pathname = pathname.substring(0, searchIndex);
  }

  if (pathname === '') pathname = '/';

  return {
    pathname: pathname,
    search: search,
    hash: hash
  };
}

exports['default'] = parsePath;
module.exports = exports['default'];
},{"warning":41}],36:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function runTransitionHook(hook, location, callback) {
  var result = hook(location, callback);

  if (hook.length < 2) {
    // Assume the hook runs synchronously and automatically
    // call the callback with the return value.
    callback(result);
  } else {
    _warning2['default'](result === undefined, 'You should not "return" in a transition hook with a callback argument; call the callback instead');
  }
}

exports['default'] = runTransitionHook;
module.exports = exports['default'];
},{"warning":41}],37:[function(require,module,exports){
var pSlice = Array.prototype.slice;
var objectKeys = require('./lib/keys.js');
var isArguments = require('./lib/is_arguments.js');

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}

},{"./lib/is_arguments.js":38,"./lib/keys.js":39}],38:[function(require,module,exports){
var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};

},{}],39:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],40:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule invariant
 */

'use strict';

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        'Invariant Violation: ' +
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

}).call(this,require('_process'))
},{"_process":24}],41:[function(require,module,exports){
(function (process){
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = function() {};

if (process.env.NODE_ENV !== 'production') {
  warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
        '`warning(condition, format, ...args)` requires a warning ' +
        'message argument'
      );
    }

    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
      throw new Error(
        'The warning format should be able to uniquely identify this ' +
        'warning. Please, use a more descriptive format than: ' + format
      );
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' +
        format.replace(/%s/g, function() {
          return args[argIndex++];
        });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch(x) {}
    }
  };
}

module.exports = warning;

}).call(this,require('_process'))
},{"_process":24}]},{},[20]);
