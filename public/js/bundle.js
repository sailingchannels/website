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

// CHANNEL ACTIONS

var ChannelActions = (function () {
    function ChannelActions() {
        _classCallCheck(this, ChannelActions);

        this.generateActions("getChannelsSuccess", "getChannelsFail", "getChannelSuccess", "getChannelFail", "searchChannelsSuccess", "searchChannelsFail");
    }

    // GET CHANNEL

    _createClass(ChannelActions, [{
        key: "getChannels",
        value: function getChannels(sortBy, skip, take) {
            var _this = this;

            $.ajax({
                "url": "/api/channels/get?sort=" + sortBy + "&skip=" + skip + "&take=" + take,
                "type": "GET",
                "dataType": "json",
                "cache": true
            }).done(function (data) {
                _this.actions.getChannelsSuccess(data);
            }).fail(function (jqXhr) {
                _this.actions.getChannelsFail(jqXhr);
            });
        }

        // GET CHANNEL
    }, {
        key: "getChannel",
        value: function getChannel(id) {
            var _this2 = this;

            $.ajax({
                "url": "/api/channel/get/" + id,
                "type": "GET",
                "dataType": "json"
            }).done(function (data) {
                _this2.actions.getChannelSuccess(data);
            }).fail(function (jqXhr) {
                _this2.actions.getChannelFail(jqXhr);
            });
        }
    }, {
        key: "searchChannels",
        value: function searchChannels(q, sortBy) {
            var _this3 = this;

            $.ajax({
                "url": "/api/channels/search?q=" + encodeURIComponent(q) + "&sort=" + sortBy,
                "type": "GET",
                "dataType": "json"
            }).done(function (data) {
                _this3.actions.searchChannelsSuccess(data);
            }).fail(function (jqXhr) {
                _this3.actions.searchChannelsFail(jqXhr);
            });
        }
    }]);

    return ChannelActions;
})();

exports["default"] = _alt2["default"].createActions(ChannelActions);
module.exports = exports["default"];

},{"../alt":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _alt = require("alt");

var _alt2 = _interopRequireDefault(_alt);

exports["default"] = new _alt2["default"]();
module.exports = exports["default"];

},{"alt":"alt"}],3:[function(require,module,exports){
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

},{"react":"react"}],4:[function(require,module,exports){
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

var _actionsChannelActions = require("../actions/ChannelActions");

var _actionsChannelActions2 = _interopRequireDefault(_actionsChannelActions);

var _storesChannelStore = require("../stores/ChannelStore");

var _storesChannelStore2 = _interopRequireDefault(_storesChannelStore);

var ChannelDetail = (function (_React$Component) {
	_inherits(ChannelDetail, _React$Component);

	// CONSTRUCTOR

	function ChannelDetail(props) {
		_classCallCheck(this, ChannelDetail);

		_get(Object.getPrototypeOf(ChannelDetail.prototype), "constructor", this).call(this, props);
		this.state = _storesChannelStore2["default"].getState();
		this.onChange = this.onChange.bind(this);
	}

	// COMPONENT DID MOUNT

	_createClass(ChannelDetail, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			_storesChannelStore2["default"].listen(this.onChange);
			_actionsChannelActions2["default"].getChannel(this.props.params.id);

			$(document).on("hidden.bs.modal", "#channel-dialog", function () {
				console.log("closed");
			});
		}

		// COMPONENT WILL RECEIVE PROPS
	}, {
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(nextProps) {

			if (nextProps.params.id !== this.props.params.id) {
				_actionsChannelActions2["default"].getChannel(nextProps.params.id);
			}
		}

		// COMPONENT DID UPDATE
	}, {
		key: "componentDidUpdate",
		value: function componentDidUpdate() {
			if (this.state.channel) {
				$("#channel-dialog").modal("show");
				document.title = this.state.channel.title + " - Sailing Channels";
			}
		}

		// COMPONENT WILL UNMOUNT
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			$(document).off("hidden.bs.modal", "#channel-dialog");
			_storesChannelStore2["default"].unlisten(this.onChange);
		}

		// ON CHANGE
	}, {
		key: "onChange",
		value: function onChange(state) {
			this.setState(state);
		}

		// RENDER
	}, {
		key: "render",
		value: function render() {

			// no channel yet
			if (!this.state.channel) {
				return null;
			}

			return _react2["default"].createElement(
				"div",
				{ id: "channel-dialog", className: "modal fade" },
				_react2["default"].createElement(
					"div",
					{ className: "modal-dialog modal-lg" },
					_react2["default"].createElement(
						"div",
						{ className: "modal-content" },
						_react2["default"].createElement(
							"div",
							{ className: "modal-header" },
							_react2["default"].createElement(
								"button",
								{ type: "button", className: "close", "data-dismiss": "modal", "aria-hidden": "true" },
								"×"
							),
							_react2["default"].createElement(
								"h3",
								{ className: "modal-title" },
								this.state.channel.title
							)
						),
						_react2["default"].createElement(
							"div",
							{ className: "modal-body" },
							_react2["default"].createElement(
								"div",
								{ className: "row" },
								_react2["default"].createElement(
									"div",
									{ className: "col-md-2" },
									_react2["default"].createElement("img", { src: this.state.channel.thumbnail, className: "channel-thumb" })
								),
								_react2["default"].createElement(
									"div",
									{ className: "col-md-7" },
									_react2["default"].createElement("p", { dangerouslySetInnerHTML: { __html: anchorme.js(this.state.channel.description.replace("\n", "<br />"), { target: "_blank" }) } })
								),
								_react2["default"].createElement(
									"div",
									{ className: "col-md-3" },
									this.state.channel.subscribersHidden === true ? _react2["default"].createElement(
										"p",
										{ className: "text-warning" },
										_react2["default"].createElement(
											"b",
											null,
											"Subscriber info hidden by channel ",
											_react2["default"].createElement("i", { className: "fa fa-frown-o" })
										)
									) : null,
									this.state.channel.subscribersHidden === false ? _react2["default"].createElement(
										"p",
										null,
										_react2["default"].createElement(
											"b",
											null,
											"Subscribers:"
										),
										" ",
										this.state.channel.subscribers.toLocaleString()
									) : null,
									this.state.channel.subscribersHidden === false ? _react2["default"].createElement(
										"p",
										null,
										_react2["default"].createElement(
											"b",
											null,
											"Videos:"
										),
										" ",
										this.state.channel.videos.length
									) : null,
									_react2["default"].createElement(
										"p",
										null,
										_react2["default"].createElement(
											"b",
											null,
											"Views:"
										),
										" ",
										this.state.channel.views.toLocaleString()
									),
									this.state.channel.lastUploadAt ? _react2["default"].createElement(
										"p",
										null,
										_react2["default"].createElement(
											"b",
											null,
											"Last upload:"
										),
										" ",
										moment.unix(this.state.channel.lastUploadAt).fromNow()
									) : "",
									_react2["default"].createElement(
										"a",
										{ target: "_blank", href: "https://youtube.com/channel/" + this.state.channel.id + "?sub_confirmation=1", className: "btn btn-danger btn-raised" },
										_react2["default"].createElement("i", { className: "fa fa-youtube-play" }),
										" Subscribe"
									)
								)
							),
							_react2["default"].createElement(
								"div",
								{ className: "row" },
								_react2["default"].createElement("div", { className: "col-md-2" }),
								_react2["default"].createElement(
									"div",
									{ className: "col-md-10" },
									_react2["default"].createElement(
										"p",
										null,
										_react2["default"].createElement(
											"b",
											null,
											"Latest video:"
										)
									),
									_react2["default"].createElement("iframe", { width: "560", height: "315", src: "https://www.youtube.com/embed/" + this.state.channel.videos[0].id, frameBorder: "0", allowFullScreen: true })
								)
							)
						),
						_react2["default"].createElement(
							"div",
							{ className: "modal-footer" },
							_react2["default"].createElement(
								"button",
								{ type: "button", className: "btn btn-primary", "data-dismiss": "modal" },
								"Close"
							)
						)
					)
				)
			);
		}
	}]);

	return ChannelDetail;
})(_react2["default"].Component);

