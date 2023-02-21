import { RequestObject, config, events, triggers } from './RequestObject.js';
import '../../_rollupPluginBabelHelpers-55d249d8.js';
import '../../event/Event.js';
import '../../event/StateBase.js';

// manager
function registerRequestObject(component_manager) {
  // self register component to layout manager
  component_manager.registerComponent({
    component: RequestObject,
    type: config.type,
    events: events,
    triggers: triggers,
    config: config
  });
}

export { registerRequestObject };
//# sourceMappingURL=Network.js.map
