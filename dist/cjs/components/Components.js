'use strict';

var layout_Manager = require('../layout/Manager.js');
var components_Data_Data = require('./Data/Data.js');
var components_Network_Network = require('./Network/Network.js');
require('../_rollupPluginBabelHelpers-aae655da.js');
require('../event/Event.js');
require('./Data/ObjectCollection.js');
require('../event/ObjectBase.js');
require('../event/StateBase.js');
require('../util/ObjUtil.js');
require('./Data/MemoryManager.js');
require('./Data/XMLParser.js');
require('../json2xml-b8c1001f.js');
require('./Network/RequestObject.js');

// Managers and factories
function registerComponents(component_manager) {
  if (!component_manager) {
    component_manager = layout_Manager["default"].ComponentManager.getInstance();
  }
  /*
    if (component_manager.constructor.name !== 'ComponentManager') {
        throw `Constructor must be component manager. Got type ${component_manager.constructor.name}`;
    }
    */

  components_Data_Data.registerObjectCollection(component_manager);
  components_Network_Network.registerRequestObject(component_manager);
  components_Data_Data.registerXML(component_manager);
}

module.exports = registerComponents;
//# sourceMappingURL=Components.js.map
