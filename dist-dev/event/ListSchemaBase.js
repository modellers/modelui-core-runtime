"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("../_rollupPluginBabelHelpers-aae655da.js"),t=require("./ListBase.js"),a=require("./StateBaseComponent.js"),d=require("../util/ObjUtil.js");require("./StateBase.js"),require("react"),require("crypto");var s=t.default.triggers,n=t.default.events,r={$id:"identifiers",$schema:"http://json-schema.org/draft-07/schema#",description:"Identifiers",type:"object",properties:{id:{type:"string"}},required:["id"]},i=function(t){e._inherits(s,t);var a=e._createSuper(s);function s(t){var i;e._classCallCheck(this,s),i=a.call(this,t),e._defineProperty(e._assertThisInitialized(i),"findItemIndexById",(function(e,t){return d.findItemIndexById(e,t)})),e._defineProperty(e._assertThisInitialized(i),"registerComponent",(function(t,a,s){t=t||{},a=a||{};var r={submit:{schema:{},handler:function(e){i.eventManager.addEvent(i.props.id,"submitted",{count:i.state.data.length,items:i.state.data,schema:i.state.schema},{})}},replace:{schema:{},handler:function(t){var a=i.state;t.schema,t.items&&(Array.isArray(t.items)||(t.items=[t.items])),i.eventManager.addEvent(i.props.id,"replacing",{old:a,new:t},{});var d=t;i.updateView("replace",[],[],d.items)&&i.setState(e._objectSpread2(e._objectSpread2({},i.state),{},{data:d.items||i.state.data,schema:d.schema||i.state.schema})),i.eventManager.addEvent(i.props.id,"replaced",{count:i.state.data.length,items:i.state.data,schema:i.state.schema},{}),i.eventManager.addEvent(i.props.id,"changed",{count:i.state.data.length,items:i.state.data,schema:i.state.schema},{})}},push:{schema:{},handler:function(t){var a=[],s=[],n=e._toConsumableArray(i.state.data||[]),r={};Array.isArray(t)||(t=[t]),t.forEach((function(e){var t=i.findItemIndexById(e.id,n);null===t?a.push(e):(n[t]=d.mergeDeep(n[t],e),s.push(t)),e.selected&&(r={selectedId:e.id,selectedIndex:t})}));var c=[].concat(e._toConsumableArray(n),a);try{i.eventManager.addEvent(i.props.id,"pushing",a,{}),i.updateView("push",a,s,c)&&i.setState(e._objectSpread2(e._objectSpread2(e._objectSpread2({},i.state),r),{},{data:c}))}catch(e){i.exceptionCatched("push",e)}i.eventManager.addEvent(i.props.id,"pushed",{count:c.length,items:c,added:a},{}),i.eventManager.addEvent(i.props.id,"changed",{count:c.length,items:c,added:a,updated:s},{})}},push_front:{schema:{},handler:function(t){var a=[],d=[],s=e._toConsumableArray(i.state.data||[]),n={};Array.isArray(t)||(t=[t]),t.forEach((function(e){var t=i.findItemIndexById(e.id,i.state.data);null===t?a.push(e):(s[t]=e,d.push(t)),e.selected&&(n={selectedId:e.id,selectedIndex:t||a.length-1})}));var r=[].concat(a,e._toConsumableArray(s));i.updateView("push_front",[],d,r)&&i.setState(e._objectSpread2(e._objectSpread2(e._objectSpread2({},i.state),n),{},{data:r})),i.eventManager.addEvent(i.props.id,"changed",{count:r.length,items:r},{})}},delete:{schema:{},handler:function(t){Array.isArray(t)||(t=[t]);var a=i.state.data,s=[],n=[];t.forEach((function(e){if(e.id){var t=i.findItemIndexById(e.id,a);null!==t&&(n.push(e.id),a=d.removeItemIndexByIndex(t,a),s.push(t))}}));try{i.updateView("delete",[],s,a)&&i.setState(e._objectSpread2(e._objectSpread2({},i.state),{},{data:a}))}catch(e){i.exceptionCatched("delete",e)}i.eventManager.addEvent(i.props.id,"changed",{count:a.length,items:a,deleted:n},{}),i.eventManager.addEvent(i.props.id,"deleted",{count:n.length,items:a,deleted:n},{})}},pop:{schema:{},handler:function(t){i.state.data.length>0&&(i.state.data.splice(i.state.data.length-1,1),i.updateView("pop",[],[],i.state.data)&&(i.setState(e._objectSpread2(e._objectSpread2({},i.state),{},{data:i.state.data})),i.eventManager.addEvent(i.props.id,"changed",{count:i.state.data.length,items:i.state.data},{})))}},pop_front:{schema:{},handler:function(t){i.state.data.splice(0,1),i.updateView("pop_front",[],[],i.state.data)&&(i.setState(e._objectSpread2(e._objectSpread2({},i.state),{},{data:i.state.data})),i.eventManager.addEvent(i.props.id,"changed",{count:i.state.data.length,items:i.state.data},{}))}},select:{schema:{},handler:function(t){var a=[],d=[];Array.isArray(t)||(t=[t]);for(var s=0;s<i.state.data.length;s++)i.state.data[s].selected=!1;t.forEach((function(e){if(e.id){var t=i.findItemIndexById(e.id,i.state.data);null!==t&&(i.state.data[t].selected=!i.state.data[t].selected,i.state.selectedId=i.state.data[t].id,i.state.selectedIndex=t,a.push(t),d.push(i.state.data[t]))}})),i.setState(e._objectSpread2(e._objectSpread2({},i.state),{},{data:i.state.data})),i.eventManager.addEvent(i.props.id,"selecting",t,null),i.updateView("select",t,a,i.state)&&i.eventManager.addEvent(i.props.id,"selected",d,null)}},clear:{schema:{},handler:function(t){i.eventManager.addEvent(i.props.id,"clearing",{count:i.state.data.length,items:i.state.data},{}),i.setState(e._objectSpread2(e._objectSpread2({},i.state),{},{data:[]})),i.eventManager.addEvent(i.props.id,"cleared",{count:i.state.data.length,items:i.state.data},{}),i.eventManager.addEvent(i.props.id,"changed",{count:i.state.data.length,items:i.state.data},{}),i.updateView("clear",[],[],[])}}};return i.ddEvent=i.eventManager.register(i.props.id,e._objectSpread2(e._objectSpread2({},r),t),e._objectSpread2(e._objectSpread2({},n),a),s),i.ddEvent})),i.props=t;var c=[],o=t.data.schema||i.props.schema||r;if(t.data){if(!t.data.items)throw new Error("Expecting data property in data object");Array.isArray(t.data.items)?c=t.data.items:"object"===e._typeof(t.data.items)?t.data.items.length&&(c=[t.data.items]):c=[t.data.items]}if(i.state={schema:o,data:c||[],selectedIndex:0,selectedId:null},!i.props.manager)throw new Error("Manager was not passed through StateSchemaList props");return i.eventManager=i.props.manager.getEventManager(),i}return e._createClass(s)}(t.default.StateList),c=function(t){e._inherits(d,t);var a=e._createSuper(d);function d(t){var s;return e._classCallCheck(this,d),t.config.options||(t.config.options={}),s=a.call(this,t),e._defineProperty(e._assertThisInitialized(s),"updateData",(function(e,t,a){s.triggerAction("push",[e])})),e._defineProperty(e._assertThisInitialized(s),"updateView",(function(e,t,a,d){return!0})),e._defineProperty(e._assertThisInitialized(s),"exceptionCatched",(function(e,t){console.info("ListBase: "+e+" --\x3e ",t)})),e._defineProperty(e._assertThisInitialized(s),"findItemIndexById",(function(e,t){if(s.stateManager)return s.stateManager.findItemIndexById(e,t)})),e._defineProperty(e._assertThisInitialized(s),"getData",(function(){return s.state.data})),e._defineProperty(e._assertThisInitialized(s),"showSelectedRow",(function(e){return!!s.props.config.options.select&&e.selected})),e._defineProperty(e._assertThisInitialized(s),"showSelected",(function(e,t){return!0})),e._defineProperty(e._assertThisInitialized(s),"setSelectedId",(function(e,t,a){s.triggerAction("select",{id:e})})),e._defineProperty(e._assertThisInitialized(s),"handleSelect",(function(e,t,a,d){d||s.setSelectedId(t.id,d)})),s.props=t,s}return e._createClass(d,[{key:"render",value:function(){return null}}]),d}(a.StateBaseComponent),o={events:n,triggers:s,StateSchemaList:i,ListSchemaBase:c};exports.ListSchemaBase=c,exports.StateSchemaList=i,exports.default=o,exports.events=n,exports.triggers=s;
//# sourceMappingURL=ListSchemaBase.js.map
