import Manager from '../layout/Manager.js';
import { registerObjectCollection, registerXML } from './Data/Data.js';
import { registerRequestObject } from './Network/Network.js';
import '../_rollupPluginBabelHelpers-55d249d8.js';
import '../event/Event.js';
import './Data/ObjectCollection.js';
import '../event/ObjectBase.js';
import '../event/StateBase.js';
import '../util/ObjUtil.js';
import './Data/MemoryManager.js';
import './Data/XMLParser.js';
import '../json2xml-ac73b7d0.js';
import './Network/RequestObject.js';

// Managers and factories
function registerComponents(component_manager) {
  if (!component_manager) {
    component_manager = Manager.ComponentManager.getInstance();
  }
  /*
    if (component_manager.constructor.name !== 'ComponentManager') {
        throw `Constructor must be component manager. Got type ${component_manager.constructor.name}`;
    }
    */

  registerObjectCollection(component_manager);
  registerRequestObject(component_manager);
  registerXML(component_manager);
}

export { registerComponents as default };
//# sourceMappingURL=Components.js.map
