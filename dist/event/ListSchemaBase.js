"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("../_rollupPluginBabelHelpers-b58f8590.js"),t=require("./ListBase.js"),a=require("./StateBaseComponent.js"),s=require("../util/ObjUtil.js");require("./StateBase.js"),require("react"),require("crypto"),require("../_commonjsHelpers-68cdf74f.js");var d=t.default.triggers,n=t.default.events,r={$id:"identifiers",$schema:"http://json-schema.org/draft-07/schema#",description:"Identifiers",type:"object",properties:{id:{type:"string"}},required:["id"]},i=function(t){e._inherits(d,t);var a=e._createSuper(d);function d(t){var i;e._classCallCheck(this,d),i=a.call(this,t),e._defineProperty(e._assertThisInitialized(i),"findItemIndexById",(function(e,t){return s.findItemIndexById(e,t)})),e._defineProperty(e._assertThisInitialized(i),"registerComponent",(function(t,a,d){t=t||{},a=a||{};var r={submit:{schema:{},handler:function(e){i.eventManager.addEvent(i.props.id,"submitted",{count:i.state.data.length,items:i.state.data,schema:i.state.schema},{})}},replace:{schema:{},handler:function(t){var a=i.state;t.schema,t.items&&(Array.isArray(t.items)||(t.items=[t.items])),i.eventManager.addEvent(i.props.id,"replacing",{old:a,new:t},{});var s=t;i.updateView("replace",[],[],s.items)&&i.setState(e._objectSpread2(e._objectSpread2({},i.state),{},{data:s.items||i.state.data,schema:s.schema||i.state.schema})),i.eventManager.addEvent(i.props.id,"replaced",{count:i.state.data.length,items:i.state.data,schema:i.state.schema},{}),i.eventManager.addEvent(i.props.id,"changed",{count:i.state.data.length,items:i.state.data,schema:i.state.schema},{})}},push:{schema:{},handler:function(t){var a=[],d=[],n=e._toConsumableArray(i.state.data||[]),r={};Array.isArray(t)||(t=[t]),t.forEach((function(e){var t=i.findItemIndexById(e.id,n);null===t?a.push(e):(n[t]=s.mergeDeep(n[t],e),d.push(t)),e.selected&&(r={selectedId:e.id,selectedIndex:t})}));var c=[].concat(e._toConsumableArray(n),a);try{i.eventManager.addEvent(i.props.id,"pushing",a,{}),i.updateView("push",a,d,c)&&i.setState(e._objectSpread2(e._objectSpread2(e._objectSpread2({},i.state),r),{},{data:c}))}catch(e){i.exceptionCatched("push",e)}i.eventManager.addEvent(i.props.id,"pushed",{count:c.length,items:c,added:a},{}),i.eventManager.addEvent(i.props.id,"changed",{count:c.length,items:c,added:a,updated:d},{})}},push_front:{schema:{},handler:function(t){var a=[],s=[],d=e._toConsumableArray(i.state.data||[]),n={};Array.isArray(t)||(t=[t]),t.forEach((function(e){var t=i.findItemIndexById(e.id,i.state.data);null===t?a.push(e):(d[t]=e,s.push(t)),e.selected&&(n={selectedId:e.id,selectedIndex:t||a.length-1})}));var r=[].concat(a,e._toConsumableArray(d));i.updateView("push_front",[],s,r)&&i.setState(e._objectSpread2(e._objectSpread2(e._objectSpread2({},i.state),n),{},{data:r})),i.eventManager.addEvent(i.props.id,"changed",{count:r.length,items:r},{})}},delete:{schema:{},handler:function(t){Array.isArray(t)||(t=[t]);var a=i.state.data,d=[],n=[];t.forEach((function(e){if(e.id){var t=i.findItemIndexById(e.id,a);null!==t&&(n.push(e.id),a=s.removeItemIndexByIndex(t,a),d.push(t))}}));try{i.updateView("delete",[],d,a)&&i.setState(e._objectSpread2(e._objectSpread2({},i.state),{},{data:a}))}catch(e){i.exceptionCatched("delete",e)}i.eventManager.addEvent(i.props.id,"changed",{count:a.length,items:a,deleted:n},{}),i.eventManager.addEvent(i.props.id,"deleted",{count:n.length,items:a,deleted:n},{})}},pop:{schema:{},handler:function(t){i.state.data.length>0&&(i.state.data.splice(i.state.data.length-1,1),i.updateView("pop",[],[],i.state.data)&&(i.setState(e._objectSpread2(e._objectSpread2({},i.state),{},{data:i.state.data})),i.eventManager.addEvent(i.props.id,"changed",{count:i.state.data.length,items:i.state.data},{})))}},pop_front:{schema:{},handler:function(t){i.state.data.splice(0,1),i.updateView("pop_front",[],[],i.state.data)&&(i.setState(e._objectSpread2(e._objectSpread2({},i.state),{},{data:i.state.data})),i.eventManager.addEvent(i.props.id,"changed",{count:i.state.data.length,items:i.state.data},{}))}},select:{schema:{},handler:function(t){var a=[],s=[];Array.isArray(t)||(t=[t]);for(var d=0;d<i.state.data.length;d++)i.state.data[d].selected=!1;t.forEach((function(e){if(e.id){var t=i.findItemIndexById(e.id,i.state.data);null!==t&&(i.state.data[t].selected=!i.state.data[t].selected,i.state.selectedId=i.state.data[t].id,i.state.selectedIndex=t,a.push(t),s.push(i.state.data[t]))}})),i.setState(e._objectSpread2(e._objectSpread2({},i.state),{},{data:i.state.data})),i.eventManager.addEvent(i.props.id,"selecting",t,null),i.updateView("select",t,a,i.state)&&i.eventManager.addEvent(i.props.id,"selected",s,null)}},clear:{schema:{},handler:function(t){i.eventManager.addEvent(i.props.id,"clearing",{count:i.state.data.length,items:i.state.data},{}),i.setState(e._objectSpread2(e._objectSpread2({},i.state),{},{data:[]})),i.eventManager.addEvent(i.props.id,"cleared",{count:i.state.data.length,items:i.state.data},{}),i.eventManager.addEvent(i.props.id,"changed",{count:i.state.data.length,items:i.state.data},{}),i.updateView("clear",[],[],[])}}};return i.ddEvent=i.eventManager.register(i.props.id,e._objectSpread2(e._objectSpread2({},r),t),e._objectSpread2(e._objectSpread2({},n),a),d),i.ddEvent})),i.props=t;var c=[],o=t.data.schema||i.props.schema||r;if(t.data){if(!t.data.items)throw new Error("Expecting data property in data object");Array.isArray(t.data.items)?c=t.data.items:"object"===e._typeof(t.data.items)?t.data.items.length&&(c=[t.data.items]):c=[t.data.items]}if(i.state={schema:o,data:c||[],selectedIndex:0,selectedId:null},!i.props.manager)throw new Error("Manager was not passed through StateSchemaList props");return i.eventManager=i.props.manager.getEventManager(),i}return e._createClass(d)}(t.default.StateList),c=function(t){e._inherits(s,t);var a=e._createSuper(s);function s(t){var d;return e._classCallCheck(this,s),t.config.options||(t.config.options={}),d=a.call(this,t),e._defineProperty(e._assertThisInitialized(d),"updateData",(function(e,t,a){d.triggerAction("push",[e])})),e._defineProperty(e._assertThisInitialized(d),"updateView",(function(e,t,a,s){return!0})),e._defineProperty(e._assertThisInitialized(d),"exceptionCatched",(function(e,t){console.info("ListBase: "+e+" --\x3e ",t)})),e._defineProperty(e._assertThisInitialized(d),"findItemIndexById",(function(e,t){if(d.stateManager)return d.stateManager.findItemIndexById(e,t)})),e._defineProperty(e._assertThisInitialized(d),"getData",(function(){return d.state.data})),e._defineProperty(e._assertThisInitialized(d),"showSelectedRow",(function(e){return!!d.props.config.options.select&&e.selected})),e._defineProperty(e._assertThisInitialized(d),"showSelected",(function(e,t){return!0})),e._defineProperty(e._assertThisInitialized(d),"setSelectedId",(function(e,t,a){d.triggerAction("select",{id:e})})),e._defineProperty(e._assertThisInitialized(d),"handleSelect",(function(e,t,a,s){s||d.setSelectedId(t.id,s)})),d.props=t,d}return e._createClass(s,[{key:"render",value:function(){return null}}]),s}(a.StateBaseComponent),o={events:n,triggers:d,StateSchemaList:i,ListSchemaBase:c};exports.ListSchemaBase=c,exports.StateSchemaList=i,exports.default=o,exports.events=n,exports.triggers=d;
