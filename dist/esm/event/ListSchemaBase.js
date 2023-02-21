import{_ as t,a as e,b as a,c as n,d,e as s,h as r,j as i,i as c}from"../_rollupPluginBabelHelpers-55d249d8.js";import o from"./ListBase.js";import p from"./StateBaseComponent.js";import{findItemIndexById as h,mergeDeep as l,removeItemIndexByIndex as u}from"../util/ObjUtil.js";import"./StateBase.js";import"react";var m=o.triggers,g=o.events,f={$id:"identifiers",$schema:"http://json-schema.org/draft-07/schema#",description:"Identifiers",type:"object",properties:{id:{type:"string"}},required:["id"]},v=function(o){t(m,o);var p=e(m);function m(t){var e;n(this,m),e=p.call(this,t),d(s(e),"findItemIndexById",(function(t,e){return h(t,e)})),d(s(e),"registerComponent",(function(t,a,n){t=t||{},a=a||{};var d={submit:{schema:{},handler:function(t){e.eventManager.addEvent(e.props.id,"submitted",{count:e.state.data.length,items:e.state.data,schema:e.state.schema},{})}},replace:{schema:{},handler:function(t){var a=e.state;t.schema,t.items&&(Array.isArray(t.items)||(t.items=[t.items])),e.eventManager.addEvent(e.props.id,"replacing",{old:a,new:t},{});var n=t;e.updateView("replace",[],[],n.items)&&e.setState(r(r({},e.state),{},{data:n.items||e.state.data,schema:n.schema||e.state.schema})),e.eventManager.addEvent(e.props.id,"replaced",{count:e.state.data.length,items:e.state.data,schema:e.state.schema},{}),e.eventManager.addEvent(e.props.id,"changed",{count:e.state.data.length,items:e.state.data,schema:e.state.schema},{})}},push:{schema:{},handler:function(t){var a=[],n=[],d=c(e.state.data||[]),s={};Array.isArray(t)||(t=[t]),t.forEach((function(t){var r=e.findItemIndexById(t.id,d);null===r?a.push(t):(d[r]=l(d[r],t),n.push(r)),t.selected&&(s={selectedId:t.id,selectedIndex:r})}));var i=[].concat(c(d),a);try{e.eventManager.addEvent(e.props.id,"pushing",a,{}),e.updateView("push",a,n,i)&&e.setState(r(r(r({},e.state),s),{},{data:i}))}catch(t){e.exceptionCatched("push",t)}e.eventManager.addEvent(e.props.id,"pushed",{count:i.length,items:i,added:a},{}),e.eventManager.addEvent(e.props.id,"changed",{count:i.length,items:i,added:a,updated:n},{})}},push_front:{schema:{},handler:function(t){var a=[],n=[],d=c(e.state.data||[]),s={};Array.isArray(t)||(t=[t]),t.forEach((function(t){var r=e.findItemIndexById(t.id,e.state.data);null===r?a.push(t):(d[r]=t,n.push(r)),t.selected&&(s={selectedId:t.id,selectedIndex:r||a.length-1})}));var i=[].concat(a,c(d));e.updateView("push_front",[],n,i)&&e.setState(r(r(r({},e.state),s),{},{data:i})),e.eventManager.addEvent(e.props.id,"changed",{count:i.length,items:i},{})}},delete:{schema:{},handler:function(t){Array.isArray(t)||(t=[t]);var a=e.state.data,n=[],d=[];t.forEach((function(t){if(t.id){var s=e.findItemIndexById(t.id,a);null!==s&&(d.push(t.id),a=u(s,a),n.push(s))}}));try{e.updateView("delete",[],n,a)&&e.setState(r(r({},e.state),{},{data:a}))}catch(t){e.exceptionCatched("delete",t)}e.eventManager.addEvent(e.props.id,"changed",{count:a.length,items:a,deleted:d},{}),e.eventManager.addEvent(e.props.id,"deleted",{count:d.length,items:a,deleted:d},{})}},pop:{schema:{},handler:function(t){e.state.data.length>0&&(e.state.data.splice(e.state.data.length-1,1),e.updateView("pop",[],[],e.state.data)&&(e.setState(r(r({},e.state),{},{data:e.state.data})),e.eventManager.addEvent(e.props.id,"changed",{count:e.state.data.length,items:e.state.data},{})))}},pop_front:{schema:{},handler:function(t){e.state.data.splice(0,1),e.updateView("pop_front",[],[],e.state.data)&&(e.setState(r(r({},e.state),{},{data:e.state.data})),e.eventManager.addEvent(e.props.id,"changed",{count:e.state.data.length,items:e.state.data},{}))}},select:{schema:{},handler:function(t){var a=[],n=[];Array.isArray(t)||(t=[t]);for(var d=0;d<e.state.data.length;d++)e.state.data[d].selected=!1;t.forEach((function(t){if(t.id){var d=e.findItemIndexById(t.id,e.state.data);null!==d&&(e.state.data[d].selected=!e.state.data[d].selected,e.state.selectedId=e.state.data[d].id,e.state.selectedIndex=d,a.push(d),n.push(e.state.data[d]))}})),e.setState(r(r({},e.state),{},{data:e.state.data})),e.eventManager.addEvent(e.props.id,"selecting",t,null),e.updateView("select",t,a,e.state)&&e.eventManager.addEvent(e.props.id,"selected",n,null)}},clear:{schema:{},handler:function(t){e.eventManager.addEvent(e.props.id,"clearing",{count:e.state.data.length,items:e.state.data},{}),e.setState(r(r({},e.state),{},{data:[]})),e.eventManager.addEvent(e.props.id,"cleared",{count:e.state.data.length,items:e.state.data},{}),e.eventManager.addEvent(e.props.id,"changed",{count:e.state.data.length,items:e.state.data},{}),e.updateView("clear",[],[],[])}}};return e.ddEvent=e.eventManager.register(e.props.id,r(r({},d),t),r(r({},g),a),n),e.ddEvent})),e.props=t;var a=[],o=t.data.schema||e.props.schema||f;if(t.data){if(!t.data.items)throw new Error("Expecting data property in data object");Array.isArray(t.data.items)?a=t.data.items:"object"===i(t.data.items)?t.data.items.length&&(a=[t.data.items]):a=[t.data.items]}if(e.state={schema:o,data:a||[],selectedIndex:0,selectedId:null},!e.props.manager)throw new Error("Manager was not passed through StateSchemaList props");return e.eventManager=e.props.manager.getEventManager(),e}return a(m)}(o.StateList),I=function(r){t(c,r);var i=e(c);function c(t){var e;return n(this,c),t.config.options||(t.config.options={}),e=i.call(this,t),d(s(e),"updateData",(function(t,a,n){e.triggerAction("push",[t])})),d(s(e),"updateView",(function(t,e,a,n){return!0})),d(s(e),"exceptionCatched",(function(t,e){})),d(s(e),"findItemIndexById",(function(t,a){if(e.stateManager)return e.stateManager.findItemIndexById(t,a)})),d(s(e),"getData",(function(){return e.state.data})),d(s(e),"showSelectedRow",(function(t){return!!e.props.config.options.select&&t.selected})),d(s(e),"showSelected",(function(t,e){return!0})),d(s(e),"setSelectedId",(function(t,a,n){e.triggerAction("select",{id:t})})),d(s(e),"handleSelect",(function(t,a,n,d){d||e.setSelectedId(a.id,d)})),e.props=t,e}return a(c,[{key:"render",value:function(){return null}}]),c}(p.StateBaseComponent),E={events:g,triggers:m,StateSchemaList:v,ListSchemaBase:I};export{I as ListSchemaBase,v as StateSchemaList,E as default,g as events,m as triggers};
//# sourceMappingURL=ListSchemaBase.js.map
