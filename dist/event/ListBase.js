"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("../_rollupPluginBabelHelpers-aae655da.js"),t=require("./StateBase.js"),a=require("./StateBaseComponent.js"),n=require("../util/ObjUtil.js");require("react");var d={$id:"v1/listbase/..",type:"array",items:{$ref:"#/definitions/identifier"},definitions:{identifier:{type:"object",additionalProperties:!0,properties:{id:{type:"string"}},required:["id"],title:"Identifier with additional properties"}}},i={submit:{alias:[],info:{name:"Submit",description:"Submit entire list"},schema:{}},replace:{alias:[],info:{name:"Replace",description:"Replace data"},schema:{}},push:{alias:[],info:{name:"Push",description:"Adds data at the end to component"},schema:{}},push_front:{alias:[],info:{name:"Push front",description:"Adds data to the front of the component"},schema:{}},delete:{alias:[],info:{name:"Delete data instance",description:"Removes data from the component"},schema:e._objectSpread2(e._objectSpread2({},d),{},{$id:"v1/listbase/delete"})},pop:{alias:[],info:{name:"Pop back item",description:"Deletes / removes back data item"},schema:{}},pop_front:{alias:[],info:{name:"Pop front item",description:"Deletes / removes front data item"},schema:{}},select:{alias:[],info:{name:"Select item",description:"Selects the data item"},schema:e._objectSpread2(e._objectSpread2({},d),{},{$id:"v1/listbase/select"})},clear:{alias:[],info:{name:"Clear items",description:"Removes all items from list"},schema:{}}},s={changed:{alias:[],info:{name:"changed",description:"Changed size"},schema:{}},replacing:{alias:[],info:{name:"replacing",description:"Replacing content"},schema:{}},replaced:{alias:[],info:{name:"replaced",description:"Replace content"},schema:{}},submitted:{alias:[],info:{name:"Submitted",description:"Subbited all items in list"},schema:{}},deleted:{alias:[],info:{name:"Deleted",description:"Deleted specified items"},schema:{}},pushing:{alias:[],info:{name:"Pusing",description:"Pushing item in front of list"},schema:{}},pushed:{alias:[],info:{name:"Pushed",description:"Pushed item in front of list"},schema:{}},selected:{alias:[],info:{name:"Selected",description:"Selecting item"},schema:e._objectSpread2(e._objectSpread2({},d),{},{$id:"v1/listbase/selected"})},deselected:{alias:[],info:{name:"De-Selected",description:"Unselecting item"},schema:{}},clearing:{alias:[],info:{name:"Clearing",description:"Removing all items"},schema:{}},cleared:{alias:[],info:{name:"Cleared",description:"Removed all items"},schema:{}}},r=function(t){e._inherits(d,t);var a=e._createSuper(d);function d(t){var i;e._classCallCheck(this,d),i=a.call(this,t),e._defineProperty(e._assertThisInitialized(i),"findItemIndexById",(function(e,t){return n.findItemIndexById(e,t)})),e._defineProperty(e._assertThisInitialized(i),"updateItem",(function(t,a){var n=i.findItemIndexById(t,i.state.data),d=e._toConsumableArray(i.state.data);if(n>=0){for(var s=0,r=Object.entries(a);s<r.length;s++){var o=e._slicedToArray(r[s],2),c=o[0],p=o[1];d[n][c]=p}i.setState(e._objectSpread2(e._objectSpread2({},i.state),{},{data:d}))}})),e._defineProperty(e._assertThisInitialized(i),"registerComponent",(function(t,a,d){t=t||{},a=a||{};var r={submit:{schema:{},handler:function(e){i.eventManager.addEvent(i.props.id,"submitted",{count:i.state.data.length,items:i.state.data},{})}},replace:{schema:{},handler:function(t){var a=i.state.data||[];Array.isArray(t)||(t=[t]),i.eventManager.addEvent(i.props.id,"replacing",{count:a.length,old:a,new:t},{});var n=t;i.updateView("replace",[],[],n)&&i.setState(e._objectSpread2(e._objectSpread2({},i.state),{},{data:n})),i.eventManager.addEvent(i.props.id,"replaced",{count:n.length,items:n},{}),i.eventManager.addEvent(i.props.id,"changed",{count:n.length,items:n},{})}},push:{schema:{},handler:function(t){var a=[],d=[],s=i.state.data||[],r={};Array.isArray(t)||(t=[t]),t.forEach((function(e){var t=i.findItemIndexById(e.id,s);null===t?a.push(e):(s[t]=n.mergeDeep(s[t],e),d.push(t)),e.selected&&(r={selectedId:e.id,selectedIndex:t})}));var o=[].concat(e._toConsumableArray(s),a);try{i.eventManager.addEvent(i.props.id,"pushing",a,{}),i.updateView("push",a,d,o)&&i.setState(e._objectSpread2(e._objectSpread2(e._objectSpread2({},i.state),r),{},{data:o}))}catch(e){i.exceptionCatched("push",e)}i.eventManager.addEvent(i.props.id,"pushed",{count:o.length,items:o,added:a},{}),i.ddEvent=i.eventManager.addEvent(i.props.id,"changed",{count:o.length,items:o,added:a,updated:d},{})}},push_front:{schema:{},handler:function(t){var a=[],n=[],d=i.state.data||[],s={};Array.isArray(t)||(t=[t]),t.forEach((function(e){var t=i.findItemIndexById(e.id,i.state.data);null===t?a.push(e):(d[t]=e,n.push(t)),e.selected&&(s={selectedId:e.id,selectedIndex:t||a.length-1})}));var r=[].concat(a,e._toConsumableArray(d));i.updateView("push_front",[],n,r)&&i.setState(e._objectSpread2(e._objectSpread2(e._objectSpread2({},i.state),s),{},{data:r})),i.ddEvent=i.eventManager.addEvent(i.props.id,"changed",{count:r.length,items:r},{})}},delete:{schema:{},handler:function(t){Array.isArray(t)||(t=[t]);var a=i.state.data,d=[],s=[];t.forEach((function(e){if(e.id){var t=i.findItemIndexById(e.id,a);null!==t&&(s.push(e.id),a=n.removeItemIndexByIndex(t,a),d.push(t))}}));try{i.updateView("delete",[],d,a)&&i.setState(e._objectSpread2(e._objectSpread2({},i.state),{},{data:a}))}catch(e){i.exceptionCatched("delete",e)}i.ddEvent=i.eventManager.addEvent(i.props.id,"changed",{count:a.length,items:a,deleted:s},{}),i.ddEvent=i.eventManager.addEvent(i.props.id,"deleted",{count:s.length,items:a,deleted:s},{})}},pop:{schema:{},handler:function(t){i.state.data.length>0&&(i.state.data.splice(i.state.data.length-1,1),i.updateView("pop",[],[],i.state.data)&&(i.setState(e._objectSpread2(e._objectSpread2({},i.state),{},{data:i.state.data})),i.ddEvent=i.eventManager.addEvent(i.props.id,"changed",{count:i.state.data.length,items:i.state.data},{})))}},pop_front:{schema:{},handler:function(t){i.state.data.splice(0,1),i.updateView("pop_front",[],[],i.state.data)&&(i.setState(e._objectSpread2(e._objectSpread2({},i.state),{},{data:i.state.data})),i.ddEvent=i.eventManager.addEvent(i.props.id,"changed",{count:i.state.data.length,items:i.state.data},{}))}},select:{schema:{},handler:function(t){var a=[],n=[];Array.isArray(t)||(t=[t]);for(var d=0;d<i.state.data.length;d++)i.state.data[d].selected=!1;t.forEach((function(e){if(e.id){var t=i.findItemIndexById(e.id,i.state.data);null!==t&&(i.state.data[t].selected=!i.state.data[t].selected,i.state.selectedId=i.state.data[t].id,i.state.selectedIndex=t,a.push(t),n.push(i.state.data[t]))}})),i.setState(e._objectSpread2(e._objectSpread2({},i.state),{},{data:i.state.data})),i.ddEvent=i.eventManager.addEvent(i.props.id,"selecting",t,null),i.updateView("select",t,a,i.state)&&(i.ddEvent=i.eventManager.addEvent(i.props.id,"selected",n,null))}},clear:{schema:{},handler:function(t){i.ddEvent=i.eventManager.addEvent(i.props.id,"clearing",{count:i.state.data.length,items:i.state.data},{}),i.setState(e._objectSpread2(e._objectSpread2({},i.state),{},{data:[]})),i.ddEvent=i.eventManager.addEvent(i.props.id,"cleared",{count:i.state.data.length,items:i.state.data},{}),i.ddEvent=i.eventManager.addEvent(i.props.id,"changed",{count:i.state.data.length,items:i.state.data},{}),i.updateView("clear",[],[],[])}}};return i.ddEvent=i.eventManager.register(i.props.id,e._objectSpread2(e._objectSpread2({},r),t),e._objectSpread2(e._objectSpread2({},s),a),d),i.ddEvent})),i.props=t;var r=[];if(t.data&&(Array.isArray(t.data)?r=t.data:"object"===e._typeof(t.data)?t.data.length&&(r=[t.data]):r=[t.data]),i.state={data:r||[],selectedIndex:0,selectedId:null},!i.props.manager)throw new Error("Manager was not passed through StateList props");return i.eventManager=i.props.manager.getEventManager(),i}return e._createClass(d)}(t.StateInstance),o=function(t){e._inherits(n,t);var a=e._createSuper(n);function n(t){var d;return e._classCallCheck(this,n),t.config.options||(t.config.options={}),d=a.call(this,t),e._defineProperty(e._assertThisInitialized(d),"updateView",(function(e,t,a,n){return!0})),e._defineProperty(e._assertThisInitialized(d),"exceptionCatched",(function(e,t){console.info("ListBase: "+e+" --\x3e ",t)})),e._defineProperty(e._assertThisInitialized(d),"findItemIndexById",(function(e,t){if(d.stateManager)return d.stateManager.findItemIndexById(e,t)})),e._defineProperty(e._assertThisInitialized(d),"updateItem",(function(t,a,n){return n?d.updateItemSilent(t,a):d.triggerAction("push",e._objectSpread2(e._objectSpread2({},a),{},{id:t}))})),e._defineProperty(e._assertThisInitialized(d),"updateItemSilent",(function(e,t){if(d.stateManager)return d.stateManager.updateItem(e,t)})),e._defineProperty(e._assertThisInitialized(d),"getData",(function(){return d.state.data})),e._defineProperty(e._assertThisInitialized(d),"showSelectedRow",(function(e){return!!d.props.config.options.select&&e.selected})),e._defineProperty(e._assertThisInitialized(d),"showSelected",(function(e,t){return!0})),e._defineProperty(e._assertThisInitialized(d),"setSelectedId",(function(e,t,a){d.triggerAction("select",{id:e})})),e._defineProperty(e._assertThisInitialized(d),"getSelectedId",(function(){var e=[];return d.state.data.forEach((function(t){t.selected&&e.push(t.id)})),e})),e._defineProperty(e._assertThisInitialized(d),"getItemTreeState",(function(){var e=[],t=[];return d.state.data.forEach((function(a){a.selected&&e.push(a.id),a.expanded&&t.push(a.id)})),{selected:e,expanded:t,focused:d.state.selectedId}})),e._defineProperty(e._assertThisInitialized(d),"handleSelect",(function(e,t,a,n){n||d.setSelectedId(t.id,n)})),d.props=t,d}return e._createClass(n,[{key:"render",value:function(){return null}}]),n}(a.StateBaseComponent),c={events:s,triggers:i,StateList:r,ListBase:o};exports.ListBase=o,exports.StateList=r,exports.default=c,exports.events=s,exports.triggers=i;
