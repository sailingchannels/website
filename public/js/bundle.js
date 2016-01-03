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

var _Footer = require("./Footer");

var _Footer2 = _interopRequireDefault(_Footer);

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
				this.props.children,
				_react2["default"].createElement(_Footer2["default"], null)
			);
		}
	}]);

	return App;
})(_react2["default"].Component);

exports["default"] = App;
module.exports = exports["default"];

},{"./Footer":11,"react":"react"}],4:[function(require,module,exports){
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

var Banner = (function (_React$Component) {
  _inherits(Banner, _React$Component);

  function Banner() {
    _classCallCheck(this, Banner);

    _get(Object.getPrototypeOf(Banner.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(Banner, [{
    key: "render",

    // RENDER
    value: function render() {

      return _react2["default"].createElement(
        "div",
        { id: "banner-dialog", className: "modal fade" },
        _react2["default"].createElement(
          "div",
          { className: "modal-dialog" },
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
                "Thanks for stopping by!"
              )
            ),
            _react2["default"].createElement(
              "div",
              { className: "modal-body" },
              _react2["default"].createElement(
                "p",
                null,
                "The ",
                _react2["default"].createElement(
                  "b",
                  null,
                  "Two aboard Tuuli crew"
                ),
                " created this website in their sparetime for you."
              ),
              _react2["default"].createElement(
                "p",
                null,
                "If you like it, we would be very pleased if you return the favour and subscribe to our YouTube channel!"
              ),
              _react2["default"].createElement(
                "center",
                { className: "banner-channel" },
                _react2["default"].createElement("div", { className: "g-ytsubscribe", "data-channelid": "UCZbZeC2OfdVMwm9AR_zu0_g", "data-layout": "full", "data-count": "default" })
              )
            )
          )
        )
      );
    }
  }]);

  return Banner;
})(_react2["default"].Component);

exports["default"] = Banner;
module.exports = exports["default"];

},{"react":"react","react-router":"react-router"}],5:[function(require,module,exports){
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

var _OffsetMenu = require("./OffsetMenu");

var _OffsetMenu2 = _interopRequireDefault(_OffsetMenu);

var _Logo = require("./Logo");

var _Logo2 = _interopRequireDefault(_Logo);

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
				document.title = this.state.channel.title + " - Sailing Channels";
			}
		}

		// COMPONENT WILL UNMOUNT
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
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
				{ className: "container" },
				_react2["default"].createElement(_Logo2["default"], null),
				_react2["default"].createElement(_OffsetMenu2["default"], null),
				_react2["default"].createElement(
					"div",
					{ className: "row" },
					_react2["default"].createElement("div", { className: "col-md-1" }),
					_react2["default"].createElement(
						"div",
						{ className: "col-md-10" },
						_react2["default"].createElement(
							"div",
							{ className: "row" },
							_react2["default"].createElement(
								"div",
								{ className: "col-md-12" },
								_react2["default"].createElement(
									"center",
									null,
									_react2["default"].createElement(
										"h1",
										null,
										this.state.channel.title
									)
								)
							)
						),
						_react2["default"].createElement(
							"div",
							{ className: "row" },
							_react2["default"].createElement(
								"div",
								{ className: "col-md-2 col-sm-2" },
								_react2["default"].createElement("img", { src: this.state.channel.thumbnail, className: "channel-thumb" })
							),
							_react2["default"].createElement(
								"div",
								{ className: "col-md-7 col-sm-7" },
								_react2["default"].createElement("p", { className: "channel-description", dangerouslySetInnerHTML: { __html: anchorme.js(this.state.channel.description.replace("\n", "<br />"), { target: "_blank" }) } }),
								_react2["default"].createElement(
									"p",
									null,
									" "
								),
								_react2["default"].createElement(
									"p",
									null,
									_react2["default"].createElement(
										"b",
										null,
										"Latest video:"
									)
								),
								_react2["default"].createElement("iframe", { width: "100%", height: "315", src: "https://www.youtube.com/embed/" + this.state.channel.videos[0].id, frameBorder: "0", allowFullScreen: true })
							),
							_react2["default"].createElement(
								"div",
								{ className: "col-md-3 col-sm-3" },
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
									this.state.channel.videoCount
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
									"p",
									null,
									_react2["default"].createElement(
										"b",
										null,
										"Founded:"
									),
									" ",
									moment.unix(this.state.channel.publishedAt).format("ll")
								),
								_react2["default"].createElement(
									"p",
									null,
									" "
								),
								_react2["default"].createElement(
									"a",
									{ target: "_blank", href: "https://youtube.com/channel/" + this.state.channel.id },
									_react2["default"].createElement("i", { className: "fa fa-external-link" }),
									" Open YouTube channel"
								),
								_react2["default"].createElement(
									"a",
									{ target: "_blank", href: "https://youtube.com/channel/" + this.state.channel.id + "?sub_confirmation=1", className: "btn btn-danger btn-raised" },
									_react2["default"].createElement("i", { className: "fa fa-youtube-play" }),
									" Subscribe"
								)
							)
						)
					),
					_react2["default"].createElement("div", { className: "col-md-1" })
				),
				_react2["default"].createElement(
					"p",
					null,
					" "
				)
			);
		}
	}]);

	return ChannelDetail;
})(_react2["default"].Component);

