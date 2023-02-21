'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var layout_index = require('./layout/index.js');
var layout_Layout = require('./layout/Layout.js');
var components_Data_Data = require('./components/Data/Data.js');
require('./layout/LayoutBase.js');
require('./_rollupPluginBabelHelpers-aae655da.js');
require('./event/ListBase.js');
require('./event/StateBase.js');
require('./event/StateBaseComponent.js');
require('react');
require('./util/ObjUtil.js');
require('./util/ComponentUtil.js');
require('./layout/Manager.js');
require('./event/Event.js');
require('./layout/LayoutComponent.js');
require('./layout/Layouter.js');
require('./components/Data/ObjectCollection.js');
require('./event/ObjectBase.js');
require('./components/Data/MemoryManager.js');
require('./components/Data/XMLParser.js');
require('./json2xml-b8c1001f.js');

// Managers and factories
function registerCoreComponents(component_manager) {
  if (!component_manager) {
    component_manager = layout_index.ComponentManager.getInstance();
  }
  /*
  if (component_manager.constructor.name !== 'ComponentManager') {
      throw `Constructor must be component manager. Got type ${component_manager.constructor.name}`;
  }
  */

  layout_Layout.registerLayout(component_manager);
  components_Data_Data.registerXML(component_manager);
  components_Data_Data.registerObjectCollection(component_manager);
}
var Layout = layout_Layout.Layout;

exports.Layout = Layout;
exports.registerCoreComponents = registerCoreComponents;
//# sourceMappingURL=Components.js.map
