'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var components_Data_ObjectCollection = require('./ObjectCollection.js');
var components_Data_XMLParser = require('./XMLParser.js');
require('../../event/ObjectBase.js');
require('../../_rollupPluginBabelHelpers-aae655da.js');
require('../../event/StateBase.js');
require('../../event/Event.js');
require('../../util/ObjUtil.js');
require('./MemoryManager.js');
require('../../json2xml-b8c1001f.js');

// manager
function registerObjectCollection(component_manager) {
  // self register component to layout manager
  component_manager.registerComponent({
    component: components_Data_ObjectCollection.ObjectCollection,
    type: components_Data_ObjectCollection.config.type,
    events: components_Data_ObjectCollection.events,
    triggers: components_Data_ObjectCollection.triggers,
    config: components_Data_ObjectCollection.config
  });
}
function registerXML(component_manager) {
  // self register component to layout manager
  component_manager.registerComponent({
    component: components_Data_XMLParser.XMLParser,
    type: components_Data_XMLParser.config.type,
    events: components_Data_XMLParser.events,
    triggers: components_Data_XMLParser.triggers,
    config: components_Data_XMLParser.config
  });
}

exports.registerObjectCollection = registerObjectCollection;
exports.registerXML = registerXML;
//# sourceMappingURL=Data.js.map
