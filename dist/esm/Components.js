import layout from './layout/index.js';
import { registerLayout, Layout as Layout$1 } from './layout/Layout.js';
import { registerXML, registerObjectCollection } from './components/Data/Data.js';
import './layout/LayoutBase.js';
import './_rollupPluginBabelHelpers-55d249d8.js';
import './event/ListBase.js';
import './event/StateBase.js';
import './event/StateBaseComponent.js';
import 'react';
import './util/ObjUtil.js';
import './util/ComponentUtil.js';
import './layout/Manager.js';
import './event/Event.js';
import './layout/LayoutComponent.js';
import './layout/Layouter.js';
import './components/Data/ObjectCollection.js';
import './event/ObjectBase.js';
import './components/Data/MemoryManager.js';
import './components/Data/XMLParser.js';
import './json2xml-ac73b7d0.js';

// Managers and factories
function registerCoreComponents(component_manager) {
  if (!component_manager) {
    component_manager = layout.ComponentManager.getInstance();
  }
  /*
  if (component_manager.constructor.name !== 'ComponentManager') {
      throw `Constructor must be component manager. Got type ${component_manager.constructor.name}`;
  }
  */

  registerLayout(component_manager);
  registerXML(component_manager);
  registerObjectCollection(component_manager);
}
var Layout = Layout$1;

export { Layout, registerCoreComponents };
//# sourceMappingURL=Components.js.map
