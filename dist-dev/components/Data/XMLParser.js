"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("../../_rollupPluginBabelHelpers-aae655da.js"),r=require("../../json2xml-a99cc95e.js"),t=require("../../event/Event.js"),i=require("../../event/StateBase.js");const{buildOptions:n}=r.OptionsBuilder,a=r.OrderedObjParser_1,{prettify:o}=r.node2json,s=r.validator;var d=class{constructor(e){this.externalEntities={},this.options=n(e)}parse(e,r){if("string"==typeof e);else{if(!e.toString)throw new Error("XML data is accepted in String or Bytes[] form.");e=e.toString()}if(r){!0===r&&(r={});const t=s.validate(e,r);if(!0!==t)throw Error(`${t.err.msg}:${t.err.line}:${t.err.col}`)}const t=new a(this.options);t.addExternalEntities(this.externalEntities);const i=t.parseXml(e);return this.options.preserveOrder||void 0===i?i:o(i,this.options)}addEntity(e,r){if(-1!==r.indexOf("&"))throw new Error("Entity value can't have '&'");if(-1!==e.indexOf("&")||-1!==e.indexOf(";"))throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");if("&"===r)throw new Error("An entity with value '&' is not permitted");this.externalEntities[e]=r}};var c={XMLParser:d,XMLValidator:r.validator,XMLBuilder:r.json2xml},l={reading:{alias:[],info:{name:"reading",description:"Reading the XML and returning XML"},schema:{}},read:{alias:[],info:{name:"read",description:"Read the XML and returning XML"},schema:{}},failure_reading:{alias:[],info:{name:"Reading XML failed",description:"Parsing the XML faild"},schema:{}},converting:{alias:[],info:{name:"Converting",description:"Converting the JSON to XML"},schema:{}},converted:{alias:[],info:{name:"Converted",description:"Converted the JSON to XML"},schema:{}},failure_converting:{alias:[],info:{name:"Failure Converting",description:"Convertion the JSON to XML failed"},schema:{}}},p={id:"xml",$schema:"http://json-schema.org/draft-07/schema#",description:"XML Parser options","x-layout":"component",type:"object",version:.1,properties:{},required:[]},v=function(r){e._inherits(n,r);var i=e._createSuper(n);function n(r){var a;return e._classCallCheck(this,n),a=i.call(this,r),e._defineProperty(e._assertThisInitialized(a),"registerComponent",(function(r,i,n){r=r||{},i=i||{};var o={read:{schema:{},handler:function(e){a.triggerEvent("reading",{id:e.id,xml:e.xml});try{var r=new c.XMLParser({ignoreAttributes:!1}).parse(e.xml);a.triggerEvent("read",{id:e.id,json:r})}catch(r){a.triggerEvent("failure_reading",{id:e.id,xml:e.xml,error:r+"",e:r})}}},convert:{schema:{},handler:function(e){a.triggerEvent("converting",{id:e.id,json:e.json});try{var r=new c.XMLBuilder({ignoreAttributes:!1,attributeNamePrefix:"@_",format:!0}).build(e.json);a.triggerEvent("converted",{id:e.id,xml:r})}catch(r){a.triggerEvent("failure_converting",{id:e.id,xml:e.xml,error:r+"",e:r})}}}};return a.ddEvent=t.EventManager.getInstance().register(a.props.id,e._objectSpread2(e._objectSpread2({},o),r),e._objectSpread2(e._objectSpread2({},l),i),n),a.ddEvent})),a.props=r,a.state={},a}return e._createClass(n)}(i.StateLess),g={name:"XML",type:"xml",author:"Kjartan Jónsson",description:"XML Parser",version:.1,relation:{contains:[],within:"component"},options:p,state:v};exports.StateWorker=v,exports.XMLParser=function(e){var r=new v(e);return r.registerComponent({},{},g),r},exports.config=g,exports.events=l,exports.options=p,exports.triggers={read:{alias:[],info:{name:"Read",description:"Read XML returning JSON"},schema:{}},convert:{alias:[],info:{name:"Convert",description:"Converts JSON to XML"},schema:{}}};
//# sourceMappingURL=XMLParser.js.map
