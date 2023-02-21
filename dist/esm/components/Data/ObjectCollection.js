import { triggers as triggers$1, events as events$1, StateObject } from '../../event/ObjectBase.js';
import '../../_rollupPluginBabelHelpers-55d249d8.js';
import '../../event/StateBase.js';
import '../../event/Event.js';
import '../../util/ObjUtil.js';
import './MemoryManager.js';

// event handler
var triggers = triggers$1;
var events = events$1;
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
  state: StateObject
};
function ObjectCollection(props) {
  var stateObject = new StateObject(props);
  stateObject.registerComponent({}, {}, config);
  return stateObject;
}

export { ObjectCollection, config, events, options, triggers };
//# sourceMappingURL=ObjectCollection.js.map
