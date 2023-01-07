"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("../_rollupPluginBabelHelpers-aae655da.js"),a=require("./StateBase.js"),i=require("./Event.js"),t=require("../util/ObjUtil.js"),s=require("../components/Data/MemoryManager.js"),n={invalid:{alias:[],info:{name:"invalid",description:"Insert was invalid"},schema:{}},failure:{alias:[],info:{name:"failure",description:"Insert was failed"},schema:{}},inserting:{alias:[],info:{name:"inserting",description:"Insterting item creates or replaces"},schema:{}},inserted:{alias:[],info:{name:"inserted",description:"Inserted item creates or replaces"},schema:{}},reading:{alias:[],info:{name:"Reading",description:"Reading identifer"},schema:{}},read:{alias:[],info:{name:"Read",description:"Read identifer"},schema:{}},upserting:{alias:[],info:{name:"upserting",description:"TBD"},schema:{}},upserted:{alias:[],info:{name:"upserted",description:"TBD"},schema:{}},updating:{alias:[],info:{name:"updating",description:"TBD"},schema:{}},updated:{alias:[],info:{name:"updated",description:"TBD"},schema:{}},deleting:{alias:[],info:{name:"deleting",description:"TBD"},schema:{}},deleted:{alias:[],info:{name:"deleted",description:"TBD"},schema:{}},missing:{alias:[],info:{name:"Missing",description:"Missing read identifer"},schema:{}}},r=function(a){e._inherits(d,a);var r=e._createSuper(d);function d(a){var c;return e._classCallCheck(this,d),c=r.call(this,a),e._defineProperty(e._assertThisInitialized(c),"getData",(function(){return c.getState().data})),e._defineProperty(e._assertThisInitialized(c),"deepMerge",(function(e,a){return t.mergeDeep(e,a)})),e._defineProperty(e._assertThisInitialized(c),"raiseSuccessEvent",(function(e,a,i){c.triggerEvent(e,a,i)})),e._defineProperty(e._assertThisInitialized(c),"raiseFailureEvent",(function(e,a,i){c.triggerEvent(e,a,i)})),e._defineProperty(e._assertThisInitialized(c),"isValidDocumentSchema",(function(e,a){return!0})),e._defineProperty(e._assertThisInitialized(c),"isValidDocumentId",(function(e){return null!=e})),e._defineProperty(e._assertThisInitialized(c),"getValidDocumentId",(function(e){if("string"==typeof e)return e;var a=e.id||e.identifier;return c.isValidDocumentId(a)?a:null})),e._defineProperty(e._assertThisInitialized(c),"registerComponent",(function(a,s,r){a=a||{},s=s||{};var d={insert:{schema:{},handler:function(a){var i=e._assertThisInitialized(c);function t(e,a,t){var s=i.isValidDocumentSchema(e,t);s?(i.raiseSuccessEvent("inserting",e),a[i.getValidDocumentId(e)]=e,i.raiseSuccessEvent("inserted",e)):i.raiseFailureEvent("invalid",e,{message:"Document structure is invalid against schema",code:501,data:{document:e,schema:t,reason:s}})}Array.isArray(a)?a.forEach((function(e){t(e,i.state.data.docs,i.state.data.schema)})):t(a,i.state.data.docs)}},read:{schema:{},handler:function(a){var i=e._assertThisInitialized(c);function t(e,a){if(e=i.getValidDocumentId(e)){i.raiseSuccessEvent("reading",{id:e});var t=a[e];if(t)try{i.raiseSuccessEvent("read",t)}catch(a){i.raiseFailureEvent("failure",{id:e},a)}else i.raiseFailureEvent("missing",{id:e},{message:"Document identifier is invalid",code:401,data:{id:e}})}else i.raiseFailureEvent("invalid",{id:e},{message:"Document identifier is invalid",code:301,data:{id:e}})}Array.isArray(a)?a.forEach((function(e){t(e,c.state.data.docs,c.state.data.schema)})):t(a,c.state.data.docs)}},update:{schema:{},handler:function(a){var i=e._assertThisInitialized(c);function s(e,a,s){if(i.isValidDocumentSchema(e,s)){var n=i.getValidDocumentId(e);if(i.raiseSuccessEvent("updating",e),n){var r=a[n];if(r)try{a[n]=t.mergeDeep(r||{},e),i.raiseSuccessEvent("updated",a[n])}catch(a){i.raiseFailureEvent("error",e)}else i.raiseFailureEvent("missing",{id:n,data:a},{})}else i.raiseFailureEvent("invalid",e,{message:"Document identifier is invalid",code:301,data:n})}}Array.isArray(a)?a.forEach((function(e){s(e,c.state.data.docs,c.state.data.schema)})):s(a,c.state.data.docs,c.state.data.schema)}},upsert:{schema:{},handler:function(a){var i=e._assertThisInitialized(c);function t(e,a,t){var s=i.isValidDocumentSchema(e,t);if(s){i.raiseSuccessEvent("upserting",e);var n=i.getValidDocumentId(e);if(n){var r=a[n];try{a[n]=i.deepMerge(r||{},e),i.raiseSuccessEvent("upserted",a[n])}catch(a){i.raiseFailureEvent("failure",e,a)}}}else i.raiseFailureEvent("invalid",e,{message:"Document structure is invalid against schema",code:501,data:{document:e,schema:t,reason:s}})}Array.isArray(a)?a.forEach((function(e){t(e,c.state.data.docs,c.state.data.schema)})):t(a,c.state.data.docs,c.state.data.schema)}},delete:{schema:{},handler:function(a){var i=e._assertThisInitialized(c);function t(e,a){(e=i.getValidDocumentId(e))?(i.raiseSuccessEvent("deleting",{id:e}),a[e]?(delete a[e],i.raiseSuccessEvent("deleted",{id:e})):i.raiseFailureEvent("missing",{id:e})):i.raiseFailureEvent("invalid",{id:e},{message:"Document identifier is invalid",code:301,data:{id:e}})}Array.isArray(a)?a.forEach((function(e){t(e,c.state.data.docs)})):t(a,c.state.data.docs)}}};return c.ddEvent=i.EventManager.getInstance().register(c.props.id,e._objectSpread2(e._objectSpread2({},d),a),e._objectSpread2(e._objectSpread2({},n),s),r),c.ddEvent})),c.props=a,c.state={data:{docs:a.data,schema:a.data.schema||a.schema},schema:a.schema},s.MemoryManager.getInstance().registerMemory(a.id,e._assertThisInitialized(c)),c}return e._createClass(d)}(a.StateLess);exports.StateObject=r,exports.events=n,exports.triggers={insert:{alias:[],info:{name:"Insert",description:"Insert object"},schema:{}},read:{alias:[],info:{name:"Read",description:"Read object"},schema:{}},update:{alias:[],info:{name:"Update",description:"Update object"},schema:{}},upsert:{alias:[],info:{name:"Upsert",description:"Upsert object"},schema:{}},delete:{alias:[],info:{name:"Delete",description:"Delete object"},schema:{}}};