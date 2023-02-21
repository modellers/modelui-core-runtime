import React from 'react';
import { LayoutRender, Layouter } from './Layouter.js';
import LayoutComponent, { config, events, triggers } from './LayoutComponent.js';
import '../_rollupPluginBabelHelpers-55d249d8.js';
import './Manager.js';
import '../event/Event.js';
import './LayoutBase.js';
import '../event/ListBase.js';
import '../event/StateBase.js';
import '../event/StateBaseComponent.js';
import '../util/ObjUtil.js';
import '../util/ComponentUtil.js';

/* eslint-disable prettier/prettier */
function registerLayout(component_manager) {
  // self register component to layout manager
  component_manager.registerComponent({
    component: Layouter,
    type: config.type,
    events: events,
    triggers: triggers,
    config: config
  });
}
function Layout(props) {
  // lets enumerate schema to extract uiSchema and validation
  return /*#__PURE__*/React.createElement(LayoutComponent, props);
}
var Layout$1 = {
  LayoutRender: LayoutRender,
  Layouter: Layouter
};

export { Layout, Layout$1 as default, registerLayout };
//# sourceMappingURL=Layout.js.map
