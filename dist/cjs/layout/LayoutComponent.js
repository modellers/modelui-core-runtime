'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-aae655da.js');
var React = require('react');
var layout_LayoutBase = require('./LayoutBase.js');
var layout_Layouter = require('./Layouter.js');
require('../event/ListBase.js');
require('../event/StateBase.js');
require('../event/StateBaseComponent.js');
require('../util/ObjUtil.js');
require('../util/ComponentUtil.js');
require('./Manager.js');
require('../event/Event.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var events = layout_LayoutBase.events;
var triggers = layout_LayoutBase.triggers;
var options = {
  id: 'layout',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'View options',
  'x-layout': 'component',
  type: 'object',
  version: 0.1,
  properties: {},
  required: []
};
var config = {
  name: 'Layout',
  type: 'layout',
  author: 'Kjartan Jónsson',
  description: 'LayoutComponent component',
  version: 0.1,
  relation: {
    contains: [],
    within: 'component' // parent
  },

  options: options,
  state: layout_LayoutBase.StateLayout
};
var LayoutComponent = /*#__PURE__*/function (_LayoutBase) {
  _rollupPluginBabelHelpers._inherits(LayoutComponent, _LayoutBase);
  var _super = _rollupPluginBabelHelpers._createSuper(LayoutComponent);
  /**
   * Used to manage layout
   */

  function LayoutComponent(props) {
    _rollupPluginBabelHelpers._classCallCheck(this, LayoutComponent);
    props.config.options = props.config.options || {};
    return _super.call(this, props);
  }
  _rollupPluginBabelHelpers._createClass(LayoutComponent, [{
    key: "render",
    value: function render() {
      var classes = this.props.classes;
      // return LayoutRender(this.props.id, this.props.data, classes, config, 'div');
      var container_id = this.props.id;
      var data = this.props.data;
      var ignore = [];
      var content = []; // rendered content
      var _iterator = _rollupPluginBabelHelpers._createForOfIteratorHelper(this.props.data),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var item = _step.value;
          // check if we should skip generating this item by request of the caller. Example dont allow card action to have another card
          if (ignore.indexOf(item.type) > -1) {
            console.warn('Using item type=' + item.type + ' not supported in layout for ' + container_id);
            continue;
          }
          // create a component identifier
          var id = item.id;
          // build the component
          if (item.type === 'layout') {
            content.push( /*#__PURE__*/React__default["default"].createElement(layout_Layouter.Layouter, {
              id: id,
              key: id,
              classes: classes,
              data: data,
              config: item.config,
              manager: this.props.manager
            }));
          } else {
            var item_data = data || {};
            var params = {
              id: id,
              key: id,
              classes: classes,
              data: item.data || item_data[item.pick] || item_data,
              config: item.config,
              manager: this.props.manager
            };
            var component = this.props.manager.getComponentInstance(item.type, params);
            if (component) {
              content.push(component);
            } else {
              // TODO: notify missing component with type
            }
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return /*#__PURE__*/React__default["default"].createElement("div", null, content);
    }
  }]);
  return LayoutComponent;
}(layout_LayoutBase.LayoutBase);
var LayoutComponent$1 = {
  events: events,
  triggers: triggers,
  config: config,
  options: options,
  LayoutComponent: LayoutComponent
};

exports.config = config;
exports["default"] = LayoutComponent$1;
exports.events = events;
exports.options = options;
exports.triggers = triggers;
//# sourceMappingURL=LayoutComponent.js.map
