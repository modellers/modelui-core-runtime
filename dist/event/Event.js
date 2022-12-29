"use strict";var t=require("../_rollupPluginBabelHelpers-b58f8590.js"),e=function(){function e(){t._classCallCheck(this,e),t._defineProperty(this,"_events",{}),t._defineProperty(this,"_watching",{}),t._defineProperty(this,"_actions",{}),t._defineProperty(this,"_components",{}),t._defineProperty(this,"_component_instance_type",{})}return t._createClass(e,[{key:"getType",value:function(e){return(("object"===t._typeof(e)?null===e?"null":"function"!=typeof e.constructor?"object":e.constructor.name:"boolean"==typeof e?"boolean":"number"==typeof e?"number":"string"==typeof e?"string":"function"==typeof e&&"function")+"").toLowerCase()}},{key:"clearAll",value:function(){this._events={},this._watching={},this._actions={},this._component_instance_type={}}},{key:"warnRegistration",value:function(t,e,n,i){var o="Update registration for "+t+" "+e+"."+n+" : "+i;console.warn(o)}},{key:"warnInfoRegistration",value:function(t,e){console.warn("Update registration for "+t+": "+e)}},{key:"valid",value:function(t,e,n,i,o,r,a){t.hasOwnProperty(e)||(t[e]=i,this.warnRegistration(a,o,r,"Attribute "+e+" missing. Using default value.")),this.getType(t[e])!==n&&this.warnRegistration(a,o,r,"Attribute ".concat(e," should be of type ").concat(n," but is ").concat(this.getType(t[e])," using default values."))}},{key:"validInputsForUI",value:function(t,e,n,i){this.valid(t,"schema","object",{type:"object",title:n+"-"+i,description:"Auto generated"},n,i,e)}},{key:"capitalize",value:function(t){return t.charAt(0).toUpperCase()+t.slice(1)}},{key:"register",value:function(t,e,n,i){var o=this;i?(this._components[i.type]=i,this._components[i.type].actions=e,this._components[i.type].events=n,this._component_instance_type[t]=i.type):console.warn("Component info is missing for "+t),this._actions[t]={},this._events[t]=n||{},Object.keys(e).forEach((function(n){var i=e[n];"function"==typeof i&&(i={handler:i},o.warnRegistration(t,n,"Function handler should be defined as handler in an object. Auto refactoring done.")),o.validInputsForUI(i,"action",t,n),o._actions[t][n]=i}));var r={};return Object.keys(this._events[t]).forEach((function(e){var n=e;o._events[t][e].id?r[e]={id:o._events[t][e].id}:(o._events[t][e].id=n,r[e]={id:n}),o.validInputsForUI(o._events[t][e],"event",t,e)})),r}},{key:"addToWatchList",value:function(t,e,n,i,o){this._watching[t]||(this._watching[t]={}),void 0===this._watching[t][e]&&(this._watching[t][e]=[]),this._watching[t][e].push({tid:n,act:i,transf:o})}},{key:"watch",value:function(e){var n=this;!1===Array.isArray(e)&&(e=[e]);for(var i=function(i){var o=e[i],r=o.component.id,a=o.component.event;o.component.filter?(o.component.regex||(o.component.regex=new RegExp(o.component.filter)),Object.entries(n._actions).forEach((function(e){var i=t._slicedToArray(e,2),r=i[0];i[1],o.component.regex.exec(r)&&n.addToWatchList(r,a,o.trigger.id,o.trigger.action,o.transform)}))):r&&n.addToWatchList(r,a,o.trigger.id,o.trigger.action,o.transform)},o=0;o<e.length;o++)i(o)}},{key:"addEvent",value:function(t,e,n,i){if(this._watching[t]){console.info("--\x3e event "+t+" :"+e);var o=this._watching[t][e]||[];for(var r in o){var a=o[r];this.addAction(a.tid,a.act,n,a.transf,i)}}}},{key:"addAction",value:function(t,e,n,i,o){if(this._actions[t]&&(console.info("--\x3e action "+t+" :"+e),this._actions[t][e])){console.info("--\x3e xx ");var r=n;if(i)try{r=i(n)}catch(t){console.error("Transform failed",t)}r&&this._actions[t][e].handler(r,o)}}},{key:"getCopyOfEvents",value:function(){return Object.assign({},this._events)}},{key:"getCopyOfWatchers",value:function(){return Object.assign({},this._watching)}},{key:"getCopyOfActions",value:function(){return Object.assign({},this._actions)}},{key:"collectComponentInventory",value:function(){for(var e={},n=0,i=Object.entries(this._components);n<i.length;n++){var o=t._slicedToArray(i[n],2),r=o[0],a=o[1],s="";a.relation&&(s=a.relation.within),e[r]={id:a.type,title:a.name,type:a.type,parent:s}}return e}},{key:"getComponentSchema",value:function(t){return this._components[t].options}},{key:"getComponentByType",value:function(t){return this._components[t]}},{key:"getComponentsRegistered",value:function(){return Object.keys(this._component_instance_type)}},{key:"getComponentType",value:function(t){return this._component_instance_type[t]}}],[{key:"getInstance",value:function(){return null===e._instance&&(e._instance=new e),this._instance}}]),e}();t._defineProperty(e,"_instance",null);var n={EventManager:e,getTransformFunction:function(t){if("string"!=typeof(t.transform||t.code))return"Event code attribute is missing";try{return Function("data",t.transform||t.code)}catch(t){return t+""}}};module.exports=n;
