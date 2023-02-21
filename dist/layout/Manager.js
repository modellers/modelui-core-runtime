"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("../_rollupPluginBabelHelpers-aae655da.js"),t=require("../event/Event.js"),n=function(){function t(){e._classCallCheck(this,t),e._defineProperty(this,"_states",{})}return e._createClass(t,[{key:"getManager",value:function(e){return this._states[e]}},{key:"clearAll",value:function(){}},{key:"createState",value:function(e){return this.createManager(e.id,e)}},{key:"createStates",value:function(t){var n,a=e._createForOfIteratorHelper(t);try{for(a.s();!(n=a.n()).done;){var r=n.value;this.createManager(r.id,r)}}catch(e){a.e(e)}finally{a.f()}}},{key:"createManager",value:function(e,t){var n=r.getInstance(),a=n.getComponent(t.type);if(a){var o=a.config,i=this.getManager(e);return i||(o.state&&(t.manager||(t.manager=n),(i=this.createStateByClass(o.state,t)).registerComponent&&i.registerComponent({},{},o),this._states[e]=i),i)}throw new Error("Component type does not exist: "+t.type)}},{key:"createStateByClass",value:function(e,t){return e?new e(t):null}},{key:"createLayoutState",value:function(e){var t=this;a(e,(function(e){e.type&&e.id&&e.config&&(e.data||e.content||e.actions)&&t.createState(e)}))}}],[{key:"getInstance",value:function(){return null===t._instance&&(t._instance=new t),this._instance}}]),t}();e._defineProperty(n,"_instance",null);var a=function(e,t){!function e(n){for(var a in n)t&&n[a]&&t(n[a]),n[a].data&&e(n[a].data),n[a].content&&e([n[a].content]),n[a].actions&&e([n[a].actions])}(e)},r=function(){function a(){e._classCallCheck(this,a),e._defineProperty(this,"_components",{})}return e._createClass(a,[{key:"getEventManager",value:function(){return this._event_manager}},{key:"getStateFactory",value:function(){return this._state_factory}},{key:"getStateManager",value:function(){return this._state_factory}},{key:"clearAll",value:function(){this._components={}}},{key:"registerComponent",value:function(e){e.manager=this,"function"==typeof e.component?this._components[e.type]=e:console.error("Could not register "+e.type+" since it was not a function")}},{key:"getComponentTypes",value:function(){return Object.keys(this._components)}},{key:"getComponents",value:function(){return this._components}},{key:"getComponent",value:function(e){return this._components[e]}},{key:"getComponentInstance",value:function(e,t){t.manager=this;var n=this._components[e];if(n)return n.is_withclass?n.component:new n.component(t);console.warn("Component instance not registered of type: "+e)}},{key:"collectComponentInventory",value:function(){for(var t={},n=0,a=Object.entries(this._components);n<a.length;n++){var r=e._slicedToArray(a[n],2),o=r[0],i=r[1],s=i.config;if(s&&o&&s.type){var c="";if(s.relation&&(c=s.relation.within),t[s.type]={id:s.type,title:s.name,type:s.type,events:i.events,actions:i.triggers,category:"TBD",parent:c,schema:s.options},s.contains)for(var u=0,l=Object.entries(s.contains);u<l.length;u++){var y=e._slicedToArray(l[u],2),f=y[0],p=y[1],g=s.contains[f];t[f]={id:f,title:g.title||g.id,category:"TBD",type:f,parent:s.type,schema:p}}}}return t}}],[{key:"getInstance",value:function(){return null===a._instance&&(a._instance=new a,a._instance._event_manager=t.EventManager.getInstance(),a._instance._state_factory=n.getInstance()),this._instance}}]),a}();e._defineProperty(r,"_instance",null);var o={ComponentManager:r,StateManager:n};exports.default=o,exports.walkLayout=a;