exports["default"] = ChannelDetail;
module.exports = exports["default"];

},{"../actions/ChannelActions":1,"../stores/ChannelStore":20,"./Logo":14,"./OffsetMenu":15,"react":"react"}],6:[function(require,module,exports){
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

			//console.log("componentDidMount", this.props);

			// handle event bus page changes
			$(window).on("changeSort", this.changeSort.bind(this));
			$(window).on("scroll", this.scrollWindow.bind(this));

			var sortBy = this.props.sortBy;
			this.setState({
				"sortBy": sortBy
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

			//console.log("componentWillReceiveProps", this.props, nextProps);
			if (this.props.sortBy !== nextProps.sortBy || this.props.query !== nextProps.query) {
				this.loadData(nextProps);
			}
		}

		// LOAD
	}, {
		key: "loadData",
		value: function loadData(nextProps) {

			document.title = "Sailing Channels";

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

			var scrollBottomThreshold = 150;
			if ($(window).scrollTop() + $(window).height() > $(document).height() - scrollBottomThreshold && this.state.loading === false && this.state.searching === false) {
				this.setState({
					"loading": true
				});

				// load more data
				_actionsChannelActions2["default"].getChannels(this.props.sortBy, this.state.skip + this.state.take, 25);
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
						return _react2["default"].createElement(_ChannelListItem2["default"], { key: "cli-" + c.id, channel: c, sortBy: _this.state.sortBy });
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

},{"../actions/ChannelActions":1,"../stores/ChannelStore":20,"./ChannelListItem":7,"react":"react","react-router":"react-router"}],7:[function(require,module,exports){
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
          { className: "col-md-3 col-xs-10 col-xs-offset-2 col-md-offset-0" },
          this.props.channel.subscribersHidden === true ? _react2["default"].createElement(
            "p",
            { className: "text-warning" },
            _react2["default"].createElement(
              "b",
              null,
              "Subscriber info hidden ",
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
            this.props.channel.videoCount
          ) : null,
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
            "p",
            null,
            _react2["default"].createElement(
              "b",
              null,
              "Founded:"
            ),
            " ",
            moment.unix(this.props.channel.publishedAt).format("ll")
          ),
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

},{"./Description":10,"react":"react","react-router":"react-router"}],8:[function(require,module,exports){
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
		key: "componentDidMount",

		// COMPONENT DID MOUNT
		value: function componentDidMount() {
			document.title = "My channel is missing! | Sailing Channels";
		}

		// REPLACE X
	}, {
		key: "replaceX",
		value: function replaceX(e) {
			e.target.href = e.target.href.replace(/x/g, "");
		}

		// RENDER
	}, {
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
					_react2["default"].createElement("div", { className: "col-md-3" }),
					_react2["default"].createElement(
						"div",
						{ className: "col-md-6" },
						_react2["default"].createElement(
							"h1",
							{ className: "content-h1" },
							"My channel is missing!"
						),
						_react2["default"].createElement(
							"p",
							null,
							"You were expecting to see your channel here? Well, that's easy. Just get in touch with us and we'll make sure you get listed!"
						),
						_react2["default"].createElement(
							"p",
							null,
							"Send an email to ",
							_react2["default"].createElement(
								"a",
								{ href: "mailto:ahoyx@sailingx-channels.com", onMouseOver: this.replaceX.bind(this), className: "reverse" },
								"moc.slennahc-gnilias@yoha"
							)
						)
					),
					_react2["default"].createElement("div", { className: "col-md-3" })
				)
			);
		}
	}]);

	return ChannelMissing;
})(_react2["default"].Component);

