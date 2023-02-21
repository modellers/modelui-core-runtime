'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../../_rollupPluginBabelHelpers-aae655da.js');
var json2xml = require('../../json2xml-b8c1001f.js');
var event_Event = require('../../event/Event.js');
var event_StateBase = require('../../event/StateBase.js');

const { buildOptions} = json2xml.OptionsBuilder;
const OrderedObjParser = json2xml.OrderedObjParser_1;
const { prettify} = json2xml.node2json;
const validator$1 = json2xml.validator;

class XMLParser$2{
    
    constructor(options){
        this.externalEntities = {};
        this.options = buildOptions(options);
        
    }
    /**
     * Parse XML dats to JS object 
     * @param {string|Buffer} xmlData 
     * @param {boolean|Object} validationOption 
     */
    parse(xmlData,validationOption){
        if(typeof xmlData === "string");else if( xmlData.toString){
            xmlData = xmlData.toString();
        }else {
            throw new Error("XML data is accepted in String or Bytes[] form.")
        }
        if( validationOption){
            if(validationOption === true) validationOption = {}; //validate with default options
            
            const result = validator$1.validate(xmlData, validationOption);
            if (result !== true) {
              throw Error( `${result.err.msg}:${result.err.line}:${result.err.col}` )
            }
          }
        const orderedObjParser = new OrderedObjParser(this.options);
        orderedObjParser.addExternalEntities(this.externalEntities);
        const orderedResult = orderedObjParser.parseXml(xmlData);
        if(this.options.preserveOrder || orderedResult === undefined) return orderedResult;
        else return prettify(orderedResult, this.options);
    }

    /**
     * Add Entity which is not by default supported by this library
     * @param {string} key 
     * @param {string} value 
     */
    addEntity(key, value){
        if(value.indexOf("&") !== -1){
            throw new Error("Entity value can't have '&'")
        }else if(key.indexOf("&") !== -1 || key.indexOf(";") !== -1){
            throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'")
        }else if(value === "&"){
            throw new Error("An entity with value '&' is not permitted");
        }else {
            this.externalEntities[key] = value;
        }
    }
}

var XMLParser_1 = XMLParser$2;

const validator = json2xml.validator;
const XMLParser$1 = XMLParser_1;
const XMLBuilder = json2xml.json2xml;

var fxp = {
  XMLParser: XMLParser$1,
  XMLValidator: validator,
  XMLBuilder: XMLBuilder
};

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
  id: 'xml',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'XML Parser options',
  'x-layout': 'component',
  type: 'object',
  version: 0.1,
  properties: {},
  required: []
};
var StateWorker = /*#__PURE__*/function (_StateLess) {
  _rollupPluginBabelHelpers._inherits(StateWorker, _StateLess);
  var _super = _rollupPluginBabelHelpers._createSuper(StateWorker);
  // NOTE: idea is that the StateWorker is a generic instance that can be reused running scripts

  function StateWorker(props) {
    var _this;
    _rollupPluginBabelHelpers._classCallCheck(this, StateWorker);
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
            try {
              var parser = new fxp.XMLParser({
                ignoreAttributes: false
              });
              var result = parser.parse(obj.xml);
              _this.triggerEvent('read', {
                id: obj.id,
                json: result
              });
            } catch (e) {
              // notify event: missing - Failure
              _this.triggerEvent('failure_reading', {
                id: obj.id,
                xml: obj.xml,
                error: e + '',
                e: e
              });
            }
          }
        },
        convert: {
          schema: {},
          handler: function handler(obj) {
            _this.triggerEvent('converting', {
              id: obj.id,
              json: obj.json
            });
            try {
              var _options = {
                ignoreAttributes: false,
                attributeNamePrefix: '@_',
                format: true
              };
              var builder = new fxp.XMLBuilder(_options);
              var xml = builder.build(obj.json);
              // const xml = toXml(obj.json);
              _this.triggerEvent('converted', {
                id: obj.id,
                xml: xml
              });
            } catch (e) {
              // notify event: missing - Failure
              _this.triggerEvent('failure_converting', {
                id: obj.id,
                xml: obj.xml,
                error: e + '',
                e: e
              });
            }
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
  return _rollupPluginBabelHelpers._createClass(StateWorker);
}(event_StateBase.StateLess);
var config = {
  name: 'XML',
  type: 'xml',
  author: 'Kjartan Jónsson',
  description: 'XML Parser',
  version: 0.1,
  relation: {
    contains: [],
    within: 'component' // parent
  },

  options: options,
  state: StateWorker
};
function XMLParser(props) {
  var stateWorker = new StateWorker(props);
  stateWorker.registerComponent({}, {}, config);
  return stateWorker;
}

exports.StateWorker = StateWorker;
exports.XMLParser = XMLParser;
exports.config = config;
exports.events = events;
exports.options = options;
exports.triggers = triggers;
//# sourceMappingURL=XMLParser.js.map
