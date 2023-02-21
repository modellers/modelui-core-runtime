import { _ as _inherits, a as _createSuper, b as _createClass, c as _classCallCheck, d as _defineProperty, h as _objectSpread2, e as _assertThisInitialized } from '../../_rollupPluginBabelHelpers-55d249d8.js';
import { O as OptionsBuilder, a as OrderedObjParser_1, n as node2json, v as validator$2, j as json2xml } from '../../json2xml-ac73b7d0.js';
import Event from '../../event/Event.js';
import { StateLess } from '../../event/StateBase.js';

const { buildOptions} = OptionsBuilder;
const OrderedObjParser = OrderedObjParser_1;
const { prettify} = node2json;
const validator$1 = validator$2;

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

const validator = validator$2;
const XMLParser$1 = XMLParser_1;
const XMLBuilder = json2xml;

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
  _inherits(StateWorker, _StateLess);
  var _super = _createSuper(StateWorker);
  // NOTE: idea is that the StateWorker is a generic instance that can be reused running scripts

  function StateWorker(props) {
    var _this;
    _classCallCheck(this, StateWorker);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "registerComponent", function (actionHandlers, eventHandlers, component_info) {
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
      _this.ddEvent = Event.EventManager.getInstance().register(_this.props.id, _objectSpread2(_objectSpread2({}, dataActionHandlers), actionHandlers), _objectSpread2(_objectSpread2({}, events), eventHandlers), component_info);
      return _this.ddEvent;
    });
    _this.props = props;
    // apply initial values
    _this.state = {};
    return _this;
  }
  return _createClass(StateWorker);
}(StateLess);
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

export { StateWorker, XMLParser, config, events, options, triggers };
//# sourceMappingURL=XMLParser.js.map
