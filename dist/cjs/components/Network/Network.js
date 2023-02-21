'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var components_Network_RequestObject = require('./RequestObject.js');
require('../../_rollupPluginBabelHelpers-aae655da.js');
require('../../event/Event.js');
require('../../event/StateBase.js');

// manager
function registerRequestObject(component_manager) {
  // self register component to layout manager
  component_manager.registerComponent({
    component: components_Network_RequestObject.RequestObject,
    type: components_Network_RequestObject.config.type,
    events: components_Network_RequestObject.events,
    triggers: components_Network_RequestObject.triggers,
    config: components_Network_RequestObject.config
  });
}

exports.registerRequestObject = registerRequestObject;
//# sourceMappingURL=Network.js.map
