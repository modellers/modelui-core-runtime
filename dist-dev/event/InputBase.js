"use strict";var e=require("../_rollupPluginBabelHelpers-aae655da.js"),a=require("./StateBase.js"),t=require("./StateBaseComponent.js");require("react");var n={changed:{alias:[],info:{name:"Changed",description:"Input value changed"},schema:{}},enabled:{alias:[],info:{name:"Enabled",description:"Enabled input"},schema:{}},disabled:{alias:[],info:{name:"Disabled",description:"Disabled input"},schema:{}},submitted:{alias:[],info:{name:"Submitted",description:"Submitted value"},schema:{}},cleared:{alias:[],info:{name:"Cleared",description:"Cleared value"},schema:{}},populated:{alias:[],info:{name:"Populated",description:"Populated value"},schema:{}},replaced:{alias:[],info:{name:"Replaced",description:"Replaced value"},schema:{}},invalidated:{alias:[],info:{name:"In-validated",description:"Unselecting item"},schema:{}},validated:{alias:[],info:{name:"De-Selected",description:"Unselecting item"},schema:{}}},i=function(a){e._inherits(i,a);var t=e._createSuper(i);function i(a){var s;if(e._classCallCheck(this,i),s=t.call(this,a),e._defineProperty(e._assertThisInitialized(s),"registerComponent",(function(a,t,i){var r=e._assertThisInitialized(s);a=a||{},t=t||{};var d={submit:{schema:{},handler:function(e){s.eventManager.addEvent(s.props.id,"submitting",e,null),s.getActionState("submit",(function(e){var a=r.alterState(e);r.eventManager.addEvent(r.props.id,"submitted",a.data,null)}))}},enable:{schema:{},handler:function(e){var a={disabled:!1};r.alterState(a),s.updateView("enable",e,e,r.state.data)&&r.eventManager.addEvent(r.props.id,"enabled",a,null)}},disable:{schema:{},handler:function(e){var a={disabled:!0};r.alterState(a),s.updateView("disable",e,e,r.state.data)&&r.eventManager.addEvent(r.props.id,"disabled",a,null)}},clear:{schema:{},handler:function(e){var a={data:{value:""}},t=r.alterState(a);r.eventManager.addEvent(r.props.id,"clearing",a,{}),r.updateView("clear",e,e,t)&&r.eventManager.addEvent(r.props.id,"cleared",t.data,null),r.eventManager.addEvent(r.props.id,"changed",t.data,null)}},populate:{schema:{},handler:function(e){var a={data:{value:e.value,id:e.id}};r.alterState(a),r.updateView("populate",e,e,r.state.data)&&r.eventManager.addEvent(r.props.id,"populated",e,null),r.eventManager.addEvent(r.props.id,"changed",e,null)}},replace:{schema:{},handler:function(a){var t=e._objectSpread2(e._objectSpread2({},r.state),{},{data:e._objectSpread2(e._objectSpread2({},a),{},{id:a.id,value:a.value||s.state.data.value,schema:a.schema||s.state.data.schema})});r.setState(t),r.updateView("replace",a,a,r.state.data)&&r.eventManager.addEvent(r.props.id,"replaced",a,null),r.eventManager.addEvent(r.props.id,"changed",a,null)}}};return r.ddEvent=r.eventManager.register(r.props.id,e._objectSpread2(e._objectSpread2({},d),a),e._objectSpread2(e._objectSpread2({},n),t),i),r.ddEvent})),s.props=a,s.state={data:{id:a.data.id||null,value:a.data.value,schema:a.data.schema||a.schema},enabled:(a.config||{}).enabled||!0,schema:a.schema},!s.props.manager)throw new Error("Manager was not passed through StateInput props");return s.eventManager=s.props.manager.getEventManager(),s}return e._createClass(i)}(a.StateInstance),s=function(a){e._inherits(n,a);var t=e._createSuper(n);function n(a){var i;return e._classCallCheck(this,n),a.config.options||(a.config.options={}),i=t.call(this,a),e._defineProperty(e._assertThisInitialized(i),"updateView",(function(e,a,t,n){return!0})),i.props=a,i}return e._createClass(n,[{key:"render",value:function(){return null}}]),n}(t.StateBaseComponent),r={events:n,triggers:{submit:{info:{name:"Submit",description:"Submits the form data"},schema:{},alias:[]},enable:{info:{name:"Enables",description:"Enables the form so that we can change form inputs"},schema:{},alias:[]},disable:{info:{name:"Disable",description:"Disables the form so that we can not change input value"},schema:{},alias:[]},clear:{info:{name:"Clear",description:"Removes all input values clearing the form"},schema:{},alias:[]},populate:{info:{name:"Populate",description:"Fills the form with specified data"},schema:{},alias:[]},replace:{info:{name:"Replace",description:"Replaces the form with specified data"},schema:{},alias:[]}},StateInput:i,InputBase:s};module.exports=r;
//# sourceMappingURL=InputBase.js.map
