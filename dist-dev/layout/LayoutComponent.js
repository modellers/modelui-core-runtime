"use strict";var e=require("../_rollupPluginBabelHelpers-b58f8590.js"),t=require("react"),r=require("./LayoutBase.js"),a=require("./Layout.js");function o(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}require("../event/ListBase.js"),require("../event/StateBase.js"),require("../event/StateBaseComponent.js"),require("../util/ObjUtil.js"),require("crypto"),require("../_commonjsHelpers-68cdf74f.js"),require("../util/ComponentUtil.js"),require("../StateManager-1ac08b35.js"),require("../event/Event.js");var n=o(t),s={id:"layout",$schema:"http://json-schema.org/draft-07/schema#",description:"View options","x-layout":"component",type:"object",version:.1,properties:{},required:[]},i={events:r.events,triggers:r.triggers,config:{name:"Layout",type:"layout",author:"Kjartan Jónsson",description:"LayoutComponent component",version:.1,relation:{contains:[],within:"component"},options:s,state:r.StateLayout},options:s,LayoutComponent:function(t){e._inherits(o,t);var r=e._createSuper(o);function o(t){return e._classCallCheck(this,o),t.config.options=t.config.options||{},r.call(this,t)}return e._createClass(o,[{key:"render",value:function(){var t,r=this.props.classes,o=this.props.id,s=this.props.data,i=[],u=[],p=e._createForOfIteratorHelper(this.props.data);try{for(p.s();!(t=p.n()).done;){var c=t.value;if(i.indexOf(c.type)>-1)console.warn("Using item type="+c.type+" not supported in layout for "+o);else{var l=c.id;if("layout"===c.type)u.push(n.default.createElement(a.Layouter,{id:l,key:l,classes:r,data:s,config:c.config,manager:this.props.manager}));else{var f=s||{},y={id:l,key:l,classes:r,data:c.data||f[c.pick]||f,config:c.config,manager:this.props.manager},d=this.props.manager.getComponentInstance(c.type,y);d&&u.push(d)}}}}catch(e){p.e(e)}finally{p.f()}return n.default.createElement("div",null,u)}}]),o}(r.LayoutBase)};module.exports=i;
//# sourceMappingURL=LayoutComponent.js.map
