import { _ as _inherits, a as _createSuper, b as _createClass, c as _classCallCheck, d as _defineProperty, e as _assertThisInitialized } from '../_rollupPluginBabelHelpers-55d249d8.js';
import ListBase from '../event/ListBase.js';
import { renderContent } from '../util/ComponentUtil.js';
import '../event/StateBase.js';
import '../event/StateBaseComponent.js';
import 'react';
import '../util/ObjUtil.js';
import './Manager.js';
import '../event/Event.js';

var triggers = ListBase.triggers;
var events = ListBase.events;
var config = {
  options: {}
};
var StateLayout = ListBase.StateList;
var LayoutBase = /*#__PURE__*/function (_ListBase$ListBase) {
  _inherits(LayoutBase, _ListBase$ListBase);
  var _super = _createSuper(LayoutBase);
  function LayoutBase() {
    var _this;
    _classCallCheck(this, LayoutBase);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "renderContent", renderContent);
    return _this;
  }
  return _createClass(LayoutBase);
}(ListBase.ListBase);
var LayoutBase$1 = {
  triggers: triggers,
  events: events,
  config: config,
  LayoutBase: LayoutBase,
  StateLayout: StateLayout
};

export { LayoutBase, StateLayout, config, LayoutBase$1 as default, events, triggers };
//# sourceMappingURL=LayoutBase.js.map