exports["default"] = ChannelMissing;
module.exports = exports["default"];

},{"./Logo":14,"./OffsetMenu":15,"react":"react"}],9:[function(require,module,exports){
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
		key: "componentDidMount",

		// COMPONENT DID MOUNT
		value: function componentDidMount() {
			document.title = "How does this work? | Sailing Channels";
		}

		// RENDER
	}, {
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
					_react2["default"].createElement("div", { className: "col-md-3" }),
					_react2["default"].createElement(
						"div",
						{ className: "col-md-6" },
						_react2["default"].createElement(
							"h1",
							{ className: "content-h1" },
							"How does this work?"
						),
						_react2["default"].createElement(
							"p",
							null,
							"Well basically what this website does is list youtube channels that are related to sailing, circumnavigation or people living aboard their boats."
						),
						_react2["default"].createElement(
							"p",
							null,
							"The channels are discovered by doing a network analysis. Basically finding out who subscribed to whom."
						),
						_react2["default"].createElement(
							"p",
							null,
							"The algorithm uses a (super secret) starting channel and scans all subscriptions of this channel. The next step is recursively scanning all subscriptions of the subscriptions of the starting channel and so on."
						),
						_react2["default"].createElement(
							"p",
							null,
							" "
						),
						_react2["default"].createElement(
							"center",
							null,
							_react2["default"].createElement("iframe", { className: "intro-video", width: "100%", height: "315", src: "https://www.youtube.com/embed/RWosJPnB900?start=53", frameBorder: "0", allowFullScreen: true })
						)
					),
					_react2["default"].createElement("div", { className: "col-md-3" })
				)
			);
		}
	}]);

	return DataCollection;
})(_react2["default"].Component);

exports["default"] = DataCollection;
module.exports = exports["default"];

},{"./Logo":14,"./OffsetMenu":15,"react":"react"}],10:[function(require,module,exports){
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

},{"./Description":10,"react":"react"}],11:[function(require,module,exports){
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
				{ className: "container footer" },
				_react2["default"].createElement(
					"center",
					null,
					_react2["default"].createElement(
						_reactRouter.Link,
						{ to: "/impressum" },
						"Impressum"
					),
					" | ",
					_react2["default"].createElement(
						_reactRouter.Link,
						{ to: "/privacy" },
						"Privacy Policy"
					),
					" | ",
					_react2["default"].createElement(
						"a",
						{ href: "https://github.com/thomasbrueggemann/sailing-channels", target: "_blank" },
						"Code on GitHub"
					)
				)
			);
		}
	}]);

	return App;
})(_react2["default"].Component);

exports["default"] = App;
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

var _ChannelList = require("./ChannelList");

var _ChannelList2 = _interopRequireDefault(_ChannelList);

var _SearchBar = require("./SearchBar");

var _SearchBar2 = _interopRequireDefault(_SearchBar);

var _OffsetMenu = require("./OffsetMenu");

var _OffsetMenu2 = _interopRequireDefault(_OffsetMenu);

var _Logo = require("./Logo");

var _Logo2 = _interopRequireDefault(_Logo);

var _Banner = require("./Banner");

var _Banner2 = _interopRequireDefault(_Banner);

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

			window.setTimeout(function () {
				if (!($("#banner-dialog").data("bs.modal") || {}).isShown && !Cookies.get("banner-dialog")) {

					// open the dialog
					$("#banner-dialog").modal("show");
					Cookies.set("banner-dialog", "shown", { expires: 3 });
				}
			}, 15000);
		}

		// RENDER
	}, {
		key: "render",
		value: function render() {

			var sortBy = this.props.params.sortBy || "subscribers";
			var query = this.props.params.query;

			return _react2["default"].createElement(
				"div",
				{ className: "container" },
				_react2["default"].createElement(_Logo2["default"], null),
				_react2["default"].createElement(_OffsetMenu2["default"], null),
				_react2["default"].createElement(_SearchBar2["default"], { sortBy: sortBy, history: this.props.history }),
				_react2["default"].createElement(_ChannelList2["default"], { sortBy: sortBy, history: this.props.history, query: query }),
				this.props.children,
				_react2["default"].createElement(_Banner2["default"], null)
			);
		}
	}]);

	return Home;
})(_react2["default"].Component);

