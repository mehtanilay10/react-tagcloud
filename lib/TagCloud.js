'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TagCloud = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _defaultRenderer = require('./defaultRenderer');

var _arrayShuffle = require('array-shuffle');

var _arrayShuffle2 = _interopRequireDefault(_arrayShuffle);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var eventHandlers = ['onClick', 'onDoubleClick', 'onMouseMove'];
var cloudProps = ['tags', 'shuffle', 'renderer', 'maxSize', 'minSize'];

var TagCloud = exports.TagCloud = function (_React$Component) {
  _inherits(TagCloud, _React$Component);

  function TagCloud() {
    _classCallCheck(this, TagCloud);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(TagCloud).apply(this, arguments));
  }

  _createClass(TagCloud, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var shuffle = _ref.shuffle;
      var tags = _ref.tags;

      if (!shuffle) {
        this._tags = tags;
        return;
      }
      if (shuffle && shuffle !== this.props.shuffle) {
        this._tags = (0, _arrayShuffle2.default)(tags);
        return;
      }
      if (shuffle && !(0, _helpers.arraysEqual)(tags, this.props.tags)) {
        this._tags = (0, _arrayShuffle2.default)(tags);
      }
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props;
      var tags = _props.tags;
      var shuffle = _props.shuffle;

      this._tags = shuffle ? (0, _arrayShuffle2.default)(tags) : tags;
    }
  }, {
    key: 'render',
    value: function render() {
      var props = (0, _helpers.omitProps)(this.props, [].concat(cloudProps, eventHandlers));
      return _react2.default.createElement(
        'div',
        props,
        this._createTags()
      );
    }
  }, {
    key: '_createTags',
    value: function _createTags() {
      var _props2 = this.props;
      var minSize = _props2.minSize;
      var maxSize = _props2.maxSize;
      var renderer = _props2.renderer;

      var handlers = (0, _helpers.includeProps)(this.props, eventHandlers);
      var counts = this._tags.map(function (tag) {
        return tag.count;
      }),
          min = Math.min.apply(Math, _toConsumableArray(counts)),
          max = Math.max.apply(Math, _toConsumableArray(counts));
      return this._tags.map(function (tag) {
        var fontSize = (0, _helpers.fontSizeConverter)(tag.count, min, max, minSize, maxSize);
        return renderer(tag, fontSize, handlers);
      });
    }
  }]);

  return TagCloud;
}(_react2.default.Component);

TagCloud.propTypes = {
  tags: _react2.default.PropTypes.array.isRequired,
  maxSize: _react2.default.PropTypes.number.isRequired,
  minSize: _react2.default.PropTypes.number.isRequired,
  shuffle: _react2.default.PropTypes.bool,
  renderer: _react2.default.PropTypes.func,
  className: _react2.default.PropTypes.string
};

TagCloud.defaultProps = {
  renderer: (0, _defaultRenderer.defaultRenderer)(),
  shuffle: true,
  className: 'tag-cloud'
};