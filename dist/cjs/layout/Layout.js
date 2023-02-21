'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var layout_Layouter = require('./Layouter.js');
var layout_LayoutComponent = require('./LayoutComponent.js');
require('../_rollupPluginBabelHelpers-aae655da.js');
require('./Manager.js');
require('../event/Event.js');
require('./LayoutBase.js');
require('../event/ListBase.js');
require('../event/StateBase.js');
require('../event/StateBaseComponent.js');
require('../util/ObjUtil.js');
require('../util/ComponentUtil.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

/* eslint-disable prettier/prettier */
function registerLayout(component_manager) {
  // self register component to layout manager
  component_manager.registerComponent({
    component: layout_Layouter.Layouter,
    type: layout_LayoutComponent.config.type,
    events: layout_LayoutComponent.events,
    triggers: layout_LayoutComponent.triggers,
    config: layout_LayoutComponent.config
  });
}
function Layout(props) {
  // lets enumerate schema to extract uiSchema and validation
  return /*#__PURE__*/React__default["default"].createElement(layout_LayoutComponent["default"], props);
}
var Layout$1 = {
  LayoutRender: layout_Layouter.LayoutRender,
  Layouter: layout_Layouter.Layouter
};

exports.Layout = Layout;
exports["default"] = Layout$1;
exports.registerLayout = registerLayout;
//# sourceMappingURL=Layout.js.map