exports["default"] = Home;
module.exports = exports["default"];

},{"./Banner":4,"./ChannelList":6,"./Logo":14,"./OffsetMenu":15,"./SearchBar":17,"react":"react"}],13:[function(require,module,exports){
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

var Impressum = (function (_React$Component) {
    _inherits(Impressum, _React$Component);

    function Impressum() {
        _classCallCheck(this, Impressum);

        _get(Object.getPrototypeOf(Impressum.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Impressum, [{
        key: "componentDidMount",

        // COMPONENT DID MOUNT
        value: function componentDidMount() {
            document.title = "Impressum | Sailing Channels";
        }

        // RENDER
    }, {
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
                    _react2["default"].createElement("div", { className: "col-md-3" }),
                    _react2["default"].createElement(
                        "div",
                        { className: "col-md-6" },
                        _react2["default"].createElement(
                            "h1",
                            { className: "content-h1" },
                            "Impressum"
                        ),
                        _react2["default"].createElement(
                            "p",
                            null,
                            "The following information (Impressum) is required under German law."
                        ),
                        _react2["default"].createElement(
                            "p",
                            null,
                            "Responsible for this site:"
                        ),
                        _react2["default"].createElement(
                            "p",
                            null,
                            _react2["default"].createElement(
                                "span",
                                { className: "reverse" },
                                "nnameggürB samohT"
                            ),
                            _react2["default"].createElement("br", null),
                            _react2["default"].createElement(
                                "span",
                                { className: "reverse" },
                                "51 eßartsreliewtdiehcS"
                            ),
                            _react2["default"].createElement("br", null),
                            _react2["default"].createElement(
                                "span",
                                { className: "reverse" },
                                "nlöK 33905"
                            ),
                            _react2["default"].createElement("br", null),
                            _react2["default"].createElement(
                                "span",
                                { className: "reverse" },
                                "moc.slennahc-gnilias@yoha"
                            ),
                            _react2["default"].createElement("br", null)
                        ),
                        _react2["default"].createElement(
                            "h3",
                            null,
                            "Legal disclaimer"
                        ),
                        _react2["default"].createElement(
                            "p",
                            null,
                            "The contents of these pages are generated automatically based on the YouTube channel title, description and videos of the individual channels listed. The creator of this website has no influence on the content of the channel descriptions or other channel related texts. Also, The creator of this website cannot assume liability for the timeless accuracy and completeness of the information. This website contains links to external websites. As the contents of these third-party websites are beyond my control, I cannot accept liability for them. ResponsibiIity for the contents of the linked pages is always held by the provider or operator of the pages."
                        ),
                        _react2["default"].createElement(
                            "h3",
                            null,
                            "Data protection"
                        ),
                        _react2["default"].createElement(
                            "p",
                            null,
                            "In general, when visiting the website of “Sailing Channels”, no personal data are saved. No data will be passed on to third parties without your consent. We point out that in regard to unsecured data transmission in the internet (e.g. via email), security cannot be guaranteed. Such data could possibIy be accessed by third parties."
                        ),
                        _react2["default"].createElement(
                            "h3",
                            null,
                            "Google Analytics"
                        ),
                        _react2["default"].createElement(
                            "p",
                            null,
                            "This website uses Google Analytics, a web analytics service provided by Google, Inc. (»Google«). Google Analytics uses cookies, which are text files placed on your computer, to help the website analyze how users use the site. The information generated by the cookie about your use of the website (including your IP address) will be transmitted to and stored by Google on servers in the United States. On this website the IP anonymization feature is activated. As a result Google will truncate/anonymize the last octet of the IP address for Member States of the European Union as well as for other parties to the Agreement on the European Economic Area. Only in exceptional cases, the full IP address is sent to and shortened by Google servers in the USA. On behalf of the website provider Google will use this information for the purpose of evaluating your use of the website, compiling reports on website activity for website operators and providing other services relating to website activity and internet usage to the website provider. Google will not associate your IP address with any other data held by Google. By using this website, you consent to the processing of data about you by Google in the manner and for the purposes set out above."
                        ),
                        _react2["default"].createElement(
                            "h4",
                            null,
                            "How to prevent being tracked by Google Analytics on sailing-channels.com"
                        ),
                        _react2["default"].createElement(
                            "ul",
                            null,
                            _react2["default"].createElement(
                                "li",
                                null,
                                "You may refuse the use of cookies by selecting the appropriate settings on your browser. However, please note that if you do this, you may not be able to use the full functionality of this website."
                            ),
                            _react2["default"].createElement(
                                "li",
                                null,
                                "Furthermore you can prevent Google’s collection and use of data (cookies and IP address) by downloading and installing the browser plug-in available under ",
                                _react2["default"].createElement(
                                    "a",
                                    { href: "https://tools.google.com/dlpage/gaoptout?hl=en", target: "_blank" },
                                    "https://tools.google.com/dlpage/gaoptout?hl=en"
                                )
                            )
                        )
                    ),
                    _react2["default"].createElement("div", { className: "col-md-3" })
                )
            );
        }
    }]);

    return Impressum;
})(_react2["default"].Component);

exports["default"] = Impressum;
module.exports = exports["default"];

},{"./Logo":14,"./OffsetMenu":15,"react":"react"}],14:[function(require,module,exports){
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

},{"react":"react","react-router":"react-router"}],15:[function(require,module,exports){
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
		key: "toggleMenu",

		// TOGGLE MENU
		value: function toggleMenu() {

			if ($(".offset-menu").find("ul").hasClass("hidden-xs")) {
				$(".offset-menu").find("ul").removeClass("hidden-xs");
				$(".logo").css("opacity", 0);
			} else {
				$(".offset-menu").find("ul").addClass("hidden-xs");
				$(".logo").css("opacity", 1);
			}
		}

		// REPLACE X
	}, {
		key: "replaceX",
		value: function replaceX(e) {
			e.target.href = e.target.href.replace(/x/g, "");
		}

		// RENDER
	}, {
		key: "render",
		value: function render() {

			return _react2["default"].createElement(
				"div",
				null,
				_react2["default"].createElement(
					"div",
					{ className: "offset-bars hidden-md hidden-lg hidden-sm" },
					_react2["default"].createElement(
						"div",
						{ onClick: this.toggleMenu.bind(this) },
						_react2["default"].createElement("i", { className: "fa fa-bars" })
					)
				),
				_react2["default"].createElement(
					"div",
					{ className: "offset-menu" },
					_react2["default"].createElement(
						"ul",
						{ className: "hidden-xs" },
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
								{ to: "/how-it-works" },
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
								{ href: "mailto:ahxoy@sailing-chaxnnels.com?subject=Ahoy sailor!", onMouseOver: this.replaceX.bind(this) },
								"Contact"
							)
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

},{"react":"react","react-router":"react-router"}],16:[function(require,module,exports){
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

var PrivacyPolicy = (function (_React$Component) {
    _inherits(PrivacyPolicy, _React$Component);

    function PrivacyPolicy() {
        _classCallCheck(this, PrivacyPolicy);

        _get(Object.getPrototypeOf(PrivacyPolicy.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(PrivacyPolicy, [{
        key: "componentDidMount",

        // COMPONENT DID MOUNT
        value: function componentDidMount() {
            document.title = "Privacy Policy | Sailing Channels";
        }

        // RENDER
    }, {
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
                    _react2["default"].createElement("div", { className: "col-md-3" }),
                    _react2["default"].createElement(
                        "div",
                        { className: "col-md-6" },
                        _react2["default"].createElement(
                            "h1",
                            { className: "content-h1" },
                            "Privacy Policy"
                        ),
                        _react2["default"].createElement(
                            "h3",
                            null,
                            "Data Controller and Owner"
                        ),
                        _react2["default"].createElement(
                            "p",
                            null,
                            "Sailing Channels,",
                            _react2["default"].createElement(
                                "span",
                                { className: "reverse" },
                                "moc.slennahc-gnilias@yoha"
                            )
                        ),
                        _react2["default"].createElement(
                            "h3",
                            null,
                            "Types of Data collected"
                        ),
                        _react2["default"].createElement(
                            "p",
                            null,
                            "Among the types of Personal Data that this Application collects, by itself or through third parties, there are: Cookie and Usage data. Other Personal Data collected may be described in other sections of this privacy policy or by dedicated explanation text contextually with the Data collection. The Personal Data may be freely provided by the User, or collected automatically when using this Application. Any use of Cookies - or of other tracking tools - by this Application or by the owners of third party services used by this Application, unless stated otherwise, serves to identify Users and remember their preferences, for the sole purpose of providing the service required by the User. Failure to provide certain Personal Data may make it impossible for this Application to provide its services. Users are responsible for any Personal Data of third parties obtained, published or shared through this Application and confirm that they have the third party's consent to provide the Data to the Owner."
                        ),
                        _react2["default"].createElement(
                            "h3",
                            null,
                            "Mode and place of processing the Data"
                        ),
                        _react2["default"].createElement(
                            "h4",
                            null,
                            "Methods of processing"
                        ),
                        _react2["default"].createElement(
                            "p",
                            null,
                            "The Data Controller processes the Data of Users in a proper manner and shall take appropriate security measures to prevent unauthorized access, disclosure, modification, or unauthorized destruction of the Data. The Data processing is carried out using computers and/or IT enabled tools, following organizational procedures and modes strictly related to the purposes indicated. In addition to the Data Controller, in some cases, the Data may be accessible to certain types of persons in charge, involved with the operation of the site (administration, sales, marketing, legal, system administration) or external parties (such as third party technical service providers, mail carriers, hosting providers, IT companies, communications agencies) appointed, if necessary, as Data Processors by the Owner. The updated list of these parties may be requested from the Data Controller at any time."
                        ),
                        _react2["default"].createElement(
                            "h4",
                            null,
                            "Place"
                        ),
                        _react2["default"].createElement(
                            "p",
                            null,
                            "The Data is processed at the Data Controller's operating offices and in any other places where the parties involved with the processing are located. For further information, please contact the Data Controller."
                        ),
                        _react2["default"].createElement(
                            "h4",
                            null,
                            "Retention time"
                        ),
                        _react2["default"].createElement(
                            "p",
                            null,
                            "The Data is kept for the time necessary to provide the service requested by the User, or stated by the purposes outlined in this document, and the User can always request that the Data Controller suspend or remove the data."
                        ),
                        _react2["default"].createElement(
                            "h3",
                            null,
                            "The use of the collected Data"
                        ),
                        _react2["default"].createElement(
                            "p",
                            null,
                            "The Data concerning the User is collected to allow the Owner to provide its services, as well as for the following purposes: Analytics and Displaying content from external platforms. The Personal Data used for each purpose is outlined in the specific sections of this document."
                        ),
                        _react2["default"].createElement(
                            "h3",
                            null,
                            "Detailed information on the processing of Personal Data"
                        ),
                        _react2["default"].createElement(
                            "p",
                            null,
                            "Personal Data is collected for the following purposes and using the following services:"
                        ),
                        _react2["default"].createElement(
                            "h4",
                            null,
                            "Analytics"
                        ),
                        _react2["default"].createElement(
                            "p",
                            null,
                            "The services contained in this section enable the Owner to monitor and analyze web traffic and can be used to keep track of User behavior."
                        ),
                        _react2["default"].createElement(
                            "h5",
                            null,
                            "Google Analytics (Google Inc.)"
                        ),
                        _react2["default"].createElement(
                            "p",
                            null,
                            "Google Analytics is a web analysis service provided by Google Inc. (“Google”). Google utilizes the Data collected to track and examine the use of this Application, to prepare reports on its activities and share them with other Google services. Google may use the Data collected to contextualize and personalize the ads of its own advertising network. Personal Data collected: Cookie and Usage data. Place of processing: USA – ",
                            _react2["default"].createElement(
                                "a",
                                { href: "http://www.google.com/intl/en/policies/privacy/", target: "_blank" },
                                "Privacy Policy"
                            ),
                            " – ",
                            _react2["default"].createElement(
                                "a",
                                { href: "http://tools.google.com/dlpage/gaoptout?hl=en", target: "_blank" },
                                "Opt Out"
                            )
                        ),
                        _react2["default"].createElement(
                            "h4",
                            null,
                            "Displaying content from external platforms"
                        ),
                        _react2["default"].createElement(
                            "p",
                            null,
                            "These services allow you to view content hosted on external platforms directly from the pages of this Application and interact with them. If a service of this kind is installed, it may still collect web traffic data for the pages where the service is installed, even when users do not use it."
                        ),
                        _react2["default"].createElement(
                            "h5",
                            null,
                            "Youtube video widget (Google Inc.)"
                        ),
                        _react2["default"].createElement(
                            "p",
                            null,
                            "Youtube is a video content visualization service provided by Google Inc. that allows this Application to incorporate content of this kind on its pages. Personal Data collected: Cookie and Usage data. Place of processing: USA – ",
                            _react2["default"].createElement(
                                "a",
                                { href: "http://www.google.it/intl/en/policies/privacy/", target: "_blank" },
                                "Privacy Policy"
                            )
                        ),
                        _react2["default"].createElement(
                            "h3",
                            null,
                            "Additional information about Data collection and processing"
                        ),
                        _react2["default"].createElement(
                            "h4",
                            null,
                            "Legal action"
                        ),
                        _react2["default"].createElement(
                            "p",
                            null,
                            "The User's Personal Data may be used for legal purposes by the Data Controller, in Court or in the stages leading to possible legal action arising from improper use of this Application or the related services. The User declares to be aware that the Data Controller may be required to reveal personal data upon request of public authorities."
                        ),
                        _react2["default"].createElement(
                            "h4",
                            null,
                            "Additional information about User's Personal Data"
                        ),
                        _react2["default"].createElement(
                            "p",
                            null,
                            "In addition to the information contained in this privacy policy, this Application may provide the User with additional and contextual information concerning particular services or the collection and processing of Personal Data upon request."
                        ),
                        _react2["default"].createElement(
                            "h4",
                            null,
                            "System Logs and Maintenance"
                        ),
                        _react2["default"].createElement(
                            "p",
                            null,
                            "For operation and maintenance purposes, this Application and any third party services may collect files that record interaction with this Application (System Logs) or use for this purpose other Personal Data (such as IP Address)."
                        ),
                        _react2["default"].createElement(
                            "h4",
                            null,
                            "Information not contained in this policy"
                        ),
                        _react2["default"].createElement(
                            "p",
                            null,
                            "More details concerning the collection or processing of Personal Data may be requested from the Data Controller at any time. Please see the contact information at the beginning of this document."
                        ),
                        _react2["default"].createElement(
                            "h4",
                            null,
                            "The rights of Users"
                        ),
                        _react2["default"].createElement(
                            "p",
                            null,
                            "Users have the right, at any time, to know whether their Personal Data has been stored and can consult the Data Controller to learn about their contents and origin, to verify their accuracy or to ask for them to be supplemented, cancelled, updated or corrected, or for their transformation into anonymous format or to block any data held in violation of the law, as well as to oppose their treatment for any and all legitimate reasons. Requests should be sent to the Data Controller at the contact information set out above. This Application does not support “Do Not Track” requests. To determine whether any of the third party services it uses honor the “Do Not Track” requests, please read their privacy policies."
                        ),
                        _react2["default"].createElement(
                            "h4",
                            null,
                            "Changes to this privacy policy"
                        ),
                        _react2["default"].createElement(
                            "p",
                            null,
                            "The Data Controller reserves the right to make changes to this privacy policy at any time by giving notice to its Users on this page. It is strongly recommended to check this page often, referring to the date of the last modification listed at the bottom. If a User objects to any of the changes to the Policy, the User must cease using this Application and can request that the Data Controller removes the Personal Data. Unless stated otherwise, the then-current privacy policy applies to all Personal Data the Data Controller has about Users."
                        ),
                        _react2["default"].createElement("hr", null),
                        _react2["default"].createElement(
                            "h3",
                            null,
                            "Definitions and legal references"
                        ),
                        _react2["default"].createElement(
                            "h4",
                            null,
                            "Personal Data (or Data)"
                        ),
                        _react2["default"].createElement(
                            "p",
                            null,
                            "Any information regarding a natural person, a legal person, an institution or an association, which is, or can be, identified, even indirectly, by reference to any other information, including a personal identification number."
                        ),
                        _react2["default"].createElement(
                            "h4",
                            null,
                            "Usage Data"
                        ),
                        _react2["default"].createElement(
                            "p",
                            null,
                            "Information collected automatically from this Application (or third party services employed in this Application), which can include: the IP addresses or domain names of the computers utilized by the Users who use this Application, the URI addresses (Uniform Resource Identifier), the time of the request, the method utilized to submit the request to the server, the size of the file received in response, the numerical code indicating the status of the server's answer (successful outcome, error, etc.), the country of origin, the features of the browser and the operating system utilized by the User, the various time details per visit (e.g., the time spent on each page within the Application) and the details about the path followed within the Application with special reference to the sequence of pages visited, and other parameters about the device operating system and/or the User's IT environment."
                        ),
                        _react2["default"].createElement(
                            "h4",
                            null,
                            "User"
                        ),
                        _react2["default"].createElement(
                            "p",
                            null,
                            "The individual using this Application, which must coincide with or be authorized by the Data Subject, to whom the Personal Data refers."
                        ),
                        _react2["default"].createElement(
                            "h4",
                            null,
                            "Data Subject"
                        ),
                        _react2["default"].createElement(
                            "p",
                            null,
                            "The legal or natural person to whom the Personal Data refers."
                        ),
                        _react2["default"].createElement(
                            "h4",
                            null,
                            "Data Processor (or Data Supervisor)"
                        ),
                        _react2["default"].createElement(
                            "p",
                            null,
                            "The natural person, legal person, public administration or any other body, association or organization authorized by the Data Controller to process the Personal Data in compliance with this privacy policy."
                        ),
                        _react2["default"].createElement(
                            "h4",
                            null,
                            "Data Controller (or Owner)"
                        ),
                        _react2["default"].createElement(
                            "p",
                            null,
                            "The natural person, legal person, public administration or any other body, association or organization with the right, also jointly with another Data Controller, to make decisions regarding the purposes, and the methods of processing of Personal Data and the means used, including the security measures concerning the operation and use of this Application. The Data Controller, unless otherwise specified, is the Owner of this Application."
                        ),
                        _react2["default"].createElement(
                            "h4",
                            null,
                            "This Application"
                        ),
                        _react2["default"].createElement(
                            "p",
                            null,
                            "The hardware or software tool by which the Personal Data of the User is collected."
                        ),
                        _react2["default"].createElement(
                            "h4",
                            null,
                            "Cookie"
                        ),
                        _react2["default"].createElement(
                            "p",
                            null,
                            "Small piece of data stored in the User's device."
                        ),
                        _react2["default"].createElement("hr", null),
                        _react2["default"].createElement(
                            "h3",
                            null,
                            "Legal information"
                        ),
                        _react2["default"].createElement(
                            "p",
                            null,
                            "Notice to European Users: this privacy statement has been prepared in fulfillment of the obligations under Art. 10 of EC Directive n. 95/46/EC, and under the provisions of Directive 2002/58/EC, as revised by Directive 2009/136/EC, on the subject of Cookies. This privacy policy relates solely to this Application."
                        )
                    ),
                    _react2["default"].createElement("div", { className: "col-md-3" })
                )
            );
        }
    }]);

    return PrivacyPolicy;
})(_react2["default"].Component);

exports["default"] = PrivacyPolicy;
module.exports = exports["default"];

},{"./Logo":14,"./OffsetMenu":15,"react":"react"}],17:[function(require,module,exports){
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
                _react2["default"].createElement("div", { className: "col-md-4 col-sm-3" }),
                _react2["default"].createElement(
                    "div",
                    { className: "col-md-4 col-sm-6" },
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
                        " Subscribers",
                        _react2["default"].createElement("input", { type: "radio", onClick: this.changeSort.bind(this), className: "sort-option", name: "sortby", value: "upload", defaultChecked: this.props.sortBy === "upload" }),
                        " Last upload",
                        _react2["default"].createElement("input", { type: "radio", onClick: this.changeSort.bind(this), className: "sort-option", name: "sortby", value: "founded", defaultChecked: this.props.sortBy === "newest" }),
                        " Founded"
                    )
                ),
                _react2["default"].createElement("div", { className: "col-md-4 col-sm-3" })
            );
        }
    }]);

    return SearchBar;
})(_react2["default"].Component);

