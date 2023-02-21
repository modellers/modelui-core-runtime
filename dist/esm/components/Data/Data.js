import { ObjectCollection, config, events, triggers } from './ObjectCollection.js';
import { XMLParser, config as config$1, events as events$1, triggers as triggers$1 } from './XMLParser.js';
import '../../event/ObjectBase.js';
import '../../_rollupPluginBabelHelpers-55d249d8.js';
import '../../event/StateBase.js';
import '../../event/Event.js';
import '../../util/ObjUtil.js';
import './MemoryManager.js';
import '../../json2xml-ac73b7d0.js';

// manager
function registerObjectCollection(component_manager) {
  // self register component to layout manager
  component_manager.registerComponent({
    component: ObjectCollection,
    type: config.type,
    events: events,
    triggers: triggers,
    config: config
  });
}
function registerXML(component_manager) {
  // self register component to layout manager
  component_manager.registerComponent({
    component: XMLParser,
    type: config$1.type,
    events: events$1,
    triggers: triggers$1,
    config: config$1
  });
}

export { registerObjectCollection, registerXML };
//# sourceMappingURL=Data.js.map