exports["default"] = ChannelDetail;
module.exports = exports["default"];

},{"../actions/ChannelActions":1,"../stores/ChannelStore":16,"react":"react"}],5:[function(require,module,exports){
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

var _actionsChannelActions = require("../actions/ChannelActions");

var _actionsChannelActions2 = _interopRequireDefault(_actionsChannelActions);

var _storesChannelStore = require("../stores/ChannelStore");

var _storesChannelStore2 = _interopRequireDefault(_storesChannelStore);

var _reactRouter = require("react-router");

var ChannelList = (function (_React$Component) {
	_inherits(ChannelList, _React$Component);

	// CONSTRUCTOR

	function ChannelList(props) {
		_classCallCheck(this, ChannelList);

		_get(Object.getPrototypeOf(ChannelList.prototype), "constructor", this).call(this, props);
		this.state = _storesChannelStore2["default"].getState();
		this.onChange = this.onChange.bind(this);
	}

	// COMPONENT DID MOUNT

	_createClass(ChannelList, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			_storesChannelStore2["default"].listen(this.onChange);

			// handle event bus page changes
			$(window).on("changeSort", this.changeSort.bind(this));
			$(window).on("scroll", this.scrollWindow.bind(this));

			var sortBy = this.props.sortBy;
			this.setState({
				"sortBy": sortBy || "subscribers"
			});

			// load the channels
			this.loadData(this.props);

			if (this.props.query) {
				$("#search-bar").val(this.props.query);
				window.setTimeout(function () {
					$("#search-bar").focus();
				}, 1);
			}
		}

		// COMPONENT WILL UNMOUNT
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			//$(window).off("typeSearchterm");
			$(window).off("scroll");
			$(window).off("changeSort");

			_storesChannelStore2["default"].unlisten(this.onChange);
		}

		// COMPOENTNT WILL RECEIVE PROPS
	}, {
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(nextProps) {

			console.log(nextProps);
			this.loadData(nextProps);
		}

		// LOAD
	}, {
		key: "loadData",
		value: function loadData(nextProps) {

			// does a search query exists?
			if (nextProps.query) {

				// start search
				if (nextProps.query.length > 2) {
					_actionsChannelActions2["default"].searchChannels(nextProps.query, nextProps.sortBy);
				}

				// reset search
				else if (nextProps.query.length === 0) {

						this.setState({
							channels: [],
							skip: 0,
							take: 25,
							loading: false
						});

						_actionsChannelActions2["default"].getChannels(nextProps.sortBy, 0, 25);
					}
			}

			// no query available
			else {
					this.setState({
						channels: [],
						skip: 0,
						take: 25,
						loading: false
					});

					_actionsChannelActions2["default"].getChannels(nextProps.sortBy, 0, 25);
				}
		}

		// ON CHANGE
	}, {
		key: "onChange",
		value: function onChange(state) {
			this.setState(state);
		}

		// SCROLL WINDOW
	}, {
		key: "scrollWindow",
		value: function scrollWindow() {

			var scrollBottomThreshold = 250;
			if ($(window).scrollTop() + $(window).height() > $(document).height() - scrollBottomThreshold && this.state.loading === false && this.state.searching === false) {
				this.setState({
					"loading": true
				});

				// load more data
				_actionsChannelActions2["default"].getChannels(this.state.sortBy, this.state.skip + this.state.take, 25);
			}
		}

		// CHANGE SORT
	}, {
		key: "changeSort",
		value: function changeSort(e, data) {

			this.setState({
				sortBy: data.sortBy
			});

			// load the channels
			if (this.state.searching === true) {
				this.props.history.replaceState(null, "/by-" + data.sortBy + "/search/" + $("#search-bar").val());
			} else {
				this.props.history.replaceState(null, "/by-" + data.sortBy);
			}
		}

		// RENDER
	}, {
		key: "render",
		value: function render() {
			var _this = this;

			// no channels found
			if (this.state.channels.length === 0) {
				return _react2["default"].createElement(
					"div",
					{ className: "row" },
					_react2["default"].createElement("div", { className: "col-md-1" }),
					_react2["default"].createElement(
						"div",
						{ className: "col-md-10" },
						_react2["default"].createElement(
							"center",
							null,
							this.state.searching === true ? "No channels match the search query!" : "Loading channels..."
						)
					),
					_react2["default"].createElement("div", { className: "col-md-1" })
				);
			}

			// channels where found
			return _react2["default"].createElement(
				"div",
				{ className: "row" },
				_react2["default"].createElement("div", { className: "col-md-1" }),
				_react2["default"].createElement(
					"div",
					{ className: "col-md-10" },
					this.state.channels.map(function (c) {
						return _react2["default"].createElement(_ChannelListItem2["default"], { key: c.id, channel: c, sortBy: _this.state.sortBy });
					}),
					this.state.loading === true ? _react2["default"].createElement(
						"center",
						{ className: "loadMore" },
						"Loading more channels ..."
					) : null
				),
				_react2["default"].createElement("div", { className: "col-md-1" })
			);
		}
	}]);

	return ChannelList;
})(_react2["default"].Component);

