"use strict";var e=require("./_rollupPluginBabelHelpers-aae655da.js"),t=require("react"),a=require("./Manager-ac3b0e4e.js"),o=require("./layout/LayoutBase.js");function n(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var r=n(t),s=o.events,i=o.triggers,p={id:"layout",$schema:"http://json-schema.org/draft-07/schema#",description:"View options","x-layout":"component",type:"object",version:.1,properties:{},required:[]},u={name:"Layout",type:"layout",author:"Kjartan Jónsson",description:"LayoutComponent component",version:.1,relation:{contains:[],within:"component"},options:p,state:o.StateLayout},c=function(t){e._inherits(o,t);var a=e._createSuper(o);function o(t){return e._classCallCheck(this,o),t.config.options=t.config.options||{},a.call(this,t)}return e._createClass(o,[{key:"render",value:function(){var t,a=this.props.classes,o=this.props.id,n=this.props.data,s=[],i=[],p=e._createForOfIteratorHelper(this.props.data);try{for(p.s();!(t=p.n()).done;){var u=t.value;if(s.indexOf(u.type)>-1)console.warn("Using item type="+u.type+" not supported in layout for "+o);else{var c=u.id;if("layout"===u.type)i.push(r.default.createElement(y,{id:c,key:c,classes:a,data:n,config:u.config,manager:this.props.manager}));else{var l=n||{},f={id:c,key:c,classes:a,data:u.data||l[u.pick]||l,config:u.config,manager:this.props.manager},d=this.props.manager.getComponentInstance(u.type,f);d&&i.push(d)}}}}catch(e){p.e(e)}finally{p.f()}return r.default.createElement("div",null,i)}}]),o}(o.LayoutBase),l={events:s,triggers:i,config:u,options:p,LayoutComponent:c};function f(t,o,n,s,i){var p=arguments.length>6&&void 0!==arguments[6]?arguments[6]:[],u=[];if(!i)throw new Error("Manager was not passed to LayoutRender");console.info("-----------FIXME: TODO: IS THIS CODE USED?-----------");var c,l=e._createForOfIteratorHelper(s.layout);try{for(l.s();!(c=l.n()).done;){var f=c.value;if(f)if(p.indexOf(f.type)>-1)console.warn("Using item type="+f.type+" not supported in layout for "+t);else{var d=t+(f.id||f.type);if("layout"===f.type)u.push(r.default.createElement(y,{id:d,key:d,classes:n,data:o,manager:i,config:f.config}));else{var g=o||{},m={id:d,key:d,classes:n,manager:i,data:f.data||g[f.pick]||g,config:f.config},v=a.Manager.ComponentManager.getInstance().getComponentInstance(f.type,m);v&&u.push(v)}}}}catch(e){l.e(e)}finally{l.f()}return r.default.createElement("div",null,u)}function y(e){return f(e.id,e.data,{},e.config,e.manager,"div")}function d(e){return r.default.createElement(l,e)}var g={LayoutRender:f,Layouter:y,Layout:d};exports.Layout=g,exports.Layout$1=d,exports.LayoutComponent=l,exports.LayoutRender=f,exports.Layouter=y,exports.config=u,exports.events=s,exports.options=p,exports.registerLayout=function(e){e.registerComponent({component:d,type:u.type,events:s,triggers:i,config:u})},exports.triggers=i;
//# sourceMappingURL=Layout-e3639d73.js.map
