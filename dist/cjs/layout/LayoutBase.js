'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-aae655da.js');
var event_ListBase = require('../event/ListBase.js');
var util_ComponentUtil = require('../util/ComponentUtil.js');
require('../event/StateBase.js');
require('../event/StateBaseComponent.js');
require('react');
require('../util/ObjUtil.js');
require('./Manager.js');
require('../event/Event.js');

var triggers = event_ListBase["default"].triggers;
var events = event_ListBase["default"].events;
var config = {
  options: {}
};
var StateLayout = event_ListBase["default"].StateList;
var LayoutBase = /*#__PURE__*/function (_ListBase$ListBase) {
  _rollupPluginBabelHelpers._inherits(LayoutBase, _ListBase$ListBase);
  var _super = _rollupPluginBabelHelpers._createSuper(LayoutBase);
  function LayoutBase() {
    var _this;
    _rollupPluginBabelHelpers._classCallCheck(this, LayoutBase);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _rollupPluginBabelHelpers._defineProperty(_rollupPluginBabelHelpers._assertThisInitialized(_this), "renderContent", util_ComponentUtil.renderContent);
    return _this;
  }
  return _rollupPluginBabelHelpers._createClass(LayoutBase);
}(event_ListBase["default"].ListBase);
var LayoutBase$1 = {
  triggers: triggers,
  events: events,
  config: config,
  LayoutBase: LayoutBase,
  StateLayout: StateLayout
};

exports.LayoutBase = LayoutBase;
exports.StateLayout = StateLayout;
exports.config = config;
exports["default"] = LayoutBase$1;
exports.events = events;
exports.triggers = triggers;
//# sourceMappingURL=LayoutBase.js.map
