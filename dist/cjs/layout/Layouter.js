'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-aae655da.js');
var React = require('react');
var layout_Manager = require('./Manager.js');
require('../event/Event.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function LayoutRender(container_id, data, classes, config, component_manger) {
  var ignore = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : [];
  var content = []; // rendered content
  if (!component_manger) {
    throw new Error('Manager was not passed to LayoutRender');
  }
  console.info('-----------FIXME: TODO: IS THIS CODE USED?-----------');
  var _iterator = _rollupPluginBabelHelpers._createForOfIteratorHelper(config.layout),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var item = _step.value;
      if (!item) {
        continue;
      }
      // check if we should skip generating this item by request of the caller. Example dont allow card action to have another card
      if (ignore.indexOf(item.type) > -1) {
        console.warn('Using item type=' + item.type + ' not supported in layout for ' + container_id);
        continue;
      }
      // create a component identifier
      var id = container_id + (item.id || item.type);

      // build the component
      if (item.type === 'layout') {
        content.push( /*#__PURE__*/React__default["default"].createElement(Layouter, {
          id: id,
          key: id,
          classes: classes,
          data: data,
          manager: component_manger,
          config: item.config
        }));
      } else {
        var item_data = data || {};
        var params = {
          id: id,
          key: id,
          classes: classes,
          manager: component_manger,
          data: item.data || item_data[item.pick] || item_data,
          config: item.config
        };
        var component = layout_Manager["default"].ComponentManager.getInstance().getComponentInstance(item.type, params);
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
function Layouter(props) {
  // style
  var classes = {};
  // recursive render
  return LayoutRender(props.id, props.data, classes, props.config, props.manager, 'div');
}

exports.LayoutRender = LayoutRender;
exports.Layouter = Layouter;
//# sourceMappingURL=Layouter.js.map
