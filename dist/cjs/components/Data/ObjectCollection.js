'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var event_ObjectBase = require('../../event/ObjectBase.js');
require('../../_rollupPluginBabelHelpers-aae655da.js');
require('../../event/StateBase.js');
require('../../event/Event.js');
require('../../util/ObjUtil.js');
require('./MemoryManager.js');

// event handler
var triggers = event_ObjectBase.triggers;
var events = event_ObjectBase.events;
var options = {
  id: 'object',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'Object collection options',
  'x-layout': 'component',
  type: 'object',
  version: 0.1,
  properties: {
    name: {
      title: 'Name',
      type: 'string'
    }
  },
  required: ['name']
};
var config = {
  name: 'Dictionary',
  type: 'object',
  author: 'Kjartan Jónsson',
  description: 'Object dictionary',
  version: 0.1,
  relation: {
    contains: [],
    within: 'sources' // parent
  },

  options: options,
  state: event_ObjectBase.StateObject
};
function ObjectCollection(props) {
  var stateObject = new event_ObjectBase.StateObject(props);
  stateObject.registerComponent({}, {}, config);
  return stateObject;
}

exports.ObjectCollection = ObjectCollection;
exports.config = config;
exports.events = events;
exports.options = options;
exports.triggers = triggers;
//# sourceMappingURL=ObjectCollection.js.map