exports["default"] = ChannelList;
module.exports = exports["default"];

},{"../actions/ChannelActions":1,"../stores/ChannelStore":16,"./ChannelListItem":6,"react":"react","react-router":"react-router"}],6:[function(require,module,exports){
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

var _Description = require("./Description");

var _Description2 = _interopRequireDefault(_Description);

var _reactRouter = require("react-router");

var ChannelListItem = (function (_React$Component) {
    _inherits(ChannelListItem, _React$Component);

    function ChannelListItem() {
        _classCallCheck(this, ChannelListItem);

        _get(Object.getPrototypeOf(ChannelListItem.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(ChannelListItem, [{
        key: "render",

        // RENDER
        value: function render() {
            return _react2["default"].createElement(
                "div",
                { className: "row channel-row" },
                _react2["default"].createElement(
                    "div",
                    { className: "col-md-2 col-xs-2" },
                    _react2["default"].createElement(
                        "center",
                        null,
                        _react2["default"].createElement("img", { src: this.props.channel.thumbnail, className: "channel-thumb" })
                    )
                ),
                _react2["default"].createElement(
                    "div",
                    { className: "col-md-7 col-xs-10" },
                    _react2["default"].createElement(
                        "h3",
                        null,
                        _react2["default"].createElement(
                            _reactRouter.Link,
                            { to: "/channel/" + this.props.channel.id },
                            this.props.channel.title
                        )
                    ),
                    _react2["default"].createElement(_Description2["default"], { text: this.props.channel.description })
                ),
                _react2["default"].createElement(
                    "div",
                    { className: "col-md-3 col-xs-10" },
                    this.props.channel.subscribersHidden === true ? _react2["default"].createElement(
                        "p",
                        { className: "text-warning" },
                        _react2["default"].createElement(
                            "b",
                            null,
                            "Subscriber info hidden by channel ",
                            _react2["default"].createElement("i", { className: "fa fa-frown-o" })
                        )
                    ) : null,
                    this.props.channel.subscribersHidden === false ? _react2["default"].createElement(
                        "p",
                        null,
                        _react2["default"].createElement(
                            "b",
                            null,
                            "Subscribers:"
                        ),
                        " ",
                        this.props.channel.subscribers.toLocaleString()
                    ) : null,
                    this.props.channel.subscribersHidden === false ? _react2["default"].createElement(
                        "p",
                        null,
                        _react2["default"].createElement(
                            "b",
                            null,
                            "Videos:"
                        ),
                        " ",
                        this.props.channel.videos
                    ) : null,
                    _react2["default"].createElement(
                        "p",
                        null,
                        _react2["default"].createElement(
                            "b",
                            null,
                            "Views:"
                        ),
                        " ",
                        this.props.channel.views.toLocaleString()
                    ),
                    this.props.channel.lastUploadAt ? _react2["default"].createElement(
                        "p",
                        null,
                        _react2["default"].createElement(
                            "b",
                            null,
                            "Last upload:"
                        ),
                        " ",
                        moment.unix(this.props.channel.lastUploadAt).fromNow()
                    ) : "",
                    _react2["default"].createElement(
                        "a",
                        { target: "_blank", href: "https://youtube.com/channel/" + this.props.channel.id + "?sub_confirmation=1", className: "btn btn-danger btn-raised" },
                        _react2["default"].createElement("i", { className: "fa fa-youtube-play" }),
                        " Subscribe"
                    )
                )
            );
        }
    }]);

    return ChannelListItem;
})(_react2["default"].Component);

exports["default"] = ChannelListItem;
module.exports = exports["default"];

},{"./Description":9,"react":"react","react-router":"react-router"}],7:[function(require,module,exports){
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

var _OffsetMenu = require("./OffsetMenu");

var _OffsetMenu2 = _interopRequireDefault(_OffsetMenu);

var _Logo = require("./Logo");

var _Logo2 = _interopRequireDefault(_Logo);

var ChannelMissing = (function (_React$Component) {
  _inherits(ChannelMissing, _React$Component);

  function ChannelMissing() {
    _classCallCheck(this, ChannelMissing);

    _get(Object.getPrototypeOf(ChannelMissing.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(ChannelMissing, [{
    key: "render",
    value: function render() {

      return _react2["default"].createElement(
        "div",
        { className: "container" },
        _react2["default"].createElement(_Logo2["default"], null),
        _react2["default"].createElement(_OffsetMenu2["default"], null),
        _react2["default"].createElement(
          "div",
          { className: "row content-row" },
          _react2["default"].createElement(
            "h1",
            null,
            "My channel is missing?"
          )
        )
      );
    }
  }]);

  return ChannelMissing;
})(_react2["default"].Component);

exports["default"] = ChannelMissing;
module.exports = exports["default"];

},{"./Logo":11,"./OffsetMenu":12,"react":"react"}],8:[function(require,module,exports){
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

var _OffsetMenu = require("./OffsetMenu");

var _OffsetMenu2 = _interopRequireDefault(_OffsetMenu);

var _Logo = require("./Logo");

var _Logo2 = _interopRequireDefault(_Logo);

var DataCollection = (function (_React$Component) {
	_inherits(DataCollection, _React$Component);

	function DataCollection() {
		_classCallCheck(this, DataCollection);

		_get(Object.getPrototypeOf(DataCollection.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(DataCollection, [{
		key: "render",
		value: function render() {

			return _react2["default"].createElement(
				"div",
				{ className: "container" },
				_react2["default"].createElement(_Logo2["default"], null),
				_react2["default"].createElement(_OffsetMenu2["default"], null),
				_react2["default"].createElement(
					"div",
					{ className: "row content-row" },
					_react2["default"].createElement(
						"h1",
						null,
						"How does this work?"
					)
				)
			);
		}
	}]);

	return DataCollection;
})(_react2["default"].Component);

exports["default"] = DataCollection;
module.exports = exports["default"];

},{"./Logo":11,"./OffsetMenu":12,"react":"react"}],9:[function(require,module,exports){
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

var _Description = require("./Description");

var _Description2 = _interopRequireDefault(_Description);

var ChannelListItem = (function (_React$Component) {
    _inherits(ChannelListItem, _React$Component);

    // CONSTRUCTOR

    function ChannelListItem(props) {
        _classCallCheck(this, ChannelListItem);

        _get(Object.getPrototypeOf(ChannelListItem.prototype), "constructor", this).call(this, props);
        this.state = {
            "more": false
        };
    }

    // TEXT CUTTER

    _createClass(ChannelListItem, [{
        key: "textCutter",
        value: function textCutter(i, text) {

            if (text.length < i || this.state.more === true) return text;

            var shorter = text.substr(0, i);
            if (/^\S/.test(text.substr(i))) {
                return shorter.replace(/\s+\S*$/, "");
            }

            return shorter;
        }

        // TOGGLE MORE
    }, {
        key: "toggleMore",
        value: function toggleMore() {
            this.setState({
                "more": !this.state.more
            });
        }

        // RENDER
    }, {
        key: "render",
        value: function render() {

            // more is active, show "less" button
            var moreOrLessTxt = this.state.more === true ? "less" : "more";
            var descriptionTxt = this.textCutter(250, this.props.text);

            // show a more or less button
            var moreOrLess;
            if (descriptionTxt.length !== this.props.text.length || this.state.more === true) {
                moreOrLess = _react2["default"].createElement(
                    "a",
                    { href: "javascript:void(0);", onClick: this.toggleMore.bind(this) },
                    "[",
                    moreOrLessTxt,
                    "]"
                );
            }

            return _react2["default"].createElement(
                "p",
                { className: "channel-description" },
                _react2["default"].createElement("span", { dangerouslySetInnerHTML: { __html: anchorme.js(descriptionTxt, { target: "_blank" }) } }),
                " ",
                moreOrLess
            );
        }
    }]);

    return ChannelListItem;
})(_react2["default"].Component);

exports["default"] = ChannelListItem;
module.exports = exports["default"];

},{"./Description":9,"react":"react"}],10:[function(require,module,exports){
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

var _SearchBar = require("./SearchBar");

var _SearchBar2 = _interopRequireDefault(_SearchBar);

var _OffsetMenu = require("./OffsetMenu");

var _OffsetMenu2 = _interopRequireDefault(_OffsetMenu);

var _Logo = require("./Logo");

var _Logo2 = _interopRequireDefault(_Logo);

var Home = (function (_React$Component) {
	_inherits(Home, _React$Component);

	function Home() {
		_classCallCheck(this, Home);

		_get(Object.getPrototypeOf(Home.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(Home, [{
		key: "componentDidMount",

		// COMPONENT DID MOUNT
		value: function componentDidMount() {
			$.material.init();
		}

		// RENDER
	}, {
		key: "render",
		value: function render() {

			var sortBy = this.props.params.sortBy || "subscribers";

			return _react2["default"].createElement(
				"div",
				{ className: "container" },
				_react2["default"].createElement(_Logo2["default"], null),
				_react2["default"].createElement(_OffsetMenu2["default"], null),
				_react2["default"].createElement(_SearchBar2["default"], { sortBy: sortBy, history: this.props.history }),
				_react2["default"].createElement(_ChannelList2["default"], { sortBy: sortBy, history: this.props.history, query: this.props.params.query }),
				this.props.children
			);
		}
	}]);

	return Home;
})(_react2["default"].Component);

exports["default"] = Home;
module.exports = exports["default"];

},{"./ChannelList":5,"./Logo":11,"./OffsetMenu":12,"./SearchBar":13,"react":"react"}],11:[function(require,module,exports){
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

var Logo = (function (_React$Component) {
	_inherits(Logo, _React$Component);

	function Logo() {
		_classCallCheck(this, Logo);

		_get(Object.getPrototypeOf(Logo.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(Logo, [{
		key: "render",
		value: function render() {

			return _react2["default"].createElement(
				"div",
				{ className: "logo" },
				_react2["default"].createElement(
					_reactRouter.Link,
					{ to: "/" },
					_react2["default"].createElement(
						"div",
						{ className: "turnaround" },
						_react2["default"].createElement("div", { className: "front" }),
						_react2["default"].createElement("div", { className: "back" })
					)
				)
			);
		}
	}]);

	return Logo;
})(_react2["default"].Component);

exports["default"] = Logo;
module.exports = exports["default"];

},{"react":"react","react-router":"react-router"}],12:[function(require,module,exports){
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

var OffsetMenu = (function (_React$Component) {
  _inherits(OffsetMenu, _React$Component);

  function OffsetMenu() {
    _classCallCheck(this, OffsetMenu);

    _get(Object.getPrototypeOf(OffsetMenu.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(OffsetMenu, [{
    key: "render",
    value: function render() {

      return _react2["default"].createElement(
        "div",
        { className: "offset-menu" },
        _react2["default"].createElement(
          "ul",
          null,
          _react2["default"].createElement(
            "li",
            null,
            _react2["default"].createElement(
              _reactRouter.Link,
              { to: "/" },
              "Home"
            )
          ),
          _react2["default"].createElement(
            "li",
            null,
            _react2["default"].createElement(
              _reactRouter.Link,
              { to: "/data-collection" },
              "How does this work?"
            )
          ),
          _react2["default"].createElement(
            "li",
            null,
            _react2["default"].createElement(
              _reactRouter.Link,
              { to: "/channel-missing" },
              "My channel is missing!"
            )
          ),
          _react2["default"].createElement(
            "li",
            null,
            _react2["default"].createElement(
              "a",
              { href: "mailto:ahoy@sailing-channels.com" },
              "Contact"
            )
          )
        )
      );
    }
  }]);

  return OffsetMenu;
})(_react2["default"].Component);

exports["default"] = OffsetMenu;
module.exports = exports["default"];

},{"react":"react","react-router":"react-router"}],13:[function(require,module,exports){
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

var SearchBar = (function (_React$Component) {
    _inherits(SearchBar, _React$Component);

    function SearchBar() {
        _classCallCheck(this, SearchBar);

        _get(Object.getPrototypeOf(SearchBar.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(SearchBar, [{
        key: "componentDidMount",

        // COMPONENT DID MOUNT
        value: function componentDidMount() {

            $(window).on("keydown", function (e) {
                if ((e.ctrlKey || e.metaKey) && e.keyCode === 70) {

                    // don't open browser search
                    e.preventDefault();

                    // focus search bar
                    $("#search-bar").focus();

                    // scroll up
                    window.setTimeout(function () {
                        window.scrollTo(0, 0);
                    }, 1);
                }
            });
        }

        // COMPONENT WILL UNMOUNT
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            $(window).off("keydown");
        }

        // KEY UP
    }, {
        key: "keyUp",
        value: function keyUp(e) {

            // ESC clears selection
            if (e.keyCode === 27 || e.target.value.length === 0) {

                e.target.value = "";
                this.props.history.pushState(null, "/by-" + this.props.sortBy);
                return;
            }

            var v = e.target.value;
            this.props.history.replaceState(null, "/by-" + this.props.sortBy + "/search/" + encodeURIComponent(v));
        }

        // CHANGE SORT
    }, {
        key: "changeSort",
        value: function changeSort(e) {
            $(window).trigger("changeSort", { "sortBy": e.target.value });
        }

        // RENDER
    }, {
        key: "render",
        value: function render() {
            return _react2["default"].createElement(
                "div",
                { className: "row search-row" },
                _react2["default"].createElement("div", { className: "col-md-4" }),
                _react2["default"].createElement(
                    "div",
                    { className: "col-md-4" },
                    _react2["default"].createElement(
                        "div",
                        { className: "form-group label-floating is-empty" },
                        _react2["default"].createElement(
                            "label",
                            { className: "control-label" },
                            "Search for ..."
                        ),
                        _react2["default"].createElement("input", { className: "form-control", type: "text", id: "search-bar", onKeyUp: this.keyUp.bind(this) }),
                        _react2["default"].createElement("span", { className: "material-input" })
                    ),
                    _react2["default"].createElement(
                        "div",
                        { className: "form-group sort-group" },
                        _react2["default"].createElement(
                            "label",
                            { className: "sort-label control-label" },
                            "Sort by:"
                        ),
                        _react2["default"].createElement("input", { type: "radio", onClick: this.changeSort.bind(this), className: "sort-option", name: "sortby", value: "subscribers", defaultChecked: this.props.sortBy === "subscribers" }),
                        " Subscribers",
                        _react2["default"].createElement("input", { type: "radio", onClick: this.changeSort.bind(this), className: "sort-option", name: "sortby", value: "views", defaultChecked: this.props.sortBy === "views" }),
                        " Views",
                        _react2["default"].createElement("input", { type: "radio", onClick: this.changeSort.bind(this), className: "sort-option", name: "sortby", value: "upload", defaultChecked: this.props.sortBy === "upload" }),
                        " Last upload"
                    )
                ),
                _react2["default"].createElement("div", { className: "col-md-4" })
            );
        }
    }]);

    return SearchBar;
})(_react2["default"].Component);

exports["default"] = SearchBar;
module.exports = exports["default"];

},{"react":"react"}],14:[function(require,module,exports){
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

//window.moment.locale("de");
var history = (0, _historyLibCreateBrowserHistory2["default"])();
_reactDom2["default"].render(_react2["default"].createElement(
  _reactRouter2["default"],
  { history: history },
  _routes2["default"]
), document.getElementById("app"));

},{"./routes":15,"history/lib/createBrowserHistory":23,"react":"react","react-dom":"react-dom","react-router":"react-router"}],15:[function(require,module,exports){
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

var _componentsChannelDetail = require("./components/ChannelDetail");

var _componentsChannelDetail2 = _interopRequireDefault(_componentsChannelDetail);

var _componentsDataCollection = require("./components/DataCollection");

var _componentsDataCollection2 = _interopRequireDefault(_componentsDataCollection);

var _componentsChannelMissing = require("./components/ChannelMissing");

var _componentsChannelMissing2 = _interopRequireDefault(_componentsChannelMissing);

exports["default"] = _react2["default"].createElement(
	_reactRouter.Route,
	{ path: "/", component: _componentsApp2["default"] },
	_react2["default"].createElement(_reactRouter.IndexRoute, { component: _componentsHome2["default"] }),
	_react2["default"].createElement(_reactRouter.Route, { path: "by-:sortBy", component: _componentsHome2["default"] }),
	_react2["default"].createElement(
		_reactRouter.Route,
		{ path: "channel", component: _componentsHome2["default"] },
		_react2["default"].createElement(_reactRouter.Route, { path: ":id", component: _componentsChannelDetail2["default"] })
	),
	_react2["default"].createElement(_reactRouter.Route, { path: "by-:sortBy/search/:query", component: _componentsHome2["default"] }),
	_react2["default"].createElement(_reactRouter.Route, { path: "data-collection", component: _componentsDataCollection2["default"] }),
	_react2["default"].createElement(_reactRouter.Route, { path: "channel-missing", component: _componentsChannelMissing2["default"] })
);
module.exports = exports["default"];

},{"./components/App":3,"./components/ChannelDetail":4,"./components/ChannelMissing":7,"./components/DataCollection":8,"./components/Home":10,"react":"react","react-router":"react-router"}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _alt = require("../alt");

var _alt2 = _interopRequireDefault(_alt);

var _actionsChannelActions = require("../actions/ChannelActions");

var _actionsChannelActions2 = _interopRequireDefault(_actionsChannelActions);

var ChannelStore = (function () {
	function ChannelStore() {
		_classCallCheck(this, ChannelStore);

		this.bindActions(_actionsChannelActions2["default"]);
		this.channels = [];
		this.loading = false;
		this.skip = 0;
		this.take = 25;
		this.searching = false;
		this.sortBy = "subscribers";

		this.channel = null;
	}

	// GET CHANNELS SUCCESS

	_createClass(ChannelStore, [{
		key: "getChannelsSuccess",
		value: function getChannelsSuccess(result) {

			// add new data
			if (result.skip > 0) {
				this.channels = this.channels.concat(result.data);
			} else {
				this.channels = result.data;
			}

			this.skip = result.skip;
			this.take = result.take;
			this.loading = false;
			this.searching = false;
		}

		// GET CHANNEL SUCCESS
	}, {
		key: "getChannelSuccess",
		value: function getChannelSuccess(result) {
			this.channel = result;
			this.searching = false;
		}

		// GET CHANNEL FAIL
	}, {
		key: "getChannelFail",
		value: function getChannelFail(jqXhr) {

			this.searching = false;

			// Handle multiple response formats, fallback to HTTP status code number.
			console.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
		}

		// GET CHANNELS FAIL
	}, {
		key: "getChannelsFail",
		value: function getChannelsFail(jqXhr) {

			this.loading = false;

			// Handle multiple response formats, fallback to HTTP status code number.
			console.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
		}

		// SEARCH CHANNELS SUCCESS
	}, {
		key: "searchChannelsSuccess",
		value: function searchChannelsSuccess(result) {

			this.channels = result.data;
			this.searching = true;
			this.loading = false;
		}

		// SEARCH CHANNELS FAIL
	}, {
		key: "searchChannelsFail",
		value: function searchChannelsFail(jqXhr) {

			this.loading = false;
			this.searching = true;

			// Handle multiple response formats, fallback to HTTP status code number.
			console.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
		}
	}]);

	return ChannelStore;
})();

exports["default"] = _alt2["default"].createStore(ChannelStore);
module.exports = exports["default"];

},{"../actions/ChannelActions":1,"../alt":2}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
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
},{}],19:[function(require,module,exports){
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
},{}],20:[function(require,module,exports){
(function (process){
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
var SecurityError = 'SecurityError';

function createKey(key) {
  return KeyPrefix + key;
}

function saveState(key, state) {
  try {
    window.sessionStorage.setItem(createKey(key), JSON.stringify(state));
  } catch (error) {
    if (error.name === SecurityError) {
      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
      // attempt to access window.sessionStorage.
      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available due to security settings') : undefined;

      return;
    }

    if (error.name === QuotaExceededError && window.sessionStorage.length === 0) {
      // Safari "private mode" throws QuotaExceededError.
      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available in Safari private mode') : undefined;

      return;
    }

    throw error;
  }
}

function readState(key) {
  var json = undefined;
  try {
    json = window.sessionStorage.getItem(createKey(key));
  } catch (error) {
    if (error.name === SecurityError) {
      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
      // attempt to access window.sessionStorage.
      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to read state; sessionStorage is not available due to security settings') : undefined;

      return null;
    }
  }

  if (json) {
    try {
      return JSON.parse(json);
    } catch (error) {
      // Ignore invalid JSON.
    }
  }

  return null;
}
}).call(this,require('_process'))
},{"_process":17,"warning":35}],21:[function(require,module,exports){
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
 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
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
  // FIXME: Work around our browser history not working correctly on Chrome
  // iOS: https://github.com/rackt/react-router/issues/2565
  if (ua.indexOf('CriOS') !== -1) {
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
},{}],22:[function(require,module,exports){
'use strict';

exports.__esModule = true;
var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
exports.canUseDOM = canUseDOM;
},{}],23:[function(require,module,exports){
(function (process){
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

var _parsePath = require('./parsePath');

var _parsePath2 = _interopRequireDefault(_parsePath);

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

  !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'Browser history needs a DOM') : _invariant2['default'](false) : undefined;

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

    var location = _parsePath2['default'](path);

    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
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
}).call(this,require('_process'))
},{"./Actions":18,"./DOMStateStorage":20,"./DOMUtils":21,"./ExecutionEnvironment":22,"./createDOMHistory":24,"./parsePath":29,"_process":17,"invariant":34}],24:[function(require,module,exports){
(function (process){
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
    !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'DOM history needs a DOM') : _invariant2['default'](false) : undefined;

    return history.listen(listener);
  }

  return _extends({}, history, {
    listen: listen
  });
}

exports['default'] = createDOMHistory;
module.exports = exports['default'];
}).call(this,require('_process'))
},{"./DOMUtils":21,"./ExecutionEnvironment":22,"./createHistory":25,"_process":17,"invariant":34}],25:[function(require,module,exports){
//import warning from 'warning'
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

var _parsePath = require('./parsePath');

var _parsePath2 = _interopRequireDefault(_parsePath);

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
        // treat PUSH to current path like REPLACE to be consistent with browsers
        if (nextLocation.action === _Actions.PUSH) {
          var prevPath = createPath(location);
          var nextPath = createPath(nextLocation);

          if (nextPath === prevPath) nextLocation.action = _Actions.REPLACE;
        }

        if (finishTransition(nextLocation) !== false) updateLocation(nextLocation);
      } else if (location && nextLocation.action === _Actions.POP) {
        var prevIndex = allKeys.indexOf(location.key);
        var nextIndex = allKeys.indexOf(nextLocation.key);

        if (prevIndex !== -1 && nextIndex !== -1) go(prevIndex - nextIndex); // Restore the URL.
      }
    });
  }

  function push(location) {
    transitionTo(createLocation(location, _Actions.PUSH, createKey()));
  }

  function replace(location) {
    transitionTo(createLocation(location, _Actions.REPLACE, createKey()));
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

  function createPath(location) {
    if (location == null || typeof location === 'string') return location;

    var pathname = location.pathname;
    var search = location.search;
    var hash = location.hash;

    var result = pathname;

    if (search) result += search;

    if (hash) result += hash;

    return result;
  }

  function createHref(location) {
    return createPath(location);
  }

  function createLocation(location, action) {
    var key = arguments.length <= 2 || arguments[2] === undefined ? createKey() : arguments[2];

    if (typeof action === 'object') {
      //warning(
      //  false,
      //  'The state (2nd) argument to history.createLocation is deprecated; use a ' +
      //  'location descriptor instead'
      //)

      if (typeof location === 'string') location = _parsePath2['default'](location);

      location = _extends({}, location, { state: action });

      action = key;
      key = arguments[3] || createKey();
    }

    return _createLocation3['default'](location, action, key);
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

  // deprecated
  function pushState(state, path) {
    if (typeof path === 'string') path = _parsePath2['default'](path);

    push(_extends({ state: state }, path));
  }

  // deprecated
  function replaceState(state, path) {
    if (typeof path === 'string') path = _parsePath2['default'](path);

    replace(_extends({ state: state }, path));
  }

  return {
    listenBefore: listenBefore,
    listen: listen,
    transitionTo: transitionTo,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    createKey: createKey,
    createPath: createPath,
    createHref: createHref,
    createLocation: createLocation,

    setState: _deprecate2['default'](setState, 'setState is deprecated; use location.key to save state instead'),
    registerTransitionHook: _deprecate2['default'](registerTransitionHook, 'registerTransitionHook is deprecated; use listenBefore instead'),
    unregisterTransitionHook: _deprecate2['default'](unregisterTransitionHook, 'unregisterTransitionHook is deprecated; use the callback returned from listenBefore instead'),
    pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
    replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
  };
}

exports['default'] = createHistory;
module.exports = exports['default'];
},{"./Actions":18,"./AsyncUtils":19,"./createLocation":26,"./deprecate":27,"./parsePath":29,"./runTransitionHook":30,"deep-equal":31}],26:[function(require,module,exports){
//import warning from 'warning'
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Actions = require('./Actions');

var _parsePath = require('./parsePath');

var _parsePath2 = _interopRequireDefault(_parsePath);

function createLocation() {
  var location = arguments.length <= 0 || arguments[0] === undefined ? '/' : arguments[0];
  var action = arguments.length <= 1 || arguments[1] === undefined ? _Actions.POP : arguments[1];
  var key = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

  var _fourthArg = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

  if (typeof location === 'string') location = _parsePath2['default'](location);

  if (typeof action === 'object') {
    //warning(
    //  false,
    //  'The state (2nd) argument to createLocation is deprecated; use a ' +
    //  'location descriptor instead'
    //)

    location = _extends({}, location, { state: action });

    action = key || _Actions.POP;
    key = _fourthArg;
  }

  var pathname = location.pathname || '/';
  var search = location.search || '';
  var hash = location.hash || '';
  var state = location.state || null;

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
},{"./Actions":18,"./parsePath":29}],27:[function(require,module,exports){
//import warning from 'warning'

"use strict";

exports.__esModule = true;
function deprecate(fn) {
  return fn;
  //return function () {
  //  warning(false, '[history] ' + message)
  //  return fn.apply(this, arguments)
  //}
}

exports["default"] = deprecate;
module.exports = exports["default"];
},{}],28:[function(require,module,exports){
"use strict";

exports.__esModule = true;
function extractPath(string) {
  var match = string.match(/^https?:\/\/[^\/]*/);

  if (match == null) return string;

  return string.substring(match[0].length);
}

exports["default"] = extractPath;
module.exports = exports["default"];
},{}],29:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _extractPath = require('./extractPath');

var _extractPath2 = _interopRequireDefault(_extractPath);

function parsePath(path) {
  var pathname = _extractPath2['default'](path);
  var search = '';
  var hash = '';

  process.env.NODE_ENV !== 'production' ? _warning2['default'](path === pathname, 'A path must be pathname + search + hash only, not a fully qualified URL like "%s"', path) : undefined;

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
}).call(this,require('_process'))
},{"./extractPath":28,"_process":17,"warning":35}],30:[function(require,module,exports){
(function (process){
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
    process.env.NODE_ENV !== 'production' ? _warning2['default'](result === undefined, 'You should not "return" in a transition hook with a callback argument; call the callback instead') : undefined;
  }
}

exports['default'] = runTransitionHook;
module.exports = exports['default'];
}).call(this,require('_process'))
},{"_process":17,"warning":35}],31:[function(require,module,exports){
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

},{"./lib/is_arguments.js":32,"./lib/keys.js":33}],32:[function(require,module,exports){
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

},{}],33:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],34:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
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
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

}).call(this,require('_process'))
},{"_process":17}],35:[function(require,module,exports){
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
},{"_process":17}]},{},[14]);
