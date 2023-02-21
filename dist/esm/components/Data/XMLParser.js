import{_ as e,a as r,b as t,c as n,d as i,h as a,e as o}from"../../_rollupPluginBabelHelpers-55d249d8.js";import{O as s,a as d,n as c,v as l,j as m}from"../../json2xml-ac73b7d0.js";import g from"../../event/Event.js";import{StateLess as p}from"../../event/StateBase.js";const{buildOptions:v}=s,h=d,{prettify:f}=c,u=l;var x=class{constructor(e){this.externalEntities={},this.options=v(e)}parse(e,r){if("string"==typeof e);else{if(!e.toString)throw new Error("XML data is accepted in String or Bytes[] form.");e=e.toString()}if(r){!0===r&&(r={});const t=u.validate(e,r);if(!0!==t)throw Error(`${t.err.msg}:${t.err.line}:${t.err.col}`)}const t=new h(this.options);t.addExternalEntities(this.externalEntities);const n=t.parseXml(e);return this.options.preserveOrder||void 0===n?n:f(n,this.options)}addEntity(e,r){if(-1!==r.indexOf("&"))throw new Error("Entity value can't have '&'");if(-1!==e.indexOf("&")||-1!==e.indexOf(";"))throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");if("&"===r)throw new Error("An entity with value '&' is not permitted");this.externalEntities[e]=r}};var E={XMLParser:x,XMLValidator:l,XMLBuilder:m},M={read:{alias:[],info:{name:"Read",description:"Read XML returning JSON"},schema:{}},convert:{alias:[],info:{name:"Convert",description:"Converts JSON to XML"},schema:{}}},X={reading:{alias:[],info:{name:"reading",description:"Reading the XML and returning XML"},schema:{}},read:{alias:[],info:{name:"read",description:"Read the XML and returning XML"},schema:{}},failure_reading:{alias:[],info:{name:"Reading XML failed",description:"Parsing the XML faild"},schema:{}},converting:{alias:[],info:{name:"Converting",description:"Converting the JSON to XML"},schema:{}},converted:{alias:[],info:{name:"Converted",description:"Converted the JSON to XML"},schema:{}},failure_converting:{alias:[],info:{name:"Failure Converting",description:"Convertion the JSON to XML failed"},schema:{}}},L={id:"xml",$schema:"http://json-schema.org/draft-07/schema#",description:"XML Parser options","x-layout":"component",type:"object",version:.1,properties:{},required:[]},w=function(s){e(c,p);var d=r(c);function c(e){var r;return n(this,c),r=d.call(this,e),i(o(r),"registerComponent",(function(e,t,n){e=e||{},t=t||{};var i={read:{schema:{},handler:function(e){r.triggerEvent("reading",{id:e.id,xml:e.xml});try{var t=new E.XMLParser({ignoreAttributes:!1}).parse(e.xml);r.triggerEvent("read",{id:e.id,json:t})}catch(t){r.triggerEvent("failure_reading",{id:e.id,xml:e.xml,error:t+"",e:t})}}},convert:{schema:{},handler:function(e){r.triggerEvent("converting",{id:e.id,json:e.json});try{var t=new E.XMLBuilder({ignoreAttributes:!1,attributeNamePrefix:"@_",format:!0}).build(e.json);r.triggerEvent("converted",{id:e.id,xml:t})}catch(t){r.triggerEvent("failure_converting",{id:e.id,xml:e.xml,error:t+"",e:t})}}}};return r.ddEvent=g.EventManager.getInstance().register(r.props.id,a(a({},i),e),a(a({},X),t),n),r.ddEvent})),r.props=e,r.state={},r}return t(c)}(),j={name:"XML",type:"xml",author:"Kjartan Jónsson",description:"XML Parser",version:.1,relation:{contains:[],within:"component"},options:L,state:w};function y(e){var r=new w(e);return r.registerComponent({},{},j),r}export{w as StateWorker,y as XMLParser,j as config,X as events,L as options,M as triggers};
//# sourceMappingURL=XMLParser.js.map