"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("../../_rollupPluginBabelHelpers-aae655da.js"),t=require("../../event/Event.js"),n=require("../../event/StateBase.js"),r={reading:{alias:[],info:{name:"reading",description:"Reading the XML and returning XML"},schema:{}},read:{alias:[],info:{name:"read",description:"Read the XML and returning XML"},schema:{}},failure_reading:{alias:[],info:{name:"Reading XML failed",description:"Parsing the XML faild"},schema:{}},converting:{alias:[],info:{name:"Converting",description:"Converting the JSON to XML"},schema:{}},converted:{alias:[],info:{name:"Converted",description:"Converted the JSON to XML"},schema:{}},failure_converting:{alias:[],info:{name:"Failure Converting",description:"Convertion the JSON to XML failed"},schema:{}}},i={id:"object-request",$schema:"http://json-schema.org/draft-07/schema#",description:"XML Parser options","x-layout":"component",type:"object",version:.1,properties:{},required:[]},a=function(n){e._inherits(a,n);var i=e._createSuper(a);function a(n){var o;return e._classCallCheck(this,a),o=i.call(this,n),e._defineProperty(e._assertThisInitialized(o),"registerComponent",(function(n,i,a){n=n||{},i=i||{};var s={read:{schema:{},handler:function(e){o.triggerEvent("reading",{id:e.id,xml:e.xml})}},convert:{schema:{},handler:function(e){o.triggerEvent("converting",{id:e.id,json:e.json})}}};return o.ddEvent=t.EventManager.getInstance().register(o.props.id,e._objectSpread2(e._objectSpread2({},s),n),e._objectSpread2(e._objectSpread2({},r),i),a),o.ddEvent})),o.props=n,o.state={},o}return e._createClass(a)}(n.StateLess),o={name:"Object Request",type:"object-request",author:"Kjartan Jónsson",description:"JSON Web request",version:.1,relation:{contains:[],within:"component"},options:i,state:a};exports.RequestObject=function(e){var t=new a(e);return t.registerComponent({},{},o),t},exports.StateREST=a,exports.config=o,exports.events=r,exports.options=i,exports.triggers={read:{alias:[],info:{name:"Read",description:"Read XML returning JSON"},schema:{}},convert:{alias:[],info:{name:"Convert",description:"Converts JSON to XML"},schema:{}}};