exports["default"] = SearchBar;
module.exports = exports["default"];

},{"react":"react"}],18:[function(require,module,exports){
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

},{"./routes":19,"history/lib/createBrowserHistory":27,"react":"react","react-dom":"react-dom","react-router":"react-router"}],19:[function(require,module,exports){
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

var _componentsPrivacyPolicy = require("./components/PrivacyPolicy");

var _componentsPrivacyPolicy2 = _interopRequireDefault(_componentsPrivacyPolicy);

var _componentsImpressum = require("./components/Impressum");

var _componentsImpressum2 = _interopRequireDefault(_componentsImpressum);

exports["default"] = _react2["default"].createElement(
	_reactRouter.Route,
	{ path: "/", component: _componentsApp2["default"] },
	_react2["default"].createElement(_reactRouter.IndexRoute, { component: _componentsHome2["default"] }),
	_react2["default"].createElement(_reactRouter.Route, { path: "by-:sortBy", component: _componentsHome2["default"] }),
	_react2["default"].createElement(_reactRouter.Route, { path: "channel/:id", component: _componentsChannelDetail2["default"] }),
	_react2["default"].createElement(_reactRouter.Route, { path: "by-:sortBy/search/:query", component: _componentsHome2["default"] }),
	_react2["default"].createElement(_reactRouter.Route, { path: "how-it-works", component: _componentsDataCollection2["default"] }),
	_react2["default"].createElement(_reactRouter.Route, { path: "channel-missing", component: _componentsChannelMissing2["default"] }),
	_react2["default"].createElement(_reactRouter.Route, { path: "privacy", component: _componentsPrivacyPolicy2["default"] }),
	_react2["default"].createElement(_reactRouter.Route, { path: "Impressum", component: _componentsImpressum2["default"] })
);
module.exports = exports["default"];

},{"./components/App":3,"./components/ChannelDetail":5,"./components/ChannelMissing":8,"./components/DataCollection":9,"./components/Home":12,"./components/Impressum":13,"./components/PrivacyPolicy":16,"react":"react","react-router":"react-router"}],20:[function(require,module,exports){
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

},{"../actions/ChannelActions":1,"../alt":2}],21:[function(require,module,exports){
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

},{}],22:[function(require,module,exports){
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
},{}],23:[function(require,module,exports){
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
},{}],24:[function(require,module,exports){
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
},{"_process":21,"warning":39}],25:[function(require,module,exports){
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
},{}],26:[function(require,module,exports){
'use strict';

exports.__esModule = true;
var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
exports.canUseDOM = canUseDOM;
},{}],27:[function(require,module,exports){
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
},{"./Actions":22,"./DOMStateStorage":24,"./DOMUtils":25,"./ExecutionEnvironment":26,"./createDOMHistory":28,"./parsePath":33,"_process":21,"invariant":38}],28:[function(require,module,exports){
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
},{"./DOMUtils":25,"./ExecutionEnvironment":26,"./createHistory":29,"_process":21,"invariant":38}],29:[function(require,module,exports){
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
},{"./Actions":22,"./AsyncUtils":23,"./createLocation":30,"./deprecate":31,"./parsePath":33,"./runTransitionHook":34,"deep-equal":35}],30:[function(require,module,exports){
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
},{"./Actions":22,"./parsePath":33}],31:[function(require,module,exports){
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
},{}],32:[function(require,module,exports){
"use strict";

exports.__esModule = true;
function extractPath(string) {
  var match = string.match(/^https?:\/\/[^\/]*/);

  if (match == null) return string;

  return string.substring(match[0].length);
}

exports["default"] = extractPath;
module.exports = exports["default"];
},{}],33:[function(require,module,exports){
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
},{"./extractPath":32,"_process":21,"warning":39}],34:[function(require,module,exports){
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
},{"_process":21,"warning":39}],35:[function(require,module,exports){
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

},{"./lib/is_arguments.js":36,"./lib/keys.js":37}],36:[function(require,module,exports){
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

},{}],37:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],38:[function(require,module,exports){
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
},{"_process":21}],39:[function(require,module,exports){
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
},{"_process":21}]},{},[18]);
