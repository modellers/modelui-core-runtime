import { _ as _inherits, a as _createSuper, b as _createClass, c as _classCallCheck, f as _createForOfIteratorHelper } from '../_rollupPluginBabelHelpers-55d249d8.js';
import React from 'react';
import { events as events$1, triggers as triggers$1, StateLayout, LayoutBase } from './LayoutBase.js';
import { Layouter } from './Layouter.js';
import '../event/ListBase.js';
import '../event/StateBase.js';
import '../event/StateBaseComponent.js';
import '../util/ObjUtil.js';
import '../util/ComponentUtil.js';
import './Manager.js';
import '../event/Event.js';

var events = events$1;
var triggers = triggers$1;
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
  state: StateLayout
};
var LayoutComponent = /*#__PURE__*/function (_LayoutBase) {
  _inherits(LayoutComponent, _LayoutBase);
  var _super = _createSuper(LayoutComponent);
  /**
   * Used to manage layout
   */

  function LayoutComponent(props) {
    _classCallCheck(this, LayoutComponent);
    props.config.options = props.config.options || {};
    return _super.call(this, props);
  }
  _createClass(LayoutComponent, [{
    key: "render",
    value: function render() {
      var classes = this.props.classes;
      // return LayoutRender(this.props.id, this.props.data, classes, config, 'div');
      var container_id = this.props.id;
      var data = this.props.data;
      var ignore = [];
      var content = []; // rendered content
      var _iterator = _createForOfIteratorHelper(this.props.data),
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
            content.push( /*#__PURE__*/React.createElement(Layouter, {
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
      return /*#__PURE__*/React.createElement("div", null, content);
    }
  }]);
  return LayoutComponent;
}(LayoutBase);
var LayoutComponent$1 = {
  events: events,
  triggers: triggers,
  config: config,
  options: options,
  LayoutComponent: LayoutComponent
};

export { config, LayoutComponent$1 as default, events, options, triggers };
//# sourceMappingURL=LayoutComponent.js.map
