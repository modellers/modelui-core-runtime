'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../../_rollupPluginBabelHelpers-aae655da.js');
var event_Event = require('../../event/Event.js');
var event_StateBase = require('../../event/StateBase.js');

var triggers = {
  read: {
    alias: [],
    info: {
      name: 'Read',
      description: 'Read XML returning JSON'
    },
    schema: {}
  },
  convert: {
    alias: [],
    info: {
      name: 'Convert',
      description: 'Converts JSON to XML'
    },
    schema: {}
  }
};
var events = {
  reading: {
    alias: [],
    info: {
      name: 'reading',
      description: 'Reading the XML and returning XML'
    },
    schema: {}
  },
  read: {
    alias: [],
    info: {
      name: 'read',
      description: 'Read the XML and returning XML'
    },
    schema: {}
  },
  failure_reading: {
    alias: [],
    info: {
      name: 'Reading XML failed',
      description: 'Parsing the XML faild'
    },
    schema: {}
  },
  converting: {
    alias: [],
    info: {
      name: 'Converting',
      description: 'Converting the JSON to XML'
    },
    schema: {}
  },
  converted: {
    alias: [],
    info: {
      name: 'Converted',
      description: 'Converted the JSON to XML'
    },
    schema: {}
  },
  failure_converting: {
    alias: [],
    info: {
      name: 'Failure Converting',
      description: 'Convertion the JSON to XML failed'
    },
    schema: {}
  }
};
var options = {
  id: 'object-request',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'XML Parser options',
  'x-layout': 'component',
  type: 'object',
  version: 0.1,
  properties: {},
  required: []
};
var StateREST = /*#__PURE__*/function (_StateLess) {
  _rollupPluginBabelHelpers._inherits(StateREST, _StateLess);
  var _super = _rollupPluginBabelHelpers._createSuper(StateREST);
  // NOTE: idea is that the StateREST is a generic instance that can be reused running scripts

  function StateREST(props) {
    var _this;
    _rollupPluginBabelHelpers._classCallCheck(this, StateREST);
    _this = _super.call(this, props);
    _rollupPluginBabelHelpers._defineProperty(_rollupPluginBabelHelpers._assertThisInitialized(_this), "registerComponent", function (actionHandlers, eventHandlers, component_info) {
      actionHandlers = actionHandlers || {};
      eventHandlers = eventHandlers || {};
      // add our known handlers
      // register componenet overiding or adding new event handlers

      var dataActionHandlers = {
        read: {
          schema: {},
          handler: function handler(obj) {
            _this.triggerEvent('reading', {
              id: obj.id,
              xml: obj.xml
            });
          }
        },
        convert: {
          schema: {},
          handler: function handler(obj) {
            _this.triggerEvent('converting', {
              id: obj.id,
              json: obj.json
            });
          }
        }
      };

      // register componenet overiding or adding new event handlers
      _this.ddEvent = event_Event.EventManager.getInstance().register(_this.props.id, _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, dataActionHandlers), actionHandlers), _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, events), eventHandlers), component_info);
      return _this.ddEvent;
    });
    _this.props = props;
    // apply initial values
    _this.state = {};
    return _this;
  }
  return _rollupPluginBabelHelpers._createClass(StateREST);
}(event_StateBase.StateLess);
var config = {
  name: 'Object Request',
  type: 'object-request',
  author: 'Kjartan Jónsson',
  description: 'JSON Web request',
  version: 0.1,
  relation: {
    contains: [],
    within: 'component' // parent
  },

  options: options,
  state: StateREST
};
function RequestObject(props) {
  var stateREST = new StateREST(props);
  stateREST.registerComponent({}, {}, config);
  return stateREST;
}

exports.RequestObject = RequestObject;
exports.StateREST = StateREST;
exports.config = config;
exports.events = events;
exports.options = options;
exports.triggers = triggers;
//# sourceMappingURL=RequestObject.js.map
